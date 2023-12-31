import { RootState } from 'app-redux/hooks';
import { updateCartOrder } from 'app-redux/slices/orderSlice';
import Metrics from 'assets/metrics';
import { Themes } from 'assets/themes';
import { StyledButton } from 'components/base';
import ModalizeManager, { HeaderDefault } from 'components/base/modal/ModalizeManager';
import StyledHeader from 'components/common/StyledHeader';
import CouponTab from 'feature/coupon/components/CouponTab';
import { getCouponData } from 'feature/home/HomeScreen';
import { goBack } from 'navigation/NavigationService';
import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { ScaledSheet, verticalScale } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import { commonStyles } from 'utilities/commonStyles';
import { DiscountType, MODAL_ID, OrderTypeMenu, TabCouponStatus } from 'utilities/staticData';
import ModalCoupon from './components/ModalCoupon';
import { Modalize } from 'react-native-modalize';

const CouponListScreen = (props: any) => {
    const { orderType, order, setOrder } = props?.route?.params || {};
    const modalRef = useRef<Modalize>();
    const { cartOrder } = useSelector((state: RootState) => state.order);
    const checkOrder = order || cartOrder;
    const dispatch = useDispatch();
    const [cartListCouponOrder, setCartListCouponOrder] = useState(checkOrder);
    const modalize = ModalizeManager();
    useEffect(() => {
        getCouponData(TabCouponStatus.CAN_USE);
    }, []);
    const updateCart = () => {
        if (orderType !== OrderTypeMenu.CART_ORDER) {
            setCartListCouponOrder(cartListCouponOrder);
            setOrder(cartListCouponOrder);
        } else {
            dispatch(updateCartOrder(cartListCouponOrder));
        }

        modalize.dismiss(MODAL_ID.APPLY_COUPON);
        goBack();
    };

    const updateCouponsCart = (coupons: any) => {
        if (orderType !== OrderTypeMenu.CART_ORDER) {
            setCartListCouponOrder({ ...cartListCouponOrder, coupons });
            setOrder({ ...cartListCouponOrder, coupons });
        } else {
            dispatch(updateCartOrder({ ...cartListCouponOrder, coupons }));
        }
        modalize.dismiss(MODAL_ID.APPLY_COUPON);
        goBack();
    };
    const listCouponsEdit = cartListCouponOrder?.coupons?.filter(
        (item: any) => item?.coupon?.discountType === DiscountType.EACH_DISH,
    );
    const listCouponsModal = listCouponsEdit?.filter(
        (item: any) => !(order || cartOrder)?.coupons?.find((itemCart: any) => itemCart?.id === item?.id),
    );
    const listCouponsAll = cartListCouponOrder?.coupons?.filter(
        (item: any) => !listCouponsModal?.find((itemCart: any) => itemCart?.id === item?.id),
    );

    const saveCartCoupon = () => {
        if (listCouponsModal.length > 0) {
            showApplyCoupon();
        } else updateCart();
    };

    const showApplyCoupon = () => {
        modalRef.current?.open();
    };

    const handleUseCoupon = (itemCoupon: any) => {
        const findCouponCart = cartListCouponOrder?.coupons?.find(
            (item: any) => item?.receivedDate === itemCoupon?.receivedDate && item?.id === itemCoupon?.id,
        );
        const newCoupons =
            cartListCouponOrder?.coupons?.filter(
                (item: any) => !(item?.receivedDate === itemCoupon?.receivedDate && item?.id === itemCoupon?.id),
            ) || [];
        if (findCouponCart) {
            setCartListCouponOrder({ dishes: cartListCouponOrder?.dishes || [], coupons: newCoupons });
        } else {
            setCartListCouponOrder({
                dishes: cartListCouponOrder?.dishes || [],
                coupons: [itemCoupon, ...newCoupons],
            });
        }
    };
    const handlePressIconClose = () => {
        modalRef?.current?.close();
    };

    const ModalChooseMultiDishes = () => {
        return (
            <Modalize
                ref={modalRef}
                withHandle={false}
                scrollViewProps={{
                    keyboardShouldPersistTaps: 'handled',
                    contentContainerStyle: styles.contentContainerStyle,
                }}
                modalHeight={Metrics.screenHeight * 0.8}
                snapPoint={verticalScale(370)}
                HeaderComponent={<HeaderDefault title={'order.applyCoupon'} onPress={handlePressIconClose} />}>
                <ModalCoupon
                    listCouponsModal={listCouponsModal}
                    cartListCouponAll={listCouponsAll}
                    setCartListCouponOrder={setCartListCouponOrder}
                    updateCouponsCart={updateCouponsCart}
                />
            </Modalize>
        );
    };

    return (
        <View style={styles.container}>
            <StyledHeader title={'order.couponTitle'} />
            <ModalChooseMultiDishes />
            <CouponTab
                canUse={TabCouponStatus.CAN_USE}
                cartListCouponOrder={cartListCouponOrder}
                handleUseCoupon={handleUseCoupon}
                order={order}
                orderType={orderType}
            />
            <View style={[styles.buttonView, commonStyles.shadow]}>
                <StyledButton
                    disabled={checkOrder?.coupons?.length === cartListCouponOrder?.coupons?.length}
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
        backgroundColor: Themes.COLORS.lightGray,
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
    footerButtonChooseStamp: {
        position: 'absolute',
        right: '20@s',
        bottom: '25@vs',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
    },
    contentContainerStyle: {
        flexGrow: 1,
    },
});
