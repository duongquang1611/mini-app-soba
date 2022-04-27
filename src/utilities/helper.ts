/* eslint-disable @typescript-eslint/no-unused-vars */
import AsyncStorage from '@react-native-community/async-storage';
import { sendTeams } from 'api/modules/api-app/general';
import { store } from 'app-redux/store';
import Images from 'assets/images';
import AlertMessage from 'components/base/AlertMessage';
import i18next from 'i18next';
import { cloneDeep, isEqual, throttle } from 'lodash';
import { DevSettings, Linking, Platform } from 'react-native';
import codePush from 'react-native-code-push';
import Config from 'react-native-config';
import Picker from 'react-native-picker';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { CheckPasswordType, CouponDishType, CouponType } from './enumData';
import { formatDate, YYYYMMDD_PUBLISH } from './format';
import { DiscountType, Gender, MenuType, OrderType, OrderTypeMenu, POPUP_TYPE, staticValue } from './staticData';

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

export const checkExpired = (endDate: any, compareDate = new Date()) => {
    if (!endDate) return false;
    const endDateFormat = new Date(endDate);
    return compareDate >= endDateFormat;
};

export const sumAmount = (item: any) => {
    let resultAmount = 0;
    const { mainDish, subDishes } = item;
    subDishes?.forEach(async (rating: any) => {
        resultAmount += rating?.amount;
    });
    return (resultAmount + 1) * mainDish.amount;
};

export const checkPasswordMatch = ({
    password,
    confirmPassword,
    oldPassword,
    type = CheckPasswordType.CHECK_CONFIRM_PASS,
}: any) => {
    if (type === CheckPasswordType.CHECK_CONFIRM_PASS) {
        if (confirmPassword && password && password !== confirmPassword) {
            return 'error.passwordNotMatch';
        }
        return '';
    }
    if (oldPassword && password && password === oldPassword) {
        return 'error.newPassMatchOldPass';
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
                    stringId: itemSub?.dish?.stringId,
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

// foodId: is "stringId"
export const generateCouponQR = (memberCoupon: any, user?: any, convert?: boolean, includeEOS?: boolean) => {
    const { coupon, choose } = memberCoupon;
    const isFullOrder = Number(coupon?.discountType === DiscountType.ALL_ORDER);
    const isFree = Number(isFullOrder ? !coupon?.discount : choose?.type === CouponDishType.FREE);
    const price = (isFullOrder ? coupon?.discount : choose?.discount) || 0;
    const isAccounted = Number(coupon?.type === CouponType.COMPANY);

    const qrData: any = {
        coupon: {
            id: coupon?.stringId,
            isFullOrder,
            isFree,
            price,
            isAccounted,
            publishDatetime: memberCoupon?.receivedDate,
        },
    };

    if (!isFullOrder) {
        qrData.coupon.foodId = `${choose?.dish?.stringId}`;
    }
    if (user) qrData.user = generateCheckInQR(user, false);

    return addQRCodeEOS(qrData, convert, includeEOS);
};

// id send is "stringId"
export const generateOrderQR = (
    dataOrder: any,
    user: any,
    orderType = OrderType.MOBILE,
    convert?: boolean,
    includeEOS?: boolean,
) => {
    const { coupons = [], dishes = [] } = dataOrder || {};
    if (!coupons?.length && !dishes?.length) return '';
    const couponsFormatted = coupons.map((couponItem: any) => {
        return generateCouponQR(couponItem, undefined, false)?.coupon;
    });
    let dishesFormatted = dishes.map((dishItem: any) => {
        const { mainDish, subDishes } = dishItem;
        const dishFormatted = [];
        for (let i = 0; i < (mainDish?.amount || 1); i++) {
            const flatDishItem: any = {
                id: `${mainDish?.stringId}`,
                name: mainDish?.name,
            };
            const subDishesData: any[] = [];
            if (subDishes?.length > 0) {
                flatDishItem.subIds = subDishes.map((subDish: any) => {
                    const subIdsData = new Array(subDish?.amount || 1).fill(`${subDish?.stringId}`);
                    const subDishData = new Array(subDish?.amount || 1).fill({
                        id: `${subDish?.stringId}`,
                        name: subDish?.title,
                    });
                    subDishesData.push(...subDishData);
                    return subIdsData;
                });
                flatDishItem.subIds = flatDishItem.subIds.flat();
            }
            dishFormatted.push(flatDishItem, ...subDishesData);
        }
        return dishFormatted;
    });
    dishesFormatted = dishesFormatted.flat();

    const qrData: any = {
        orderDetail: dishesFormatted,
        coupons: couponsFormatted,
        isDefaultOrder: Number(orderType === OrderType.DEFAULT_SETTING || orderType === OrderType.DEFAULT_HOME),
    };
    if (user) qrData.user = generateCheckInQR(user, false);

    return addQRCodeEOS(qrData, convert, includeEOS);
};

// id dish send is: "id"
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
            receivedDate: couponItem?.receivedDate,
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

export const filterResources = (data: any) => {
    const newResources = { ...data };

    // filter status enable in menu and categories
    newResources.categories = funcFilterStatus(newResources.categories);
    newResources.menu = funcFilterStatus(newResources.menu);

    // filter dish in menu
    if (newResources?.menu?.length > 0) {
        for (let i = 0; i < newResources.menu.length; i++) {
            newResources.menu[i] = filterDishOptions(newResources.menu[i]);
        }
    }
    return newResources;
};

export const filterDishOptions = (dish: any) => {
    const newDish = { ...dish };
    for (let j = 0; j < newDish?.dishOptions?.length; j++) {
        // remove dish null in subDish and dish status 0
        newDish.dishOptions[j].subDish = newDish?.dishOptions?.[j]?.subDish?.filter(
            (item: any) => item.dish && item?.status,
        );
    }
    newDish.dishOptions = newDish?.dishOptions?.filter((item: any) => {
        // remove dishOption status 0 and dont have subDish
        return item?.status !== MenuType.DISABLE && item?.subDish?.length;
    });
    return newDish;
};

export const checkHasDataOrder = (order: any) => {
    return order?.dishes?.length + order?.coupons?.length > 0;
};
export const checkSameData = (order: any, orderLocal: any) => {
    return isEqual(order, orderLocal);
};

// mainDish, subDish id is "stringId"
export const generateNewOrder = (
    dataOrder: any,
    user: any,
    orderType = OrderType.MOBILE,
    convert?: boolean,
    includeEOS = false,
) => {
    const { coupons = [], dishes = [] } = dataOrder || {};
    if (!coupons?.length && !dishes?.length) return '';
    const couponsFormatted = coupons.map((couponItem: any) => {
        return generateCouponQR(couponItem, undefined, false)?.coupon;
    });
    let dishesFormatted = dishes.map((dishItem: any) => {
        const { mainDish, subDishes } = dishItem;
        const dishFormatted = [];
        for (let i = 0; i < (mainDish?.amount || 1); i++) {
            const flatDishItem: any = {
                id: `${mainDish?.stringId}`,
                name: mainDish?.name,
                price: 100,
            };
            const subDishesData: any[] = [];
            if (subDishes?.length > 0) {
                flatDishItem.subIds = subDishes.map((subDish: any) => {
                    const subIdsData = new Array(subDish?.amount || 1).fill(`${subDish?.stringId}`);
                    const subDishData = new Array(subDish?.amount || 1).fill({
                        id: `${subDish?.stringId}`,
                        name: subDish?.title,
                        price: 100,
                    });
                    subDishesData.push(...subDishData);
                    return subIdsData;
                });
                flatDishItem.subIds = flatDishItem.subIds.flat();
            }
            dishFormatted.push(flatDishItem, ...subDishesData);
        }
        return dishFormatted;
    });
    dishesFormatted = dishesFormatted.flat();

    // calc sum price in dishesFormatted
    const totalPrice = dishesFormatted.reduce((sum: number, dish: any) => {
        return sum + (dish?.price || 0);
    }, 0);

    const totalDiscount = 100;

    const qrData: any = {
        userId: user?.member?.id,
        isDefaultOrder: Number(orderType === OrderType.DEFAULT_SETTING || orderType === OrderType.DEFAULT_HOME),
        datetime: formatDate(new Date(), YYYYMMDD_PUBLISH),
        orderId: makeId(),
        orderDetail: dishesFormatted,
        coupons: couponsFormatted,
        totalPrice,
        totalDiscount,
        totalPaid: totalPrice - totalDiscount,
    };

    return addQRCodeEOS(qrData, convert, includeEOS);
};

export const makeId = (length = 12) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

export const showActionQR = (qrCode: any, newOrder: any, titleCancel = 'New Order', titleOk = 'QR Code') => {
    try {
        AlertMessage('Send To Teams', {
            textButtonCancel: titleCancel,
            textButtonOk: titleOk,
            onCancel: () => {
                if (titleCancel === 'New Order') {
                    let newOrderFormat = JSON.parse(newOrder);
                    newOrderFormat.orderId = makeId();
                    newOrderFormat = addQRCodeEOS(newOrderFormat, true, false);
                    sendTeams(`${newOrderFormat}`, titleCancel);
                } else {
                    sendTeams(`${newOrder}`, titleCancel);
                }
            },
            onOk: () => {
                sendTeams(`${qrCode}`, titleOk);
            },
            type: POPUP_TYPE.CONFIRM,
        });
    } catch (error) {
        console.log('showActionQR -> error', error);
    }
};

export const titleOrder = (orderType: any, defaultTitle: string) => {
    if (orderType === OrderTypeMenu.DEFAULT_ORDER || orderType === OrderType.DEFAULT_HOME) {
        return 'setting.orderDefaultTitle';
    }
    return defaultTitle;
};

const getTotalAmount = (itemDish: any) => {
    const { orderSubDish = [], amount } = itemDish || {};
    let sum = 0;
    orderSubDish.forEach(async (item: any) => {
        sum += item?.amount || 1;
    });
    return sum * amount + amount;
};
export const changeOrderApiToStore = (orderData: any) => {
    const { coupons, orderDish } = orderData;
    const newCoupons =
        coupons?.map((itemCoupon: any) => {
            const { coupon, dish } = itemCoupon;
            const choose = coupon?.couponDish?.find((itemDish: any) => itemDish?.dish?.stringId === dish?.stringId);
            const couponFormat = {
                id: coupon?.id,
                stringId: coupon?.stringId,
                title: coupon?.title,
                type: coupon?.type,
                discountType: coupon?.discountType,
                discount: coupon?.discount,
                couponDish: coupon?.couponDish,
            };
            return {
                id: itemCoupon?.memberCoupon?.id,
                type: itemCoupon?.type,
                receivedDate: itemCoupon?.memberCoupon?.receivedDate,
                coupon: couponFormat,
                choose,
            };
        }) || [];
    const newDishes =
        orderDish?.map((itemDish: any) => ({
            createDate: itemDish?.createdDate,
            totalAmount: getTotalAmount(itemDish),
            mainDish: {
                name: itemDish?.dish?.title,
                id: itemDish?.dish?.id,
                stringId: itemDish?.dish?.stringId,
                image: itemDish?.dish?.thumbnail,
                amount: itemDish?.amount,
            },
            subDishes: itemDish?.orderSubDish?.map((itemSubDish: any) => ({
                title: itemSubDish?.subDish?.dish?.title,
                selected: itemSubDish?.selected,
                amount: itemSubDish?.amount,
                dishOption: { dishOptionsId: itemSubDish?.subDish?.dishOptionId },
                subDishId: itemSubDish?.subDish?.id,
                stringId: itemSubDish?.subDish?.dish?.stringId,
            })),
        })) || [];
    const newOrder = { dishes: newDishes, coupons: newCoupons };
    return newOrder;
};

export const filterOrderStore = ({ menu, categories, order }: any) => {
    const { dishes = [] } = order || {};
    const newDishes = cloneDeep(dishes);
    if (newDishes?.length > 0) {
        // check mainDish id and check exist category of this menu item
        const newDishesFilterCategory = newDishes.filter((itemDish: any) => {
            const menuItem = menu?.find((itemMenu: any) => itemMenu.id === itemDish?.mainDish?.id);
            if (!menuItem) return false;
            const categoryItem = categories?.find(
                (itemCategory: any) => itemCategory?.id === menuItem?.category?.[0]?.categoryId,
            );
            if (!categoryItem) return false;

            // check subCategory
            // some categoryItem dont have subCategories => dont check
            if (categoryItem?.subCategories?.length <= 0) {
                return true;
            }
            const subCategoryItem = categoryItem?.subCategories?.find(
                (item: any) => item?.id === menuItem?.subCategory?.[0]?.subCategoryId,
            );
            return Boolean(subCategoryItem);
        });
        const newDishFilterSubDishes = newDishesFilterCategory.map((itemDish: any) => {
            const menuItem = menu.find((itemMenu: any) => itemMenu.id === itemDish?.mainDish?.id);
            const newSubDishes = itemDish?.subDishes?.filter((itemSubDish: any) => {
                const dishOptionItem = menuItem?.dishOptions?.find(
                    (itemDishOption: any) => itemDishOption?.id === itemSubDish?.dishOption?.dishOptionsId,
                );
                if (!dishOptionItem) return false;
                const subDishItem = dishOptionItem?.subDish?.find((itemSubDishOfDishOption: any) => {
                    return itemSubDishOfDishOption?.dish?.stringId === itemSubDish?.stringId;
                });
                return Boolean(subDishItem);
            });
            return { ...itemDish, subDishes: newSubDishes };
        });
        // console.log({ menu, categories, newDishes });

        // calculate totalAmount after filter
        newDishFilterSubDishes?.forEach((dishItem: any, index: number) => {
            let totalAmount = 0;
            let totalAmountSubDishes = 0;
            totalAmountSubDishes = dishItem?.subDishes?.reduce((sum: any, item: any) => {
                return (item?.selected || 0) * (item?.amount || 0) + sum;
            }, 0);
            totalAmount = (totalAmountSubDishes + 1) * dishItem?.mainDish?.amount || 0;
            newDishFilterSubDishes[index].totalAmount = totalAmount;
        });

        newDishFilterSubDishes?.forEach((itemDish: any, indexDish: number) => {
            // update info mainDish and subDish by menu
            const menuItem = menu.find((itemMenu: any) => itemMenu.id === itemDish?.mainDish?.id);
            newDishFilterSubDishes[indexDish].mainDish = {
                ...newDishFilterSubDishes[indexDish].mainDish,
                image: menuItem?.thumbnail,
                name: menuItem?.title,
            };
            itemDish?.subDishes?.forEach((itemSubDish: any, indexSubDish: number) => {
                const dishOptionItem = menuItem?.dishOptions?.find(
                    (itemDishOption: any) => itemDishOption?.id === itemSubDish?.dishOption?.dishOptionsId,
                );
                const subDishItem = dishOptionItem?.subDish?.find((itemSubDishOfDishOption: any) => {
                    return itemSubDishOfDishOption?.dish?.stringId === itemSubDish?.stringId;
                });
                newDishFilterSubDishes[indexDish].subDishes[indexSubDish] = {
                    ...newDishFilterSubDishes[indexDish].subDishes[indexSubDish],
                    title: subDishItem?.dish?.title,
                };
            });
        });

        return newDishFilterSubDishes;
    }
    return [];
};
export const getInformationSetting = (data: any) => {
    const { email, fullName, birthday, gender } = data;
    return [
        { title: 'common.email', icon: Images.icons.email, value: email },
        { title: 'common.name', icon: Images.icons.userName, value: fullName },
        { title: 'common.birthday', icon: Images.icons.birthday, value: formatDate(birthday) },
        {
            title: 'common.gender',
            icon: Images.icons.gender,
            value: gender === Gender.MALE ? 'authen.register.male' : 'authen.register.female',
        },
    ];
};
export const getIndexTab = (defaultOrder: any, mobileOrder: any) => {
    if (mobileOrder?.dishes?.length > 0 || mobileOrder?.coupon?.length > 0) return 1;
    if (defaultOrder?.dishes?.length > 0 || defaultOrder?.coupon?.length > 0) return 0;
    return 2;
};
export function numberWithCommas(x: number) {
    return (x || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export const getStringCoupon = (coupons: any) => {
    let result = '';
    coupons?.forEach((item: any) => {
        result += `, ${item?.title || ''}`;
    });
    return result.slice(1, result.length);
};
export const formatUTC = (dateInt: any) => {
    const date = new Date(dateInt);
    const offset = -date.getTimezoneOffset();
    date.setHours(Math.floor(offset / 60));
    date.setMinutes(offset % 60);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date.toISOString();
};
