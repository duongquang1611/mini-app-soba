import Images from 'assets/images';
import { Themes } from 'assets/themes';
import { StyledImageBackground } from 'components/base/StyledImage';
import React, { useMemo } from 'react';
import { Text } from 'react-native';
import { scale, ScaledSheet } from 'react-native-size-matters';

const PointExchangeView = ({
    stampAmount,
    customStyle,
    customStyleText,
    customStyleCurrency,
    bigSize = false,
}: any) => {
    const isLongText = useMemo(() => stampAmount && `${stampAmount}`?.length >= 2, [stampAmount]);

    return stampAmount ? (
        <StyledImageBackground
            source={Images.photo.couponAmount}
            style={[
                styles.imgCouponAmount,
                bigSize && {
                    width: scale(30),
                    height: scale(30),
                },
                customStyle,
            ]}
        >
            <Text
                style={[
                    styles.textCouponAmount,
                    {
                        fontSize: scale(bigSize ? (isLongText ? 11 : 13) : isLongText ? 9 : 11),
                    },
                    customStyleText,
                ]}
            >
                {stampAmount}
                <Text
                    style={[
                        styles.textCurrency,
                        {
                            fontSize: scale(bigSize ? (isLongText ? 7 : 9) : isLongText ? 5 : 7),
                        },
                        customStyleCurrency,
                    ]}
                >
                    {'個'}
                </Text>
            </Text>
        </StyledImageBackground>
    ) : null;
};

const styles = ScaledSheet.create({
    imgCouponAmount: {
        width: '26@s',
        height: '26@s',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textCouponAmount: {
        fontWeight: 'bold',
        color: Themes.COLORS.headerBackground,
    },
    textCurrency: {
        textAlign: 'center',
    },
});

export default PointExchangeView;
