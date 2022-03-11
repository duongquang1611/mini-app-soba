import { readNotification } from 'api/modules/api-app/notification';
import { RootState } from 'app-redux/hooks';
import { store } from 'app-redux/store';
import { useEffect } from 'react';
import Config from 'react-native-config';
import OneSignal from 'react-native-onesignal';
import { useSelector } from 'react-redux';
import { isLogin } from 'utilities/authenticate/AuthenticateService';
import { logger } from 'utilities/helper';

type NotificationReceivedEvent = {
    complete: (notification?: any) => void;
    getNotification: () => any;
};

export const enumType = {
    System: 0,
    NewMessage: 1,
    MemberRequest: 2,
    StoreAccept: 3,
    Cancel: 4,
    MemberPaid: 5,
};

export function pushTagMember(id: number | string) {
    OneSignal.sendTag('memberId', `${id}`);
}

export function deleteTagOneSignal() {
    OneSignal.sendTag('memberId', '');
    OneSignal.deleteTag('memberId');
}

export async function onMoveNavigation(data: any) {
    if (data?.id) {
        try {
            await readNotification(data.id);
            // Navigate
        } catch (error) {
            console.log('file: index.ts -> line 38 -> onMoveNavigation -> error', error);
        }
    }
}
export function handleNavigateNotification(data: any) {
    if (isLogin()) {
        const { additionalData } = data?.notification;
        onMoveNavigation(additionalData);
    }
}

function onReceived(data: NotificationReceivedEvent) {
    logger('onReceived', undefined, data);
    const notify = data.getNotification();

    // Complete with null means don't show a notification.
    setTimeout(() => data.complete(notify), 0); // must need to show notify in tab bar
}

export const useOnesignal = (user?: any) => {
    const { isPushDisabled } = useSelector((state: RootState) => state.globalData);
    if (!user) {
        const { userInfo } = store.getState();
        user = userInfo?.user;
    }

    useEffect(() => {
        const oneSignalId = '351f4556-3f84-422d-b936-69c24e0c6a1b' || Config.ONE_SIGNAL_APP_ID;
        setTimeout(async () => {
            try {
                OneSignal.setAppId(oneSignalId);
                // React Native OneSignal Ver4 Need pass function callback into function promptForPushNotificationsWithUserResponse to push notification in ios
                OneSignal.promptForPushNotificationsWithUserResponse((response: any) => {
                    logger('User Accept Push Notification IOS:', false, response);
                });
                if (isLogin()) {
                    pushTagMember(user?.id);
                } else {
                    deleteTagOneSignal();
                }
                OneSignal.setNotificationWillShowInForegroundHandler(onReceived);
                OneSignal.setNotificationOpenedHandler(handleNavigateNotification);
                const deviceState = await OneSignal.getDeviceState();
                // console.log(deviceState, isPushDisabled);
                if (
                    typeof deviceState?.isPushDisabled === 'boolean' &&
                    isPushDisabled !== deviceState?.isPushDisabled
                ) {
                    OneSignal.disablePush(isPushDisabled);
                }
            } catch (error) {
                console.log('file: index.ts -> line 78 -> setTimeout -> error', error);
            }
        }, 200);
        return () => {
            OneSignal.clearHandlers();
        };
    }, []);
};
