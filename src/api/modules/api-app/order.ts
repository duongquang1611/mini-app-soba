import request from 'api/request';
import { MENU_URL } from 'api/urls';

export const getMenu = () => request.get(MENU_URL.menu);
export const getDish = (id: number | string, params?: any) => request.get(MENU_URL.dish(id), { params });
export const getCart = () => request.get(MENU_URL.cart);
