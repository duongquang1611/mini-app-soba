import Metrics from 'assets/metrics';
import { Themes } from 'assets/themes';
import { StyledText } from 'components/base';
import React, { useEffect, useState } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { scale, ScaledSheet } from 'react-native-size-matters';
import { TabBar, TabView } from 'react-native-tab-view';

interface IProps {
    defaultIndex?: number;
    renderScene: any;
    containerStyle?: StyleProp<ViewStyle>;
    contentContainerStyle?: StyleProp<ViewStyle>;
    labelStyle?: StyleProp<ViewStyle>;
    routes: any;
    swipeEnable?: boolean;
    customTabBar?: StyleProp<ViewStyle>;
    activeColor?: string;
    inactiveColor?: string;
    setIndexTab?(index: number): void;
    customIndicatorStyle?: StyleProp<ViewStyle>;
}

const StyledTabTopView = (propsTab: IProps) => {
    const {
        defaultIndex = 0,
        renderScene,
        containerStyle,
        contentContainerStyle,
        labelStyle,
        routes,
        swipeEnable = true,
        customTabBar,
        activeColor,
        inactiveColor,
        setIndexTab,
        customIndicatorStyle,
    } = propsTab;
    const [index, setIndex] = useState(defaultIndex || 0);

    useEffect(() => {
        setIndex(defaultIndex);
        setIndexTab?.(defaultIndex);
    }, [defaultIndex]);

    const renderLabel = ({ route, focused }: any) => (
        <StyledText
            customStyle={[
                styles.label,
                { color: focused ? Themes.COLORS.headerBackground : Themes.COLORS.silver },
                labelStyle,
            ]}
            originValue={route?.title || ''}
        />
    );

    return (
        <View style={[styles.container, containerStyle]}>
            <TabView
                swipeEnabled={swipeEnable}
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={(currentIndex: number) => {
                    setIndex(currentIndex);
                    setIndexTab?.(currentIndex);
                }}
                lazy
                initialLayout={{ width: Metrics.screenWidth }}
                renderTabBar={(props) => (
                    <TabBar
                        style={[styles.tabBar, customTabBar]}
                        pressColor={'transparent'}
                        activeColor={activeColor || Themes.COLORS.primary}
                        inactiveColor={inactiveColor || Themes.COLORS.white}
                        indicatorStyle={[styles.indicatorTabBar, customIndicatorStyle]}
                        contentContainerStyle={[styles.contentContainerTabBar, contentContainerStyle]}
                        renderLabel={renderLabel}
                        {...props}
                    />
                )}
            />
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: Themes.COLORS.transparent,
    },
    contentContainerTabBar: {
        height: '39@vs',
        alignItems: 'center',
    },
    tabBar: {
        backgroundColor: Themes.COLORS.disabled,
        marginTop: '10@vs',
    },
    indicatorTabBar: {
        height: '100%',
        backgroundColor: Themes.COLORS.primary,
    },
    label: {
        fontSize: '14@ms0.3',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    viewLabel: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '40@vs',
        width: (Metrics.screenWidth - scale(80)) / 2,
        borderRadius: '20@vs',
        borderWidth: 1,
        flex: 1,
    },
});

export default StyledTabTopView;
