import { login } from 'api/modules/api-app/authenticate';
import request from 'api/request';
import { clearGlobalData } from 'app-redux/slices/globalDataSlice';
import { userInfoActions } from 'app-redux/slices/userInfoSlice';
import { store } from 'app-redux/store';
import { AxiosRequestConfig } from 'axios';
import AlertMessage from 'components/base/AlertMessage';
import { useState } from 'react';
import { deleteTagOneSignal, pushTagMember } from 'utilities/notification';

const AUTH_URL_REFRESH_TOKEN = '/refreshToken';
export interface LoginRequestParams extends AxiosRequestConfig {
    email: string;
    password: string;
}

interface LoginRequest {
    loading: boolean;
    requestLogin: (values: any) => Promise<void>;
}

export const isLogin = () => {
    const { userInfo } = store.getState();
    return !!userInfo?.token;
};

const AuthenticateService = {
    refreshToken: (inputRefreshToken: string) =>
        request.post(AUTH_URL_REFRESH_TOKEN, {
            refresh_token: inputRefreshToken,
        }),
    logOut: () => {
        store.dispatch(userInfoActions.logOut());
        store.dispatch(clearGlobalData());
        deleteTagOneSignal();
    },
    handlerLogin: (token: Record<string, string>) => {
        const { userInfo } = store.getState();
        store.dispatch(userInfoActions.updateToken(token));
        pushTagMember(userInfo.user?.id as number);
    },
};

export const useLogin = (): LoginRequest => {
    const [loading, setLoading] = useState(false);
    const requestLogin = async (options: LoginRequestParams) => {
        try {
            setLoading(true);
            const response = await login(options);
            setLoading(false);
            store.dispatch(userInfoActions.getUserInfoRequest(response?.data?.token));
            AuthenticateService.handlerLogin({ ...response.data });
        } catch (e) {
            setLoading(false);
            console.log('file: AuthenticateService.ts -> line 52 -> requestLogin -> e', e);
            AlertMessage(`${e}`);
        }
    };

    return {
        loading,
        requestLogin,
    };
};

export default AuthenticateService;
