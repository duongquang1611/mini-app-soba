/* eslint-disable @typescript-eslint/no-unused-vars */
import NetInfo from '@react-native-community/netinfo';
import { RootState } from 'app-redux/hooks';
import { updateCartOrder, updateDishesCartOrder } from 'app-redux/slices/orderSlice';
import { getCouponData, getResourcesData } from 'feature/home/HomeScreen';
import { cloneDeep } from 'lodash';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useNetwork = () => {
    const dispatch = useDispatch();
    const isFirstRun = useRef<any>(true);
    const { resource, userInfo, order } = useSelector((state: RootState) => state);
    const { token } = userInfo;
    const { data: dataResource } = resource;
    const { menu = [], categories = [] } = dataResource || {};
    const { cartOrder } = order;

    useEffect(() => {
        // handle menu,categories change => update cart
        // console.log('useEffect', { menu, cartOrder, categories });
        const categoryIds = categories.map((item: any) => item.id);
        const menuIds = menu.map((item: any) => item.id);
        const { dishes = [] } = cartOrder || {};
        const newDishes = cloneDeep(dishes);
        if (newDishes?.length > 0) {
            for (let i = 0; i < newDishes.length; i++) {
                if (!menuIds.includes(newDishes?.[i]?.mainDish?.id)) {
                    newDishes.splice(i, 1);
                } else {
                    // categoryId exists
                    // check subDishes (dua vao subDishId)
                    console.log('useEffect -> newDishes', newDishes);
                }
            }
        }
        // dispatch(updateDishesCartOrder(newDishes));
    }, [JSON.stringify({ menu, categories })]);

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
