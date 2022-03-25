import { RootState } from 'app-redux/hooks';
import { updateCartOrder } from 'app-redux/slices/orderSlice';
import { Themes } from 'assets/themes';
import { StyledButton } from 'components/base';
import ModalizeManager from 'components/base/modal/ModalizeManager';
import StyledHeader from 'components/common/StyledHeader';
import CouponTab from 'feature/coupon/components/CouponTab';
import { goBack } from 'navigation/NavigationService';
import React, { useState } from 'react';
import { View } from 'react-native';
import { ScaledSheet, verticalScale } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import { commonStyles } from 'utilities/commonStyles';
import { DiscountType, MODAL_ID, staticValue, TabCouponStatus } from 'utilities/staticData';
import ModalCoupon from './components/ModalCoupon';

const CouponListScreen = () => {
    const { cartOrder } = useSelector((state: RootState) => state.order);
    const dispatch = useDispatch();
    const [cartListCouponOrder, setCartListCouponOrder] = useState(cartOrder);
    const modalize = ModalizeManager();
    const updateCart = () => {
        dispatch(updateCartOrder(cartListCouponOrder));
        modalize.dismiss(MODAL_ID.APPLY_COUPON);
        goBack();
    };

    const updateCouponsCart = (coupons: any) => {
        dispatch(updateCartOrder({ ...cartListCouponOrder, coupons }));
        modalize.dismiss(MODAL_ID.APPLY_COUPON);
        goBack();
    };

    const saveCartCoupon = () => {
        const listCouponsEdit = cartListCouponOrder?.coupons?.filter(
            (item: any) => item?.coupon?.discountType === DiscountType.EACH_DISH,
        );
        const listCouponsModal = listCouponsEdit?.filter(
            (item: any) => !cartOrder?.coupons?.find((itemCart: any) => itemCart?.id === item?.id),
        );
        const listCouponsAll = cartListCouponOrder?.coupons?.filter(
            (item: any) => !listCouponsModal?.find((itemCart: any) => itemCart?.id === item?.id),
        );
        if (listCouponsModal.length > 0) {
            showApplyCoupon(listCouponsModal, listCouponsAll);
        } else updateCart();
    };

    const showApplyCoupon = (listCouponsModal: any, listCouponsAll: any) => {
        modalize.show(
            MODAL_ID.APPLY_COUPON,
            <ModalCoupon
                listCouponsModal={listCouponsModal}
                cartListCouponAll={listCouponsAll}
                setCartListCouponOrder={setCartListCouponOrder}
                updateCouponsCart={updateCouponsCart}
            />,
            {
                modalHeight: verticalScale(staticValue.NUMBER_ITEM_LIST_COUPON_MODAL * 60 + 250),
                scrollViewProps: {
                    contentContainerStyle: { flexGrow: 1 },
                },
            },
            { title: 'order.applyCoupon' },
        );
    };

    const handleUseCoupon = (itemCoupon: any) => {
        const findCouponCart = cartListCouponOrder?.coupons?.find((item: any) => item?.id === itemCoupon?.id);
        const newCoupons = cartListCouponOrder?.coupons?.filter((item: any) => item?.id !== itemCoupon?.id) || [];
        if (findCouponCart) {
            const newCoupons = cartListCouponOrder?.coupons?.filter((item: any) => item?.id !== itemCoupon?.id) || [];
            setCartListCouponOrder({ dishes: cartListCouponOrder?.dishes || [], coupons: newCoupons });
        } else {
            setCartListCouponOrder({
                dishes: cartListCouponOrder?.dishes || [],
                coupons: [...newCoupons, itemCoupon],
            });
        }
    };

    return (
        <View style={styles.container}>
            <StyledHeader title={'order.couponTitle'} />
            <CouponTab
                canUse={TabCouponStatus.CAN_USE}
                cartListCouponOrder={cartListCouponOrder}
                handleUseCoupon={handleUseCoupon}
            />
            <View style={[styles.buttonView, commonStyles.shadow]}>
                <StyledButton
                    disabled={cartOrder?.coupons?.length === cartListCouponOrder?.coupons?.length}
                    title={'order.useCoupon'}
                    onPress={saveCartCoupon}
                    customStyle={styles.buttonSave}
                />
                <View style={commonStyles.separatorBottom} />
                <View style={commonStyles.bottomView} />
            </View>
        </View>
    );
};

export default CouponListScreen;

const styles = ScaledSheet.create({
    container: {
        flex: 1,
    },
    body: {
        flex: 1,
    },
    buttonView: {
        backgroundColor: Themes.COLORS.white,
        alignItems: 'center',
        width: '100%',
    },
    buttonSave: {
        marginTop: '22.5@vs',
        marginBottom: '22.5@vs',
    },
    couponName: {
        fontWeight: 'bold',
        fontSize: '16@ms0.3',
        paddingVertical: '10@vs',
    },
    conTentCoupon: {
        fontWeight: 'bold',
        fontSize: '16@ms0.3',
        paddingBottom: '10@vs',
        color: Themes.COLORS.primary,
    },
    modalView: {
        paddingHorizontal: '20@s',
    },
    itemRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    containerItem: {
        width: '100%',
        marginBottom: '10@vs',
        backgroundColor: Themes.COLORS.white,
    },
    imgItem: {
        width: '60@s',
        height: '60@s',
        marginRight: '20@s',
    },
    nameOrder: {
        fontWeight: 'bold',
    },
    chooseButton: {
        width: '16@s',
        height: '16@s',
        borderRadius: 16,
        borderWidth: 2,
    },
});
