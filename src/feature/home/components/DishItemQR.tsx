/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { RootState } from 'app-redux/hooks';
import Images from 'assets/images';
import Metrics from 'assets/metrics';
import { Themes } from 'assets/themes';
import { StyledIcon, StyledImage, StyledText, StyledTouchable } from 'components/base';
import DashView from 'components/common/DashView';
import PointExchangeView from 'components/common/PointExchangeView';
import React from 'react';
import { View } from 'react-native';
import { scale, ScaledSheet } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import { formatDate } from 'utilities/format';
import { getRangeCoupon } from 'utilities/helper';
import { DateType, staticValue } from 'utilities/staticData';

export const DishItemQR = (props: any) => {
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
    const checkChooseInCart = !!(order || cartOrder)?.coupons?.find(
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
            <StyledTouchable
                customStyle={styles.btnCanUSe}
                onPress={handleUseCoupon}
                disabled={isExchangeCoupon ? true : disabledUse}
                hitSlop={staticValue.DEFAULT_HIT_SLOP}>
                <StyledIcon source={getIcon()} size={20} />
            </StyledTouchable>
        );
    };

    return (
        <>
            <StyledTouchable customStyle={[styles.dishItem, customStyle]} onPress={handleGoToDetail}>
                <View style={styles.rowName}>
                    <StyledImage resizeMode={'cover'} source={{ uri: image_150 }} customStyle={styles.couponImage} />
                    <StyledText originValue={title} numberOfLines={1} customStyle={styles.title} />
                </View>
                {renderActionRight()}
            </StyledTouchable>
        </>
    );
};

export default DishItemQR;

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: Themes.COLORS.lightGray,
    },
    dishItem: {
        flexDirection: 'row',
        paddingTop: '5@vs',
        backgroundColor: Themes.COLORS.white,
        paddingHorizontal: '5@s',
        alignItems: 'center',
        paddingBottom: '10@vs',
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
        marginHorizontal: '5@s',
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
    rowName: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});
