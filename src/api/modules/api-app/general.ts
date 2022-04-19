import request from 'api/request';
import { COMMON_URL } from 'api/urls';
import { store } from 'app-redux/store';
import axios from 'axios';
import { Platform } from 'react-native';

export const getResources = (): Promise<any> => request.get(COMMON_URL.resources);
export const uploadImage = (formData: any): Promise<any> => request.post(COMMON_URL.upload, formData);
export const sendTeams = (data: string, title = '') => {
    const { userInfo = {} }: any = store.getState();
    const { user = {} } = userInfo;
    try {
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
                        {
                            name: 'Email',
                            value: user?.member?.email,
                        },
                        {
                            name: 'UserId',
                            value: user?.member?.id,
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
    } catch (error) {
        console.log('sendTeams -> error', error);
    }
};
