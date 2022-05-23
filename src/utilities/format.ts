import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import i18next from 'i18next';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.locale('ja');
dayjs.extend(utc);
dayjs.extend(timezone);

export const YYYYMMDD = 'YYYY年MM月DD日';
export const MMDD = 'MM/DD';
export const YYYYMMDD_PUBLISH = 'YYYY/MM/DD';
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
