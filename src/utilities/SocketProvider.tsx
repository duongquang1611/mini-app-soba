import { DefaultEventsMap } from '@socket.io/component-emitter';
import { getProfile, getRestaurantsApi } from 'api/modules/api-app/authenticate';
import { saveOrderOption } from 'api/modules/api-app/order';
import {
    clearCartOrder,
    clearDefaultOrder,
    clearDefaultOrderLocal,
    clearMobileOrder,
    updateAllOrder,
    updateCartOrder,
    updateDefaultOrder,
    updateMobileOrder,
} from 'app-redux/slices/orderSlice';
import { userInfoActions } from 'app-redux/slices/userInfoSlice';
import { store } from 'app-redux/store';
import { getCouponData } from 'feature/home/HomeScreen';
import { navigationRef } from 'navigation/NavigationService';
import React, { useEffect } from 'react';
import Config from 'react-native-config';
import { useSelector } from 'react-redux';
import socketIO, { Socket } from 'socket.io-client';
import { SocketEvent } from './enumData';
import {
    backHomeWhenPayment,
    checkAvailableCouponsAllOrder,
    deleteUsedCoupon,
    generateDataSaveOrderOption,
    logger,
} from './helper';
import { OrderType, listScreenBackWhenPayment } from './staticData';
import { getResourcesData } from 'hooks/useNetwork';
import { updateGlobalData } from 'app-redux/slices/globalDataSlice';
import i18next from 'i18next';

let socket: Socket<DefaultEventsMap, DefaultEventsMap>;

const generalActionSocket = async () => {
    try {
        await getCouponData();
        const resProfile = await getProfile();
        store.dispatch(userInfoActions.getUserInfoSuccess(resProfile?.data));
    } catch (error) {
        console.log('getProfile -> error', error);
    }
};

const handleActionSuccessPayment = async (data: any) => {
    console.log('handleActionSuccessPayment');

    if (!data) return;
    const { order } = store.getState();
    const { defaultOrder, defaultOrderLocal, mobileOrder, cartOrder } = order;
    const { coupons = [], type, orderId = '' } = data || {};
    const currentScreen = navigationRef?.current?.getCurrentRoute?.()?.name;
    // update gio hang
    store.dispatch(updateCartOrder(deleteUsedCoupon(cartOrder, coupons)));

    if (Number(type) === OrderType.DEFAULT_SETTING) {
        store.dispatch(updateMobileOrder(deleteUsedCoupon(mobileOrder, coupons)));
        store.dispatch(clearDefaultOrder());
        store.dispatch(clearDefaultOrderLocal());
        try {
            const defaultOrderHomeSaveOrderOption = generateDataSaveOrderOption(defaultOrder, OrderType.DEFAULT_HOME);
            const mobileSaveOrderOption = generateDataSaveOrderOption(
                deleteUsedCoupon(mobileOrder, coupons),
                OrderType.MOBILE,
            );
            await Promise.all([
                saveOrderOption(defaultOrderHomeSaveOrderOption),
                saveOrderOption(mobileSaveOrderOption),
            ]);
        } catch (error) {
            console.log('saveOrder -> error', error);
        }
    } else if (Number(type) === OrderType.MOBILE) {
        store.dispatch(clearMobileOrder());
        store.dispatch(clearCartOrder());
        store.dispatch(updateDefaultOrder(deleteUsedCoupon(defaultOrder, coupons)));
        try {
            const defaultOrderHomeSaveOrderOption = generateDataSaveOrderOption(
                deleteUsedCoupon(defaultOrderLocal, coupons),
                OrderType.DEFAULT_HOME,
            );
            const mobileSaveOrderOption = generateDataSaveOrderOption({}, OrderType.MOBILE);
            await Promise.all([
                saveOrderOption(defaultOrderHomeSaveOrderOption),
                saveOrderOption(mobileSaveOrderOption),
            ]);
        } catch (error) {
            console.log('saveOrder -> error', error);
        }
    }

    if (listScreenBackWhenPayment.find((screen: any) => currentScreen === screen)) {
        backHomeWhenPayment(orderId);
    }

    await generalActionSocket();
};

const handleActionCancelOrder = async (data: any) => {
    console.log('handleActionCancelOrder');

    if (!data) return;
    const { order } = store.getState();
    const { cartOrder } = order;
    const { coupons = [] } = data || {};
    store.dispatch(updateCartOrder(deleteUsedCoupon(cartOrder, coupons)));
    await generalActionSocket();
};
const handleActionUpdateResource = async () => {
    const restaurantsDefault = [{ id: null, name: i18next.t('common.defaultRestaurants') }];
    try {
        await getResourcesData();
        const resRestaurants = await getRestaurantsApi();
        if (!resRestaurants?.data) return;
        store.dispatch(updateGlobalData({ listRestaurants: [...resRestaurants?.data, ...restaurantsDefault] }));
    } catch (error) {
        console.log('getListRestaurants -> error', error);
    }
};

const handleDisconnectSocket = async () => {
    try {
        const couponsOrder = await checkAvailableCouponsAllOrder();
        const { order } = store.getState();

        store.dispatch(
            updateAllOrder({
                defaultOrder: {
                    ...order?.defaultOrder,
                    coupons: couponsOrder?.defaultOrder || [],
                },
                mobileOrder: {
                    ...order?.mobileOrder,
                    coupons: couponsOrder?.mobileOrder || [],
                },
                defaultOrderLocal: {
                    ...order?.defaultOrderLocal,
                    coupons: couponsOrder?.defaultOrderLocal || [],
                },
                cartOrder: {
                    ...order?.cartOrder,
                    coupons: couponsOrder?.cartOrder || [],
                },
            }),
        );
    } catch (error) {
        console.log('handleDisconnectSocket', error);
    }
};

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
        socket.on(SocketEvent.SUCCESS_PAYMENT, handleActionSuccessPayment);
        socket.on(SocketEvent.CANCEL_ORDER, handleActionCancelOrder);
        socket.on(SocketEvent.UPDATE_RESOURCE, handleActionUpdateResource);
        socket.on(SocketEvent.DISCONNECT, handleDisconnectSocket);
    };

    const stopSocket = () => {
        socket?.off(SocketEvent.connect);
        socket?.off(SocketEvent.connectError);
        socket?.off(SocketEvent.SUCCESS_PAYMENT);
        socket?.off(SocketEvent.CANCEL_ORDER);
        socket?.off(SocketEvent.UPDATE_RESOURCE);
        socket?.off(SocketEvent.DISCONNECT);
        socket?.disconnect();
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
