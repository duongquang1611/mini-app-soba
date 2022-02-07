import Images from 'assets/images';
import Metrics from 'assets/metrics';
import { Themes } from 'assets/themes';
import { StyledIcon, StyledText, StyledTouchable } from 'components/base';
import { goBack } from 'navigation/NavigationService';
import React from 'react';
import { StyleProp, View, ViewProps, ViewStyle } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { logger } from 'utilities/helper';

interface HeaderProps extends ViewProps {
    isBack?: boolean;
    title?: string;
    iconAction?: any;
    iconQr?: any;
    onPressNoti?(): void;
    onPressQr?(): void;
    iconNoti?: any;
    customStyle?: StyleProp<ViewStyle>;
    onPressAction?(): void;
    isShadow?: boolean;
    customHandleBackPress?(): void;
}

const StyledHeader = (props: HeaderProps) => {
    const {
        isBack = true,
        title,
        iconAction,
        iconQr,
        iconNoti,
        customStyle,
        onPressQr,
        onPressNoti,
        onPressAction,
        isShadow = true,
        customHandleBackPress,
        style,
    } = props;
    const onBack = () => {
        if (customHandleBackPress) {
            customHandleBackPress();
            return;
        }
        goBack();
    };

    if (style) {
        logger('You should use customStyle to implement this component to avoid conflict', true);
    }

    return (
        <View style={[styles.container, customStyle, isShadow && styles.shadow]}>
            <View style={styles.viewHeader}>
                {isBack ? (
                    <StyledTouchable onPress={onBack} customStyle={styles.buttonBack}>
                        <StyledIcon source={Images.icons.back} size={30} />
                    </StyledTouchable>
                ) : (
                    <View style={styles.buttonBack} />
                )}
                <StyledText i18nText={title || ' '} customStyle={styles.title} numberOfLines={1} />
                {(iconQr || iconNoti) && (
                    <View style={styles.iconView}>
                        <StyledTouchable onPress={onPressQr} customStyle={styles.buttonAction}>
                            <StyledIcon source={iconQr} size={15} customStyle={styles.iconAction} />
                        </StyledTouchable>
                        <StyledTouchable onPress={onPressNoti} customStyle={styles.buttonAction}>
                            <StyledIcon source={iconNoti} size={15} customStyle={styles.iconAction} />
                        </StyledTouchable>
                    </View>
                )}
                {iconAction && (
                    <StyledTouchable onPress={onPressAction} customStyle={styles.buttonAction}>
                        <StyledIcon source={iconQr} size={15} customStyle={styles.iconAction} />
                    </StyledTouchable>
                )}
                {!iconQr && !iconNoti && !iconAction && <View style={styles.buttonAction} />}
            </View>
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        backgroundColor: Themes.COLORS.white,
        justifyContent: 'flex-end',
        paddingTop: Metrics.safeTopPadding,
    },
    viewHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: '14@vs',
        paddingHorizontal: '20@s',
    },
    buttonBack: {
        width: '25@vs',
        height: '25@vs',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: '20@ms',
        fontWeight: 'bold',
        maxWidth: '80%',
        color: Themes.COLORS.black,
    },
    buttonAction: {
        width: '25@vs',
        height: '25@vs',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconView: {
        flexDirection: 'row',
    },
    iconAction: {},
    shadow: {
        shadowColor: Themes.COLORS.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.17,
        shadowRadius: 5.49,
        elevation: 5,
    },
});

export default React.memo(StyledHeader);
