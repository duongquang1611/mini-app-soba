/* eslint-disable @typescript-eslint/no-unused-vars */
import { useNavigation } from '@react-navigation/native';
import { getProfile } from 'api/modules/api-app/authenticate';
import { sendTeams } from 'api/modules/api-app/general';
import { getNotificationList, readNotification } from 'api/modules/api-app/notification';
import { saveOrderOption } from 'api/modules/api-app/order';
import { RootState } from 'app-redux/hooks';
import { updateNotificationUnRead } from 'app-redux/slices/globalDataSlice';
import {
    clearCartOrder,
    clearMobileOrder,
    updateCartOrder,
    updateDefaultOrderLocal,
    updateMobileOrder,
} from 'app-redux/slices/orderSlice';
import { userInfoActions } from 'app-redux/slices/userInfoSlice';
import { store } from 'app-redux/store';
import AlertMessage from 'components/base/AlertMessage';
import { getCouponData } from 'feature/home/HomeScreen';
import i18next from 'i18next';
import { APP_ROUTE, HOME_ROUTE, SETTING_ROUTE } from 'navigation/config/routes';
import { navigate, navigationRef } from 'navigation/NavigationService';
import { useEffect } from 'react';
import Config from 'react-native-config';
import OneSignal from 'react-native-onesignal';
import { useSelector } from 'react-redux';
import { isLogin } from 'utilities/authenticate/AuthenticateService';
import { NotificationCategory } from 'utilities/enumData';
import { backHomeWhenPayment, deleteUsedCoupon, generateDataSaveOrderOption, logger } from 'utilities/helper';
import { listScreenBackWhenPayment, OrderType, POPUP_TYPE } from 'utilities/staticData';

type NotificationReceivedEvent = {
    complete: (notification?: any) => void;
    getNotification: () => any;
    notification: any;
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

export async function onMoveNavigation(data: any, navigation?: any) {
    const { memberNotiId, category } = data || {};
    const isCategoryPayment =
        category === NotificationCategory.CANCEL_PAYMENT || category === NotificationCategory.SUCCESS_PAYMENT;
    if (data?.memberNotiId) {
        try {
            const readData = await readNotification(data?.memberNotiId);
            store.dispatch(updateNotificationUnRead(readData?.data || 0));
            if (isCategoryPayment) {
                navigation?.navigate(SETTING_ROUTE.ORDER_HISTORY);
            } else navigation?.navigate(HOME_ROUTE.NOTIFICATION_DETAIL, { item: { id: memberNotiId, isRead: true } });
        } catch (error) {
            console.log('onMoveNavigation -> error', error);
        }
    }
}

const onReceived = async (data: NotificationReceivedEvent) => {
    logger('onReceived', undefined, data);
    const notify = data.getNotification();
    setTimeout(() => data.complete(notify), 0); // must need to show notify in tab bar
    // update noti unread
    try {
        const res = await getNotificationList({ params: { take: 1, pageIndex: 1 } });
        const { totalUnread } = res?.data;
        store.dispatch(updateNotificationUnRead(totalUnread));
    } catch (error) {
        console.log('getNotification -> error', error);
    }
    try {
        await getCouponData();
    } catch (error) {
        console.log('getProfile -> error', error);
    }
};

export const useOnesignal = (user?: any) => {
    const { isPushDisabled } = useSelector((state: RootState) => state.globalData);
    const navigation = useNavigation();

    if (!user) {
        const { userInfo } = store.getState();
        user = userInfo?.user;
    }
    const handleNavigateNotification = async (data: any) => {
        if (isLogin()) {
            const { additionalData } = data?.notification;
            setTimeout(() => {
                onMoveNavigation(additionalData, navigation);
            }, 100);
        }
    };

    useEffect(() => {
        const oneSignalId = Config.ONE_SIGNAL_APP_ID;

        setTimeout(async () => {
            try {
                OneSignal.setAppId(oneSignalId);
                // React Native OneSignal Ver4 Need pass function callback into function promptForPushNotificationsWithUserResponse to push notification in ios
                OneSignal.promptForPushNotificationsWithUserResponse((response: any) => {
                    logger('User Accept Push Notification IOS:', false, response);
                });
                if (user?.member?.id) {
                    pushTagMember(user?.member?.id);
                } else {
                    deleteTagOneSignal();
                }
                OneSignal.setNotificationWillShowInForegroundHandler(onReceived);
                OneSignal.setNotificationOpenedHandler(handleNavigateNotification);
                const deviceState = await OneSignal.getDeviceState();
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
