/* eslint-disable @typescript-eslint/no-empty-function */
import { Themes } from 'assets/themes';
import { StyledButton, StyledText } from 'components/base';
import { HOME_ROUTE, ORDER_ROUTE } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React from 'react';
import { View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { scale, ScaledSheet, verticalScale } from 'react-native-size-matters';
import { QR_TAB_TYPE } from 'utilities/enumData';
import { QR_TAB_DATA, staticValue } from 'utilities/staticData';

const ShowQrTab = (props: any) => {
    const { type = QR_TAB_TYPE.ORDER_DEFAULT, qrValue, onPress } = props;
    const qrComponentData: any = QR_TAB_DATA[type];
    const { background, textButton, content1, content2, navigateScreen } = qrComponentData;

    const handleQrPress = () => {
        if (qrValue) {
            type === QR_TAB_TYPE.CHECK_IN ? onPress?.() : navigate(navigateScreen);
        } else {
            switch (type) {
                case QR_TAB_TYPE.ORDER_DEFAULT:
                    navigate(HOME_ROUTE.ORDER_DEFAULT_HOME);
                    break;
                case QR_TAB_TYPE.MOBILE_ORDER:
                    if (qrValue) {
                        navigate(HOME_ROUTE.MOBILE_ORDER);
                    } else {
                        navigate(ORDER_ROUTE.ROOT);
                    }
                    break;
                default:
                    break;
            }
        }
    };

    return (
        <View style={[styles.containerQrTab, { backgroundColor: background || Themes.COLORS.primary }]}>
            {qrValue ? (
                <View style={[styles.qrCodeView]}>
                    <QRCode
                        value={qrValue}
                        color={Themes.COLORS.headerBackground}
                        size={scale(staticValue.QR_SIZE_HOME)}
                        backgroundColor={Themes.COLORS.transparent}
                    />
                    <StyledButton
                        onPress={handleQrPress}
                        title={textButton}
                        customContentStyle={styles.detailButton}
                        customStyleText={styles.textBtn}
                    />
                </View>
            ) : (
                <View style={[styles.noQrCodeView]}>
                    <StyledText i18nText={content1} customStyle={styles.content1} />
                    <StyledText i18nText={content2} customStyle={styles.content2} />
                    <StyledButton
                        onPress={handleQrPress}
                        title={textButton}
                        customContentStyle={styles.detailButton}
                        customStyleText={styles.textBtn}
                    />
                </View>
            )}
        </View>
    );
};

export default ShowQrTab;

const styles = ScaledSheet.create({
    containerQrTab: {
        alignItems: 'center',
        paddingBottom: '10@s',
        paddingTop: '15@vs',
        height: verticalScale(85) + scale(staticValue.QR_SIZE_HOME),
        justifyContent: 'flex-end',
    },
    detailButton: {
        width: '160@s',
        padding: 0,
        marginTop: '10@vs',
        paddingVertical: '8@vs',
    },
    noQrCodeView: {
        alignItems: 'center',
        paddingHorizontal: '30@s',
    },
    qrCodeView: {
        alignItems: 'center',
    },
    content1: {
        textAlign: 'center',
        marginBottom: '25@vs',
        color: Themes.COLORS.headerBackground,
        fontSize: '12@ms0.3',
        lineHeight: '18@vs',
    },
    content2: {
        fontSize: '12@ms0.3',
        lineHeight: '20@vs',
        color: Themes.COLORS.headerBackground,
        textAlign: 'center',
        marginBottom: '8@vs',
    },
    textBtn: {
        color: Themes.COLORS.headerBackground,
        fontSize: '14@ms0.3',
        lineHeight: '21@vs',
    },
});
