import request from 'api/request';
import { AUTH_URL } from 'api/urls';

export const getProfile = (token?: string) =>
    request.get(`profile`, token ? { headers: { Authorization: `Bearer ${token}` } } : {});
export const login = (params: any) => request.post(`auth/login`, params);
export const register = (params: any) => request.post(`auth/register`, params);
export const forgotPassword = (email: string) => request.post(`auth/forgot-password`, { email });
export const checkIsExistEmail = (params: any) => request.post(`auth/check-email`, params);
export const getVerifyCode = (params: any) => request.post(`auth/request-verified-code`, params);
export const checkVerifyCode = (params: any) => request.post(`auth/check-verified-code`, params);
export const resetPassword = (params: any) => request.post(`auth/reset-password`, params);

export const editProfile = (params: any) => request.put(AUTH_URL.editProfile, params);

export const changePass = (params: any) => request.put(AUTH_URL.changePass, params);

export const checkOldPass = (params: any) => request.post(AUTH_URL.checkOldPass, params);

export const deleteAccount = () => request.put(AUTH_URL.deleteAccount);
