/* eslint-disable @typescript-eslint/no-unused-vars */
import NetInfo from '@react-native-community/netinfo';
import { getProfile } from 'api/modules/api-app/authenticate';
import { getResources } from 'api/modules/api-app/general';
import { saveOrderOption } from 'api/modules/api-app/order';
import { updateDishesAllOrder } from 'app-redux/slices/orderSlice';
import { resourceActions } from 'app-redux/slices/resourceSlice';
import { userInfoActions } from 'app-redux/slices/userInfoSlice';
import { store } from 'app-redux/store';
import { getCouponData } from 'feature/home/HomeScreen';
import { useEffect, useRef } from 'react';
import { filterOrderStore, filterResources, generateDataSaveOrderOption } from 'utilities/helper';
import { OrderType } from 'utilities/staticData';

export const getResourcesData = async (updateOrderToAPI = true) => {
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
            updateOrderStore(allDishFilter);

            // update dish to store
            store.dispatch(updateDishesAllOrder(allDishFilter));
        }

        // update resource to store
        store.dispatch(resourceActions.getResourceSuccess(newResources));
    } catch (error) {
        console.log('getCouponData -> error', error);
    }
};

export const updateOrderStore = async (allDishFilter?: any) => {
    const { userInfo, order } = store.getState();
    const { defaultOrder, defaultOrderLocal, mobileOrder } = order;
    const { token } = userInfo;
    if (!token) return;
    const defaultOrderSettingSaveData = generateDataSaveOrderOption(
        {
            ...defaultOrder,
            dishes: allDishFilter?.defaultOrder || [],
        },
        OrderType.DEFAULT_SETTING,
    );
    const defaultOrderHomeSaveData = generateDataSaveOrderOption(
        {
            ...defaultOrderLocal,
            dishes: allDishFilter?.defaultOrderLocal || [],
        },
        OrderType.DEFAULT_HOME,
    );
    const mobileOrderSaveData = generateDataSaveOrderOption(
        {
            ...mobileOrder,
            dishes: allDishFilter?.mobileOrder || [],
        },
        OrderType.MOBILE,
    );
    Promise.all([
        saveOrderOption(defaultOrderSettingSaveData),
        saveOrderOption(defaultOrderHomeSaveData),
        saveOrderOption(mobileOrderSaveData),
    ]);
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
                getResourcesData();
                getCouponData();
            }
        });
        return () => {
            unsubscribe();
        };
    }, []);
};

export default useNetwork;
