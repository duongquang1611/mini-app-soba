import request from 'api/request';
import { STAMP_URL } from 'api/urls';

export const getStampList = ({ params }: any) => request.get(STAMP_URL.list, { params });
export const getDetailMemberStamp = (id: number | string, params?: any) =>
    request.get(STAMP_URL.detailMemberStamp(id), { params });
export const postExchangeCoupon = ({ stampId, couponId }: any) =>
    request.post(STAMP_URL.exchangeCoupon(stampId, couponId));

// stamp.id
export const getExchangeCouponHistory = (stampId: number | string) =>
    request.get(STAMP_URL.exchangeCouponHistory(stampId));

// tick stamp: "stampId", "createdDate" of bill, "stringBillId"
export const tickStamp = (params: any) => request.post(STAMP_URL.tickStamp, params);
