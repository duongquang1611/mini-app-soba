/* eslint-disable @typescript-eslint/no-unused-vars */
import { saveOrderOption } from 'api/modules/api-app/order';
import { RootState } from 'app-redux/hooks';
import { clearMobileOrder, updateCartOrder, updateMobileOrder } from 'app-redux/slices/orderSlice';
import Images from 'assets/images';
import { Themes } from 'assets/themes';
import { StyledButton, StyledIcon, StyledText, StyledTouchable } from 'components/base';
import ModalizeManager from 'components/base/modal/ModalizeManager';
import StyledKeyboardAware from 'components/base/StyledKeyboardAware';
import StyledHeader from 'components/common/StyledHeader';
import AmountOrder from 'feature/order/components/AmountOrder';
import ModalCoupon from 'feature/order/components/ModalCoupon';
import OrderItemCart from 'feature/order/components/OrderItemCart';
import { TAB_NAVIGATION_ROOT } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React, { useEffect, useMemo } from 'react';
import { View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { scale, ScaledSheet, verticalScale } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import { generateDataSaveOrderOption, generateOrderQR } from 'utilities/helper';
import { coupon, DiscountType, MODAL_ID, staticValue } from 'utilities/staticData';

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
            {!!cancelCouponItem && (
                <StyledTouchable onPress={() => cancelCouponItem(id)} customStyle={styles.buttonCancel}>
                    <StyledIcon source={Images.icons.cancel} size={17} />
                </StyledTouchable>
            )}
            <StyledTouchable onPress={onPressCoupon} customStyle={styles.buttonDetail} disabled>
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

const MobileOrderScreen = () => {
    const { order, userInfo } = useSelector((state: RootState) => state);
    const { mobileOrder } = order;
    const { user } = userInfo;
    const mobileOrderQR = useMemo(() => generateOrderQR(mobileOrder, user), [mobileOrder, user]);
    const mobileOrderSaveOrderOption = useMemo(() => generateDataSaveOrderOption(mobileOrder), [mobileOrder]);
    const dispatch = useDispatch();

    useEffect(() => {
        saveOrderMobile();
    }, []);

    const saveOrderMobile = async () => {
        try {
            const res = await saveOrderOption(mobileOrderSaveOrderOption);
            console.log('saveOrderMobile -> res', res);
        } catch (error) {
            console.log('saveOrderMobile -> error', error);
        }
    };

    const edit = () => {
        navigate(TAB_NAVIGATION_ROOT.ORDER_ROUTE.CART);
    };
    const cancelOrderMobile = () => {
        dispatch(clearMobileOrder());
    };

    const cancelItem = (id: number) => {
        const newDishes = mobileOrder?.dishes?.filter((item: any) => item?.id !== id);
        dispatch(updateMobileOrder({ ...mobileOrder, dishes: newDishes }));
    };

    return (
        <>
            <StyledHeader title={'mobileOrder.title'} iconRight={Images.icons.question} />
            <View style={styles.container}>
                <StyledKeyboardAware customStyle={styles.scrollView}>
                    <View style={styles.body}>
                        <View style={styles.qrView}>
                            <QRCode value={mobileOrderQR} size={scale(staticValue.QR_SIZE)} />
                            <StyledButton
                                title={'mobileOrder.qr.edit'}
                                onPress={edit}
                                customStyle={styles.buttonSave}
                            />
                            <StyledButton
                                isNormal={true}
                                title={'mobileOrder.qr.cancel'}
                                onPress={cancelOrderMobile}
                                customStyle={styles.cancelButton}
                                customStyleText={styles.cancelText}
                            />
                        </View>
                        <AmountOrder />
                        <View style={styles.dishesView}>
                            {mobileOrder?.dishes?.map((item: any, index: number) => {
                                return (
                                    <OrderItemCart
                                        canChange={false}
                                        key={index}
                                        data={item}
                                        onCancel={cancelItem}
                                        notGoDetail={true}
                                        hideDashView={mobileOrder?.dishes?.length - 1 === index}
                                    />
                                );
                            })}
                        </View>
                        <View style={styles.couponView}>
                            <StyledText customStyle={styles.title} i18nText={'mobileOrder.coupon.title'} />
                            {/* {coupon.map((item, index) => (
                                <ItemCoupon key={index} data={item} />
                            ))} */}
                            {mobileOrder?.coupons?.map((item: any, index: number) => (
                                <ItemCoupon key={index} data={item} />
                            ))}
                        </View>
                        <View style={styles.bottomView} />
                    </View>
                </StyledKeyboardAware>
            </View>
        </>
    );
};

export default MobileOrderScreen;

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: Themes.COLORS.lightGray,
    },
    scrollView: {},
    body: {
        flex: 1,
    },
    qrView: {
        alignItems: 'center',
        backgroundColor: Themes.COLORS.white,
        paddingTop: '30@vs',
        paddingBottom: '24@vs',
    },
    dishesView: {
        alignItems: 'center',
    },
    couponView: {
        paddingHorizontal: '20@s',
        backgroundColor: Themes.COLORS.white,
        paddingVertical: '10@vs',
        marginBottom: '10@vs',
        marginTop: '10@vs',
    },
    buttonSave: {
        width: '162@s',
        alignSelf: 'center',
        marginTop: '30@vs',
    },
    cancelButton: {
        width: '162@s',
        alignSelf: 'center',
        marginTop: '20@vs',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rowItem: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        marginTop: '10@vs',
        backgroundColor: Themes.COLORS.white,
        alignItems: 'center',
    },
    nameCoupon: {
        width: '93%',
    },
    title: {
        fontSize: '16@ms0.3',
        color: Themes.COLORS.secondary,
        fontWeight: 'bold',
    },
    cancelText: {
        color: Themes.COLORS.primary,
        fontWeight: 'bold',
    },
    icCoupon: {
        tintColor: Themes.COLORS.primary,
    },
    bottomView: {
        height: '34@vs',
        width: '100%',
        backgroundColor: Themes.COLORS.white,
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
});
