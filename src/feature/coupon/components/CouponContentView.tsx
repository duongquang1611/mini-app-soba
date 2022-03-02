import Images from 'assets/images';
import { Themes } from 'assets/themes';
import { StyledIcon, StyledImage, StyledText } from 'components/base';
import React from 'react';
import { ImageBackground, StyleProp, View, ViewStyle } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ScaledSheet } from 'react-native-size-matters';

interface IProps {
    canUse?: boolean;
    customStyle?: StyleProp<ViewStyle>;
    isModal?: boolean;
}

const WrapComponent = ({ children, isModal, customStyle }: any) => {
    return isModal ? (
        <View style={customStyle}>{children}</View>
    ) : (
        <KeyboardAwareScrollView style={customStyle} enableOnAndroid={true} showsVerticalScrollIndicator={false}>
            {children}
        </KeyboardAwareScrollView>
    );
};

const CouponContentView = (props: IProps) => {
    const { canUse, customStyle, isModal = false } = props;

    return (
        <WrapComponent customStyle={[styles.container, customStyle]} isModal={isModal}>
            <View style={styles.body}>
                <View style={styles.contentContainer}>
                    {isModal ? (
                        <View style={styles.wrapTextGetCoupon}>
                            <StyledIcon size={24} source={Images.icons.giftOpenSmall} />
                            <StyledText originValue={'3つクーポンをGETできます'} customStyle={styles.textGetCoupon} />
                        </View>
                    ) : (
                        <StyledText originValue={'クーポンＩＤ：CP690001'} customStyle={styles.time} />
                    )}
                    <StyledText originValue={'【リリース記念ＳＣ用】香味１杯　無料'} customStyle={styles.title} />
                    <ImageBackground style={styles.img} source={Images.photo.ptCouponDetail}>
                        {!canUse && (
                            <View style={styles.transparent}>
                                <StyledImage source={Images.photo.used} customStyle={styles.imgQr} />
                            </View>
                        )}
                    </ImageBackground>
                    <View style={styles.rowView}>
                        <StyledIcon source={Images.icons.calendar} size={20} customStyle={styles.iconDate} />
                        <StyledText i18nText={'有効期限：無制限'} customStyle={styles.title} />
                    </View>
                    <StyledText i18nText={'有効期限：無制限'} customStyle={styles.contentTitle} />
                    <StyledText
                        originValue={
                            'リリース記念ＳＣ用】香味１杯　無料【リリース記念ＳＣ用】香味１杯　無料【リリース記念ＳＣ用】\n香味１杯　無料【リリース記念ＳＣ用】香味１杯　無料【リリース記念ＳＣ用】香味１杯　無料【リリース記念ＳＣ用】香味１杯　無料【リリース記念ＳＣ用】香味１杯　無料【リリース記念ＳＣ用】香味１杯　無料【リリース記念ＳＣ用】香味１杯　無料【リリース記念ＳＣ用】香味１杯　無料【リリース記念ＳＣ用】香味\n１杯　無料【リリース記念ＳＣ用】香味１杯　無料【リリース記念ＳＣ用】香味１杯　無料【リリース記念ＳＣ用】香味１杯　無料【リリース記念ＳＣ用】香味１杯　無料【リリース記念ＳＣ用】香味１杯　無料【リリース記念ＳＣ用】香味１杯　無料【リリース記念ＳＣ用】香味１杯　無料【リリース記念ＳＣ用】香味１杯　無料【リリース記念ＳＣ用】香味１杯　無料【リリース記念ＳＣ用】香味１杯　無料【リリース記念ＳＣ用】香味１杯　無料【リリース記念ＳＣ用】香味１杯　無料【リリース記念ＳＣ用】香味１杯　無料【リリース記念ＳＣ用】香味１杯　無料'
                        }
                        isBlack
                    />
                </View>
            </View>
        </WrapComponent>
    );
};

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
        borderRadius: 10,
        overflow: 'hidden',
    },
    transparent: {
        width: '100%',
        height: '335@vs',
        marginVertical: '10@vs',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(34, 34, 34, 0.5)',
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
    iconDate: {
        marginRight: '15@s',
    },
    textGetCoupon: {
        fontSize: '16@ms0.3',
        marginLeft: '10@s',
        fontWeight: 'bold',
        color: Themes.COLORS.primary,
    },
    wrapTextGetCoupon: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: '30@vs',
        marginTop: '15@vs',
    },
});

export default CouponContentView;
