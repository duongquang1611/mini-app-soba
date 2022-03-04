import request from 'api/request';
import { NOTIFICATION_URL } from 'api/urls';

export const getNotificationList = ({ params }: any) => request.get(NOTIFICATION_URL.list, { params });
export const getNotificationCoupon = (id: number | string, params?: any) =>
    request.get(NOTIFICATION_URL.coupon(id), { params });
