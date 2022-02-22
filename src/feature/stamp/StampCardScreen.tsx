/* eslint-disable @typescript-eslint/no-unused-vars */
import Images from 'assets/images';
import Metrics from 'assets/metrics';
import { Themes } from 'assets/themes';
import { StyledIcon, StyledText } from 'components/base';
import LinearView from 'components/common/LinearView';
import StyledHeader from 'components/common/StyledHeader';
import StyledTabTopView from 'components/common/StyledTabTopView';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import StampTab from './components/StampTab';

const StampCardScreen = () => {
    const [index, setIndex] = useState(0);
    const { t } = useTranslation();
    const routes = [
        { key: 'stampCanUse', title: t('stamp.canUse') },
        { key: 'stampUsed', title: t('stamp.used') },
    ];
    const renderScene = SceneMap({
        stampCanUse: () => <StampTab canUse={true} />,
        stampUsed: () => <StampTab />,
    });

    return (
        <View style={styles.container}>
            <StyledHeader title={'stamp.title'} hasBack={false} iconRight={Images.icons.question} />
            <StyledTabTopView routes={routes} renderScene={renderScene} />
        </View>
    );
};

export default StampCardScreen;

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: Themes.COLORS.lightGray,
    },
    contentContainerTabBar: {
        alignItems: 'center',
    },
    tabStyle: {
        alignItems: 'center',
    },
    tabBar: {
        backgroundColor: Themes.COLORS.alto,
        borderColor: Themes.COLORS.white,
        justifyContent: 'center',
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
    contentContainerStyle: {
        height: '37@vs',
        alignItems: 'center',
    },
});
