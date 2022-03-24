import request from 'api/request';
import { MENU_URL } from 'api/urls';
import { SIZE_LIMIT } from 'hooks/usePaging';

export const getMenu = (params = { take: SIZE_LIMIT }) => request.get(MENU_URL.menu, { params });
export const getDish = (id: number | string, params?: any) => request.get(MENU_URL.dish(id), { params });
export const getCart = () => request.get(MENU_URL.cart);
