import request from 'api/request';
import { SETTING_URL } from 'api/urls';

export const contact = (params: any) => request.post(SETTING_URL.contact, params);

export const getRankList = () => request.get(SETTING_URL.rankList);
