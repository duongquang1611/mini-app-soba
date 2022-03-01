import Metrics from 'assets/metrics';
import { Themes } from 'assets/themes';
import { StyledText } from 'components/base';
import StyledHeader from 'components/common/StyledHeader';
import React, { useState } from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ScaledSheet } from 'react-native-size-matters';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import CouponTab from './components/CouponTab';

const TabCouponListScreen = () => {
    const [index, setIndex] = useState(0);
    const routes = [
        { key: 'stampCanUse', title: 'coupon.canUse' },
        { key: 'stampUsed', title: 'coupon.used' },
    ];
    const renderScene = SceneMap({
        stampCanUse: () => <CouponTab canUse={true} />,
        stampUsed: () => <CouponTab />,
    });
    return (
        <View style={styles.container}>
            <StyledHeader title={'クーポンリスト'} hasBack={false} />
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: Metrics.screenWidth }}
                sceneContainerStyle={styles.contentContainerTabBar}
                renderTabBar={(props) => (
                    <TabBar
                        style={styles.tabBar}
                        inactiveColor={Themes.COLORS.silver}
                        activeColor={Themes.COLORS.white}
                        tabStyle={styles.tabStyle}
                        indicatorStyle={styles.indicatorTabBar}
                        renderLabel={({ route, color }) => (
                            <StyledText customStyle={[styles.label, { color }]} originValue={route?.title || ''} />
                        )}
                        {...props}
                    />
                )}
            />
        </View>
    );
};

export default TabCouponListScreen;

const styles = ScaledSheet.create({
    container: {
        flex: 1,
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
