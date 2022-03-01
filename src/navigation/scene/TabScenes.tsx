import { BubbleTabBarItemConfig, TabsConfig } from '@gorhom/animated-tabbar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Images from 'assets/images';
import { Themes } from 'assets/themes';
import { StyledIcon } from 'components/base';
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
import NewsDetailScreen from 'feature/home/NewsDetailScreen';
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
import DefaultOrderDetailScreen from 'feature/setting/DefaultOrderDetailScreen';
import EditProfileScreen from 'feature/setting/EditProfileScreen';
import MyPageScreen from 'feature/setting/MyPageScreen';
import OrderDefaultSettingScreen from 'feature/setting/OrderDefaultSettingScreen';
import OrderHistoryDetailScreen from 'feature/setting/OrderHistoryDetailScreen';
import OrderHistoryScreen from 'feature/setting/OrderHistoryScreen';
import OrderSave from 'feature/setting/OrderSaveScreen';
import SettingNotificationScreen from 'feature/setting/SettingNotificationScreen';
import SettingScreen from 'feature/setting/SettingScreen';
import StampCardDetailScreen from 'feature/stamp/StampCardDetailScreen';
import StampCardScreen from 'feature/stamp/StampCardScreen';
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
import { AnimatedTabBarNavigator } from 'react-native-animated-nav-tab-bar';
import { scale, ScaledSheet } from 'react-native-size-matters';
import { isIos } from 'utilities/helper';

const MainStack = createStackNavigator();
const MainTab = createBottomTabNavigator();
const SIZE_ICON = 22;
interface TabBarIconProps {
    color: string;
    focused: boolean;
    size: number;
}

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
        <MainStack.Screen name={STAMP_ROUTE.STAMP_CARD_DETAIL} component={StampCardDetailScreen} />
        <MainStack.Screen name={COUPON_ROUTE.DETAIL_COUPON} component={DetailCouponScreen} />
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
        <MainStack.Screen name={SETTING_ROUTE.ORDER_DEFAULT} component={OrderDefaultSettingScreen} />
        <MainStack.Screen name={SETTING_ROUTE.ORDER_HISTORY} component={OrderHistoryScreen} />
        <MainStack.Screen name={SETTING_ROUTE.CONTACT} component={ContactScreen} />
        <MainStack.Screen name={SETTING_ROUTE.SETTING_NOTIFICATION} component={SettingNotificationScreen} />
        <MainStack.Screen name={SETTING_ROUTE.ORDER_HISTORY_DETAIL} component={OrderHistoryDetailScreen} />
        <MainStack.Screen name={AUTHENTICATE_ROUTE.CHANGE_PASS} component={ChangePassword} />
        <MainStack.Screen name={SETTING_ROUTE.DEFAULT_ORDER_DETAIL} component={DefaultOrderDetailScreen} />
        <MainStack.Screen name={SETTING_ROUTE.ORDER_SAVE} component={OrderSave} />
        <MainStack.Screen name={AUTHENTICATE_ROUTE.SEND_OTP_FORGOT_PASS} component={SendOtpForgotPass} />
        <MainStack.Screen name={HOME_ROUTE.EDIT_ORDER} component={EditOrderScreen} />
        <MainStack.Screen name={ORDER_ROUTE.ORDER_QR_CODE} component={OrderQrCodeScreen} />
        <MainStack.Screen name={ORDER_ROUTE.COUPON_LIST} component={CouponListScreen} />
        <MainStack.Screen name={HOME_ROUTE.CART} component={CartScreen} />
    </MainStack.Navigator>
);

const AnimateTabs = AnimatedTabBarNavigator();

const TabBarIcon = ({ focused, source }: any) => {
    return (
        <StyledIcon
            source={source}
            size={18}
            customStyle={{ tintColor: focused ? Themes.COLORS.primary : Themes.COLORS.silver }}
        />
    );
};
const MainTabContainer = () => {
    // const badgeCount: any = useSelector((state: any) => state.badgeCount);
    const { t } = useTranslation();
    // const { countMessage, countNotification } = badgeCount;
    const tabs: TabsConfig<BubbleTabBarItemConfig> = {
        Home: {
            labelStyle: {
                color: '#5B37B7',
            },
            icon: {
                component: Images.icons.bag,
                activeColor: 'rgba(91,55,183,1)',
                inactiveColor: 'rgba(0,0,0,1)',
            },
            background: {
                activeColor: 'rgba(223,215,243,1)',
                inactiveColor: 'rgba(223,215,243,0)',
            },
        },
        Setting: {
            labelStyle: {
                color: '#1194AA',
            },
            icon: {
                component: Images.icons.bag,
                activeColor: 'rgba(17,148,170,1)',
                inactiveColor: 'rgba(0,0,0,1)',
            },
            background: {
                activeColor: 'rgba(207,235,239,1)',
                inactiveColor: 'rgba(207,235,239,0)',
            },
        },
    };
    const ArrayTabs = [
        {
            name: HOME_ROUTE.ROOT,
            title: t('tab.home'),
            component: HomeStack,
            icon: Images.icons.tab.home,
            tabBarIcon: (iconProps: any) => <TabBarIcon {...iconProps} source={Images.icons.tab.home} />,
        },
        {
            name: STAMP_ROUTE.ROOT,
            title: t('tab.stamp'),
            component: StampStack,
            icon: Images.icons.tab.notification,
            tabBarIcon: (iconProps: any) => <TabBarIcon {...iconProps} source={Images.icons.tab.notification} />,
        },
        {
            name: ORDER_ROUTE.ROOT,
            title: t('tab.order'),
            component: OrderStack,
            icon: Images.icons.tab.notification,
            tabBarIcon: (iconProps: any) => <TabBarIcon {...iconProps} source={Images.icons.tab.notification} />,
        },
        {
            name: COUPON_ROUTE.ROOT,
            title: t('tab.coupon'),
            component: CouponStack,
            icon: Images.icons.tab.account,
            tabBarIcon: (iconProps: any) => <TabBarIcon {...iconProps} source={Images.icons.tab.account} />,
        },
        {
            name: SETTING_ROUTE.ROOT,
            title: t('tab.setting'),
            component: SettingStack,
            icon: Images.icons.tab.setting,
            tabBarIcon: (iconProps: any) => <TabBarIcon {...iconProps} source={Images.icons.tab.setting} />,
        },
    ];
    // const styleIcon = (focused: boolean) => {
    //     return { width: SIZE_ICON, height: SIZE_ICON, tintColor: focused ? Themes.COLORS.white : undefined };
    // };
    // const renderTextBadge = (tabName: string) => {
    //     if (countMessage == 0 && countNotification == 0) return '';
    //     if (tabName === t('tab.matching')) return countMessage < 100 ? countMessage : 99;
    //     if (tabName === t('tab.notification')) return countNotification < 100 ? countNotification : 99;
    // };
    // const renderBadge = (tabName: string, focus: boolean) => {
    //     if (countMessage === 0 && countNotification === 0) return false;
    //     if (tabName === t('tab.matching') && !focus && countMessage > 0) return true;
    //     if (tabName === t('tab.notification') && !focus && countNotification > 0) return true;
    //     return false;
    // };
    return (
        <AnimateTabs.Navigator
            tabBarOptions={{
                activeTintColor: Themes.COLORS.primary,
                activeBackgroundColor: '#FFE8EC',
                tabStyle: {
                    shadowOpacity: 0.1,
                },
            }}
            appearance={{
                dotCornerRadius: 10,
                horizontalPadding: scale(10),
            }}
        >
            {ArrayTabs.map((item, index) => (
                <MainTab.Screen key={`${index}`} options={{ ...item }} {...item} />
            ))}
        </AnimateTabs.Navigator>
    );
};

export default MainTabContainer;
const styles = ScaledSheet.create({
    tabStyleIos: {
        borderColor: Themes.COLORS.red,
        borderWidth: 0.6,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        shadowOpacity: 0.75,
        shadowRadius: 5,
        shadowColor: Themes.COLORS.red,
        shadowOffset: { height: 0, width: 0 },
    },
    tabStyleAndroid: {
        borderColor: Themes.COLORS.red,
        borderWidth: 1,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        elevation: 10,
        shadowRadius: 2,
        position: 'relative',
        shadowColor: Themes.COLORS.red,
        backgroundColor: 'white',
        overflow: 'hidden',
        shadowOpacity: 0.75,
    },
    labelStyle: {
        fontWeight: 'normal',
        marginLeft: 3,
        fontSize: 12,
    },
    wrapperBadge: {
        backgroundColor: Themes.COLORS.secondary,
        width: 22,
        height: 22,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: Themes.COLORS.white,
        position: 'absolute',
        top: -10,
        right: -10,
    },
    textBadge: {
        color: Themes.COLORS.white,
        fontSize: 13,
    },
});
