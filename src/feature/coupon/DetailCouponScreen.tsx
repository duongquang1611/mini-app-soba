/* eslint-disable @typescript-eslint/no-unused-vars */
import { couponUse, getDetailMemberCoupon } from 'api/modules/api-app/coupon';
import { RootState } from 'app-redux/hooks';
import { updateCartOrder } from 'app-redux/slices/orderSlice';
import Metrics from 'assets/metrics';
import { Themes } from 'assets/themes';
import { StyledButton } from 'components/base';
import AlertMessage from 'components/base/AlertMessage';
import StyledHeader from 'components/common/StyledHeader';
import StampItem from 'feature/stamp/components/StampItem';
import { TAB_NAVIGATION_ROOT } from 'navigation/config/routes';
import { goBack, navigate } from 'navigation/NavigationService';
import React, { useEffect, useMemo, useState } from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import { commonStyles } from 'utilities/commonStyles';
import { MemberCouponStatus, TabCouponStatus } from 'utilities/staticData';
import CouponContentView from './components/CouponContentView';

const SeparatorView = ({ customStyle }: any) => <View style={[styles.separator, customStyle]} />;

const DetailCouponScreen = (props: any) => {
    const { order } = useSelector((state: RootState) => state);
    const dispatch = useDispatch();
    const {
        canUse,
        itemStamp,
        titleButton,
        exchangeCoupon,
        disabled: disabledProps = false,
        item = {},
        handleUseCoupon,
        cartOrder: cartOrderState,
    } = props?.route?.params || {};
    const [disabled, setDisabled] = useState(disabledProps);
    const [detailMemberCoupon, setDetailMemberCoupon] = useState(item);
    const { coupon, id: idMemberCoupon, status: statusCoupon } = detailMemberCoupon;
    const { title = '' } = coupon || {};
    // const isInCartAPI = useMemo(() => item?.status === MemberCouponStatus.IN_CART, [statusCoupon]);
    const checkChooseInCart = order.cartOrder?.coupons?.find((itemCoupon: any) => itemCoupon?.id === idMemberCoupon);
    const checkChooseInOrderMobile = order.mobileOrder?.coupons?.find(
        (itemCoupon: any) => itemCoupon?.id === idMemberCoupon,
    );
    const disabledUse = checkChooseInCart || disabled;
    const checkChooseTemp = cartOrderState?.coupons?.find((itemCouponCart: any) => item?.id === itemCouponCart?.id);
    const [isChooseTemp, setIsChooseTemp] = useState(!!checkChooseTemp);

    useEffect(() => {
        getCouponData();
    }, []);

    const getCouponData = async () => {
        try {
            const res = await getDetailMemberCoupon(idMemberCoupon);
            setDetailMemberCoupon(res.data);
        } catch (error) {
            console.log('getCoupon -> error', error);
        }
    };

    const handleUseCouponDefault = async () => {
        if (exchangeCoupon) {
            exchangeCoupon?.({}, () => {
                setDisabled(true);
            });
        } else {
            try {
                const res = await couponUse(itemStamp?.id, itemStamp?.orderType);
                const newCoupons = order.cartOrder?.coupons?.filter((item: any) => item?.id !== coupon?.id);
                dispatch(
                    updateCartOrder({
                        ...order.cartOrder,
                        coupons: [
                            ...newCoupons,
                            {
                                id: coupon.id,
                                title: coupon.title,
                            },
                        ],
                    }),
                );
                navigate(TAB_NAVIGATION_ROOT.ORDER_ROUTE.CART);
            } catch (error) {
                console.log('handleUseCoupon -> error', error);
                AlertMessage(error);
            }
        }
    };
    const handleUseCouponDetail = () => {
        handleUseCoupon ? handleUseCoupon(detailMemberCoupon) : handleUseCouponDefault();
        if (cartOrderState) {
            setIsChooseTemp(!isChooseTemp);
            goBack();
        }
    };

    return (
        <View style={styles.container}>
            <StyledHeader title={title} />
            {!!itemStamp && (
                <>
                    <SeparatorView />
                    <StampItem item={itemStamp} animation />
                    <SeparatorView />
                </>
            )}
            <CouponContentView canUse={canUse} data={detailMemberCoupon} />

            {canUse === TabCouponStatus.CAN_USE && (
                <View style={[styles.wrapButton, commonStyles.shadow]}>
                    <StyledButton
                        title={
                            titleButton || disabledUse
                                ? 'coupon.btnInCart'
                                : isChooseTemp
                                ? 'coupon.btnUnUse'
                                : 'coupon.btnUse'
                        }
                        onPress={handleUseCouponDetail}
                        disabled={disabledUse}
                        colors={
                            isChooseTemp
                                ? [Themes.COLORS.secondary, Themes.COLORS.secondary]
                                : Themes.COLORS.defaultLinear
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
