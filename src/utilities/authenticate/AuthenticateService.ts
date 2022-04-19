import { login } from 'api/modules/api-app/authenticate';
import { getOrder } from 'api/modules/api-app/order';
import request from 'api/request';
import { clearCoupon } from 'app-redux/slices/couponSlice';
import { clearGlobalData, updateGlobalData } from 'app-redux/slices/globalDataSlice';
import {
    clearOrder,
    updateDefaultOrder,
    updateDefaultOrderLocal,
    updateMobileOrder,
} from 'app-redux/slices/orderSlice';
import { userInfoActions } from 'app-redux/slices/userInfoSlice';
import { store } from 'app-redux/store';
import { AxiosRequestConfig } from 'axios';
import AlertMessage from 'components/base/AlertMessage';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeOrderApiToStore } from 'utilities/helper';
import { deleteTagOneSignal } from 'utilities/notification';
import { OrderType } from 'utilities/staticData';

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
        store.dispatch(clearGlobalData());
        store.dispatch(clearCoupon());
        store.dispatch(clearOrder());
        store.dispatch(userInfoActions.logOut());
        deleteTagOneSignal();
    },
    handlerLogin: async (token: Record<string, string>) => {
        store.dispatch(userInfoActions.updateToken(token));
    },
};
const getOrderData = async (token: any) => {
    const res = await Promise.all([
        getOrder(OrderType.DEFAULT_SETTING, token),
        getOrder(OrderType.MOBILE, token),
        getOrder(OrderType.DEFAULT_HOME, token),
    ]);
    console.log('🚀 ~ file: AuthenticateService.ts ~ line 59 ~ getOrderData ~ res', res?.[0]?.data);
    updateOrderStore(res);
};
const updateOrderStore = (res: any) => {
    const dataDefaultSetting = res?.[0]?.data || {};
    const dataMobile = res?.[1]?.data || {};
    const dataDefaultHome = res?.[2]?.data || {};
    store.dispatch(updateDefaultOrder(changeOrderApiToStore(dataDefaultSetting)));
    store.dispatch(updateMobileOrder(changeOrderApiToStore(dataMobile)));
    store.dispatch(updateDefaultOrderLocal(changeOrderApiToStore(dataDefaultHome)));
};
export const useLogin = (): LoginRequest => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const requestLogin = async (options: LoginRequestParams) => {
        try {
            setLoading(true);
            const response = await login(options);
            setLoading(false);

            dispatch(updateGlobalData({ skipOrderDefault: true }));
            dispatch(userInfoActions.getUserInfoRequest(response?.data?.token));
            AuthenticateService.handlerLogin({ ...response.data });
            getOrderData(response?.data?.token);
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
