import request from 'api/request';
import { STAMP_URL } from 'api/urls';

export const getStampList = ({ params }: any) => request.post(STAMP_URL.list, { params });
export const getDetailStamp = (id: number | string, params?: any) => request.get(STAMP_URL.detail(id), { params });
export const postExchangeCoupon = (params: any) => request.post(STAMP_URL.exchangeCoupon, params);
export const getExchangeCouponHistory = ({ params }: any) => request.get(STAMP_URL.exchangeCouponHistory, { params });
