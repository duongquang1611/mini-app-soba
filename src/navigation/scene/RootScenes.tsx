import { createStackNavigator } from '@react-navigation/stack';
import { getResources } from 'api/modules/api-app/general';
import { RootState } from 'app-redux/hooks';
import { resourceActions } from 'app-redux/slices/resourceSlice';
import { Themes } from 'assets/themes';
import ChangePassword from 'feature/authentication/ChangePassword';
import OrderDefaultMenu from 'feature/authentication/OrderDefaultMenu';
import RegisterStep2 from 'feature/authentication/RegisterStep2';
import RegisterStep3 from 'feature/authentication/RegisterStep3';
import SendOtpForgotPass from 'feature/authentication/SendOtpForgotPass';
import DetailCouponScreen from 'feature/coupon/DetailCouponScreen';
import TabCouponListScreen from 'feature/coupon/TabCouponListScreen';
import CheckInScreen from 'feature/home/CheckInScreen';
import EditOrderScreen from 'feature/home/EditOrderScreen';
import HomeScreen from 'feature/home/HomeScreen';
import MobileOrderScreen from 'feature/home/MobileOrderScreen';
import NewsDetailScreen from 'feature/home/NewsDetailScreen';
import NewsListScreen from 'feature/home/NewsListScreen';
import NotificationDetailScreen from 'feature/home/NotificationDetailScreen';
import NotificationScreen from 'feature/home/NotificationScreen';
import OrderDefaultHomeScreen from 'feature/home/OrderDefaultHomeScreen';
import CartScreen from 'feature/order/CartScreen';
import CouponListScreen from 'feature/order/CouponListScreen';
import DetailCouponOrderScreen from 'feature/order/DetailCouponOrderScreen';
import DetailMealScreen from 'feature/order/DetailMealScreen';
import DetailShopScreen from 'feature/order/DetailShopScreen';
import MenuScreen from 'feature/order/MenuScreen';
import OrderQrCodeScreen from 'feature/order/OrderQrCode';
import ContactScreen from 'feature/setting/ContactScreen';
import DefaultOrderDetailScreen from 'feature/setting/DefaultOrderDetailScreen';
import EditProfileScreen from 'feature/setting/EditProfileScreen';
import MyPageScreen from 'feature/setting/MyPageScreen';
import OrderDefaultSettingScreen from 'feature/setting/OrderDefaultSettingScreen';
import OrderHistoryDetailScreen from 'feature/setting/OrderHistoryDetailScreen';
import OrderHistoryScreen from 'feature/setting/OrderHistoryScreen';
import OrderSave from 'feature/setting/OrderSaveScreen';
import SettingNotificationScreen from 'feature/setting/SettingNotificationScreen';
import SettingScreen from 'feature/setting/SettingScreen';
import ExchangeCouponListScreen from 'feature/stamp/ExchangeCouponListScreen';
import StampCardDetailScreen from 'feature/stamp/StampCardDetailScreen';
import StampCardScreen from 'feature/stamp/StampCardScreen';
import useNetwork from 'hooks/useNetwork';
import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { Host } from 'react-native-portalize';
import { useDispatch, useSelector } from 'react-redux';
import { isIos } from 'utilities/helper';
import navigationConfigs from '../config/options';
import {
    APP_ROUTE,
    AUTHENTICATE_ROUTE,
    COUPON_ROUTE,
    HOME_ROUTE,
    ORDER_ROUTE,
    SETTING_ROUTE,
    STAMP_ROUTE,
} from '../config/routes';
import AuthStack from './AuthScenes';
import MainTabContainer from './TabScenes';

const MainStack = createStackNavigator();

const AppStack = () => {
    const { skipOrderDefault, viewedOrderDefault } = useSelector((state: RootState) => state.globalData);
    return (
        <>
            <StatusBar backgroundColor={Themes.COLORS.headerBackground} barStyle={'dark-content'} />
            <Host>
                <MainStack.Navigator
                    initialRouteName={
                        skipOrderDefault
                            ? APP_ROUTE.MAIN_TAB
                            : viewedOrderDefault
                            ? APP_ROUTE.MAIN_TAB
                            : AUTHENTICATE_ROUTE.ORDER_DEFAULT_MENU
                    }
                    keyboardHandlingEnabled={isIos}
                    headerMode={'none'}
                    screenOptions={navigationConfigs}
                >
                    <MainStack.Screen name={APP_ROUTE.MAIN_TAB} component={MainTabContainer} />

                    {/* Order Default */}
                    <MainStack.Screen name={AUTHENTICATE_ROUTE.ORDER_DEFAULT_MENU} component={OrderDefaultMenu} />
                    <MainStack.Screen name={AUTHENTICATE_ROUTE.REGISTER_STEP_3} component={RegisterStep3} />
                    <MainStack.Screen name={AUTHENTICATE_ROUTE.REGISTER_STEP_2} component={RegisterStep2} />

                    {/* HOME_ROUTE */}
                    <MainStack.Screen name={HOME_ROUTE.HOME} component={HomeScreen} />
                    <MainStack.Screen name={HOME_ROUTE.CHECK_IN} component={CheckInScreen} />
                    <MainStack.Screen name={HOME_ROUTE.NOTIFICATION} component={NotificationScreen} />
                    <MainStack.Screen name={HOME_ROUTE.NEW_LIST} component={NewsListScreen} />
                    <MainStack.Screen name={HOME_ROUTE.NEW_DETAIL} component={NewsDetailScreen} />
                    <MainStack.Screen name={HOME_ROUTE.MOBILE_ORDER} component={MobileOrderScreen} />
                    <MainStack.Screen name={HOME_ROUTE.ORDER_DEFAULT_HOME} component={OrderDefaultHomeScreen} />
                    <MainStack.Screen name={HOME_ROUTE.CART} component={CartScreen} />
                    <MainStack.Screen name={HOME_ROUTE.EDIT_ORDER} component={EditOrderScreen} />
                    <MainStack.Screen name={HOME_ROUTE.NOTIFICATION_DETAIL} component={NotificationDetailScreen} />

                    {/* ORDER_ROUTE */}
                    <MainStack.Screen name={ORDER_ROUTE.ROOT} component={MenuScreen} />
                    <MainStack.Screen name={ORDER_ROUTE.DETAIL_MEAL} component={DetailMealScreen} />
                    <MainStack.Screen name={ORDER_ROUTE.COUPON_LIST} component={CouponListScreen} />
                    <MainStack.Screen name={ORDER_ROUTE.DETAIL_SHOP} component={DetailShopScreen} />
                    <MainStack.Screen name={ORDER_ROUTE.COUPON_DETAIL} component={DetailCouponOrderScreen} />
                    <MainStack.Screen name={ORDER_ROUTE.ORDER_QR_CODE} component={OrderQrCodeScreen} />

                    {/* STAMP_ROUTE */}
                    <MainStack.Screen name={STAMP_ROUTE.ROOT} component={StampCardScreen} />
                    <MainStack.Screen name={STAMP_ROUTE.STAMP_CARD_DETAIL} component={StampCardDetailScreen} />
                    <MainStack.Screen name={STAMP_ROUTE.EXCHANGE_COUPON} component={ExchangeCouponListScreen} />

                    {/* COUPON_ROUTE */}
                    <MainStack.Screen name={COUPON_ROUTE.ROOT} component={TabCouponListScreen} />
                    <MainStack.Screen name={COUPON_ROUTE.DETAIL_COUPON} component={DetailCouponScreen} />

                    {/* SETTING_ROUTE */}
                    <MainStack.Screen name={SETTING_ROUTE.ROOT} component={SettingScreen} />
                    <MainStack.Screen name={SETTING_ROUTE.MY_PAGE} component={MyPageScreen} />
                    <MainStack.Screen name={SETTING_ROUTE.EDIT_PROFILE} component={EditProfileScreen} />
                    <MainStack.Screen
                        name={SETTING_ROUTE.ORDER_DEFAULT_SETTING}
                        component={OrderDefaultSettingScreen}
                    />
                    <MainStack.Screen name={SETTING_ROUTE.ORDER_HISTORY} component={OrderHistoryScreen} />
                    <MainStack.Screen name={SETTING_ROUTE.CONTACT} component={ContactScreen} />
                    <MainStack.Screen name={SETTING_ROUTE.SETTING_NOTIFICATION} component={SettingNotificationScreen} />
                    <MainStack.Screen name={SETTING_ROUTE.ORDER_HISTORY_DETAIL} component={OrderHistoryDetailScreen} />
                    <MainStack.Screen name={AUTHENTICATE_ROUTE.CHANGE_PASS} component={ChangePassword} />
                    <MainStack.Screen name={SETTING_ROUTE.DEFAULT_ORDER_DETAIL} component={DefaultOrderDetailScreen} />
                    <MainStack.Screen name={SETTING_ROUTE.ORDER_SAVE} component={OrderSave} />
                    <MainStack.Screen name={AUTHENTICATE_ROUTE.SEND_OTP_FORGOT_PASS} component={SendOtpForgotPass} />
                </MainStack.Navigator>
            </Host>
        </>
    );
};

const Navigation: React.FunctionComponent = () => {
    useNetwork();

    const { userInfo } = useSelector((state: RootState) => state);
    const { token } = userInfo;
    const dispatch = useDispatch();

    const initApp = async () => {
        try {
            const res = await getResources();
            dispatch(resourceActions.getResourceSuccess(res.data));
        } catch (error) {
            console.log('🚀 ~ file: RootScenes.tsx ~ line 122 ~ initApp ~ error', error);
        }
    };

    useEffect(() => {
        initApp();
    }, []);

    if (token) {
        return <AppStack />;
    }
    return <AuthStack />;
};

export default Navigation;
