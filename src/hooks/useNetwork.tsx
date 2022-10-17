/* eslint-disable @typescript-eslint/no-unused-vars */
import NetInfo from '@react-native-community/netinfo';
import { getProfile } from 'api/modules/api-app/authenticate';
import { getResources } from 'api/modules/api-app/general';
import { checkAvailableCouponsApi, saveOrderOption } from 'api/modules/api-app/order';
import { updateAllOrder, updateDishesAllOrder } from 'app-redux/slices/orderSlice';
import { resourceActions } from 'app-redux/slices/resourceSlice';
import { userInfoActions } from 'app-redux/slices/userInfoSlice';
import { store } from 'app-redux/store';
import { getCouponData } from 'feature/home/HomeScreen';
import { useEffect, useRef } from 'react';
import {
    filterOrderStore,
    filterResources,
    generateDataCheckAvailableCoupons,
    generateDataSaveOrderOption,
    removeCouponsOrder,
} from 'utilities/helper';
import { OrderType } from 'utilities/staticData';

export const getResourcesData = async (updateOrderToAPI = true, checkCoupons = false) => {
    try {
        const response = await getResources();
        const newResources = filterResources(response?.data);
        const { order } = store.getState();
        const { menu = [], categories = [] } = newResources || {};

        // handle menu,categories change => update order in store
        if (updateOrderToAPI) {
            const allDishFilter: any = {};
            Object.entries(order).forEach(([keyOrder, orderData]) => {
                const newDishesFilter = filterOrderStore({ menu, categories, order: orderData });
                allDishFilter[keyOrder] = newDishesFilter;
            });

            // update save order api
            updateOrderStore(allDishFilter, checkCoupons);

            // update dish to store
            store.dispatch(updateDishesAllOrder(allDishFilter));
        }

        // update resource to store
        store.dispatch(resourceActions.getResourceSuccess(newResources));
    } catch (error) {
        console.log('getCouponData -> error', error);
    }
};

export const updateOrderStore = async (allDishFilter?: any, checkCoupons = false) => {
    const { userInfo, order } = store.getState();
    const { defaultOrder, defaultOrderLocal, mobileOrder, cartOrder } = order;
    const { token, user: { member: { id: userId } } = {} } = userInfo;
    if (!token) return;
    try {
        const resCoupons = await Promise.all([
            checkAvailableCouponsApi({
                userId,
                coupons: generateDataCheckAvailableCoupons(defaultOrder?.coupons || []),
            }),
            checkAvailableCouponsApi({
                userId,
                coupons: generateDataCheckAvailableCoupons(defaultOrderLocal?.coupons || []),
            }),
            checkAvailableCouponsApi({
                userId,
                coupons: generateDataCheckAvailableCoupons(mobileOrder?.coupons || []),
            }),
            checkAvailableCouponsApi({ userId, coupons: generateDataCheckAvailableCoupons(cartOrder?.coupons || []) }),
        ]);
        const couponsOrder = {
            defaultOrder: removeCouponsOrder(defaultOrder.coupons, resCoupons?.[0]?.data?.coupons),
            defaultOrderLocal: removeCouponsOrder(defaultOrderLocal.coupons, resCoupons?.[1]?.data?.coupons),
            mobileOrder: removeCouponsOrder(mobileOrder.coupons, resCoupons?.[2]?.data?.coupons),
            cartOrder: removeCouponsOrder(cartOrder.coupons, resCoupons?.[3]?.data?.coupons),
        };

        store.dispatch(
            updateAllOrder({
                defaultOrder: {
                    dishes: allDishFilter?.defaultOrder,
                    coupons: couponsOrder.defaultOrder,
                },
                mobileOrder: {
                    dishes: allDishFilter?.mobileOrder,
                    coupons: couponsOrder.mobileOrder,
                },
                defaultOrderLocal: {
                    dishes: allDishFilter?.defaultOrderLocal,
                    coupons: couponsOrder.defaultOrderLocal,
                },
                cartOrder: {
                    dishes: allDishFilter?.cartOrder,
                    coupons: couponsOrder.cartOrder,
                },
            }),
        );

        const defaultOrderSettingSaveData = generateDataSaveOrderOption(
            {
                coupons: couponsOrder.defaultOrder,
                dishes: allDishFilter?.defaultOrder || [],
            },
            OrderType.DEFAULT_SETTING,
        );
        const defaultOrderHomeSaveData = generateDataSaveOrderOption(
            {
                coupons: couponsOrder.defaultOrderLocal,
                dishes: allDishFilter?.defaultOrderLocal || [],
            },
            OrderType.DEFAULT_HOME,
        );
        const mobileOrderSaveData = generateDataSaveOrderOption(
            {
                coupons: couponsOrder.mobileOrder,
                dishes: allDishFilter?.mobileOrder || [],
            },
            OrderType.MOBILE,
        );

        Promise.all([
            saveOrderOption(defaultOrderSettingSaveData),
            saveOrderOption(defaultOrderHomeSaveData),
            saveOrderOption(mobileOrderSaveData),
        ]);
    } catch (error) {
        console.log('updateOrderStore -> error', error);
    }
};

export const getDataProfile = async () => {
    try {
        const resProfile = await getProfile();
        store.dispatch(userInfoActions.getUserInfoSuccess(resProfile?.data));
    } catch (error) {
        console.log('getDataProfile -> error', error);
    }
};

const useNetwork = () => {
    const isFirstRun = useRef<any>(true);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener((state) => {
            if (state.isConnected && isFirstRun?.current) {
                isFirstRun.current = false;
            }
            if (state.isConnected && state.isInternetReachable && !isFirstRun.current) {
                getResourcesData(true, true);
                getCouponData();
            }
        });
        return () => {
            unsubscribe();
        };
    }, []);
};

export default useNetwork;
