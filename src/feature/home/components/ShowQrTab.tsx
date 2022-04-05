import { Themes } from 'assets/themes';
import { StyledButton, StyledText } from 'components/base';
import { AUTHENTICATE_ROUTE, HOME_ROUTE, ORDER_ROUTE } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { scale, ScaledSheet, verticalScale } from 'react-native-size-matters';
import { QR_TAB_TYPE } from 'utilities/enumData';
import { showActionQR } from 'utilities/helper';
import { QR_TAB_DATA, staticValue } from 'utilities/staticData';

const ShowQrTab = (props: any) => {
    const { type = QR_TAB_TYPE.ORDER_DEFAULT, qrValue, onPress, newOrder = '' } = props;
    const qrComponentData: any = QR_TAB_DATA[type];
    const { background, textButton, content1, content2, navigateScreen, orderType, createButton } = qrComponentData;

    const handleQrPress = () => {
        if (qrValue) {
            type === QR_TAB_TYPE.CHECK_IN ? onPress?.() : navigate(navigateScreen, { orderType });
        } else {
            switch (type) {
                case QR_TAB_TYPE.ORDER_DEFAULT:
                    navigate(AUTHENTICATE_ROUTE.ORDER_DEFAULT_MENU, { screen: HOME_ROUTE.HOME });
                    break;
                case QR_TAB_TYPE.MOBILE_ORDER:
                    navigate(ORDER_ROUTE.ROOT);
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
                    {!!qrValue && (
                        <TouchableOpacity
                            activeOpacity={1}
                            onLongPress={() => {
                                type === QR_TAB_TYPE.CHECK_IN
                                    ? showActionQR(qrValue, newOrder, 'QR Check In', 'QR Check In')
                                    : showActionQR(qrValue, newOrder);
                            }}
                        >
                            <QRCode
                                value={qrValue}
                                color={Themes.COLORS.headerBackground}
                                size={scale(staticValue.QR_SIZE_HOME)}
                                backgroundColor={Themes.COLORS.transparent}
                            />
                        </TouchableOpacity>
                    )}
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
                        title={createButton}
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
        paddingBottom: '15@vs',
        paddingTop: '15@vs',
        height: verticalScale(90) + scale(staticValue.QR_SIZE_HOME),
        justifyContent: 'flex-end',
        backgroundColor: 'purple',
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
        lineHeight: '20@vs',
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
