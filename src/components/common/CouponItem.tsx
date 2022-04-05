/* eslint-disable @typescript-eslint/no-unused-vars */
import { RootState } from 'app-redux/hooks';
import Images from 'assets/images';
import Metrics from 'assets/metrics';
import { Themes } from 'assets/themes';
import { StyledIcon, StyledImage, StyledText, StyledTouchable } from 'components/base';
import React, { useMemo } from 'react';
import { View } from 'react-native';
import { scale, ScaledSheet } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import { formatDate, YYYYMMDD } from 'utilities/format';
import { DateType, MemberCouponStatus, OrderTypeMenu, staticValue } from 'utilities/staticData';
import DashView from './DashView';

export const CouponItem = (props: any) => {
    const { cartOrder } = useSelector((state: RootState) => state.order);
    const {
        item = {},
        canUse,
        handleUseCoupon,
        goToDetail,
        cartOrder: cartOrderState,
        isTabCoupon = false,
        orderType,
        order,
    } = props;
    const { coupon, usedDate, status, id: idMemberCoupon, receivedDate } = item;
    const { image, title, startDate, endDate, dateType } = coupon;
    // const isInCartAPI = useMemo(() => status === MemberCouponStatus.IN_CART, [status]);
    const checkChooseTemp = cartOrderState?.coupons?.find((itemCoupon: any) => itemCoupon?.id === idMemberCoupon);
    const checkChooseInCart = (order || cartOrder)?.coupons?.find(
        (itemCoupon: any) => itemCoupon?.id === idMemberCoupon && itemCoupon?.receivedDate === receivedDate,
    );
    const disabledUse = checkChooseInCart;

    const handleGoToDetail = () => {
        goToDetail?.(item);
    };

    const getIcon = () => {
        if (disabledUse) return Images.icons.nextGrey;
        return checkChooseTemp ? Images.icons.nextSecondary : Images.icons.next;
    };

    const getText = () => {
        if (disabledUse) return 'coupon.btnInCart';
        return checkChooseTemp ? 'coupon.btnUnUse' : isTabCoupon ? 'coupon.btnUseTabCoupon' : 'coupon.btnUse';
    };

    return (
        <>
            <StyledTouchable customStyle={styles.couponItem} onPress={handleGoToDetail}>
                <StyledImage resizeMode={'cover'} source={{ uri: image }} customStyle={styles.couponImage} />
                <View style={styles.content}>
                    <StyledText originValue={title} numberOfLines={1} customStyle={styles.title} />
                    <View style={styles.rowView}>
                        <StyledText
                            i18nText={dateType === DateType.EXPIRED_DATE ? 'coupon.rangeDate' : 'coupon.noExpiredDate'}
                            i18nParams={{
                                start: formatDate(startDate, YYYYMMDD),
                                end: formatDate(endDate, YYYYMMDD),
                            }}
                            customStyle={styles.time}
                        />
                        {canUse ? (
                            <StyledTouchable
                                customStyle={styles.btnCanUSe}
                                onPress={handleUseCoupon}
                                disabled={disabledUse}
                                hitSlop={staticValue.DEFAULT_HIT_SLOP}
                            >
                                <StyledText
                                    i18nText={getText()}
                                    customStyle={[
                                        styles.useText,
                                        {
                                            color: checkChooseTemp ? Themes.COLORS.secondary : Themes.COLORS.primary,
                                        },
                                    ]}
                                    disabled={disabledUse}
                                />
                                <StyledIcon source={getIcon()} size={20} />
                            </StyledTouchable>
                        ) : (
                            !usedDate && (
                                <View style={styles.btnCanUSe}>
                                    <StyledText
                                        i18nText={'coupon.btnExpired'}
                                        customStyle={styles.textDisable}
                                        disabled={true}
                                    />
                                </View>
                            )
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
        flexGrow: 1,
    },
    time: {
        fontSize: '11@ms0.3',
        color: Themes.COLORS.silver,
        letterSpacing: '-0.5@ms0.3',
        maxWidth: Metrics.screenWidth - scale(195),
    },
    useText: {
        color: Themes.COLORS.primary,
        fontSize: '11@ms0.3',
        marginRight: '2@s',
    },
    textDisable: {
        fontSize: '11@ms0.3',
        fontWeight: 'bold',
    },
    title: {
        fontSize: '16@ms0.3',
        fontWeight: 'bold',
        color: Themes.COLORS.secondary,
        marginRight: '18@s',
    },
    rowView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '10@vs',
    },
    btnCanUSe: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 'auto',
    },
    stampUsed: {
        position: 'absolute',
        top: '-2@vs',
        right: 0,
    },
});
