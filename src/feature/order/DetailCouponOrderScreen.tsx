/* eslint-disable @typescript-eslint/no-unused-vars */
import Images from 'assets/images';
import { Themes } from 'assets/themes';
import { StyledButton, StyledIcon, StyledImage, StyledText } from 'components/base';
import { StyledImageBackground } from 'components/base/StyledImage';
import StyledKeyboardAware from 'components/base/StyledKeyboardAware';
import StyledHeader from 'components/common/StyledHeader';
import React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

const DetailCouponOrderScreen = (props: any) => {
    const { canUse } = props?.route?.params || {};
    const useCoupon = () => null;
    return (
        <View style={styles.container}>
            <StyledHeader title={canUse ? '【リリース記念ＳＣ用】...' : '新年会クーポン'} />
            <StyledKeyboardAware style={styles.container}>
                <View style={styles.body}>
                    <View style={styles.contentContainer}>
                        <StyledText originValue={'クーポンＩＤ：CP690001'} customStyle={styles.time} />
                        <StyledText originValue={'【リリース記念ＳＣ用】香味１杯　無料'} customStyle={styles.title} />
                        <StyledImageBackground style={styles.img} source={Images.photo.ptCouponDetail}>
                            {/* {!canUse && (
                                <View style={styles.transparent}>
                                    <StyledImage source={Images.photo.used} customStyle={styles.imgQr} />
                                </View>
                            )} */}
                        </StyledImageBackground>
                        <StyledImage source={Images.photo.qrCode} customStyle={styles.imgQr} />
                        <View style={styles.rowView}>
                            <StyledIcon source={Images.icons.calendar} size={20} customStyle={styles.iconDate} />
                            <StyledText i18nText={'有効期限：無制限'} customStyle={styles.title} />
                        </View>
                        <StyledText i18nText={'有効期限：無制限'} customStyle={styles.contentTitle} />
                        <StyledText originValue={'content'} isBlack />
                    </View>
                </View>
            </StyledKeyboardAware>
            {canUse && (
                <View style={styles.buttonView}>
                    <StyledButton title={'クーポン使用'} />
                </View>
            )}
        </View>
    );
};

export default DetailCouponOrderScreen;

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: Themes.COLORS.lightGray,
    },
    contentContainer: {
        width: '100%',
        backgroundColor: Themes.COLORS.white,
        marginBottom: '10@vs',
        paddingHorizontal: '20@s',
        paddingVertical: '10@vs',
    },
    body: {
        flex: 1,
        alignItems: 'center',
    },
    time: {
        fontSize: '12@ms0.3',
        color: Themes.COLORS.silver,
        marginBottom: '10@vs',
    },
    title: {
        fontSize: '16@ms0.3',
        fontWeight: 'bold',
        color: Themes.COLORS.secondary,
    },
    contentTitle: {
        fontSize: '16@ms0.3',
        fontWeight: 'bold',
        color: Themes.COLORS.primary,
        marginVertical: '15@vs',
    },
    img: {
        width: '100%',
        height: '335@vs',
        marginVertical: '10@vs',
        alignItems: 'center',
        justifyContent: 'center',
    },
    transparent: {
        width: '100%',
        height: '335@vs',
        marginVertical: '10@vs',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(34, 34, 34, 0.5)',
    },
    qrView: {
        alignItems: 'center',
        width: '100%',
        backgroundColor: Themes.COLORS.white,
    },
    titleText: {
        color: Themes.COLORS.secondary,
        fontSize: '20@ms0.3',
    },
    imgUsed: {
        width: '335@s',
        height: '335@s',
    },
    imgQr: {
        width: '150@vs',
        height: '150@vs',
        alignSelf: 'center',
        marginBottom: '20@vs',
        marginTop: '10@vs',
    },
    rowView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonUse: {
        alignSelf: 'center',
    },
    iconDate: {
        marginRight: '15@s',
    },
    buttonView: {
        backgroundColor: Themes.COLORS.white,
        paddingVertical: '10@vs',
        alignItems: 'center',
    },
});
