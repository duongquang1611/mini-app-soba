/* eslint-disable @typescript-eslint/no-unused-vars */
import NetInfo from '@react-native-community/netinfo';
import { getProfile } from 'api/modules/api-app/authenticate';
import { getResources } from 'api/modules/api-app/general';
import { getMenu, saveOrderOption } from 'api/modules/api-app/order';
import { updateMenu } from 'app-redux/slices/globalDataSlice';
import { updateAllOrder, updateDishesAllOrder } from 'app-redux/slices/orderSlice';
import { resourceActions } from 'app-redux/slices/resourceSlice';
import { userInfoActions } from 'app-redux/slices/userInfoSlice';
import { store } from 'app-redux/store';
import { compare } from 'compare-versions';
import AlertMessage from 'components/base/AlertMessage';
import ModalizeManager from 'components/base/modal/ModalizeManager';
import { getCouponData, getMenuData } from 'feature/home/HomeScreen';
import { useEffect, useRef } from 'react';
import DeviceInfo from 'react-native-device-info';
import {
    checkAvailableCouponsAllOrder,
    filterOrderStore,
    filterResources,
    generateDataSaveOrderOption,
    openURL,
} from 'utilities/helper';
import { MODAL_ID, MenuType, OrderType, POPUP_TYPE, STORE_URL, VERSION_APP_KEY } from 'utilities/staticData';

const checkVersion = (configs: any[]) => {
    const modalize = ModalizeManager();
    const versionApp = configs.find(config => {
        return VERSION_APP_KEY === config?.key;
    });
    if (!versionApp?.value) return false;
    const versionDevice = DeviceInfo.getVersion();
    // const needUpdate = compare('1.0.1', versionApp.value, '<');
    const needUpdate = compare(versionDevice, versionApp.value, '<');
    if (needUpdate) {
        modalize?.dismiss?.(MODAL_ID.FORCE_UPDATE, () => {
            if (!__DEV__) {
                AlertMessage(
                    undefined,
                    {
                        type: POPUP_TYPE.CONFIRM,
                        onOk: () => {
                            openURL(STORE_URL as string);
                        },
                        dismissModalOnOk: false,
                        dismissModalOnCancel: false,
                        content: 'common.uploadVersion',
                        showClose: false,
                    },
                    undefined,
                    {
                        panGestureEnabled: false,
                        closeOnOverlayTap: false,
                        onBackButtonPress: () => null,
                    },
                    MODAL_ID.FORCE_UPDATE,
                    {
                        onClosed: () => {
                            return null;
                        },
                    },
                );
            }
        });
    }
    return needUpdate;
};

export const getResourcesData = async (updateOrderToAPI = true, checkCoupons = false) => {
    const {
        userInfo: { token },
        globalData: { chooseBranch },
        globalDataUnSave: { withoutAccount },
    } = store.getState();
    try {
        getMenuData();
        const response = await getResources();
        const needUpdate = checkVersion(response?.data?.configs || []);
        if (needUpdate && !__DEV__) return;
        const newResources = filterResources(response?.data);
        const { order } = store.getState();
        const { menu: menuResource, categories = [] } = newResources || {};
        let menu = menuResource;
        if (!withoutAccount && token && chooseBranch?.id) {
            const res = await getMenu(chooseBranch?.id);
            menu = res?.data?.filter((item: any) => item?.status === MenuType.ENABLE);
        }

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
        store.dispatch(updateMenu(menu));
    } catch (error) {
        console.log('getCouponData -> error', error);
    }
};

export const updateOrderStore = async (allDishFilter?: any, checkCoupons = false) => {
    const { userInfo, order } = store.getState();
    const { defaultOrder, defaultOrderLocal, mobileOrder, cartOrder } = order;
    const { token, user: { member } = {} } = userInfo;
    if (!token) return;
    try {
        const couponsOrder = await checkAvailableCouponsAllOrder();

        store.dispatch(
            updateAllOrder({
                defaultOrder: {
                    dishes: allDishFilter?.defaultOrder,
                    coupons: couponsOrder?.defaultOrder || [],
                },
                mobileOrder: {
                    dishes: allDishFilter?.mobileOrder,
                    coupons: couponsOrder?.mobileOrder || [],
                },
                defaultOrderLocal: {
                    dishes: allDishFilter?.defaultOrderLocal,
                    coupons: couponsOrder?.defaultOrderLocal || [],
                },
                cartOrder: {
                    dishes: allDishFilter?.cartOrder,
                    coupons: couponsOrder?.cartOrder || [],
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
        const unsubscribe = NetInfo.addEventListener(state => {
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
