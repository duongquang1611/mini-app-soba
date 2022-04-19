import { sendTeams } from 'api/modules/api-app/general';
import { readNotification } from 'api/modules/api-app/notification';
import { RootState } from 'app-redux/hooks';
import { updateNotificationUnRead } from 'app-redux/slices/globalDataSlice';
import {
    clearMobileOrder,
    updateCartOrder,
    updateDefaultOrderLocal,
    updateMobileOrder,
} from 'app-redux/slices/orderSlice';
import { store } from 'app-redux/store';
import AlertMessage from 'components/base/AlertMessage';
import i18next from 'i18next';
import { APP_ROUTE, HOME_ROUTE, SETTING_ROUTE } from 'navigation/config/routes';
import { navigate, navigationRef } from 'navigation/NavigationService';
import { useEffect } from 'react';
import Config from 'react-native-config';
import OneSignal from 'react-native-onesignal';
import { useSelector } from 'react-redux';
import { isLogin } from 'utilities/authenticate/AuthenticateService';
import { NotificationCategory } from 'utilities/enumData';
import { logger } from 'utilities/helper';
import { listScreenBackWhenPayment, OrderType } from 'utilities/staticData';

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

export async function onMoveNavigation(data: any) {
    const { memberNotiId, category } = data || {};
    const isCategoryPayment =
        category === NotificationCategory.CANCEL_PAYMENT || category === NotificationCategory.SUCCESS_PAYMENT;
    if (data?.memberNotiId) {
        try {
            await readNotification(data?.memberNotiId);
            if (isCategoryPayment) {
                navigate(SETTING_ROUTE.ORDER_HISTORY);
            } else navigate(HOME_ROUTE.NOTIFICATION_DETAIL, { item: { id: memberNotiId, isRead: true } });
        } catch (error) {
            console.log('onMoveNavigation -> error', error);
        }
    }
}
export const handleNavigateNotification = async (data: any) => {
    if (isLogin()) {
        const { additionalData } = data?.notification;
        setTimeout(() => {
            onMoveNavigation(additionalData);
        }, 300);
    }
};
const deleteUsedCoupon = (order: any, couponsUsed: any) => {
    const { coupons } = order || {};
    const newCoupons =
        coupons?.filter(
            (itemCoupon: any) =>
                !couponsUsed?.find(
                    (itemUsed: any) =>
                        itemUsed?.couponId === itemCoupon?.coupon?.id &&
                        itemUsed?.receivedDate === itemCoupon?.receivedDate,
                ),
        ) || [];
    return { ...order, coupons: newCoupons };
};

const backHome = (orderId: string) => {
    AlertMessage(
        i18next.t('order.backHomeWhenPayment', { orderId }),
        {
            onClosedModalize: () => {
                navigate(APP_ROUTE.MAIN_TAB, { screen: HOME_ROUTE.ROOT });
            },
        },
        false,
    );
};

const onReceived = (data: NotificationReceivedEvent) => {
    logger('onReceived', undefined, data);
    const notify = data.getNotification();
    setTimeout(() => data.complete(notify), 0); // must need to show notify in tab bar
    const { coupons = [], type, orderId = '', category } = data?.notification?.additionalData || {};
    sendTeams(JSON.stringify(data?.notification), 'Notification');
    const { order } = store.getState();
    const { defaultOrder, defaultOrderLocal, mobileOrder, cartOrder } = order;
    store.dispatch(updateCartOrder(deleteUsedCoupon(cartOrder, coupons)));
    const currentScreen = navigationRef?.current?.getCurrentRoute?.()?.name;
    store.dispatch(updateNotificationUnRead(1));
    if (category === NotificationCategory.SUCCESS_PAYMENT && Number(type) === OrderType.DEFAULT_SETTING) {
        store.dispatch(updateMobileOrder(deleteUsedCoupon(mobileOrder, coupons)));
        store.dispatch(updateDefaultOrderLocal(defaultOrder));
    }
    if (category === NotificationCategory.SUCCESS_PAYMENT && Number(type) === OrderType.MOBILE) {
        store.dispatch(clearMobileOrder());
        store.dispatch(updateDefaultOrderLocal(deleteUsedCoupon(defaultOrderLocal, coupons)));
    }
    if (
        category === NotificationCategory.SUCCESS_PAYMENT &&
        listScreenBackWhenPayment.find((screen: any) => currentScreen === screen)
    ) {
        backHome(orderId);
    }
};

export const useOnesignal = (user?: any) => {
    const { isPushDisabled } = useSelector((state: RootState) => state.globalData);
    if (!user) {
        const { userInfo } = store.getState();
        user = userInfo?.user;
    }

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
