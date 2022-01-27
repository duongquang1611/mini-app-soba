import Metrics from 'assets/metrics';
import { Themes } from 'assets/themes';
import { StyledText } from 'components/base';
import StyledHeader from 'components/common/StyledHeader';
import React, { useState } from 'react';
import { View } from 'react-native';
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
            <StyledHeader title={'coupon List'} />
            {/* <View style={styles.body}>
                <StyledButton title={'detail coupon'} onPress={confirm} customStyle={styles.buttonSave} />
            </View> */}
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: Metrics.screenWidth }}
                sceneContainerStyle={styles.contentContainerTabBar}
                renderTabBar={(props) => (
                    <TabBar
                        style={styles.tabBar}
                        inactiveColor={Themes.COLORS.primary}
                        activeColor={Themes.COLORS.red}
                        tabStyle={styles.tabStyle}
                        indicatorStyle={styles.indicatorTabBar}
                        renderLabel={({ route }) => (
                            <StyledText
                                customStyle={[styles.label, { color: 'red' }]}
                                originValue={route?.title || ''}
                            />
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
    tabStyle: {
        borderRadius: 10,
    },
    tabBar: {
        backgroundColor: Themes.COLORS.white,
        borderColor: Themes.COLORS.white,
        borderRadius: 10,
        marginHorizontal: '20@s',
    },
    indicatorTabBar: {
        height: '100%',
        backgroundColor: Themes.COLORS.secondary,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: Themes.COLORS.white,
    },
    label: {
        fontSize: 13,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
