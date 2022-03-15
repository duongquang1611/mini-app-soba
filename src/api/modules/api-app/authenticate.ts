import request from 'api/request';

export const getProfile = (token?: string) =>
    request.get(`profile`, token ? { headers: { Authorization: `Bearer ${token}` } } : {});
export const login = (params: any) => request.post(`auth/login`, params);
export const register = (params: any) => request.post(`auth/register`, params);
export const forgotPassword = (email: string) => request.post(`auth/forgot-password`, { email });
export const checkIsExistEmail = (params: any) => request.post(`auth/check-email`, params);
export const getVerifyCode = (params: any) => request.post(`auth/request-verified-code`, params);
export const checkVerifyCode = (email: string, verifiedCode: string) =>
    request.post(`auth/check-verified-code`, { email, verifiedCode });
export const resetPassword = (email: string, newPassword: string) =>
    request.post(`auth/reset-password`, { email, newPassword });
