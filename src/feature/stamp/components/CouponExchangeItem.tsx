import Images from 'assets/images';
import Metrics from 'assets/metrics';
import { Themes } from 'assets/themes';
import { StyledImage, StyledText } from 'components/base';
import React, { memo } from 'react';
import { View } from 'react-native';
import { scale, ScaledSheet, verticalScale } from 'react-native-size-matters';
import { DDMM, formatDate } from 'utilities/format';
import { staticValue } from 'utilities/staticData';

const itemHeight = 67;
const separatorBottom = 10;
const separatorTop = 10;

const CouponExchangeItem = ({ item, numCol }: any) => {
    const { giftType, status, date } = item;
    return (
        <View
            style={[
                s.wrapItem,
                {
                    backgroundColor:
                        giftType === 1
                            ? Themes.COLORS.headerBackground
                            : giftType === 2
                            ? Themes.COLORS.redOxide
                            : status
                            ? Themes.COLORS.headerBackground
                            : Themes.COLORS.disabled,
                    marginRight: scale(numCol === staticValue.COLUMNS_COUPON_EXCHANGE[0] ? 15 : 9),
                    width:
                        (Metrics.screenWidth -
                            scale(40 + (numCol === staticValue.COLUMNS_COUPON_EXCHANGE[0] ? 15 : 9) * (numCol - 1))) /
                        numCol,
                },
            ]}
        >
            <StyledImage
                source={
                    giftType === 1
                        ? Images.icons[`giftOpen${numCol}`]
                        : giftType === 2
                        ? Images.icons.giftClose
                        : status
                        ? Images.icons.noodlesOn
                        : Images.icons.noodlesOff
                }
                customStyle={{
                    width: giftType === 1 ? '100%' : scale(numCol > staticValue.COLUMNS_COUPON_EXCHANGE[1] ? 32 : 40),
                    height: giftType === 1 ? '100%' : scale(numCol > staticValue.COLUMNS_COUPON_EXCHANGE[1] ? 32 : 40),
                    marginBottom: giftType === 2 ? scale(7) : 0,
                }}
                // resizeMode={'stretch'}
            />
            {status && !giftType && (
                <StyledText originValue={formatDate(date, DDMM)} isBlack customStyle={s.textDate} />
            )}
        </View>
    );
};

const s = ScaledSheet.create({
    wrapItem: {
        borderRadius: 5,
        marginBottom: verticalScale(separatorBottom),
        alignItems: 'center',
        justifyContent: 'center',
        height: scale(itemHeight),
    },
    listCoupon: {
        justifyContent: 'space-between',
        paddingHorizontal: '20@s',
        flexGrow: 1,
    },
    wrapListCoupon: {
        paddingTop: '10@vs',
        maxHeight: scale(itemHeight * 4) + verticalScale(separatorBottom * 3 + separatorTop),
    },
    dashView: {
        marginTop: '10@vs',
    },
    btnExchange: {
        alignSelf: 'center',
        marginBottom: '20@vs',
    },
    textDate: {
        fontSize: '12@ms0.3',
    },
});

export default memo(CouponExchangeItem);
