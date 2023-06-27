/* eslint-disable @typescript-eslint/no-unused-vars */
import { saveOrderOption } from 'api/modules/api-app/order';
import { RootState } from 'app-redux/hooks';
import { clearCartOrder, clearDefaultOrder, clearMobileOrder, updateCartOrder } from 'app-redux/slices/orderSlice';
import Images from 'assets/images';
import { Themes } from 'assets/themes';
import { StyledButton, StyledIcon, StyledText, StyledTouchable } from 'components/base';
import AlertMessage from 'components/base/AlertMessage';
import StyledKeyboardAware from 'components/base/StyledKeyboardAware';
import ModalizeManager from 'components/base/modal/ModalizeManager';
import StyledHeader from 'components/common/StyledHeader';
import AmountOrder from 'feature/order/components/AmountOrder';
import ModalCoupon from 'feature/order/components/ModalCoupon';
import OrderItemCart from 'feature/order/components/OrderItemCart';
import useBackHandler from 'hooks/useBackHandler';
import { getResourcesData } from 'hooks/useNetwork';
import { navigate } from 'navigation/NavigationService';
import { APP_ROUTE, HOME_ROUTE, SETTING_ROUTE, TAB_NAVIGATION_ROOT } from 'navigation/config/routes';
import React, { useEffect, useMemo, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { ScaledSheet, scale, verticalScale } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import {
    encryptData,
    generateDataSaveOrderOption,
    generateNewOrder,
    generateOrderQR,
    isAmela,
    isIos,
    showActionQR,
    titleOrder,
} from 'utilities/helper';
import { DiscountType, MODAL_ID, OrderType, OrderTypeMenu, POPUP_TYPE, staticValue } from 'utilities/staticData';
import ModalGuideMenu from './components/ModalGuideMenu';

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

const OrderQrCodeScreen = (props: any) => {
    const { orderType, saveOrder } = props?.route?.params;
    const dispatch = useDispatch();
    const { order, userInfo } = useSelector((state: RootState) => state);
    const { mobileOrder, defaultOrder, defaultOrderLocal } = order;
    const getOrder = () => {
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
    const [orderQr, setOrderQr] = useState(getOrder());
    const { user } = userInfo;
    const modalize = ModalizeManager();
    const orderQR = useMemo(() => generateOrderQR(orderQr, user, orderType), [orderQr, user, orderType]);
    const newOrderTest = useMemo(() => generateNewOrder(orderQr, user, orderType), [orderQr, user, orderType]);
    const mobileOrderSaveOrderOption = useMemo(() => generateDataSaveOrderOption(orderQr), [orderQr]);
    const defaultOrderSettingSaveOrderOption = useMemo(
        () => generateDataSaveOrderOption(orderQr, OrderType.DEFAULT_SETTING),
        [orderQr],
    );
    const defaultOrderHomeSaveOrderOption = useMemo(
        () => generateDataSaveOrderOption(defaultOrderLocal, OrderType.DEFAULT_HOME),
        [orderQr],
    );

    const qrEncrypt = useMemo(() => encryptData(orderQR), [JSON.stringify(orderQR)]);

    const getSaveOption = () => {
        if (orderType === OrderTypeMenu.DEFAULT_ORDER) return defaultOrderSettingSaveOrderOption;
        if (orderType === OrderTypeMenu.DEFAULT_ORDER_LOCAL) return defaultOrderHomeSaveOrderOption;
        return mobileOrderSaveOrderOption;
    };

    useEffect(() => {
        if (saveOrder) {
            onSaveOrder();
        }
    }, [orderQr]);

    useEffect(() => {
        setOrderQr(getOrder());
    }, [mobileOrder, defaultOrder, defaultOrderLocal]);

    const onSaveOrder = async () => {
        try {
            const res = await saveOrderOption(getSaveOption());
            if (orderType === OrderTypeMenu.DEFAULT_ORDER) {
                await saveOrderOption(defaultOrderHomeSaveOrderOption);
            }
            console.log('saveOrderMobile -> res', res);
        } catch (error) {
            console.log('saveOrderMobile -> error', error);
        }
    };
    const clearOrder = async (orderNum?: number) => {
        try {
            const saveOrderParams = {
                orderType: orderNum || orderType,
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

    const edit = () => {
        getResourcesData(false);
        navigate(TAB_NAVIGATION_ROOT.ORDER_ROUTE.CART_EDIT_QR, {
            orderType,
            setOrder: setOrderQr,
            order: orderQr,
        });
    };

    const onClearOrder = async () => {
        if (orderType === OrderTypeMenu.MOBILE_ORDER) {
            dispatch(clearMobileOrder());
            dispatch(clearCartOrder());
        }
        if (orderType === OrderTypeMenu.DEFAULT_ORDER) {
            dispatch(clearDefaultOrder());
            // if (checkSameData(defaultOrder, defaultOrderLocal)) {
            //     dispatch(clearDefaultOrderLocal());
            //     clearOrder(3);
            // }
        }
        // if (orderType === OrderTypeMenu.DEFAULT_ORDER_LOCAL) {
        //     dispatch(updateDefaultOrderLocal(defaultOrder));
        // }
        clearOrder();
        navigate(APP_ROUTE.MAIN_TAB, { screen: HOME_ROUTE.HOME });
    };

    const cancelOrderMobile = () => {
        AlertMessage('mobileOrder.cancelOrder', {
            textButtonCancel: 'exchangeCoupon.confirm.textButtonCancel',
            onOk: onClearOrder,
            type: POPUP_TYPE.CONFIRM,
        });
    };

    const handlePressGuide = () => {
        modalize.show(
            MODAL_ID.ORDER_GUIDE,
            <ModalGuideMenu />,
            {
                modalHeight: verticalScale(isIos ? 540 : 640),
                scrollViewProps: {
                    contentContainerStyle: { flexGrow: 1 },
                },
            },
            { title: 'order.qrGuideFromHome' },
        );
    };

    const handleBack = () => {
        if (orderType === OrderTypeMenu.DEFAULT_ORDER) {
            navigate(APP_ROUTE.MAIN_TAB, { screen: SETTING_ROUTE.ROOT });
        } else {
            navigate(APP_ROUTE.MAIN_TAB, { screen: HOME_ROUTE.HOME });
        }
        return true;
    };

    useBackHandler(handleBack);

    const handleLongPress = () => {
        if (!isAmela()) return;
        showActionQR(qrEncrypt, newOrderTest);
    };

    const handleOnPressQR = () => {
        // decryptData(qrEncrypt);
    };

    return (
        <>
            {orderType === OrderTypeMenu.DEFAULT_ORDER ? (
                <StyledHeader
                    title={'setting.orderDefaultTitle'}
                    textRight={'order.cancelOrderDefault'}
                    onPressRight={cancelOrderMobile}
                    onPressBack={handleBack}
                />
            ) : (
                <StyledHeader
                    title={titleOrder(orderType, 'mobileOrder.title')}
                    iconRight={Images.icons.question}
                    onPressRight={handlePressGuide}
                    onPressBack={handleBack}
                />
            )}
            <View style={styles.container}>
                <StyledKeyboardAware customStyle={styles.scrollView}>
                    <View style={styles.body}>
                        <View style={styles.qrView}>
                            {!!orderQR && (
                                <TouchableOpacity
                                    activeOpacity={1}
                                    onLongPress={handleLongPress}
                                    onPress={handleOnPressQR}
                                    delayLongPress={staticValue.DELAY_LONG_PRESS}
                                >
                                    <QRCode value={qrEncrypt} size={staticValue.QR_SIZE_2CM} />
                                </TouchableOpacity>
                            )}
                            <StyledButton
                                title={
                                    orderType === OrderTypeMenu.DEFAULT_ORDER
                                        ? 'order.editOrderDefault'
                                        : 'mobileOrder.qr.edit'
                                }
                                onPress={edit}
                                customStyle={styles.buttonSave}
                            />
                            {orderType === OrderTypeMenu.MOBILE_ORDER && (
                                <StyledButton
                                    isNormal={true}
                                    title={'mobileOrder.qr.cancel'}
                                    onPress={cancelOrderMobile}
                                    customStyle={styles.cancelButton}
                                    customStyleText={styles.cancelText}
                                />
                            )}
                        </View>
                        <AmountOrder order={orderQr} />
                        <View style={styles.dishesView}>
                            {orderQr?.dishes?.map((item: any, index: number) => {
                                return (
                                    <OrderItemCart
                                        customValue={true}
                                        canChange={false}
                                        key={index}
                                        data={item}
                                        saveOrder={orderQr}
                                        notGoDetail={true}
                                        hideDashView={orderQr?.dishes?.length - 1 === index}
                                        orderType={orderType}
                                    />
                                );
                            })}
                        </View>
                        {orderQr?.coupons?.length > 0 && (
                            <View style={styles.couponView}>
                                <StyledText customStyle={styles.title} i18nText={'mobileOrder.coupon.title'} />

                                {orderQr?.coupons?.map((item: any, index: number) => (
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

export default OrderQrCodeScreen;

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
    contentName: {
        fontWeight: 'normal',
        color: Themes.COLORS.textSecondary,
        fontSize: '14@ms0.3',
    },
    textLink: {
        lineHeight: scale(24),
        color: Themes.COLORS.primary,
        fontWeight: 'bold',
        fontSize: '14@ms0.3',
        textDecorationLine: 'underline',
    },
});
