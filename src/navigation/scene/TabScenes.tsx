import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Images from 'assets/images';
import CheckInScreen from 'feature/home/CheckInScreen';
import HomeDataScreen from 'feature/home/HomeDataScreen';
import HomeDetailScreen from 'feature/home/HomeDetailScreen';
// Screen
import HomeScreen from 'feature/home/HomeScreen';
import HomeUserListScreen from 'feature/home/HomeUserListScreen';
import MobileOrderScreen from 'feature/home/MobileOrderScreen';
import NewDetailScreen from 'feature/home/NewDetailScren';
import NewListScreen from 'feature/home/NewListScreen';
import NotificationScreen from 'feature/home/NotificationScreen';
import OrderDefaultScreen from 'feature/home/OrderDefaultScreen';
import CartScreen from 'feature/order/CartScreen';
import DetailShopScreen from 'feature/order/DetailShopScreen';
import CouponListScreen from 'feature/order/CouponListScreen';
import DetailMealScreen from 'feature/order/DetailMealScreen';
import MenuScreen from 'feature/order/MenuScreen';
import StyledTabBar from 'navigation/components/StyledTabBar';
import navigationConfigs from 'navigation/config/options';
import { TAB_NAVIGATION_ROOT } from 'navigation/config/routes';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { isIos } from 'utilities/helper';
import OrderQrCodeScreen from 'feature/order/OrderQrCode';
import StampCardScreen from 'feature/stamp/StampCardScreen';
import TabCouponListScreen from 'feature/coupon/TabCouponListScreen';
import CardDetailScreen from 'feature/stamp/CardDetailScreen';
import NewStampScreen from 'feature/stamp/NewStamp';
import DetailCouponScreen from 'feature/coupon/DetailCoupon';
import MyPageScreen from 'feature/setting/MyPageScreen';
import EditProfileScreen from 'feature/setting/EditProfileScreen';
import OrderHistoryScreen from 'feature/setting/OrderHistoryScreen';
import ContactScreen from 'feature/setting/ContactScreen';
import SettingNotificationScreen from 'feature/setting/SettingNotificationScreen';
import SettingScreen from 'feature/setting/SettingScreen';

const MainStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

const HomeStack = () => (
    <MainStack.Navigator headerMode={'none'} screenOptions={navigationConfigs} keyboardHandlingEnabled={isIos}>
        <MainStack.Screen name={TAB_NAVIGATION_ROOT.HOME_ROUTE.HOME} component={HomeScreen} />
        <MainStack.Screen name={TAB_NAVIGATION_ROOT.HOME_ROUTE.HOME_DETAIL} component={HomeDetailScreen} />
        <MainStack.Screen name={TAB_NAVIGATION_ROOT.HOME_ROUTE.WEB_VIEW} component={HomeDetailScreen} />
        <MainStack.Screen name={TAB_NAVIGATION_ROOT.HOME_ROUTE.HOME_DATA} component={HomeDataScreen} />
        <MainStack.Screen name={TAB_NAVIGATION_ROOT.HOME_ROUTE.HOME_USER_LIST} component={HomeUserListScreen} />
        <MainStack.Screen name={TAB_NAVIGATION_ROOT.HOME_ROUTE.CHECK_IN} component={CheckInScreen} />
        <MainStack.Screen name={TAB_NAVIGATION_ROOT.HOME_ROUTE.NOTIFICATION} component={NotificationScreen} />
        <MainStack.Screen name={TAB_NAVIGATION_ROOT.HOME_ROUTE.NEW_LIST} component={NewListScreen} />
        <MainStack.Screen name={TAB_NAVIGATION_ROOT.HOME_ROUTE.NEW_DETAIL} component={NewDetailScreen} />
        <MainStack.Screen name={TAB_NAVIGATION_ROOT.HOME_ROUTE.ORDER_DEFAULT} component={OrderDefaultScreen} />
        <MainStack.Screen name={TAB_NAVIGATION_ROOT.HOME_ROUTE.MOBILE_ORDER} component={MobileOrderScreen} />
        <MainStack.Screen name={TAB_NAVIGATION_ROOT.HOME_ROUTE.CART} component={CartScreen} />
    </MainStack.Navigator>
);
const OrderStack = () => (
    <MainStack.Navigator headerMode={'none'} screenOptions={navigationConfigs} keyboardHandlingEnabled={isIos}>
        <MainStack.Screen name={TAB_NAVIGATION_ROOT.ORDER_ROUTE.ROOT} component={MenuScreen} />
        <MainStack.Screen name={TAB_NAVIGATION_ROOT.ORDER_ROUTE.DETAIL_MEAL} component={DetailMealScreen} />
        <MainStack.Screen name={TAB_NAVIGATION_ROOT.ORDER_ROUTE.CART} component={CartScreen} />
        <MainStack.Screen name={TAB_NAVIGATION_ROOT.ORDER_ROUTE.COUPON_LIST} component={CouponListScreen} />
        <MainStack.Screen name={TAB_NAVIGATION_ROOT.ORDER_ROUTE.DETAIL_SHOP} component={DetailShopScreen} />
        <MainStack.Screen name={TAB_NAVIGATION_ROOT.ORDER_ROUTE.ORDER_QR_CODE} component={OrderQrCodeScreen} />
    </MainStack.Navigator>
);
const StampStack = () => (
    <MainStack.Navigator headerMode={'none'} screenOptions={navigationConfigs} keyboardHandlingEnabled={isIos}>
        <MainStack.Screen name={TAB_NAVIGATION_ROOT.STAMP_ROUTE.ROOT} component={StampCardScreen} />
        <MainStack.Screen name={TAB_NAVIGATION_ROOT.STAMP_ROUTE.CARD_DETAIL} component={CardDetailScreen} />
        <MainStack.Screen name={TAB_NAVIGATION_ROOT.STAMP_ROUTE.NEW_STAMP} component={NewStampScreen} />
    </MainStack.Navigator>
);
const CouponStack = () => (
    <MainStack.Navigator headerMode={'none'} screenOptions={navigationConfigs} keyboardHandlingEnabled={isIos}>
        <MainStack.Screen name={TAB_NAVIGATION_ROOT.COUPON_ROUTE.ROOT} component={TabCouponListScreen} />
        <MainStack.Screen name={TAB_NAVIGATION_ROOT.COUPON_ROUTE.DETAIL_COUPON} component={DetailCouponScreen} />
    </MainStack.Navigator>
);
const SettingStack = () => (
    <MainStack.Navigator headerMode={'none'} screenOptions={navigationConfigs} keyboardHandlingEnabled={isIos}>
        <MainStack.Screen name={TAB_NAVIGATION_ROOT.SETTING_ROUTE.ROOT} component={SettingScreen} />
        <MainStack.Screen name={TAB_NAVIGATION_ROOT.SETTING_ROUTE.MY_PAGE} component={MyPageScreen} />
        <MainStack.Screen name={TAB_NAVIGATION_ROOT.SETTING_ROUTE.EDIT_PROFILE} component={EditProfileScreen} />
        <MainStack.Screen name={TAB_NAVIGATION_ROOT.SETTING_ROUTE.ORDER_DEFAULT} component={OrderDefaultScreen} />
        <MainStack.Screen name={TAB_NAVIGATION_ROOT.SETTING_ROUTE.ORDER_HISTORY} component={OrderHistoryScreen} />
        <MainStack.Screen name={TAB_NAVIGATION_ROOT.SETTING_ROUTE.CONTACT} component={ContactScreen} />
        <MainStack.Screen
            name={TAB_NAVIGATION_ROOT.SETTING_ROUTE.SETTING_NOTIFICATION}
            component={SettingNotificationScreen}
        />
    </MainStack.Navigator>
);
const MainTabContainer = () => {
    const { t } = useTranslation();
    const ArrayTabs = [
        {
            name: TAB_NAVIGATION_ROOT.HOME_ROUTE.ROOT,
            title: t('tab.home'),
            component: HomeStack,
            icon: Images.icons.tab.home,
        },
        {
            name: TAB_NAVIGATION_ROOT.STAMP_ROUTE.ROOT,
            title: t('tab.stamp'),
            component: StampStack,
            icon: Images.icons.tab.notification,
        },
        {
            name: TAB_NAVIGATION_ROOT.ORDER_ROUTE.ROOT,
            title: t('tab.order'),
            component: OrderStack,
            icon: Images.icons.tab.notification,
        },
        {
            name: TAB_NAVIGATION_ROOT.COUPON_ROUTE.ROOT,
            title: t('tab.coupon'),
            component: CouponStack,
            icon: Images.icons.tab.account,
        },
        {
            name: TAB_NAVIGATION_ROOT.SETTING_ROUTE.ROOT,
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
