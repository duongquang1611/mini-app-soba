import Images from 'assets/images';
import { Themes } from 'assets/themes';
import { StyledButton, StyledIcon, StyledImage, StyledText } from 'components/base';
import StyledHeader from 'components/common/StyledHeader';
import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ScaledSheet } from 'react-native-size-matters';

const DetailCouponScreen = (props: any) => {
    const { canUse } = props?.route?.params;
    const useCoupon = () => {};
    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView enableOnAndroid={true} showsVerticalScrollIndicator={false}>
                <StyledHeader title={'Detail coupon'} />
                <View style={styles.body}>
                    <View style={styles.contentContainer}>
                        <StyledText originValue={'クーポンＩＤ：CP690001'} customStyle={styles.time} />
                        <StyledText originValue={'【リリース記念ＳＣ用】香味１杯　無料'} customStyle={styles.title} />
                        <StyledImage customStyle={styles.img} source={Images.photo.defaultImage} />
                        <StyledImage source={Images.photo.defaultImage} customStyle={styles.imgQr} />
                        <View style={styles.rowView}>
                            <StyledIcon source={Images.icons.eyeOff} size={15} customStyle={styles.iconDate} />
                            <StyledText i18nText={'有効期限：無制限'} customStyle={styles.title} />
                        </View>
                        <StyledText i18nText={'有効期限：無制限'} customStyle={styles.contentTitle} />
                        <StyledText originValue={'content'} />
                    </View>
                </View>
            </KeyboardAwareScrollView>
            {canUse && (
                <View style={styles.buttonView}>
                    <StyledButton title={'use coupon'} onPress={useCoupon} customStyle={styles.buttonUse} />
                </View>
            )}
        </View>
    );
};

export default DetailCouponScreen;

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
    imgQr: {
        width: '180@vs',
        height: '180@vs',
        alignSelf: 'center',
        marginBottom: '20@vs',
    },
    rowView: {
        flexDirection: 'row',
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
    },
});
