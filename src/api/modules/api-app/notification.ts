import request from 'api/request';
import { NOTIFICATION_URL } from 'api/urls';

export const getNotificationList = () => request.get(NOTIFICATION_URL.list);
export const getNotificationCoupon = (id: number | string, params?: any) =>
    request.get(NOTIFICATION_URL.coupon(id), { params });
