import Images from 'assets/images';
import Metrics from 'assets/metrics';
import { Themes } from 'assets/themes';
import { StyledIcon, StyledText, StyledTouchable } from 'components/base';
import { goBack } from 'navigation/NavigationService';
import React, { memo, useState } from 'react';
import { ImageStyle, StatusBar, StyleProp, TextStyle, View, ViewProps, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { scale, ScaledSheet } from 'react-native-size-matters';
import { isIos } from 'utilities/helper';
import { staticValue } from 'utilities/staticData';

export interface StyledHeaderProps extends ViewProps {
    iconBack?: any;
    iconRight?: any;
    iconCenter?: any;
    hasBack?: boolean;
    title?: string;
    titleParams?: any;
    textRight?: string;
    onPressBack?(): void;
    onPressRight?(): void;
    customTitleStyle?: StyleProp<TextStyle>;
    customCenterContainer?: StyleProp<ViewStyle>;
    customBackContainer?: StyleProp<ImageStyle>;
    customContainerIconBack?: StyleProp<ViewStyle>;
    customIconCenter?: StyleProp<ImageStyle>;
    customIconRight?: StyleProp<ImageStyle>;
    customStyleLogo?: StyleProp<ImageStyle>;
    customRightContainer?: StyleProp<ViewStyle>;
    customContainer?: StyleProp<ViewStyle>;
    sizeIconCenter?: number;
    renderBack?: any;
    renderRight?: any;
    renderCenter?: any;
    largeTitleHeader?: boolean;
    iconSize?: number;
}

const StyledHeader = (props: StyledHeaderProps) => {
    const insets = useSafeAreaInsets();
    const {
        title = '',
        hasBack = true,
        onPressBack,
        onPressRight,
        iconBack = Images.icons.back,
        iconCenter,
        iconRight,
        customBackContainer,
        customTitleStyle,
        customCenterContainer,
        customContainer,
        customIconRight,
        customRightContainer,
        customIconCenter,
        sizeIconCenter = 18,
        renderBack,
        renderRight,
        renderCenter,
        textRight = '',
        titleParams,
        largeTitleHeader = false,
        iconSize,
    } = props;
    const [rightLayout, setRightLayout] = useState({ width: 0, height: 0 });

    const handleBack = () => {
        if (onPressBack) {
            onPressBack();
        } else {
            goBack();
        }
    };

    const onLayoutRight = (data: any) => {
        const { width, height } = data?.nativeEvent?.layout;
        setRightLayout({ width, height });
    };

    return (
        <>
            <StatusBar backgroundColor={Themes.COLORS.headerBackground} barStyle={'dark-content'} />
            {isIos && <View style={{ height: insets.top, backgroundColor: Themes.COLORS.headerBackground }} />}
            <View style={[styles.container, customContainer]}>
                {hasBack ? (
                    renderBack ? (
                        renderBack()
                    ) : (
                        <StyledTouchable
                            hitSlop={staticValue.DEFAULT_HIT_SLOP}
                            onPress={handleBack}
                            customStyle={[styles.containerBack, customBackContainer]}
                        >
                            <StyledIcon size={24} source={iconBack} customStyle={styles.iconBack} />
                        </StyledTouchable>
                    )
                ) : (
                    <View style={styles.containerBack} />
                )}

                {renderCenter ? (
                    renderCenter()
                ) : (
                    <View
                        style={[
                            styles.containerCenter,
                            customCenterContainer,
                            {
                                width: Metrics.screenWidth - scale(65) - rightLayout.width,
                            },
                        ]}
                    >
                        {iconCenter && (
                            <StyledIcon
                                size={sizeIconCenter}
                                source={iconCenter}
                                customStyle={[styles.iconCenter, customIconCenter]}
                            />
                        )}
                        <StyledText
                            numberOfLines={1}
                            customStyle={[
                                styles.textCenter,
                                largeTitleHeader && styles.largeTitleHeader,
                                customTitleStyle,
                                { marginLeft: scale(hasBack ? 12 : 0) },
                            ]}
                            i18nText={title}
                            i18nParams={titleParams}
                        />
                    </View>
                )}
                {renderRight ? (
                    renderRight()
                ) : (
                    <StyledTouchable
                        onPress={onPressRight}
                        customStyle={[styles.containerRight, customRightContainer]}
                        disabled={!onPressRight}
                        onLayout={onLayoutRight}
                    >
                        {iconRight ? (
                            <StyledIcon
                                size={iconSize || 20}
                                source={iconRight}
                                customStyle={[styles.iconRight, customIconRight]}
                            />
                        ) : textRight ? (
                            <StyledText i18nText={textRight} customStyle={styles.textRight} />
                        ) : null}
                    </StyledTouchable>
                )}
            </View>
        </>
    );
};

const styles = ScaledSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        paddingVertical: '20@vs',
        backgroundColor: Themes.COLORS.headerBackground,
        flexShrink: 1,
    },
    containerBack: {
        marginLeft: '18@s',
        justifyContent: 'center',
        alignItems: 'center',
        height: '24@s',
    },
    containerCenter: {
        alignItems: 'center',
        flexDirection: 'row',
        height: '100%',
    },
    textCenter: {
        fontSize: '18@ms0.3',
        color: Themes.COLORS.textPrimary,
        fontWeight: 'bold',
        lineHeight: '24@vs',
        width: '100%',
    },
    largeTitleHeader: {
        fontSize: '24@ms0.3',
        lineHeight: '32@vs',
    },
    containerRight: {
        marginLeft: 'auto',
        marginRight: '20@s',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        maxWidth: '100@s',
    },
    iconRight: {},
    iconBack: {},
    iconCenter: {
        tintColor: Themes.COLORS.primary,
    },
    textRight: {
        color: Themes.COLORS.primary,
        fontSize: '14@ms0.3',
    },
});

export default memo(StyledHeader);
