import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import i18next from 'i18next';
import { TypeDiscountCoupon } from './enumData';
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
export const formatRestaurantsCouponShow = (
    restaurants: any,
    isDiscountAllRestaurants: number,
    detailScreen?: boolean,
) => {
    if (isDiscountAllRestaurants === TypeDiscountCoupon.ALL_RESTAURANT)
        return detailScreen ? i18next.t('coupon.allRestaurant') : `[${i18next.t('coupon.allRestaurant')}]`;
    if (restaurants?.length) {
        const restaurantsShow = restaurants
            .map((item: any) => `${item.name}${i18next.t('coupon.itemRestaurantShow')}`)
            .join(i18next.t('common.comma'));
        return detailScreen ? restaurantsShow : `[${restaurantsShow}]`;
    }
    return detailScreen ? i18next.t('coupon.noRestaurant') : '';
};

export const formatCouponStringId = (stringId: string, exchangeTime?: number) => {
    if (!exchangeTime) return stringId;
    if (exchangeTime < 10) return `${stringId}_0${exchangeTime}`;
    return `${stringId}_${exchangeTime}`;
};

export const formatRestaurantsDishesShow = (restaurants: any, discountType: number) => {
    if (discountType === DiscountType.ALL_ORDER || !discountType) return '';
    if (restaurants?.length) {
        const restaurantsShow = restaurants
            .map((item: any) => `${item.name}${i18next.t('coupon.itemDishesRestaurantShow')}`)
            .join(i18next.t('common.comma'));
        return `(${restaurantsShow})`;
    }
    return `(${i18next.t('coupon.noRestaurant')})`;
};
