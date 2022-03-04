/* eslint-disable @typescript-eslint/no-unused-vars */
import Images from 'assets/images';
import { Themes } from 'assets/themes';
import { StyledIcon } from 'components/base';
import TabCouponListScreen from 'feature/coupon/TabCouponListScreen';
// Screen
import HomeScreen from 'feature/home/HomeScreen';
import MenuScreen from 'feature/order/MenuScreen';
import SettingScreen from 'feature/setting/SettingScreen';
import StampCardScreen from 'feature/stamp/StampCardScreen';
import { COUPON_ROUTE, HOME_ROUTE, ORDER_ROUTE, SETTING_ROUTE, STAMP_ROUTE } from 'navigation/config/routes';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { AnimatedTabBarNavigator } from 'react-native-animated-nav-tab-bar';
import { ScaledSheet } from 'react-native-size-matters';

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
    const ArrayTabs = [
        {
            name: HOME_ROUTE.ROOT,
            title: t('tab.home'),
            component: HomeScreen,
            icon: Images.icons.tab.home,
            tabBarIcon: (iconProps: any) => <TabBarIcon {...iconProps} source={Images.icons.tab.home} />,
        },
        {
            name: STAMP_ROUTE.ROOT,
            title: t('tab.stamp'),
            component: StampCardScreen,
            icon: Images.icons.tab.stamp_card,
            tabBarIcon: (iconProps: any) => <TabBarIcon {...iconProps} source={Images.icons.tab.stamp_card} />,
        },
        {
            name: ORDER_ROUTE.ROOT,
            title: t('tab.order'),
            component: MenuScreen,
            icon: Images.icons.tab.bag,
            tabBarIcon: (iconProps: any) => <TabBarIcon {...iconProps} source={Images.icons.tab.bag} />,
        },
        {
            name: COUPON_ROUTE.ROOT,
            title: t('tab.coupon'),
            component: TabCouponListScreen,
            icon: Images.icons.tab.coupon,
            tabBarIcon: (iconProps: any) => <TabBarIcon {...iconProps} source={Images.icons.tab.coupon} />,
        },
        {
            name: SETTING_ROUTE.ROOT,
            title: t('tab.setting'),
            component: SettingScreen,
            icon: Images.icons.tab.user,
            tabBarIcon: (iconProps: any) => <TabBarIcon {...iconProps} source={Images.icons.tab.user} />,
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
            }}
        >
            {ArrayTabs.map((item, index) => (
                <AnimateTabs.Screen key={`${index}`} options={{ ...item }} {...item} />
            ))}
        </AnimateTabs.Navigator>
    );
};

const styles = ScaledSheet.create({});

export default MainTabContainer;
