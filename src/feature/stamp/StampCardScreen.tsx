/* eslint-disable @typescript-eslint/no-unused-vars */
import { RootState } from 'app-redux/hooks';
import Images from 'assets/images';
import Metrics from 'assets/metrics';
import { Themes } from 'assets/themes';
import { StyledButton } from 'components/base';
import ModalizeManager from 'components/base/modal/ModalizeManager';
import StyledHeader from 'components/common/StyledHeader';
import StyledTabTopView from 'components/common/StyledTabTopView';
import React, { memo, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { ScaledSheet, verticalScale } from 'react-native-size-matters';
import { SceneMap } from 'react-native-tab-view';
import { useSelector } from 'react-redux';
import { MODAL_ID, staticValue } from 'utilities/staticData';
import ChooseStampList from './components/ChooseStampList';
import GuideStamp from './components/GuideStamp';
import StampList from './StampList';

const StampCardScreen = () => {
    const { t } = useTranslation();
    const modalize = ModalizeManager();
    const { chooseTickStampIds = {} } = useSelector((state: RootState) => state.globalData);
    const modalizeRef = useRef<Modalize>(null);
    const userTicked = useMemo(() => {
        const lengthTicked = Object.values(chooseTickStampIds).filter((item: any) => Boolean(item))?.length;
        return lengthTicked || 0;
    }, [chooseTickStampIds]);

    const routes = [
        { key: 'stampCanUse', title: t('stamp.canUse') },
        { key: 'stampUsed', title: t('stamp.used') },
    ];

    const renderScene = SceneMap({
        stampCanUse: () => <StampList canUse={true} showEarnStamp={showEarnStamp} />,
        stampUsed: () => <StampList showEarnStamp={showEarnStamp} />,
    });

    const showEarnStamp = (data = []) => {
        modalize.show(
            MODAL_ID.CHOOSE_STAMP,
            <ChooseStampList onPress={() => modalize?.dismiss?.(MODAL_ID.CHOOSE_STAMP)} data={data} />,
            {
                scrollViewProps: {
                    contentContainerStyle: styles.contentEarnStamp,
                },
                snapPoint: verticalScale(487),
                modalHeight: Metrics.screenHeight * staticValue.PERCENT_HEIGHT_POPUP,
                FloatingComponent: () => (
                    <StyledButton
                        title={'common.yes'}
                        customStyle={styles.footerButtonChooseStamp}
                        onPress={() => modalize?.dismiss?.(MODAL_ID.CHOOSE_STAMP)}
                        disabled={!userTicked}
                    />
                ),
            },
            { title: 'chooseStamp.earnStamp' },
        );
    };

    const showGuide = () => {
        modalize.show(
            MODAL_ID.GUIDE_STAMP,
            <GuideStamp onPress={() => modalize?.dismiss?.(MODAL_ID.GUIDE_STAMP)} content={'Test'} />,
            {
                modalHeight: verticalScale(487),
                scrollViewProps: {
                    contentContainerStyle: { flexGrow: 1 },
                },
            },
            { title: 'stamp.guideTitle' },
        );
    };

    return (
        <View style={styles.container}>
            <StyledHeader
                title={'stamp.title'}
                hasBack={false}
                iconRight={Images.icons.question}
                onPressRight={showGuide}
                largeTitleHeader
            />
            <StyledTabTopView routes={routes} renderScene={renderScene} />
        </View>
    );
};

export default memo(StampCardScreen);

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
        backgroundColor: Themes.COLORS.disabled,
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
    customModalOverlay: {
        position: 'absolute',
        backgroundColor: Themes.COLORS.overlayModalize,
        zIndex: 1,
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },
    footerButtonChooseStamp: {
        position: 'absolute',
        right: '20@s',
        bottom: '25@vs',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
    },
    contentEarnStamp: {
        flexGrow: 1,
        paddingBottom: '90@vs',
    },
});
