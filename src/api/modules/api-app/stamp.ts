import request from 'api/request';
import { STAMP_URL } from 'api/urls';

export const getStampList = ({ params }: any) => request.get(STAMP_URL.list, { params });
export const getDetailMemberStamp = (id: number | string, params?: any) =>
    request.get(STAMP_URL.detailMemberStamp(id), { params });
export const postExchangeCoupon = (params: any) => request.post(STAMP_URL.exchangeCoupon, params);
export const getExchangeCouponHistory = ({ params }: any) => request.get(STAMP_URL.exchangeCouponHistory, { params });
