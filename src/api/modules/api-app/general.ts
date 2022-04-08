import request from 'api/request';
import { COMMON_URL } from 'api/urls';
import axios from 'axios';
import { Platform } from 'react-native';

export const getResources = (): Promise<any> => request.get(COMMON_URL.resources);
export const uploadImage = (formData: any): Promise<any> => request.post(COMMON_URL.upload, formData);
export const sendTeams = (data: string, title = '') =>
    axios.post(COMMON_URL.sendTeams, {
        '@type': 'MessageCard',
        '@context': 'http://schema.org/extensions',
        themeColor: '0076D7',
        title,
        summary: 'Webhook Soba',
        sections: [
            {
                facts: [
                    {
                        name: 'Device',
                        value: Platform.OS === 'ios' ? 'ios' : 'Android',
                    },
                ],
                markdown: true,
            },
            {
                type: 'TextBlock',
                text: data,
            },
        ],
    });
