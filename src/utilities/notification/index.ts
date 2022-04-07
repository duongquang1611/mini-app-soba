import { sendTeams } from 'api/modules/api-app/general';
import { readNotification } from 'api/modules/api-app/notification';
import { RootState } from 'app-redux/hooks';
import {
    clearMobileOrder,
    updateCartOrder,
    updateDefaultOrderLocal,
    updateMobileOrder,
} from 'app-redux/slices/orderSlice';
import { store } from 'app-redux/store';
import { useEffect } from 'react';
import Config from 'react-native-config';
import OneSignal from 'react-native-onesignal';
import { useSelector } from 'react-redux';
import { isLogin } from 'utilities/authenticate/AuthenticateService';
import { logger } from 'utilities/helper';
import { OrderType } from 'utilities/staticData';

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
    console.log('pushTagMember -> id', id);
    id && OneSignal.sendTag('memberId', `${id}`);
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
const deleteUsedCoupon = (order: any, couponsUsed: any) => {
    const { coupons } = order || {};
    const newCoupons =
        coupons?.filter(
            (itemCoupon: any) =>
                !couponsUsed.find(
                    (itemUsed: any) =>
                        itemUsed.id === itemCoupon.id && itemUsed?.receivedDate === itemCoupon?.receivedDate,
                ),
        ) || [];
    return { ...order, coupons: newCoupons };
};

function onReceived(data: NotificationReceivedEvent) {
    logger('onReceived', undefined, data);
    const notify = data.getNotification();
    setTimeout(() => data.complete(notify), 0); // must need to show notify in tab bar

    const { coupons, type } = data?.notification?.additionalData;
    sendTeams(JSON.stringify(data?.notification));

    const { order } = store.getState();
    const { defaultOrder, defaultOrderLocal, mobileOrder, cartOrder } = order;
    store.dispatch(updateCartOrder(deleteUsedCoupon(cartOrder, coupons)));

    if (type === OrderType.DEFAULT) {
        store.dispatch(updateMobileOrder(deleteUsedCoupon(mobileOrder, coupons)));
        store.dispatch(updateDefaultOrderLocal(defaultOrder));
    }
    if (type === OrderType.MOBILE) {
        const { coupons } = mobileOrder;
        store.dispatch(clearMobileOrder());
        store.dispatch(updateDefaultOrderLocal(deleteUsedCoupon(defaultOrderLocal, coupons)));
    }
}

export const useOnesignal = (user?: any) => {
    const { isPushDisabled } = useSelector((state: RootState) => state.globalData);
    if (!user) {
        const { userInfo } = store.getState();
        user = userInfo?.user;
    }

    useEffect(() => {
        // const oneSignalId = Config.ONE_SIGNAL_APP_ID;
        const oneSignalId = '120ed4db-f5d3-440d-9838-cb43d3f2557a';
        setTimeout(async () => {
            try {
                OneSignal.setAppId(oneSignalId);
                // React Native OneSignal Ver4 Need pass function callback into function promptForPushNotificationsWithUserResponse to push notification in ios
                OneSignal.promptForPushNotificationsWithUserResponse((response: any) => {
                    logger('User Accept Push Notification IOS:', false, response);
                });
                if (isLogin()) {
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
