import Metrics from 'assets/metrics';
import { Themes } from 'assets/themes';
import { StyledText } from 'components/base';
import StyledHeader from 'components/common/StyledHeader';
import React, { useState } from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import StampTab from './components/StampTab';

const StampCardScreen = () => {
    const [index, setIndex] = useState(0);
    const routes = [
        { key: 'stampCanUse', title: 'stamp.canUse' },
        { key: 'stampUsed', title: 'stamp.used' },
    ];
    const renderScene = SceneMap({
        stampCanUse: () => <StampTab canUse={true} />,
        stampUsed: () => <StampTab />,
    });
    return (
        <View style={{ flex: 1 }}>
            <StyledHeader title={'stamp card'} />
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

export default StampCardScreen;

const styles = ScaledSheet.create({
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
