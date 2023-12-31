import { saveOrderOption } from 'api/modules/api-app/order';
import { RootState } from 'app-redux/hooks';
import { updateCartOrder, updateMobileOrder } from 'app-redux/slices/orderSlice';
import Images from 'assets/images';
import { Themes } from 'assets/themes';
import { StyledButton, StyledIcon, StyledImage, StyledText, StyledTouchable } from 'components/base';
import AlertMessage from 'components/base/AlertMessage';
import ModalizeManager from 'components/base/modal/ModalizeManager';
import StyledKeyboardAware from 'components/base/StyledKeyboardAware';
import StyledHeader from 'components/common/StyledHeader';
import TextUnderline from 'components/common/TextUnderline';
import AmountOrder from 'feature/order/components/AmountOrder';
import ModalCoupon from 'feature/order/components/ModalCoupon';
import OrderItemCart from 'feature/order/components/OrderItemCart';
import { HOME_ROUTE, TAB_NAVIGATION_ROOT } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React, { useEffect, useMemo, useState } from 'react';
import { Clipboard, Text, TouchableOpacity, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { scale, ScaledSheet, verticalScale } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import { generateDataSaveOrderOption, generateOrderQR, isIos, openURL } from 'utilities/helper';
import { DiscountType, MODAL_ID, orderGuide, OrderTypeMenu, POPUP_TYPE, staticValue } from 'utilities/staticData';

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

const ModalGuide = () => (
    <View>
        <StyledText originValue={orderGuide?.content} isBlack customStyle={styles.contentGuide} />
        <StyledText originValue={orderGuide?.header} isBlack customStyle={styles.headerStep} />
        <View>
            <StyledImage source={Images.photo.line} customStyle={styles.line1} />
            <StyledImage source={Images.photo.line} customStyle={styles.line2} />
            <View>
                {orderGuide?.steps?.map((item, index) => (
                    <StepItem key={index} item={item} largeView={isIos && index === 2} />
                ))}
            </View>
        </View>
    </View>
);

const StepItem = (item: any) => (
    <View style={styles.rowStep}>
        <View style={styles.numberView}>
            <StyledText originValue={item?.item?.index} customStyle={styles.numberValue} />
        </View>
        <StyledImage source={item?.item?.icon} customStyle={styles.icStep} />
        <View style={styles.containView}>
            <Text style={styles.textGuide}>
                {item?.item?.content}
                <TextUnderline
                    onPress={() => openURL(item?.item?.link)}
                    title={item?.item?.textLink}
                    color={Themes.COLORS.primary}
                    customStyleText={styles.textLink}
                />
            </Text>
        </View>
    </View>
);

const MobileOrderScreen = () => {
    const { order, userInfo } = useSelector((state: RootState) => state);
    const { mobileOrder } = order;
    const [orderMobile, setOrderMobile] = useState(mobileOrder);
    const { user } = userInfo;
    const modalize = ModalizeManager();
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
        navigate(TAB_NAVIGATION_ROOT.ORDER_ROUTE.CART_EDIT_QR, {
            orderType: OrderTypeMenu.MOBILE_ORDER,
            setOrder: setOrderMobile,
            order: orderMobile,
        });
    };

    const onClearOrder = () => {
        // dispatch(clearMobileOrder());
        navigate(HOME_ROUTE.ROOT, { indexTabQr: 1 });
    };

    const cancelOrderMobile = () => {
        AlertMessage('mobileOrder.cancelOrder', {
            textButtonCancel: 'exchangeCoupon.confirm.textButtonCancel',
            onOk: onClearOrder,
            type: POPUP_TYPE.CONFIRM,
        });
    };

    const cancelItem = (id: number) => {
        const newDishes = mobileOrder?.dishes?.filter((item: any) => item?.id !== id);
        dispatch(updateMobileOrder({ ...mobileOrder, dishes: newDishes }));
    };
    const showModal = () => {
        modalize.show(
            MODAL_ID.ORDER_GUIDE,
            <ModalGuide />,
            {
                modalHeight: scale(550),
                scrollViewProps: {
                    contentContainerStyle: { flexGrow: 1 },
                },
            },
            { title: 'order.qrGuide' },
        );
    };

    return (
        <>
            <StyledHeader title={'mobileOrder.title'} iconRight={Images.icons.question} onPressRight={showModal} />
            <View style={styles.container}>
                <StyledKeyboardAware customStyle={styles.scrollView}>
                    <View style={styles.body}>
                        <View style={styles.qrView}>
                            {!!mobileOrderQR && (
                                <TouchableOpacity
                                    activeOpacity={1}
                                    onLongPress={() => {
                                        Clipboard.setString(mobileOrderQR);
                                    }}>
                                    <QRCode value={mobileOrderQR} size={staticValue.QR_SIZE_2CM} />
                                </TouchableOpacity>
                            )}
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
                                        customValue={true}
                                        canChange={false}
                                        key={index}
                                        data={item}
                                        saveOrder={mobileOrder}
                                        onCancel={cancelItem}
                                        notGoDetail={true}
                                        hideDashView={mobileOrder?.dishes?.length - 1 === index}
                                    />
                                );
                            })}
                        </View>
                        {mobileOrder?.coupons?.length > 0 && (
                            <View style={styles.couponView}>
                                <StyledText customStyle={styles.title} i18nText={'mobileOrder.coupon.title'} />

                                {mobileOrder?.coupons?.map((item: any, index: number) => (
                                    <ItemCoupon key={index} data={item} />
                                ))}
                            </View>
                        )}
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
        backgroundColor: Themes.COLORS.white,
    },
    scrollView: {},
    body: {
        flex: 1,
        backgroundColor: Themes.COLORS.lightGray,
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
    },
    nameCoupon: {
        width: '90%',
        marginTop: '2@vs',
        marginLeft: '10@s',
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
        marginTop: '5@vs',
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
    icStep: {
        width: '80@s',
        height: '80@s',
    },
    numberView: {
        width: '24@s',
        height: '24@s',
        backgroundColor: Themes.COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 24,
    },
    numberValue: {
        color: Themes.COLORS.white,
    },
    rowStep: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: '20@s',
        height: '80@s',
        justifyContent: 'space-between',
        marginVertical: '5@s',
    },
    line1: {
        position: 'absolute',
        width: 2,
        height: '50@s',
        left: '32@s',
        top: '63@s',
    },
    line2: {
        position: 'absolute',
        width: 2,
        height: '50@s',
        left: '32@s',
        top: '155@s',
    },
    containView: {
        width: '220@s',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    textGuide: {
        lineHeight: scale(24),
    },
    contentGuide: {
        paddingHorizontal: '20@s',
        paddingVertical: '30@s',
        lineHeight: scale(24),
    },
    headerStep: {
        paddingHorizontal: '20@s',
        marginBottom: '10@s',
    },
    textLink: {
        lineHeight: scale(24),
        color: Themes.COLORS.primary,
        fontWeight: 'bold',
        marginBottom: '-5@vs',
        fontSize: '14@ms0.3',
    },
});
