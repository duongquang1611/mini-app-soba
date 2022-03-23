import request from 'api/request';
import { COUPON_URL } from 'api/urls';

export const getCouponList = ({ params }: any) => request.get(COUPON_URL.list, { params });
export const getCouponDetail = (id: number | string) => request.get(COUPON_URL.coupon(id));
export const getDetailMemberCoupon = (id: number | string) => request.get(COUPON_URL.memberCoupon(id));
export const couponUse = (couponId: number, orderType: number) => request.post(`use-coupon`, { couponId, orderType });
