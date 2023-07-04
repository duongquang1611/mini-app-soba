import { RootState } from 'app-redux/hooks';
import Images from 'assets/images';
import { Themes } from 'assets/themes';
import { StyledIcon } from 'components/base';
import RequireLoginScreen from 'feature/authentication/RequireLoginScreen';
import TabCouponListScreen from 'feature/coupon/TabCouponListScreen';
// Screen
import HomeScreen from 'feature/home/HomeScreen';
import MenuScreen from 'feature/order/MenuScreen';
import SettingScreen from 'feature/setting/SettingScreen';
import StampCardScreen from 'feature/stamp/StampCardScreen';
import { navigate } from 'navigation/NavigationService';
import { COUPON_ROUTE, HOME_ROUTE, ORDER_ROUTE, SETTING_ROUTE, STAMP_ROUTE } from 'navigation/config/routes';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
    AnimatedTabBarNavigator,
    DotSize,
    TabButtonLayout,
    TabElementDisplayOptions,
} from 'react-native-animated-nav-tab-bar';
import { ScaledSheet, scale, verticalScale } from 'react-native-size-matters';
import { useSelector } from 'react-redux';

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
    const { t } = useTranslation();
    const { withoutAccount } = useSelector((state: RootState) => state.globalDataUnSave);
    const {
        globalData: { chooseBranch },
    } = useSelector((state: RootState) => state);
    const branchId = chooseBranch?.id;

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
            component: withoutAccount ? () => <RequireLoginScreen title={'stamp.title'} /> : StampCardScreen,
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
            component: withoutAccount ? () => <RequireLoginScreen title={'coupon.title'} /> : TabCouponListScreen,
            icon: Images.icons.tab.coupon,
            tabBarIcon: (iconProps: any) => <TabBarIcon {...iconProps} source={Images.icons.tab.coupon} />,
        },
        {
            name: SETTING_ROUTE.ROOT,
            title: t('tab.setting'),
            component: withoutAccount ? () => <RequireLoginScreen title={'tab.setting'} /> : SettingScreen,
            icon: Images.icons.tab.user,
            tabBarIcon: (iconProps: any) => <TabBarIcon {...iconProps} source={Images.icons.tab.user} />,
        },
    ];

    return (
        <AnimateTabs.Navigator
            tabBarOptions={{
                activeTintColor: Themes.COLORS.primary,
                inactiveTintColor: Themes.COLORS.silver,
                activeBackgroundColor: '#FFE8EC',
                tabStyle: {
                    shadowOpacity: 0.1,
                },
                labelStyle: styles.labelStyle,
            }}
            appearance={{
                topPadding: verticalScale(10),
                dotCornerRadius: 10,
                horizontalPadding: scale(15),
                dotSize: DotSize.SMALL,
                whenInactiveShow: TabElementDisplayOptions.BOTH,
                tabButtonLayout: TabButtonLayout.VERTICAL,
            }}
        >
            {ArrayTabs.map((item, index) => (
                <AnimateTabs.Screen
                    key={`${index}`}
                    options={{ ...item }}
                    {...item}
                    listeners={{
                        tabPress: (e: any) => {
                            // Prevent default action
                            if (
                                [ORDER_ROUTE.ROOT, COUPON_ROUTE.ROOT].includes(item.name) &&
                                !branchId &&
                                !withoutAccount
                            ) {
                                e.preventDefault();
                                navigate(HOME_ROUTE.CHOOSE_RESTAURANT);
                            }
                        },
                    }}
                />
            ))}
        </AnimateTabs.Navigator>
    );
};

const styles = ScaledSheet.create({
    labelStyle: {
        fontSize: '13@ms0.3',
        fontWeight: 'bold',
        marginTop: '7@vs',
    },
});

export default MainTabContainer;
