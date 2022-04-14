import request from 'api/request';
import { NOTIFICATION_URL } from 'api/urls';

export const getNotificationList = () => request.get(NOTIFICATION_URL.list);
export const getNotificationCoupon = (id: number | string, params?: any) =>
    request.get(NOTIFICATION_URL.coupon(id), { params });
export const readNotification = (id: number | string) => request.put(NOTIFICATION_URL.read(id));
export const readAllNotification = () => request.put(NOTIFICATION_URL.readAll);
