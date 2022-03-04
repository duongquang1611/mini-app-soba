/* eslint-disable @typescript-eslint/no-unused-vars */
import Images from 'assets/images';
import { Themes } from 'assets/themes';
import { StyledButton, StyledIcon, StyledImage, StyledText } from 'components/base';
import StyledHeader from 'components/common/StyledHeader';
import StampItem from 'feature/stamp/components/StampItem';
import React from 'react';
import { ImageBackground, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { color } from 'react-native-reanimated';
import { s, ScaledSheet } from 'react-native-size-matters';
import { staticValue } from 'utilities/staticData';
import CouponContentView from './components/CouponContentView';

const SeparatorView = () => <View style={styles.separator} />;

const DetailCouponScreen = (props: any) => {
    const { canUse, itemStamp, titleButton, exchangeCoupon } = props?.route?.params;

    const handleUseCoupon = () => {
        if (exchangeCoupon) {
            exchangeCoupon?.();
        } else {
            console.log('use coupon');
        }
    };

    return (
        <View style={styles.container}>
            <StyledHeader title={canUse ? '【リリース記念ＳＣ用】...' : '新年会クーポン'} />
            {!!itemStamp && (
                <>
                    <SeparatorView />
                    <StampItem item={itemStamp} animation />
                    <SeparatorView />
                </>
            )}
            <CouponContentView canUse={canUse} />
            {canUse && (
                <View style={styles.buttonView}>
                    <StyledButton title={titleButton || 'クーポン使用'} onPress={handleUseCoupon} />
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
    title: {
        fontSize: '16@ms0.3',
        fontWeight: 'bold',
        color: Themes.COLORS.secondary,
    },
    buttonView: {
        backgroundColor: Themes.COLORS.white,
        paddingVertical: '10@vs',
        alignItems: 'center',
    },
    separator: {
        height: '10@vs',
        width: '100%',
        backgroundColor: Themes.COLORS.backgroundPrimary,
    },
});
