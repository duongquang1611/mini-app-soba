/* eslint-disable @typescript-eslint/no-unused-vars */
import { getProfile, login } from 'api/modules/api-app/authenticate';
import { checkAvailableCouponsApi, getOrder } from 'api/modules/api-app/order';
import request from 'api/request';
import { clearCoupon } from 'app-redux/slices/couponSlice';
import { clearGlobalData, updateGlobalData } from 'app-redux/slices/globalDataSlice';
import { clearOrder, updateAllOrder } from 'app-redux/slices/orderSlice';
import { userInfoActions } from 'app-redux/slices/userInfoSlice';
import { store } from 'app-redux/store';
import { AxiosRequestConfig } from 'axios';
import AlertMessage from 'components/base/AlertMessage';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
    changeOrderApiToStore,
    filterOrderStore,
    generateDataCheckAvailableCoupons,
    removeCouponsOrder,
} from 'utilities/helper';
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
    handlerLogin: async (tokenData: Record<string, string>) => {
        store.dispatch(userInfoActions.updateToken(tokenData));
    },
};
const getOrderData = async (token: any, userId: number | string) => {
    const res = await Promise.all([
        getOrder(OrderType.DEFAULT_SETTING, token),
        getOrder(OrderType.MOBILE, token),
        getOrder(OrderType.DEFAULT_HOME, token),
    ]);

    // update order into redux
    const {
        resource: { data: dataResource },
    } = store.getState();
    const { menu = [], categories = [] } = dataResource || {};

    const dataDefaultSetting = changeOrderApiToStore(res?.[0]?.data || {});
    const dataMobile = changeOrderApiToStore(res?.[1]?.data || {});
    const dataDefaultHome = changeOrderApiToStore(res?.[2]?.data || {});

    const resCoupons = await Promise.all([
        checkAvailableCouponsApi({ userId, coupons: generateDataCheckAvailableCoupons(res?.[0]?.data?.coupons || []) }),
        checkAvailableCouponsApi({ userId, coupons: generateDataCheckAvailableCoupons(res?.[1]?.data?.coupons || []) }),
        checkAvailableCouponsApi({ userId, coupons: generateDataCheckAvailableCoupons(res?.[2]?.data?.coupons || []) }),
    ]);
    store.dispatch(
        updateAllOrder({
            defaultOrder: {
                dishes: filterOrderStore({ menu, categories, order: dataDefaultSetting }),
                coupons: removeCouponsOrder(dataDefaultSetting.coupons, resCoupons?.[0]?.data?.coupons),
            },
            cartOrder: { dishes: [], coupons: [] },
            mobileOrder: {
                dishes: filterOrderStore({ menu, categories, order: dataMobile }),
                coupons: removeCouponsOrder(dataMobile.coupons, resCoupons?.[1]?.data?.coupons),
            },
            defaultOrderLocal: {
                dishes: filterOrderStore({ menu, categories, order: dataDefaultHome }),
                coupons: removeCouponsOrder(dataDefaultHome.coupons, resCoupons?.[2]?.data?.coupons),
            },
        }),
    );
};

export const useLogin = (): LoginRequest => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const requestLogin = async (options: LoginRequestParams) => {
        try {
            setLoading(true);
            const response = await login(options);
            dispatch(updateGlobalData({ skipOrderDefault: true }));
            const resProfile = await getProfile(response?.data?.token);
            dispatch(userInfoActions.getUserInfoSuccess(resProfile?.data));
            await getOrderData(response?.data?.token, resProfile?.data?.member?.id);
            setLoading(false);
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
