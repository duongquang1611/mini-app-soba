import { login } from 'api/modules/api-app/authenticate';
import { getOrder } from 'api/modules/api-app/order';
import request from 'api/request';
import { clearCoupon } from 'app-redux/slices/couponSlice';
import { clearGlobalData, updateGlobalData } from 'app-redux/slices/globalDataSlice';
import { clearOrder } from 'app-redux/slices/orderSlice';
import { userInfoActions } from 'app-redux/slices/userInfoSlice';
import { store } from 'app-redux/store';
import { AxiosRequestConfig } from 'axios';
import AlertMessage from 'components/base/AlertMessage';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateOrderStore } from 'utilities/helper';
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
const getOrderData = async () => {
    // const getOrderDefaultSetting = await getOrder(OrderType.DEFAULT_SETTING);
    // const getOrderMobile = await getOrder(OrderType.MOBILE);
    // const getOrderDefaultHome = await getOrder(OrderType.DEFAULT_HOME);
    const res = await Promise.all([
        getOrder(OrderType.DEFAULT_SETTING),
        getOrder(OrderType.MOBILE),
        // getOrder(OrderType.DEFAULT_HOME)
    ]);
    console.log('🚀 ~ file: AuthenticateService.ts ~ line 59 ~ getOrderData ~ res', res?.[0]?.data);
    updateOrderStore(res);
    // console.log({
    //     getOrderDefaultSetting: getOrderDefaultSetting.data,
    //     getOrderMobile: getOrderMobile.data,
    //     getOrderDefaultHome: getOrderDefaultHome.data,
    // });
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
            getOrderData();
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
