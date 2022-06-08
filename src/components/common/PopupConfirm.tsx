import Images from 'assets/images';
import { Themes } from 'assets/themes';
import { StyledButton, StyledIcon, StyledText, StyledTouchable } from 'components/base';
import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { POPUP_TYPE } from 'utilities/staticData';

interface IProps {
    type?: POPUP_TYPE;
    customStyle?: StyleProp<ViewStyle>;
    title?: any;
    content?: any;
    textButtonCancel?: string;
    textButtonOk?: string;
    onOk?: any;
    onCancel?: any;
    nonPaddingVertical?: boolean;
    onPressIconClose?: any;
}
const IMAGE_SIZE = [155, 120, 100];
const IMAGE_PATH = [Images.icons.confirm, Images.icons.success, Images.icons.error];
const COLORS_CANCEL = [Themes.COLORS.white, Themes.COLORS.white];

const PopupConfirm = (props: IProps) => {
    const {
        type = POPUP_TYPE.CONFIRM,
        customStyle,
        title = '',
        content = '',
        textButtonCancel,
        textButtonOk = 'common.yes',
        onCancel,
        onOk,
        nonPaddingVertical = false,
        onPressIconClose,
    } = props;

    return (
        <View style={[styles.container, customStyle]}>
            <StyledTouchable customStyle={styles.icClose} onPress={onPressIconClose}>
                <StyledIcon source={Images.icons.closeCircle} size={20} />
            </StyledTouchable>
            <View style={styles.wrapImg}>
                <StyledIcon source={IMAGE_PATH[type]} size={IMAGE_SIZE[type]} />
            </View>
            <StyledText i18nText={title} customStyle={styles.title} />
            <StyledText i18nText={content} customStyle={styles.content} />
            <View style={styles.wrapButton}>
                {!!textButtonCancel && (
                    <>
                        <StyledButton
                            title={textButtonCancel}
                            colors={COLORS_CANCEL}
                            customStyle={styles.cancelBtn}
                            onPress={onCancel}
                            customStyleText={[styles.cancelBtnText, nonPaddingVertical && styles.lineHeightText]}
                            customContentStyle={nonPaddingVertical && styles.nonPaddingVer}
                        />
                        <View style={styles.separator} />
                    </>
                )}
                <StyledButton
                    title={textButtonOk}
                    customStyle={styles.okBtn}
                    onPress={onOk}
                    customStyleText={[styles.okBtnText, nonPaddingVertical && styles.lineHeightText]}
                    customContentStyle={nonPaddingVertical && styles.nonPaddingVer}
                />
            </View>
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        flex: 1,
    },
    wrapImg: {
        height: '180@vs',
        backgroundColor: Themes.COLORS.headerBackground,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    wrapButton: {
        flexDirection: 'row',
        paddingHorizontal: '20@vs',
    },
    cancelBtn: {
        width: 'auto',
        borderColor: Themes.COLORS.primary,
        borderWidth: 1,
        flex: 1,
    },
    okBtn: {
        width: 'auto',
        flex: 1,
    },
    nonPaddingVer: {
        paddingVertical: '2@vs',
    },
    lineHeightText: {
        lineHeight: '25@vs',
    },
    cancelBtnText: {
        color: Themes.COLORS.textPrimary,
        fontSize: '16@ms0.3',
        textAlign: 'center',
    },
    okBtnText: {
        fontSize: '16@ms0.3',
        textAlign: 'center',
    },
    separator: {
        width: '10@s',
    },
    title: {
        fontWeight: 'bold',
        fontSize: '18@ms0.3',
        marginTop: '40@vs',
        marginBottom: '20@vs',
        textAlign: 'center',
        paddingHorizontal: '20@s',
    },
    content: {
        paddingHorizontal: '20@s',
        textAlign: 'center',
        color: Themes.COLORS.textSecondary,
        marginBottom: '50@vs',
    },
    icClose: {
        position: 'absolute',
        top: '17@vs',
        right: '12@vs',
        zIndex: 1,
    },
});

export default PopupConfirm;
