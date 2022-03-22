/* eslint-disable @typescript-eslint/no-unused-vars */
import { RootState } from 'app-redux/hooks';
import { clearSaveOrder, updateSaveOrder } from 'app-redux/slices/orderSlice';
import Images from 'assets/images';
import Metrics from 'assets/metrics';
import { Themes } from 'assets/themes';
import { StyledButton, StyledIcon, StyledText, StyledTouchable } from 'components/base';
import AlertMessage from 'components/base/AlertMessage';
import StyledKeyboardAware from 'components/base/StyledKeyboardAware';
import StyledHeader from 'components/common/StyledHeader';
import { orderBy } from 'lodash';
import { TAB_NAVIGATION_ROOT } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ScaledSheet } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import { POPUP_TYPE, staticValue } from 'utilities/staticData';
import AmountOrder from './components/AmountOrder';
import OrderItemCart from './components/OrderItemCart';

const ItemCoupon = (props: any) => {
    const { cancelCouponItem } = props;
    const { coupon, id, choose } = props?.data;
    return (
        <View style={styles.rowItem}>
            <StyledIcon source={Images.icons.coupon} size={20} customStyle={styles.icCoupon} />
            <View style={styles.nameCoupon}>
                <StyledText originValue={coupon?.title} isBlack />
                {choose ? (
                    <StyledText
                        i18nText={'order.couponUse'}
                        i18nParams={{
                            dish: choose?.title,
                        }}
                        customStyle={styles.dishUse}
                        isBlack
                    />
                ) : (
                    <StyledText i18nText={'order.allDish'} customStyle={styles.dishUse} isBlack />
                )}
            </View>
            <StyledTouchable onPress={() => cancelCouponItem(id)}>
                <StyledIcon source={Images.icons.cancel} size={15} />
            </StyledTouchable>
        </View>
    );
};
const CartScreen = () => {
    const { saveOrder } = useSelector((state: RootState) => state.order);
    const dispatch = useDispatch();
    const [cartOrder, setCartOrder] = useState(saveOrder);
    let num = useRef(0).current;
    cartOrder?.dishes?.forEach(async (rating: any) => {
        num += rating?.totalAmount;
    });
    num += cartOrder?.coupons?.length || 0;
    useEffect(() => {
        setCartOrder(saveOrder);
    }, [saveOrder]);
    const cancelCart = () => {
        AlertMessage('order.deleteCart', {
            textButtonCancel: 'common.cancel',
            onOk: () => dispatch(clearSaveOrder()),
            type: POPUP_TYPE.CONFIRM,
        });
    };

    const cancelItem = (createDate: string) => {
        const newDishes = cartOrder?.dishes?.filter((item: any) => item?.createDate !== createDate);
        setCartOrder({ ...cartOrder, dishes: newDishes });
    };
    const cancelCouponItem = (id: number) => {
        const newCoupons = cartOrder?.coupons?.filter((item: any) => item?.id !== id);
        setCartOrder({ ...cartOrder, coupons: newCoupons });
    };
    const confirm = () => {
        navigate(TAB_NAVIGATION_ROOT.HOME_ROUTE.CART);
    };
    const goToCouponList = () => {
        navigate(TAB_NAVIGATION_ROOT.ORDER_ROUTE.COUPON_LIST, { cartOrder, setCartOrder });
    };
    const createORCode = () => {
        updateCart();
        navigate(TAB_NAVIGATION_ROOT.HOME_ROUTE.MOBILE_ORDER);
    };
    const updateCart = () => {
        dispatch(updateSaveOrder(cartOrder));
    };
    return (
        <View style={styles.container}>
            <StyledHeader title={'order.cartTitle'} textRight={'order.cancelOrder'} onPressRight={cancelCart} />
            <StyledKeyboardAware>
                <View style={styles.body}>
                    <AmountOrder cartOrder={cartOrder} />
                    <View style={styles.orderView}>
                        {cartOrder?.dishes?.map((item: any, index: number) => (
                            <OrderItemCart
                                cartOrder={cartOrder}
                                cancelItem={cancelItem}
                                key={index}
                                data={item}
                                canChange={true}
                                setCartOrder={setCartOrder}
                            />
                        ))}
                    </View>
                    <View style={styles.contentView}>
                        <StyledText customStyle={styles.title} i18nText={'coupon.title'} />
                        {cartOrder?.coupons?.map((item: any, index: number) => (
                            <ItemCoupon key={index} data={item} cancelCouponItem={cancelCouponItem} />
                        ))}
                        {cartOrder?.coupons?.length === 0 && (
                            <View style={styles.noCouponView}>
                                <StyledIcon source={Images.icons.noCoupon} size={40} />
                                <StyledText customStyle={styles.noCoupon} i18nText={'coupon.noCoupon'} />
                            </View>
                        )}
                        <TouchableOpacity onPress={goToCouponList} style={styles.moreCouponView}>
                            <StyledText customStyle={styles.moreCoupon} i18nText={'coupon.moreCoupon'} />
                            <StyledIcon source={Images.icons.add} size={20} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.contentView}>
                        {num > staticValue.MAX_ORDER && (
                            <StyledText i18nText={'order.errorMaxOrder'} customStyle={styles.errText} />
                        )}

                        <StyledButton
                            disabled={num > staticValue.MAX_ORDER}
                            title={'order.qrButton'}
                            onPress={createORCode}
                        />
                        <StyledButton
                            isNormal={true}
                            title={'order.editCartButton'}
                            onPress={confirm}
                            customStyle={styles.productAddition}
                            customStyleText={styles.textProduct}
                        />
                    </View>
                </View>
            </StyledKeyboardAware>
        </View>
    );
};

export default CartScreen;

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: Themes.COLORS.lightGray,
        paddingBottom: Metrics.safeBottomPadding,
    },
    body: {
        flex: 1,
        alignItems: 'center',
    },
    productAddition: {
        backgroundColor: Themes.COLORS.white,
        borderWidth: 1,
        borderColor: Themes.COLORS.primary,
        paddingVertical: '10@vs',
        marginBottom: '10@vs',
    },
    orderItemView: {
        width: '100%',
        paddingVertical: '10@vs',
        paddingHorizontal: '20@s',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: Themes.COLORS.white,
    },
    orderTextView: {
        width: '75%',
        justifyContent: 'space-between',
    },
    titleOrder: {
        fontSize: '16@ms0.3',
        fontWeight: 'bold',
        marginBottom: '5@vs',
    },
    quantity: {
        backgroundColor: Themes.COLORS.lightGray,
        width: '100%',
        borderRadius: 5,
        paddingVertical: '10@vs',
        paddingHorizontal: '20@s',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginTop: '10@vs',
        alignItems: 'center',
    },
    orderView: {
        alignItems: 'center',
        width: '100%',
        backgroundColor: Themes.COLORS.white,
        paddingVertical: '10@vs',
        marginBottom: '10@vs',
    },
    noCouponView: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: '10@vs',
    },
    row: {
        flexDirection: 'row',
    },
    textProduct: {
        color: Themes.COLORS.secondary,
    },
    contentView: {
        backgroundColor: Themes.COLORS.white,
        width: '100%',
        paddingHorizontal: '20@s',
        paddingVertical: '10@vs',
        marginBottom: '10@vs',
    },
    title: {
        fontSize: '16@ms0.3',
        color: Themes.COLORS.secondary,
        fontWeight: 'bold',
    },
    rowItem: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        marginTop: '10@vs',
    },
    nameCoupon: {
        width: '80%',
    },
    numOrderView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: Themes.COLORS.white,
        paddingVertical: '10@vs',
        paddingHorizontal: '20@s',
        width: '100%',
        marginVertical: '10@vs',
    },
    contentText: {
        marginLeft: '5@s',
        fontSize: '18@ms0.3',
        fontWeight: 'bold',
    },
    icBag: {
        tintColor: Themes.COLORS.secondary,
    },
    icCoupon: {
        tintColor: Themes.COLORS.primary,
    },
    cancelText: {
        color: Themes.COLORS.primary,
        marginRight: '15@s',
    },
    moreCoupon: {
        fontWeight: 'bold',
        color: Themes.COLORS.primary,
        marginRight: '10@s',
        fontSize: '16@ms0.3',
    },
    moreCouponView: {
        marginVertical: '10@vs',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    noCoupon: {
        color: Themes.COLORS.silver,
        marginTop: '10@vs',
    },
    errText: {
        color: Themes.COLORS.primary,
        alignSelf: 'center',
    },
    dishUse: {
        color: Themes.COLORS.silver,
        fontSize: '12@ms0.3',
        marginTop: '10@vs',
    },
});
