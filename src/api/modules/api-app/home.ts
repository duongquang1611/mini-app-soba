import request from 'api/request';
import { HOME_URL } from 'api/urls';

export const getNewsList = ({ params }: any) => request.get(HOME_URL.listNews, { params });
export const getNewsDetail = (id: number | string, params?: any) => request.get(HOME_URL.newsDetail(id), { params });
export const getCheckIn = () => request.get(HOME_URL.checkIn);
export const getMobileOrder = () => request.get(HOME_URL.mobile);
export const getOrderDefault = () => request.get(HOME_URL.orderDefault);
