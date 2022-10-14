import { DefaultEventsMap } from '@socket.io/component-emitter';
import { getProfile } from 'api/modules/api-app/authenticate';
import React, { useEffect } from 'react';
import Config from 'react-native-config';
import { useSelector } from 'react-redux';
import socketIO, { Socket } from 'socket.io-client';
import { SocketEvent } from './enumData';
import { logger } from './helper';

let socket: Socket<DefaultEventsMap, DefaultEventsMap>;

export const SocketProvider = ({ children }: any) => {
    const userInfo = useSelector((state: any) => state.userInfo);
    const startSocket = () => {
        socket = socketIO(Config.API_URL, {
            extraHeaders: {
                authorization: userInfo?.token,
            },
        });

        socket.on(SocketEvent.connect, () => {
            logger('connect success');
        });
        socket.on(SocketEvent.connectError, async (err: any) => {
            if (err.message === 'Unauthorized') {
                logger('Unauthorized');
                await getProfile();
            } else {
                logger(err.message);
            }
        });
        socket.on(SocketEvent.SUCCESS_PAYMENT, async (data) => {
            console.log('socket.on -> SUCCESS_PAYMENT', data);
        });
        socket.on(SocketEvent.CANCEL_ORDER, async (data) => {
            console.log('socket.on -> CANCEL_ORDER', data);
        });
    };

    const stopSocket = () => {
        socket?.off(SocketEvent.connect);
        socket?.off(SocketEvent.connectError);
        socket?.off(SocketEvent.SUCCESS_PAYMENT);
        socket?.off(SocketEvent.CANCEL_ORDER);
    };

    useEffect(() => {
        if (userInfo?.token) {
            startSocket();
        }
        return () => {
            stopSocket();
        };
    }, [userInfo?.token]);

    return <>{children}</>;
};
