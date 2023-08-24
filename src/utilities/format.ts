import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import i18next from 'i18next';
import { CheckCouponDishSpecify, SpecifyRestaurantsType, TypeDiscountCoupon } from './enumData';
import { DiscountType } from './staticData';

dayjs.locale('ja');
dayjs.extend(utc);
dayjs.extend(timezone);

export const YYYYMMDD = 'YYYY年MM月DD日';
export const MMDD = 'MM/DD';
export const YYYYMMDD_PUBLISH = 'YYYY/MM/DD';
export const YYYYMMDD_NORMAL = 'YYYY-MM-DD';
export const YMDHms = 'YYYY/MM/DD HH:mm:ss';
export const YMDHm = 'YYYY年MM月DD日　HH時mm分';

export const changeLocale = (locale: string): void => {
    dayjs.locale(locale);
};
export const toLocalStringTime = (date: Date): string => {
    return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
};
export const toLocalStringBirthday = (date: Date): string => {
    return dayjs(date).format('YYYY-MM-DD');
};

export const requireField = (field: string) => {
    return i18next.t('error.require', { field }) || '';
};

export const formatDate = (date: Date | string | number, defaultFormat = YYYYMMDD) => {
    if (!date) return '';
    return `${dayjs(date).format(defaultFormat)}`;
};
export const formatDateJapan = (date: Date | string | number, defaultFormat = YYYYMMDD) => {
    if (!date) return '';
    return `${dayjs(date).tz('Asia/Tokyo').format(defaultFormat)}`;
};

export const getCouponDishSpecify = (couponDishes: any) => {
    if (!couponDishes?.find((itemDish: any) => itemDish.isSpecifyRestaurants === SpecifyRestaurantsType.NO))
        return CheckCouponDishSpecify.FULL_1;
    if (!couponDishes?.find((itemDish: any) => itemDish.isSpecifyRestaurants === SpecifyRestaurantsType.YES))
        return CheckCouponDishSpecify.FULL_0;
    return CheckCouponDishSpecify.ALL;
};

export const formatRestaurantsCouponShow = (
    restaurants: any,
    isDiscountAllRestaurants: number,
    discountType: number,
    couponDishes: any,
) => {
    if (isDiscountAllRestaurants === TypeDiscountCoupon.ALL_RESTAURANT) return i18next.t('coupon.allRestaurant');
    if (discountType === DiscountType.EACH_DISH && getCouponDishSpecify(couponDishes) !== CheckCouponDishSpecify.FULL_1)
        return i18next.t('coupon.allStore');
    if (restaurants?.length) {
        const restaurantsShow = restaurants.map((item: any) => item.name).join(i18next.t('common.comma'));
        return restaurantsShow;
    }
    return i18next.t('coupon.noRestaurant');
};

export const formatCouponStringId = (stringId: string, exchangeTime?: number) => {
    if (!exchangeTime) return stringId;
    if (exchangeTime < 10) return `${stringId}_0${exchangeTime}`;
    return `${stringId}_${exchangeTime}`;
};

export const formatRestaurantsDishesShow = (restaurants: any, discountType: number, isSpecifyRestaurants: number) => {
    if (discountType === DiscountType.ALL_ORDER || !discountType) return '';
    if (isSpecifyRestaurants === SpecifyRestaurantsType.NO) return `(${i18next.t('coupon.allStore')})`;
    if (restaurants?.length) {
        const restaurantsShow = restaurants
            .map((item: any) => `${item.name}${i18next.t('coupon.itemDishesRestaurantShow')}`)
            .join(i18next.t('common.comma'));
        return `(${restaurantsShow})`;
    }
    return `(${i18next.t('coupon.noRestaurant')})`;
};
