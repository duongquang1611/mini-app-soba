import { Themes } from 'assets/themes';
import StyledHeader from 'components/common/StyledHeader';
import StyledTabTopView from 'components/common/StyledTabTopView';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { SceneMap } from 'react-native-tab-view';
import { TabCouponStatus } from 'utilities/staticData';
import CouponTab from './components/CouponTab';

const TabCouponListScreen = () => {
    const { t } = useTranslation();

    const routes = [
        { key: 'stampCanUse', title: t('coupon.topTab.canUse') },
        { key: 'stampUsed', title: t('coupon.topTab.used') },
    ];

    const renderScene = SceneMap({
        stampCanUse: () => <CouponTab status={TabCouponStatus.CAN_USE} />,
        stampUsed: () => <CouponTab status={TabCouponStatus.USED} />,
    });

    return (
        <View style={styles.container}>
            <StyledHeader title={'coupon.title'} hasBack={false} largeTitleHeader />
            <StyledTabTopView routes={routes} renderScene={renderScene} />
        </View>
    );
};

export default TabCouponListScreen;

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: Themes.COLORS.backgroundPrimary,
    },
    body: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        marginHorizontal: '20@s',
    },
    buttonSave: {},
    contentContainerTabBar: {
        alignItems: 'center',
    },
    tabStyle: {},
    tabBar: {
        backgroundColor: Themes.COLORS.white,
        borderColor: Themes.COLORS.white,
    },
    indicatorTabBar: {
        height: '100%',
        backgroundColor: Themes.COLORS.primary,
        borderWidth: 1,
        // borderRadius: 10,
        borderColor: Themes.COLORS.white,
    },
    label: {
        fontSize: 13,
        fontWeight: 'bold',
        textAlign: 'center',
        color: Themes.COLORS.silver,
    },
});
