/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { RootState } from 'app-redux/hooks';
import Images from 'assets/images';
import Metrics from 'assets/metrics';
import { Themes } from 'assets/themes';
import { StyledIcon, StyledImage, StyledText, StyledTouchable } from 'components/base';
import React from 'react';
import { View } from 'react-native';
import { ScaledSheet, scale } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import { TypeDiscountCoupon } from 'utilities/enumData';
import { formatDate, formatRestaurantsCouponShow } from 'utilities/format';
import { getRangeCoupon } from 'utilities/helper';
import { DateType, staticValue } from 'utilities/staticData';
import DashView from './DashView';
import PointExchangeView from './PointExchangeView';

export const CouponItem = (props: any) => {
    const { cartOrder, defaultOrderLocal } = useSelector((state: RootState) => state.order);
    const {
        globalData: { chooseBranch },
    } = useSelector((state: RootState) => state);
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
        isHomeTab,
        isAllRestaurants,
    } = props || {};

    const blStyle = isHomeTab ? stylesSmall : styles;

    const { coupon, usedDate, id: idMemberCoupon, receivedDate, expiryDate, stampAmount = 0 } = item;
    const { image_150, title, startDate, endDate, dateType, expiryDay, expiryDayType } = coupon || {};
    // const isInCartAPI = useMemo(() => status === MemberCouponStatus.IN_CART, [status]);
    const checkChooseTemp = (isHomeTab ? defaultOrderLocal : cartOrderState)?.coupons?.find(
        (itemCoupon: any) => itemCoupon?.id === idMemberCoupon,
    );
    const checkChooseInCart = (isHomeTab ? {} : order || cartOrder)?.coupons?.find(
        (itemCoupon: any) => itemCoupon?.id === idMemberCoupon && itemCoupon?.receivedDate === receivedDate,
    );

    const checkNotRestaurant =
        isAllRestaurants &&
        item?.coupon?.isDiscountAllRestaurants === TypeDiscountCoupon.NOT_DISCOUNT_ALL &&
        !item?.coupon?.restaurants?.map((itemBranch: any) => itemBranch?.id)?.includes(chooseBranch?.id);

    const disabledUse = checkChooseInCart || checkNotRestaurant;
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
                        customStyle={blStyle.btnCanUSe}
                        onPress={handleUseCoupon}
                        disabled={isExchangeCoupon || checkNotRestaurant ? true : disabledUse}
                        hitSlop={staticValue.DEFAULT_HIT_SLOP}
                    >
                        <StyledText
                            i18nText={getText()}
                            customStyle={[
                                blStyle.useText,
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
                    <View style={blStyle.btnCanUSe}>
                        <StyledText
                            i18nText={isBlock ? 'coupon.btnBlock' : 'coupon.btnExpired'}
                            customStyle={blStyle.textDisable}
                            disabled={true}
                        />
                    </View>
                ) : null}
            </>
        );
    };

    return (
        <>
            {showDashTop && <DashView customStyle={blStyle.dash} />}
            <StyledTouchable customStyle={[blStyle.couponItem, customStyle]} onPress={handleGoToDetail}>
                {!!isExchangeCoupon && (
                    <PointExchangeView stampAmount={stampAmount} customStyle={blStyle.stylePointExchange} />
                )}
                <StyledImage resizeMode={'cover'} source={{ uri: image_150 }} customStyle={blStyle.couponImage} />
                <View style={blStyle.content}>
                    <StyledText
                        i18nText={'coupon.titleItemCoupon'}
                        i18nParams={{
                            restaurants: formatRestaurantsCouponShow(coupon?.restaurants, isAllRestaurants, false),
                            title,
                        }}
                        numberOfLines={1}
                        customStyle={blStyle.title}
                    />
                    <View style={blStyle.rowView}>
                        {isExchangeCoupon ? (
                            <>
                                {dateType === DateType.EXPIRED_FROM_RECEIVED ? (
                                    <StyledText
                                        i18nText={getRangeCoupon(expiryDayType)}
                                        i18nParams={{
                                            value: expiryDay,
                                        }}
                                        customStyle={blStyle.time}
                                    />
                                ) : (
                                    <StyledText
                                        i18nText={hasExpired ? 'coupon.rangeDate' : 'coupon.noExpiredDate'}
                                        i18nParams={{
                                            start: formatDate(startDate),
                                            end: formatDate(endDate),
                                            expiryDate: formatDate(expiryDate),
                                        }}
                                        customStyle={blStyle.time}
                                    />
                                )}
                            </>
                        ) : (
                            <>
                                {dateType === DateType.NO_EXPIRED_DATE ? (
                                    <StyledText i18nText={'coupon.noExpiredDate'} customStyle={blStyle.time} />
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
                                        customStyle={blStyle.time}
                                    />
                                )}
                            </>
                        )}
                        {renderActionRight()}
                    </View>
                </View>
                {!!usedDate && (
                    <StyledIcon source={Images.icons.couponUsed} size={70} customStyle={blStyle.stampUsed} />
                )}
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

const stylesSmall = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: Themes.COLORS.lightGray,
    },
    couponItem: {
        flexDirection: 'row',
        paddingTop: '5@vs',
        backgroundColor: Themes.COLORS.white,
        paddingLeft: '5@s',
        paddingRight: '5@s',
    },
    couponImage: {
        width: '30@s',
        height: '30@s',
    },
    content: {
        flexShrink: 1,
        justifyContent: 'space-between',
        marginLeft: '5@s',
        flexGrow: 1,
    },
    time: {
        fontSize: '7@ms0.3',
        color: Themes.COLORS.silver,
        letterSpacing: '-0.5@ms0.3',
        maxWidth: '65@s',
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
        fontSize: '12@ms0.3',
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
