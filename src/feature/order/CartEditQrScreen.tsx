import { saveOrderOption } from 'api/modules/api-app/order';
import { RootState } from 'app-redux/hooks';
import { updateGlobalData } from 'app-redux/slices/globalDataSlice';
import {
    clearDefaultOrder,
    clearDefaultOrderLocal,
    clearMobileOrder,
    updateCartOrder,
    updateDefaultOrder,
    updateDefaultOrderLocal,
    updateMobileOrder,
} from 'app-redux/slices/orderSlice';
import Images from 'assets/images';
import { Themes } from 'assets/themes';
import { StyledButton, StyledIcon, StyledText, StyledTouchable } from 'components/base';
import AlertMessage from 'components/base/AlertMessage';
import ModalizeManager from 'components/base/modal/ModalizeManager';
import StyledKeyboardAware from 'components/base/StyledKeyboardAware';
import StyledHeader from 'components/common/StyledHeader';
import { APP_ROUTE, HOME_ROUTE, ORDER_ROUTE, SETTING_ROUTE, TAB_NAVIGATION_ROOT } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { ScaledSheet, verticalScale } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import { checkHasDataOrder, checkSameData, titleOrder } from 'utilities/helper';
import { DiscountType, MODAL_ID, OrderTypeMenu, POPUP_TYPE, staticValue } from 'utilities/staticData';
import AmountOrder from './components/AmountOrder';
import ModalCoupon from './components/ModalCoupon';
import OrderItemCart from './components/OrderItemCart';

const ItemCoupon = (props: any) => {
    const { cancelCouponItem, data } = props;
    const { cartOrder } = useSelector((state: RootState) => state.order);
    const { coupon, id, choose } = data || {};
    const modalize = ModalizeManager();
    const dispatch = useDispatch();
    const updateCouponsCart = (coupons: any) => {
        dispatch(updateCartOrder({ ...cartOrder, coupons }));
        modalize.dismiss(MODAL_ID.APPLY_COUPON);
    };
    const showApplyCoupon = (listCouponsModal: any, listCouponsNoChange: any) => {
        modalize.show(
            MODAL_ID.APPLY_COUPON,
            <ModalCoupon
                listCouponsModal={listCouponsModal}
                cartListCouponAll={listCouponsNoChange}
                updateCouponsCart={updateCouponsCart}
            />,
            {
                modalHeight: verticalScale(470),
                scrollViewProps: {
                    contentContainerStyle: { flexGrow: 1 },
                },
            },
            { title: 'order.applyCoupon' },
        );
    };

    const onPressCoupon = () => {
        const listCouponsModal = coupon?.discountType === DiscountType.EACH_DISH ? [data] : [];
        const listCouponsNoChange = cartOrder?.coupons?.filter((item: any) => item?.id !== id);
        if (listCouponsModal.length > 0) {
            showApplyCoupon(listCouponsModal, listCouponsNoChange);
        }
    };

    return (
        <View>
            <StyledTouchable onPress={() => cancelCouponItem(id)} customStyle={styles.buttonCancel}>
                <StyledIcon source={Images.icons.cancel} size={17} />
            </StyledTouchable>
            <StyledTouchable onPress={onPressCoupon} customStyle={styles.buttonDetail}>
                <View style={styles.rowItem}>
                    <StyledIcon source={Images.icons.coupon} size={20} customStyle={styles.icCoupon} />
                    <View style={styles.nameCoupon}>
                        <StyledText originValue={coupon?.title} isBlack />
                    </View>
                </View>
                {choose && (
                    <StyledText
                        i18nText={'order.couponUse'}
                        i18nParams={{
                            dish: choose?.dish?.title,
                        }}
                        customStyle={styles.dishUse}
                        isBlack
                    />
                )}
            </StyledTouchable>
        </View>
    );
};

const CartEditQrScreen = (props: any) => {
    const { orderType = OrderTypeMenu.CART_ORDER } = props?.route?.params;
    const { mobileOrder, defaultOrder, defaultOrderLocal } = useSelector((state: RootState) => state.order);
    const getOrderFromType = () => {
        switch (orderType) {
            case OrderTypeMenu.MOBILE_ORDER:
                return mobileOrder;
            case OrderTypeMenu.DEFAULT_ORDER:
                return defaultOrder;
            case OrderTypeMenu.DEFAULT_ORDER_LOCAL:
                return defaultOrderLocal;
            default:
                return mobileOrder;
        }
    };
    const [saveOrderCart, setSaveOrderCart] = useState(getOrderFromType());
    useEffect(() => {
        setSaveOrderCart(getOrderFromType());
    }, [mobileOrder, defaultOrder, defaultOrderLocal]);
    const dispatch = useDispatch();
    let num = useRef(0).current;
    saveOrderCart?.dishes?.forEach(async (rating: any) => {
        num += rating?.totalAmount;
    });
    num += saveOrderCart?.coupons?.length || 0;

    const onClearOrder = async () => {
        try {
            const saveOrderParams = {
                orderType,
                totalAmount: 0,
                dishes: [],
                coupons: [],
            };
            const res = await saveOrderOption(saveOrderParams);
            console.log('saveOrderMobile -> res', res);
        } catch (error) {
            console.log('saveOrderMobile -> error', error);
        }
    };
    const onClear = async () => {
        setSaveOrderCart({});
        if (orderType === OrderTypeMenu.MOBILE_ORDER) {
            dispatch(clearMobileOrder());
        }
        if (orderType === OrderTypeMenu.DEFAULT_ORDER) {
            if (checkSameData(defaultOrder, defaultOrderLocal)) {
                dispatch(clearDefaultOrderLocal());
            }
            dispatch(clearDefaultOrder());
            navigate(APP_ROUTE.MAIN_TAB, { screen: SETTING_ROUTE.ROOT });
        }
        if (orderType === OrderTypeMenu.DEFAULT_ORDER_LOCAL) {
            dispatch(updateDefaultOrderLocal(defaultOrder));
        }
        if (orderType !== OrderTypeMenu.DEFAULT_ORDER) {
            navigate(APP_ROUTE.MAIN_TAB, { screen: HOME_ROUTE.ROOT });
        }
        onClearOrder();
    };

    const cancelCart = () => {
        AlertMessage(orderType === OrderTypeMenu.DEFAULT_ORDER_LOCAL ? 'order.resetDefaultOrder' : 'order.deleteCart', {
            textButtonCancel: 'exchangeCoupon.confirm.textButtonCancel',
            onOk: onClear,
            type: POPUP_TYPE.CONFIRM,
        });
    };
    const popUpCancelDish = (createDate: string) => {
        AlertMessage('order.cancelDish', {
            textButtonCancel: 'exchangeCoupon.confirm.textButtonCancel',
            onOk: () => cancelItem(createDate),
            type: POPUP_TYPE.CONFIRM,
        });
    };
    const popUpCancelCoupon = (id: number) => {
        AlertMessage('order.cancelCoupon', {
            textButtonCancel: 'exchangeCoupon.confirm.textButtonCancel',
            onOk: () => cancelCouponItem(id),
            type: POPUP_TYPE.CONFIRM,
        });
    };

    const cancelItem = (createDate: string) => {
        const newDishes = saveOrderCart?.dishes?.filter((item: any) => item?.createDate !== createDate);

        setSaveOrderCart({ ...saveOrderCart, dishes: newDishes });
    };
    const cancelCouponItem = (id: number) => {
        const newCoupons = saveOrderCart?.coupons?.filter((item: any) => item?.id !== id);
        setSaveOrderCart({ ...saveOrderCart, coupons: newCoupons });
    };

    const goToCouponList = () => {
        navigate(TAB_NAVIGATION_ROOT.ORDER_ROUTE.COUPON_LIST, {
            orderType,
            order: saveOrderCart,
            setOrder: setSaveOrderCart,
        });
    };

    const createQRCode = () => {
        // update mobile order
        if (orderType === OrderTypeMenu.MOBILE_ORDER) {
            dispatch(updateMobileOrder(saveOrderCart));
        }
        if (orderType === OrderTypeMenu.DEFAULT_ORDER) {
            dispatch(updateDefaultOrder(saveOrderCart));
            if (!checkHasDataOrder(defaultOrderLocal) || checkSameData(defaultOrder, defaultOrderLocal)) {
                dispatch(updateDefaultOrderLocal(saveOrderCart));
            }
        }
        if (orderType === OrderTypeMenu.DEFAULT_ORDER_LOCAL) {
            dispatch(updateDefaultOrderLocal(saveOrderCart));
        }
        navigate(ORDER_ROUTE.ORDER_QR_CODE, { orderType, saveOrder: true });
    };
    const saveDefaultOrder = () => {
        dispatch(updateDefaultOrder(saveOrderCart));
        if (!checkHasDataOrder(defaultOrderLocal) || checkSameData(defaultOrder, defaultOrderLocal)) {
            dispatch(updateDefaultOrderLocal(saveOrderCart));
        }
        dispatch(updateGlobalData({ skipOrderDefault: true }));
        navigate(ORDER_ROUTE.ORDER_QR_CODE, { orderType, saveOrder: true });
    };
    const getTextCancelTitle = () => {
        if (orderType === OrderTypeMenu.DEFAULT_ORDER_LOCAL) return 'order.resetOrderDefault';
        return 'order.cancelOrder';
    };
    return (
        <View style={styles.container}>
            <StyledHeader
                title={titleOrder(orderType, 'order.cartTitle')}
                textRight={getTextCancelTitle()}
                onPressRight={cancelCart}
            />
            <StyledKeyboardAware>
                <View style={styles.body}>
                    <AmountOrder order={saveOrderCart} />
                    <View style={styles.orderView}>
                        {saveOrderCart?.dishes?.map((item: any, index: number) => (
                            <OrderItemCart
                                saveOrder={saveOrderCart}
                                cancelItem={popUpCancelDish}
                                key={index}
                                hideDashView={index === saveOrderCart?.dishes?.length - 1}
                                data={item}
                                canChange={true}
                                orderType={orderType}
                                SaveAllOrderCart={setSaveOrderCart}
                            />
                        ))}
                    </View>
                    {orderType !== OrderTypeMenu.DEFAULT_ORDER && (
                        <View style={styles.contentView}>
                            <StyledText customStyle={styles.title} i18nText={'coupon.title'} />
                            {saveOrderCart?.coupons?.map((item: any, index: number) => (
                                <ItemCoupon key={index} data={item} cancelCouponItem={popUpCancelCoupon} />
                            ))}
                            {saveOrderCart?.coupons?.length === 0 && (
                                <View style={styles.noCouponView}>
                                    <StyledIcon source={Images.icons.noCoupon} size={40} />
                                    <StyledText customStyle={styles.noCoupon} i18nText={'coupon.noCoupon'} />
                                </View>
                            )}
                            <StyledTouchable
                                disabled={saveOrderCart?.length >= staticValue.MAX_ORDER}
                                onPress={goToCouponList}
                                customStyle={styles.moreCouponView}
                            >
                                <StyledText customStyle={styles.moreCoupon} i18nText={'coupon.moreCoupon'} />
                                <StyledIcon source={Images.icons.add} size={20} />
                            </StyledTouchable>
                        </View>
                    )}
                    <View style={styles.contentView}>
                        {num > staticValue.MAX_ORDER && (
                            <StyledText i18nText={'order.errorMaxOrder'} customStyle={styles.errText} />
                        )}
                        {orderType !== OrderTypeMenu.DEFAULT_ORDER && (
                            <StyledButton
                                disabled={num <= 0 || num > staticValue.MAX_ORDER}
                                title={'order.qrButton'}
                                onPress={createQRCode}
                            />
                        )}
                        {orderType === OrderTypeMenu.DEFAULT_ORDER && (
                            <StyledButton
                                disabled={num <= 0 || num > staticValue.MAX_ORDER}
                                title={'common.save'}
                                onPress={saveDefaultOrder}
                            />
                        )}
                        <StyledButton
                            isNormal={true}
                            title={'order.editCartButton'}
                            onPress={() =>
                                navigate(ORDER_ROUTE.MENU_EDIT_QR, {
                                    orderType,
                                    order: saveOrderCart,
                                    setOrder: setSaveOrderCart,
                                })
                            }
                            customStyle={styles.productAddition}
                            customStyleText={styles.textProduct}
                        />
                    </View>
                </View>
                <View style={styles.bottomView} />
            </StyledKeyboardAware>
        </View>
    );
};

export default CartEditQrScreen;

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: Themes.COLORS.white,
    },
    body: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: Themes.COLORS.lightGray,
    },
    productAddition: {
        backgroundColor: Themes.COLORS.white,
        borderWidth: 1,
        borderColor: Themes.COLORS.primary,
        paddingVertical: '10@vs',
        marginBottom: '10@vs',
    },
    orderView: {
        alignItems: 'center',
        width: '100%',
        backgroundColor: Themes.COLORS.white,
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
        marginBottom: '5@vs',
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
        width: '90%',
        marginTop: '2@vs',
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
    buttonCancel: {
        position: 'absolute',
        right: '-20@s',
        width: '35@s',
        height: '35@vs',
        alignItems: 'flex-end',
        zIndex: 2,
        top: '5@vs',
        paddingTop: '5@vs',
        paddingRight: '5@vs',
    },
    buttonDetail: {
        width: '95%',
    },
    bottomView: {
        height: '34@vs',
        width: '100%',
        backgroundColor: Themes.COLORS.white,
    },
});
