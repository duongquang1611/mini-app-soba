import request from 'api/request';
import { COMMON_URL } from 'api/urls';

export const getResources = (): Promise<any> => request.get(COMMON_URL.resources);
export const uploadImage = (formData: any): Promise<any> => request.post(COMMON_URL.upload, formData);
