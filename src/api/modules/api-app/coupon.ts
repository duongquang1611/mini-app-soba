import request from 'api/request';
import { COUPON_URL } from 'api/urls';

export const getCouponList = ({ params }: any) => request.get(COUPON_URL.list, { params });
export const getCouponDetail = (id: number | string, params?: any) => request.get(COUPON_URL.coupon(id), { params });
export const couponUse = (couponId: number, orderType: number) => request.post(`use-coupon`, { couponId, orderType });
