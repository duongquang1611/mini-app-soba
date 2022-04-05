import request from 'api/request';
import { COMMON_URL } from 'api/urls';
import axios from 'axios';

export const getResources = (): Promise<any> => request.get(COMMON_URL.resources);
export const uploadImage = (formData: any): Promise<any> => request.post(COMMON_URL.upload, formData);
export const sendTeams = (data: string) =>
    axios.post(COMMON_URL.sendTeams, {
        type: 'TextBlock',
        text: data,
    });
