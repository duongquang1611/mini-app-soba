import { RootState } from 'app-redux/hooks';
import Metrics from 'assets/metrics';
import { Themes } from 'assets/themes';
import { StyledText } from 'components/base';
import { navigate } from 'navigation/NavigationService';
import { HOME_ROUTE } from 'navigation/config/routes';
import React, { memo, useEffect, useState } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { ScaledSheet, scale } from 'react-native-size-matters';
import { TabBar, TabView } from 'react-native-tab-view';
import { useSelector } from 'react-redux';
import { QR_TAB_TYPE } from 'utilities/enumData';

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
    isHome?: boolean;
    customTabStyle?: StyleProp<ViewStyle>;
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
        isHome = false,
        customTabStyle,
    } = propsTab;
    const [index, setIndex] = useState(defaultIndex || 0);

    const {
        globalData: { chooseBranch },
        globalDataUnSave: { withoutAccount },
    } = useSelector((state: RootState) => state);
    const branchId = chooseBranch?.id;

    useEffect(() => {
        setIndex(defaultIndex);
        setIndexTab?.(defaultIndex);
    }, [defaultIndex]);

    const renderLabel = ({ route, focused }: any) => (
        <StyledText
            customStyle={[
                styles.label,
                {
                    color: focused ? Themes.COLORS.headerBackground : Themes.COLORS.silver,
                    fontWeight: focused ? 'bold' : 'normal',
                },
                labelStyle,
            ]}
            originValue={route?.title || ''}
        />
    );

    return (
        <View style={[styles.container, containerStyle]}>
            {!isHome && <View style={styles.separator} />}
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
                renderTabBar={props => (
                    <TabBar
                        style={[styles.tabBar, customTabBar]}
                        pressColor={'transparent'}
                        activeColor={activeColor || Themes.COLORS.primary}
                        tabStyle={[styles.tabStyle, customTabStyle]}
                        inactiveColor={inactiveColor || Themes.COLORS.white}
                        indicatorStyle={[styles.indicatorTabBar, customIndicatorStyle]}
                        contentContainerStyle={[styles.contentContainerTabBar, contentContainerStyle]}
                        renderLabel={renderLabel}
                        onTabPress={e => {
                            const { key } = e?.route || {};
                            if (isHome && !branchId && !withoutAccount && key !== 'qrCheckIn') {
                                e.preventDefault();
                                if (index !== QR_TAB_TYPE.CHECK_IN) {
                                    setIndex?.(QR_TAB_TYPE.CHECK_IN);
                                    setIndexTab?.(QR_TAB_TYPE.CHECK_IN);
                                }
                                navigate(HOME_ROUTE.CHOOSE_RESTAURANT);
                            }
                        }}
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
    },
    indicatorTabBar: {
        height: '100%',
        backgroundColor: Themes.COLORS.primary,
    },
    label: {
        fontSize: '14@ms0.3',
        textAlign: 'center',
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
    separator: {
        height: '10@vs',
        backgroundColor: Themes.COLORS.lightGray,
    },
    tabStyle: {
        flex: undefined,
        minHeight: undefined,
    },
});

export default memo(StyledTabTopView);
