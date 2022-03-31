import AsyncStorage from '@react-native-community/async-storage';
import { store } from 'app-redux/store';
import i18next from 'i18next';
import { throttle } from 'lodash';
import { DevSettings, Linking, Platform } from 'react-native';
import codePush from 'react-native-code-push';
import Config from 'react-native-config';
import Picker from 'react-native-picker';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { formatDate, YYYYMMDD_PUBLISH } from './format';
import { CouponDishType, CouponType, DiscountType, MenuType, OrderType, staticValue } from './staticData';

export const isAndroid = Platform.OS === 'android';

export const isIos = Platform.OS === 'ios';

export function wait(timeout: number): Promise<any> {
    return new Promise((resolve) => {
        setTimeout(resolve, timeout);
    });
}

export function logger(msg: string, isWarning?: boolean, params?: any): void {
    if (__DEV__ && !isWarning) {
        if (params) console.log(msg, params);
        else console.log(msg);
    }
    if (__DEV__ && isWarning) {
        if (params) console.warn(msg, params);
        else console.warn(msg);
    }
}

export function initPicker(params?: any) {
    Picker.init({
        pickerTextEllipsisLen: 10,
        pickerCancelBtnText: i18next.t('common.cancel'),
        pickerConfirmBtnText: i18next.t('common.confirm'),
        ...params,
    });
}

export const addMenuClearAsyncStorage = () => {
    if (__DEV__) {
        DevSettings.addMenuItem('Clear AsyncStorage', () => {
            AsyncStorage.clear();
            DevSettings.reload();
        });
    }
};

export function generatePersistConfig(key: string, whitelist: string[]) {
    return {
        key,
        whitelist,
        version: 1,
        debug: __DEV__,
        storage: AsyncStorage,
        stateReconciler: autoMergeLevel2,
    };
}

export const getCodePushInfo = () => {
    if (!__DEV__) {
        codePush.sync({
            updateDialog: undefined,
            installMode: codePush.InstallMode.IMMEDIATE,
            deploymentKey:
                Platform.OS === 'android'
                    ? Config.CODEPUSH_ANDROID_DEVELOPMENT_KEY
                    : Config.CODEPUSH_IOS_DEVELOPMENT_KEY,
        });
    }
};

export const throttlePress = (callback: any) =>
    throttle(callback, staticValue.THROTTLE_TIME, staticValue.CONFIG_THROTTLE);

export const getYesterday = () => {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    return date;
};

export const openURL = (url: string, cbNotSupport?: any) => {
    Linking.canOpenURL(url).then((supported) => {
        if (supported) {
            Linking.openURL(url);
        } else {
            cbNotSupport?.();
            __DEV__ && console.log(`Don't know how to open URI: ${url}`);
        }
    });
};

export const checkExpired = (endDate: any) => {
    if (!endDate) return false;
    const d1 = new Date(endDate);
    const d2 = new Date();
    return d2 >= d1;
};

export const sumAmount = (item: any) => {
    let resultAmount = 0;
    const { mainDish, subDishes } = item;
    subDishes?.forEach(async (rating: any) => {
        resultAmount += rating?.amount;
    });
    return (resultAmount + 1) * mainDish.amount;
};

export const checkPasswordMatch = ({ password, confirmPassword }: any) => {
    console.log(password, confirmPassword);
    if (confirmPassword && password && password !== confirmPassword) {
        return 'error.passwordNotMatch';
    }
    return '';
};

export const sumTotalAmount = (order: any) => {
    let numOrder = order?.coupons?.length || 0;
    order?.dishes?.forEach(async (rating: any) => {
        numOrder += rating?.totalAmount;
    });
    return numOrder;
};

export const getDefaultSubDish = (dishOptions: any) => {
    const subDishDefault: Array<any> = [];
    dishOptions?.forEach(async (itemDish: any) => {
        itemDish?.subDish?.forEach(async (itemSub: any) => {
            if (itemSub?.default === MenuType.ENABLE) {
                subDishDefault.push({
                    dishOption: {
                        dishOptionsId: itemDish?.id,
                    },
                    subDishId: itemSub?.id,
                    title: itemSub?.dish?.title,
                    selected: 1,
                    amount: 1,
                });
            }
        });
    });
    return subDishDefault;
};

export const addQRCodeEOS = (qrData: any, convert = true, includeEOS = true) => {
    if (!convert) return qrData;
    const qrDataString = JSON.stringify(qrData);
    return includeEOS ? `${qrDataString}${staticValue.END_CODE_QR}` : qrDataString;
};

export const generateCheckInQR = (user: any, convert?: boolean, includeEOS?: boolean) => {
    const qrData = {
        id: user?.member?.id,
        name: user?.member?.fullName,
    };

    return addQRCodeEOS(qrData, convert, includeEOS);
};

export const generateCouponQR = (memberCoupon: any, user?: any, convert?: boolean, includeEOS?: boolean) => {
    const { coupon } = memberCoupon;
    const isFullOrder = Number(coupon?.discountType === DiscountType.ALL_ORDER);
    const isFree = Number(coupon?.couponDish?.[0]?.type === CouponDishType.FREE);
    const price = (isFullOrder ? coupon?.discount : coupon?.couponDish?.[0]?.discount) || 0;
    const isAccounted = Number(coupon?.type === CouponType.COMPANY);

    const qrData: any = {
        coupon: {
            id: coupon?.stringId,
            isFullOrder,
            isFree,
            price,
            isAccounted,
            publishDatetime: formatDate(memberCoupon?.receivedDate, YYYYMMDD_PUBLISH),
        },
    };

    if (!isFullOrder) {
        qrData.coupon.foodId = coupon?.couponDish?.[0]?.id;
    }
    if (user) qrData.user = generateCheckInQR(user, false);

    return addQRCodeEOS(qrData, convert, includeEOS);
};

export const generateOrderQR = (
    dataOrder: any,
    user: any,
    orderType = OrderType.MOBILE,
    convert?: boolean,
    includeEOS?: boolean,
) => {
    const { coupons = [], dishes = [] } = dataOrder || {};
    const couponsFormatted = coupons.map((couponItem: any) => {
        return generateCouponQR(couponItem, undefined, false)?.coupon;
    });
    let dishesFormatted = dishes.map((dishItem: any) => {
        const { mainDish, subDishes } = dishItem;
        const dishFormatted = [];
        for (let i = 0; i < (mainDish?.amount || 1); i++) {
            const flatDishItem: any = {
                id: `${mainDish?.id}`,
                name: mainDish?.name,
            };
            if (subDishes?.length > 0) {
                flatDishItem.subIds = subDishes.map((subDish: any) => {
                    const subIdsData = new Array(subDish?.amount || 1).fill(`${subDish?.subDishId}`);
                    return subIdsData;
                });
                flatDishItem.subIds = flatDishItem.subIds.flat();
            }
            dishFormatted.push(flatDishItem);
        }
        return dishFormatted;
    });
    dishesFormatted = dishesFormatted.flat();

    const qrData: any = {
        orderDetail: dishesFormatted,
        coupons: couponsFormatted,
        isDefaultOrder: Number(orderType === OrderType.DEFAULT),
    };
    if (user) qrData.user = generateCheckInQR(user, false);

    return addQRCodeEOS(qrData, convert, includeEOS);
};

export const generateDataSaveOrderOption = (dataOrder: any, orderType = OrderType.MOBILE) => {
    const totalAmount = sumTotalAmount(dataOrder);
    const { coupons = [], dishes = [] } = dataOrder;
    const newDishes = dishes.map((dishItem: any) => {
        const mainDish = {
            id: dishItem?.mainDish?.id,
            amount: dishItem?.mainDish?.amount,
        };
        const { subDishes = [] } = dishItem || {};
        const formatSubDishes = subDishes.map((subDishItem: any) => {
            const newSubDishItem: any = {
                subDishId: subDishItem?.subDishId,
                amount: subDishItem?.amount,
            };
            if (subDishItem?.selected) {
                newSubDishItem.selected = subDishItem?.selected;
            }
            return newSubDishItem;
        });
        return { mainDish, subDishes: formatSubDishes };
    });

    const newCoupons = coupons.map((couponItem: any) => {
        const formatCouponItem: any = {
            id: couponItem?.coupon?.id,
        };
        if (couponItem?.coupon?.discountType === DiscountType.EACH_DISH) {
            formatCouponItem.dishId = couponItem?.choose?.dish?.id;
        }
        return formatCouponItem;
    });

    return {
        orderType,
        totalAmount,
        dishes: newDishes,
        coupons: newCoupons,
    };
};

export const checkUser = () => {
    const { user = {} }: any = store.getState().userInfo;
    return user?.member?.email?.includes?.('yeuquaimo@love.you');
};

export const funcFilterStatus = (data = [], key = 'status', status = MenuType.ENABLE) => {
    return data?.filter?.((item: any) => item?.[key] === status) || [];
};
