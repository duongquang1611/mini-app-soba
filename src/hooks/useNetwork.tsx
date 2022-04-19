/* eslint-disable @typescript-eslint/no-unused-vars */
import NetInfo from '@react-native-community/netinfo';
import { saveOrderOption } from 'api/modules/api-app/order';
import { RootState } from 'app-redux/hooks';
import { updateCartOrder, updateDishesAllOrder, updateDishesCartOrder } from 'app-redux/slices/orderSlice';
import { getCouponData, getResourcesData } from 'feature/home/HomeScreen';
import { cloneDeep } from 'lodash';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterOrderStore, generateDataSaveOrderOption } from 'utilities/helper';
import { OrderType } from 'utilities/staticData';

const useNetwork = () => {
    const dispatch = useDispatch();
    const isFirstRun = useRef<any>(true);
    const { resource, userInfo, order } = useSelector((state: RootState) => state);
    const { defaultOrder, defaultOrderLocal, mobileOrder, cartOrder } = order;
    const { token } = userInfo;
    const { data: dataResource } = resource;
    const { menu = [], categories = [] } = dataResource || {};

    useEffect(() => {
        // handle menu,categories change => update order in store
        const allDishFilter: any = {};
        Object.entries(order).forEach(([keyOrder, orderData]) => {
            const newDishesFilter = filterOrderStore({ menu, categories, order: orderData });
            allDishFilter[keyOrder] = newDishesFilter;
        });
        updateOrderStore(allDishFilter);
        dispatch(updateDishesAllOrder(allDishFilter));
    }, [JSON.stringify({ menu, categories })]);

    const updateOrderStore = async (allDishFilter?: any) => {
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
                dishes: allDishFilter?.defaultOrder || [],
            },
            OrderType.DEFAULT_HOME,
        );
        const mobileOrderSaveData = generateDataSaveOrderOption(
            {
                ...mobileOrder,
                dishes: allDishFilter?.defaultOrder || [],
            },
            OrderType.MOBILE,
        );
        Promise.all([
            saveOrderOption(defaultOrderSettingSaveData),
            saveOrderOption(defaultOrderHomeSaveData),
            saveOrderOption(mobileOrderSaveData),
        ]);
    };

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
    }, [token]);
};

export default useNetwork;
