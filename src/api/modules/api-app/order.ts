import request from 'api/request';
import { MENU_URL, ORDER_URL } from 'api/urls';
import { SIZE_LIMIT } from 'hooks/usePaging';

export const getMenu = (params = { take: SIZE_LIMIT }) => request.get(MENU_URL.menu, { params });
export const getDish = (id: number | string, params?: any) => request.get(MENU_URL.dish(id), { params });
export const getCart = () => request.get(MENU_URL.cart);

// save order mobile, order default order
export const saveOrderOption = (params: any) => request.post(ORDER_URL.saveOrder, params);
