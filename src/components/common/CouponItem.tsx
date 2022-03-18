import Images from 'assets/images';
import { Themes } from 'assets/themes';
import { StyledIcon, StyledImage, StyledText, StyledTouchable } from 'components/base';
import React, { useMemo } from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { formatDate, YYYYMMDD } from 'utilities/format';
import { DateType, MemberCouponStatus, staticValue } from 'utilities/staticData';
import DashView from './DashView';

export const CouponItem = (props: any) => {
    const { item = {}, canUse, handleUseCoupon, goToDetail } = props;
    const { coupon, usedDate, status } = item;
    const { image, title, startDate, endDate, dateType } = coupon;
    const isInCart = useMemo(() => status === MemberCouponStatus.IN_CART, [status]);

    const handleGoToDetail = () => {
        goToDetail?.(item);
    };

    return (
        <>
            <StyledTouchable customStyle={styles.couponItem} onPress={handleGoToDetail}>
                <StyledImage source={{ uri: image }} customStyle={styles.couponImage} />
                <View style={styles.content}>
                    <StyledText originValue={title} numberOfLines={2} customStyle={styles.title} />
                    <View style={styles.row}>
                        <StyledText
                            i18nText={dateType === DateType.EXPIRED_DATE ? 'coupon.rangeDate' : 'coupon.noExpiredDate'}
                            i18nParams={{
                                start: formatDate(startDate, YYYYMMDD),
                                end: formatDate(endDate, YYYYMMDD),
                            }}
                            customStyle={styles.time}
                        />
                        {!!canUse && (
                            <StyledTouchable
                                customStyle={styles.btnCanUSe}
                                onPress={handleUseCoupon}
                                disabled={isInCart}
                                hitSlop={staticValue.DEFAULT_HIT_SLOP}
                            >
                                <StyledText
                                    i18nText={'coupon.btnUse'}
                                    customStyle={styles.useText}
                                    disabled={isInCart}
                                />
                                <StyledIcon source={isInCart ? Images.icons.nextGrey : Images.icons.next} size={20} />
                            </StyledTouchable>
                        )}
                    </View>
                </View>
                {!!usedDate && <StyledIcon source={Images.icons.couponUsed} size={70} customStyle={styles.stampUsed} />}
            </StyledTouchable>
            <DashView />
        </>
    );
};

export default CouponItem;

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: Themes.COLORS.lightGray,
    },
    couponItem: {
        flexDirection: 'row',
        paddingVertical: '10@vs',
        backgroundColor: Themes.COLORS.white,
        paddingLeft: '20@s',
        paddingRight: '10@s',
    },
    couponImage: {
        width: '60@s',
        height: '60@s',
    },
    content: {
        flexShrink: 1,
        justifyContent: 'space-between',
        marginLeft: '10@s',
    },
    time: {
        fontSize: '11@ms0.3',
        color: Themes.COLORS.silver,
    },
    useText: {
        color: Themes.COLORS.primary,
        fontWeight: 'bold',
        fontSize: '11@ms0.3',
        marginRight: '2@s',
    },
    title: {
        fontSize: '16@ms0.3',
        fontWeight: 'bold',
        color: Themes.COLORS.secondary,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    btnCanUSe: {
        flexDirection: 'row',
    },
    stampUsed: {
        position: 'absolute',
        top: '-2@vs',
        right: 0,
    },
});
