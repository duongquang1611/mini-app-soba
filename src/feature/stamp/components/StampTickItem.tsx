import Images from 'assets/images';
import Metrics from 'assets/metrics';
import { Themes } from 'assets/themes';
import { StyledImage, StyledText, StyledTouchable } from 'components/base';
import React, { memo } from 'react';
import { scale, ScaledSheet, verticalScale } from 'react-native-size-matters';
import { DDMM, formatDate } from 'utilities/format';
import { staticValue } from 'utilities/staticData';

const itemHeight = 67;
const separatorBottom = 10;
const separatorTop = 10;

// open box: couponsCumulative length > 0
// noodle on: createdDate &&  couponsCumulative length <= 0
// noodle off: normal
// close box: couponsExchange (item?.stampAmount)

const StampTickItem = ({ item, numCol, onPress }: any) => {
    const { couponsCumulative, createdDate } = item;

    const handlePressItem = () => {
        onPress?.();
    };

    return (
        <StyledTouchable
            onPress={handlePressItem}
            activeOpacity={0.9}
            disabled={!couponsCumulative?.length && !item?.stampAmount}
            customStyle={[
                s.wrapItem,
                {
                    backgroundColor: couponsCumulative?.length
                        ? Themes.COLORS.headerBackground
                        : item?.stampAmount
                        ? Themes.COLORS.redOxide
                        : createdDate
                        ? Themes.COLORS.headerBackground
                        : Themes.COLORS.disabled,
                    marginRight: scale(numCol === staticValue.COLUMNS_STAMP_TICK[0] ? 15 : 9),
                    width:
                        (Metrics.screenWidth -
                            scale(40 + (numCol === staticValue.COLUMNS_STAMP_TICK[0] ? 15 : 9) * (numCol - 1))) /
                        numCol,
                },
            ]}
        >
            <StyledImage
                source={
                    couponsCumulative?.length
                        ? Images?.icons?.[`giftOpen${numCol}`]
                        : item?.stampAmount
                        ? Images.icons.giftClose
                        : createdDate
                        ? Images.icons.noodlesOn
                        : Images.icons.noodlesOff
                }
                customStyle={{
                    width: couponsCumulative?.length
                        ? '100%'
                        : scale(numCol > staticValue.COLUMNS_STAMP_TICK[1] ? 32 : 40),
                    height: couponsCumulative?.length
                        ? '100%'
                        : scale(numCol > staticValue.COLUMNS_STAMP_TICK[1] ? 32 : 40),
                    marginBottom: item?.stampAmount ? scale(7) : 0,
                }}
            />
            {!!createdDate && (
                <StyledText originValue={formatDate(createdDate, DDMM)} isBlack customStyle={s.textDate} />
            )}
        </StyledTouchable>
    );
};

const s = ScaledSheet.create({
    wrapItem: {
        borderRadius: 5,
        marginBottom: verticalScale(separatorBottom),
        alignItems: 'center',
        justifyContent: 'center',
        height: scale(itemHeight),
        overflow: 'hidden',
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
        marginTop: '2@vs',
    },
});

export default memo(StampTickItem);
