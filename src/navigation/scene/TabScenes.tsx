import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Images from 'assets/images';
import ChangePassword from 'feature/authentication/ChangePassword';
import SendOtpForgotPass from 'feature/authentication/SendOtpForgotPass';
import DetailCouponScreen from 'feature/coupon/DetailCouponScreen';
import TabCouponListScreen from 'feature/coupon/TabCouponListScreen';
import CheckInScreen from 'feature/home/CheckInScreen';
import EditOrderScreen from 'feature/home/EditOrderScreen';
import HomeDataScreen from 'feature/home/HomeDataScreen';
import HomeDetailScreen from 'feature/home/HomeDetailScreen';
// Screen
import HomeScreen from 'feature/home/HomeScreen';
import HomeUserListScreen from 'feature/home/HomeUserListScreen';
import MobileOrderScreen from 'feature/home/MobileOrderScreen';
import NewsDetailScreen from 'feature/home/NewsDetailScren';
import NewsListScreen from 'feature/home/NewsListScreen';
import NotificationDetailScreen from 'feature/home/NotificationDetailScreen';
import NotificationScreen from 'feature/home/NotificationScreen';
import OrderDefaultScreen from 'feature/home/OrderDefaultScreen';
import CartScreen from 'feature/order/CartScreen';
import CouponListScreen from 'feature/order/CouponListScreen';
import DetailMealScreen from 'feature/order/DetailMealScreen';
import DetailShopScreen from 'feature/order/DetailShopScreen';
import MenuScreen from 'feature/order/MenuScreen';
import OrderQrCodeScreen from 'feature/order/OrderQrCode';
import ContactScreen from 'feature/setting/ContactScreen';
import EditProfileScreen from 'feature/setting/EditProfileScreen';
import MyPageScreen from 'feature/setting/MyPageScreen';
import OrderHistoryDetailScreen from 'feature/setting/OrderHistoryDetailScreen';
import OrderHistoryScreen from 'feature/setting/OrderHistoryScreen';
import SettingNotificationScreen from 'feature/setting/SettingNotificationScreen';
import SettingScreen from 'feature/setting/SettingScreen';
import AccumulationCardScreen from 'feature/stamp/AccumulationCardScreen';
import CardDetailScreen from 'feature/stamp/CardDetailScreen';
import ExchangeStampScreen from 'feature/stamp/ExchangeStampScreen';
import NewStampScreen from 'feature/stamp/NewStamp';
import StampCardScreen from 'feature/stamp/StampCardScreen';
import StyledTabBar from 'navigation/components/StyledTabBar';
import navigationConfigs from 'navigation/config/options';
import {
    AUTHENTICATE_ROUTE,
    COUPON_ROUTE,
    HOME_ROUTE,
    ORDER_ROUTE,
    SETTING_ROUTE,
    STAMP_ROUTE,
} from 'navigation/config/routes';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { isIos } from 'utilities/helper';

const MainStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

const HomeStack = () => (
    <MainStack.Navigator headerMode={'none'} screenOptions={navigationConfigs} keyboardHandlingEnabled={isIos}>
        <MainStack.Screen name={HOME_ROUTE.HOME} component={HomeScreen} />
        <MainStack.Screen name={HOME_ROUTE.HOME_DETAIL} component={HomeDetailScreen} />
        <MainStack.Screen name={HOME_ROUTE.WEB_VIEW} component={HomeDetailScreen} />
        <MainStack.Screen name={HOME_ROUTE.HOME_DATA} component={HomeDataScreen} />
        <MainStack.Screen name={HOME_ROUTE.HOME_USER_LIST} component={HomeUserListScreen} />
        <MainStack.Screen name={HOME_ROUTE.CHECK_IN} component={CheckInScreen} />
        <MainStack.Screen name={HOME_ROUTE.NOTIFICATION} component={NotificationScreen} />
        <MainStack.Screen name={HOME_ROUTE.NEW_LIST} component={NewsListScreen} />
        <MainStack.Screen name={HOME_ROUTE.NEW_DETAIL} component={NewsDetailScreen} />
        <MainStack.Screen name={HOME_ROUTE.ORDER_DEFAULT} component={OrderDefaultScreen} />
        <MainStack.Screen name={HOME_ROUTE.MOBILE_ORDER} component={MobileOrderScreen} />
        <MainStack.Screen name={HOME_ROUTE.CART} component={CartScreen} />
        <MainStack.Screen name={HOME_ROUTE.EDIT_ORDER} component={EditOrderScreen} />
        <MainStack.Screen name={HOME_ROUTE.NOTIFICATION_DETAIL} component={NotificationDetailScreen} />
    </MainStack.Navigator>
);

const OrderStack = () => (
    <MainStack.Navigator headerMode={'none'} screenOptions={navigationConfigs} keyboardHandlingEnabled={isIos}>
        <MainStack.Screen name={ORDER_ROUTE.ROOT} component={MenuScreen} />
        <MainStack.Screen name={ORDER_ROUTE.DETAIL_MEAL} component={DetailMealScreen} />
        <MainStack.Screen name={ORDER_ROUTE.CART} component={CartScreen} />
        <MainStack.Screen name={ORDER_ROUTE.COUPON_LIST} component={CouponListScreen} />
        <MainStack.Screen name={ORDER_ROUTE.DETAIL_SHOP} component={DetailShopScreen} />
        <MainStack.Screen name={ORDER_ROUTE.ORDER_QR_CODE} component={OrderQrCodeScreen} />
    </MainStack.Navigator>
);

const StampStack = () => (
    <MainStack.Navigator headerMode={'none'} screenOptions={navigationConfigs} keyboardHandlingEnabled={isIos}>
        <MainStack.Screen name={STAMP_ROUTE.ROOT} component={StampCardScreen} />
        <MainStack.Screen name={STAMP_ROUTE.CARD_DETAIL} component={CardDetailScreen} />
        <MainStack.Screen name={STAMP_ROUTE.NEW_STAMP} component={NewStampScreen} />
        <MainStack.Screen name={STAMP_ROUTE.EXCHANGE_STAMP} component={ExchangeStampScreen} />
        <MainStack.Screen name={STAMP_ROUTE.ACCUMULATION_CARD} component={AccumulationCardScreen} />
    </MainStack.Navigator>
);

const CouponStack = () => (
    <MainStack.Navigator headerMode={'none'} screenOptions={navigationConfigs} keyboardHandlingEnabled={isIos}>
        <MainStack.Screen name={COUPON_ROUTE.ROOT} component={TabCouponListScreen} />
        <MainStack.Screen name={COUPON_ROUTE.DETAIL_COUPON} component={DetailCouponScreen} />
    </MainStack.Navigator>
);

const SettingStack = () => (
    <MainStack.Navigator headerMode={'none'} screenOptions={navigationConfigs} keyboardHandlingEnabled={isIos}>
        <MainStack.Screen name={SETTING_ROUTE.ROOT} component={SettingScreen} />
        <MainStack.Screen name={SETTING_ROUTE.MY_PAGE} component={MyPageScreen} />
        <MainStack.Screen name={SETTING_ROUTE.EDIT_PROFILE} component={EditProfileScreen} />
        <MainStack.Screen name={SETTING_ROUTE.ORDER_DEFAULT} component={OrderDefaultScreen} />
        <MainStack.Screen name={SETTING_ROUTE.ORDER_HISTORY} component={OrderHistoryScreen} />
        <MainStack.Screen name={SETTING_ROUTE.CONTACT} component={ContactScreen} />
        <MainStack.Screen name={SETTING_ROUTE.SETTING_NOTIFICATION} component={SettingNotificationScreen} />
        <MainStack.Screen name={SETTING_ROUTE.ORDER_HISTORY_DETAIL} component={OrderHistoryDetailScreen} />
        <MainStack.Screen name={AUTHENTICATE_ROUTE.CHANGE_PASS} component={ChangePassword} />
        <MainStack.Screen name={AUTHENTICATE_ROUTE.SEND_OTP_FORGOT_PASS} component={SendOtpForgotPass} />
    </MainStack.Navigator>
);

const MainTabContainer = () => {
    const { t } = useTranslation();
    const ArrayTabs = [
        {
            name: HOME_ROUTE.ROOT,
            title: t('tab.home'),
            component: HomeStack,
            icon: Images.icons.tab.home,
        },
        {
            name: STAMP_ROUTE.ROOT,
            title: t('tab.stamp'),
            component: StampStack,
            icon: Images.icons.tab.notification,
        },
        {
            name: ORDER_ROUTE.ROOT,
            title: t('tab.order'),
            component: OrderStack,
            icon: Images.icons.tab.notification,
        },
        {
            name: COUPON_ROUTE.ROOT,
            title: t('tab.coupon'),
            component: CouponStack,
            icon: Images.icons.tab.account,
        },
        {
            name: SETTING_ROUTE.ROOT,
            title: t('tab.setting'),
            component: SettingStack,
            icon: Images.icons.tab.setting,
        },
    ];
    return (
        <MainTab.Navigator tabBar={(props: BottomTabBarProps) => <StyledTabBar {...props} />}>
            {ArrayTabs.map((item, index) => (
                <MainTab.Screen key={`${index}`} options={{ ...item }} {...item} />
            ))}
        </MainTab.Navigator>
    );
};

export default MainTabContainer;
