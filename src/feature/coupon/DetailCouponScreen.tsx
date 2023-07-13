/* eslint-disable @typescript-eslint/no-unused-vars */
import { couponUse, getCouponDetail, getDetailMemberCoupon } from 'api/modules/api-app/coupon';
import { getDetailMemberStamp } from 'api/modules/api-app/stamp';
import { RootState } from 'app-redux/hooks';
import { updateCartOrder } from 'app-redux/slices/orderSlice';
import { Themes } from 'assets/themes';
import { StyledButton } from 'components/base';
import AlertMessage from 'components/base/AlertMessage';
import StyledHeader from 'components/common/StyledHeader';
import { getCouponData } from 'feature/home/HomeScreen';
import StampItem from 'feature/stamp/components/StampItem';
import { isEmpty } from 'lodash';
import { goBack, navigate } from 'navigation/NavigationService';
import { TAB_NAVIGATION_ROOT } from 'navigation/config/routes';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import { commonStyles } from 'utilities/commonStyles';
import { TypeDiscountCoupon } from 'utilities/enumData';
import { TabCouponStatus } from 'utilities/staticData';
import CouponContentView from './components/CouponContentView';

const SeparatorView = ({ customStyle }: any) => <View style={[styles.separator, customStyle]} />;

const DetailCouponScreen = (props: any) => {
    const {
        order,
        globalData: { chooseBranch },
    } = useSelector((state: RootState) => state);

    const dispatch = useDispatch();
    const {
        canUse,
        titleButton,
        handleExchangeCoupon,
        disabled: disabledProps = false,
        item = {},
        handleUseCoupon,
        cartOrder: cartOrderState,
        fromNotify = false,
        fromHome = false,
    } = props?.route?.params || {};
    const [disabled, setDisabled] = useState(disabledProps);
    const [stampDetail, setStampDetail] = useState(props?.route?.params?.stampDetail || {});

    const [detailMemberCoupon, setDetailMemberCoupon] = useState(item);
    const { coupon, id: idMemberCoupon, status: statusCoupon } = detailMemberCoupon || {};
    const { title = '' } = coupon || {};
    const checkChooseInCart = order.cartOrder?.coupons?.find((itemCoupon: any) => itemCoupon?.id === idMemberCoupon);
    const checkChooseInOrderMobile = order.mobileOrder?.coupons?.find(
        (itemCoupon: any) => itemCoupon?.id === idMemberCoupon,
    );
    const checkNotRestaurant =
        item?.coupon?.isDiscountAllRestaurants === TypeDiscountCoupon.NOT_DISCOUNT_ALL &&
        !item?.coupon?.restaurants?.map((itemBranch: any) => itemBranch?.id)?.includes(chooseBranch?.id);

    const disabledUse = checkChooseInCart || disabled || checkNotRestaurant;
    const disableTextUse = checkChooseInCart || disabled;
    const checkChooseTemp = cartOrderState?.coupons?.find((itemCouponCart: any) => item?.id === itemCouponCart?.id);
    const [isChooseTemp, setIsChooseTemp] = useState(!!checkChooseTemp);

    useEffect(() => {
        getDetailCouponData();
    }, []);

    const getDetailCouponData = async () => {
        try {
            // if is exchange coupon => get coupon by id coupon
            const res = handleExchangeCoupon
                ? await getCouponDetail(coupon?.id)
                : await getDetailMemberCoupon(idMemberCoupon);
            setDetailMemberCoupon(handleExchangeCoupon ? { coupon: res?.data } : res?.data);
        } catch (error) {
            console.log('getCoupon -> error', error);
        }
    };

    const handleUseCouponDefault = async () => {
        try {
            const res = await couponUse(stampDetail?.id, stampDetail?.orderType);
            const newCoupons = order.cartOrder?.coupons?.filter((item: any) => item?.id !== coupon?.id);
            dispatch(
                updateCartOrder({
                    ...order.cartOrder,
                    coupons: [
                        ...newCoupons,
                        {
                            id: coupon?.id,
                            title: coupon?.title,
                        },
                    ],
                }),
            );
            navigate(TAB_NAVIGATION_ROOT.ORDER_ROUTE.CART);
        } catch (error) {
            console.log('handleUseCoupon -> error', error);
            AlertMessage(error);
        }
    };
    const handleUseCouponDetail = async () => {
        if (handleExchangeCoupon) {
            handleExchangeCoupon?.(
                item,
                async () => {
                    const resStampDetail = await getDetailMemberStamp(stampDetail?.id);
                    setStampDetail(resStampDetail?.data);
                    await getCouponData();
                },
                undefined,
                stampDetail,
            );
        } else {
            handleUseCoupon ? handleUseCoupon(detailMemberCoupon) : handleUseCouponDefault();
            if (cartOrderState) {
                setIsChooseTemp(!isChooseTemp);
                goBack();
            }
        }
    };

    return (
        <View style={styles.container}>
            <StyledHeader title={title} />
            {!isEmpty(stampDetail) && (
                <>
                    <SeparatorView />
                    <StampItem item={stampDetail} animation />
                    <SeparatorView />
                </>
            )}
            <CouponContentView
                canUse={canUse}
                data={detailMemberCoupon}
                initDetailNavigate={item}
                hasSeparatorView={!handleExchangeCoupon}
                item={item}
                isExchange={!isEmpty(stampDetail)}
            />

            {(canUse === TabCouponStatus.CAN_USE || handleExchangeCoupon) && !fromNotify && !fromHome && (
                <View style={[styles.wrapButton, commonStyles.shadow]}>
                    <StyledButton
                        title={
                            titleButton ||
                            (disableTextUse ? 'coupon.btnInCart' : isChooseTemp ? 'coupon.btnUnUse' : 'coupon.btnUse')
                        }
                        onPress={handleUseCouponDetail}
                        disabled={handleExchangeCoupon ? false : disabledUse}
                        colors={
                            !isChooseTemp || handleExchangeCoupon
                                ? Themes.COLORS.defaultLinear
                                : [Themes.COLORS.secondary, Themes.COLORS.secondary]
                        }
                        customStyle={styles.btnUse}
                    />
                    <SeparatorView customStyle={styles.separatorBottom} />
                    <View style={styles.bottomView} />
                </View>
            )}
        </View>
    );
};

export default DetailCouponScreen;

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: Themes.COLORS.white,
    },
    title: {
        fontSize: '16@ms0.3',
        fontWeight: 'bold',
        color: Themes.COLORS.secondary,
    },
    wrapButton: {
        backgroundColor: Themes.COLORS.white,
        alignItems: 'center',
    },
    btnUse: {
        marginTop: '20@vs',
        marginBottom: '25@vs',
    },
    separator: {
        height: '10@vs',
        width: '100%',
        backgroundColor: Themes.COLORS.backgroundPrimary,
    },
    separatorBottom: {
        height: '5@vs',
    },
    bottomView: {
        height: '30@vs',
        width: '100%',
        backgroundColor: Themes.COLORS.white,
    },
});
