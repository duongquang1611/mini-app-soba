/* eslint-disable @typescript-eslint/no-unused-vars */
import { getCouponDetail, couponUse } from 'api/modules/api-app/coupon';
import Images from 'assets/images';
import { Themes } from 'assets/themes';
import { StyledButton, StyledIcon, StyledImage, StyledText } from 'components/base';
import AlertMessage from 'components/base/AlertMessage';
import StyledHeader from 'components/common/StyledHeader';
import StampItem from 'feature/stamp/components/StampItem';
import React, { useEffect, useState } from 'react';
import { ImageBackground, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { color } from 'react-native-reanimated';
import { s, ScaledSheet } from 'react-native-size-matters';
import { logger } from 'utilities/helper';
import { staticValue } from 'utilities/staticData';
import CouponContentView from './components/CouponContentView';

const SeparatorView = () => <View style={styles.separator} />;

const DetailCouponScreen = (props: any) => {
    const { canUse, itemStamp, titleButton, exchangeCoupon, disabled: disabledProps = false } = props?.route?.params;
    const [disabled, setDisabled] = useState(disabledProps);
    const [coupon, setCoupon] = useState({});
    useEffect(() => {
        getCoupon();
    }, []);
    const getCoupon = async () => {
        try {
            const res = await getCouponDetail(itemStamp?.id);
            setCoupon(res?.data);
        } catch (error) {
            logger(error);
            AlertMessage(error);
        }
    };
    const handleUseCoupon = async () => {
        if (exchangeCoupon) {
            exchangeCoupon?.({}, () => {
                setDisabled(true);
            });
        } else {
            try {
                const res = await couponUse(itemStamp?.id, itemStamp?.orderType);
                setCoupon(res?.data);
            } catch (error) {
                logger(error);
                AlertMessage(error);
            }
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
                    <StyledButton title={titleButton || 'クーポン使用'} onPress={handleUseCoupon} disabled={disabled} />
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
