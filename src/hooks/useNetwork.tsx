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
            // check mainDish id and check exist category of this menu item
            const newDishesFilterCategory = newDishes.filter((itemDish: any) => {
                const menuItem = menu.find((itemMenu: any) => itemMenu.id === itemDish?.mainDish?.id);
                if (!menuItem) return false;
                const categoryItem = categories.find(
                    (itemCategory: any) => itemCategory?.id === menuItem?.category?.[0]?.categoryId,
                );
                if (!categoryItem) return false;

                // check subCategory
                // some categoryItem dont have subCategories => dont check
                if (categoryItem?.subCategories?.length <= 0) return true;
                const subCategoryItem = categoryItem?.subCategories?.find(
                    (item: any) => item?.id === menuItem?.subCategory?.[0]?.subCategoryId,
                );
                return Boolean(subCategoryItem);
            });

            const newDishFilterSubDishes = newDishesFilterCategory.map((itemDish: any) => {
                const menuItem = menu.find((itemMenu: any) => itemMenu.id === itemDish?.mainDish?.id);
                const newSubDishes = itemDish?.subDishes?.filter((itemSubDish: any) => {
                    const dishOptionItem = menuItem?.dishOptions?.find(
                        (itemDishOption: any) => itemDishOption?.id === itemSubDish?.dishOption?.dishOptionsId,
                    );
                    if (!dishOptionItem) return false;
                    const subDishItem = dishOptionItem?.subDish?.find((itemSubDishOfDishOption: any) => {
                        return itemSubDishOfDishOption?.dish?.stringId === itemSubDish?.stringId;
                    });
                    return Boolean(subDishItem);
                });
                return { ...itemDish, subDishes: newSubDishes };
            });

            // check subDishes
            // dispatch(updateDishesCartOrder(newDishesFilterCategory));
        }
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
