/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { RootState } from 'app-redux/hooks';
import Images from 'assets/images';
import Metrics from 'assets/metrics';
import { Themes } from 'assets/themes';
import { StyledIcon, StyledImage, StyledText, StyledTouchable } from 'components/base';
import React from 'react';
import { View } from 'react-native';
import { scale, ScaledSheet } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import { formatDate } from 'utilities/format';
import { getRangeCoupon } from 'utilities/helper';
import { DateType, staticValue } from 'utilities/staticData';
import DashView from './DashView';
import PointExchangeView from './PointExchangeView';

export const CouponItem = (props: any) => {
    const { cartOrder } = useSelector((state: RootState) => state.order);
    const {
        item = {},
        canUse,
        handleUseCoupon,
        goToDetail,
        cartOrder: cartOrderState,
        isTabCoupon = false,
        order,
        isExchangeCoupon = false,
        customDashStyle,
        customStyle,
        showDashTop = false,
        showDashBottom = true,
    } = props || {};
    const { coupon, usedDate, id: idMemberCoupon, receivedDate, expiryDate, stampAmount = 0 } = item;
    const { image_150, title, startDate, endDate, dateType, expiryDay, expiryDayType } = coupon || {};
    // const isInCartAPI = useMemo(() => status === MemberCouponStatus.IN_CART, [status]);
    const checkChooseTemp = cartOrderState?.coupons?.find((itemCoupon: any) => itemCoupon?.id === idMemberCoupon);
    const checkChooseInCart = (order || cartOrder)?.coupons?.find(
        (itemCoupon: any) => itemCoupon?.id === idMemberCoupon && itemCoupon?.receivedDate === receivedDate,
    );
    const disabledUse = checkChooseInCart;
    const isBlock = Boolean(coupon?.isBlock);
    const hasExpired = dateType === DateType.EXPIRED_DATE;

    const handleGoToDetail = () => {
        goToDetail?.(item);
    };

    const getIcon = () => {
        if (isExchangeCoupon) return Images.icons.next;
        if (disabledUse) return Images.icons.nextGrey;
        return checkChooseTemp ? Images.icons.nextSecondary : Images.icons.next;
    };

    const getText = () => {
        if (isExchangeCoupon) return 'exchangeCoupon.btnExchange';
        if (disabledUse) return 'coupon.btnInCart';
        return checkChooseTemp ? 'coupon.btnUnUse' : isTabCoupon ? 'coupon.btnUseTabCoupon' : 'coupon.btnUse';
    };

    const renderActionRight = () => {
        return (
            <>
                {canUse ? (
                    <StyledTouchable
                        customStyle={styles.btnCanUSe}
                        onPress={handleUseCoupon}
                        disabled={isExchangeCoupon ? true : disabledUse}
                        hitSlop={staticValue.DEFAULT_HIT_SLOP}
                    >
                        <StyledText
                            i18nText={getText()}
                            customStyle={[
                                styles.useText,
                                {
                                    color:
                                        !checkChooseTemp || isExchangeCoupon
                                            ? Themes.COLORS.primary
                                            : Themes.COLORS.secondary,
                                },
                            ]}
                            disabled={isExchangeCoupon ? false : disabledUse}
                        />
                        <StyledIcon source={getIcon()} size={20} />
                    </StyledTouchable>
                ) : isBlock || !usedDate ? (
                    <View style={styles.btnCanUSe}>
                        <StyledText
                            i18nText={isBlock ? 'coupon.btnBlock' : 'coupon.btnExpired'}
                            customStyle={styles.textDisable}
                            disabled={true}
                        />
                    </View>
                ) : null}
            </>
        );
    };

    return (
        <>
            {showDashTop && <DashView customStyle={styles.dash} />}
            <StyledTouchable customStyle={[styles.couponItem, customStyle]} onPress={handleGoToDetail}>
                {!!isExchangeCoupon && (
                    <PointExchangeView stampAmount={stampAmount} customStyle={styles.stylePointExchange} />
                )}
                <StyledImage resizeMode={'cover'} source={{ uri: image_150 }} customStyle={styles.couponImage} />
                <View style={styles.content}>
                    <StyledText originValue={title} numberOfLines={1} customStyle={styles.title} />
                    <View style={styles.rowView}>
                        {isExchangeCoupon ? (
                            <>
                                {dateType === DateType.EXPIRED_FROM_RECEIVED ? (
                                    <StyledText
                                        i18nText={getRangeCoupon(expiryDayType)}
                                        i18nParams={{
                                            value: expiryDay,
                                        }}
                                        customStyle={styles.time}
                                    />
                                ) : (
                                    <StyledText
                                        i18nText={hasExpired ? 'coupon.rangeDate' : 'coupon.noExpiredDate'}
                                        i18nParams={{
                                            start: formatDate(startDate),
                                            end: formatDate(endDate),
                                            expiryDate: formatDate(expiryDate),
                                        }}
                                        customStyle={styles.time}
                                    />
                                )}
                            </>
                        ) : (
                            <>
                                {dateType === DateType.NO_EXPIRED_DATE ? (
                                    <StyledText i18nText={'coupon.noExpiredDate'} customStyle={styles.time} />
                                ) : (
                                    <StyledText
                                        i18nText={dateType ? 'coupon.rangeDate' : 'coupon.expiryDate'}
                                        i18nParams={
                                            dateType === DateType.EXPIRED_DATE
                                                ? {
                                                      start: formatDate(startDate),
                                                      end: formatDate(endDate),
                                                  }
                                                : dateType === DateType.EXPIRED_FROM_RECEIVED
                                                ? {
                                                      start: formatDate(receivedDate),
                                                      end: formatDate(expiryDate),
                                                  }
                                                : {}
                                        }
                                        customStyle={styles.time}
                                    />
                                )}
                            </>
                        )}
                        {renderActionRight()}
                    </View>
                </View>
                {!!usedDate && <StyledIcon source={Images.icons.couponUsed} size={70} customStyle={styles.stampUsed} />}
            </StyledTouchable>
            {showDashBottom && <DashView customStyle={customDashStyle} />}
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
    imgCouponAmount: {
        width: '26@s',
        height: '26@s',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: '15@s',
        left: '23@s',
        zIndex: 1,
    },
    textCouponAmount: {
        fontWeight: 'bold',
        color: Themes.COLORS.headerBackground,
        fontSize: '12@s',
    },
    textCurrency: {
        fontSize: '8@s',
        textAlign: 'center',
    },
    stylePointExchange: {
        position: 'absolute',
        top: '1@s',
        left: '8@s',
        zIndex: 1,
    },
    dash: {
        alignSelf: 'center',
    },
});
