/* eslint-disable @typescript-eslint/no-unused-vars */
import { saveOrderOption } from 'api/modules/api-app/order';
import { RootState } from 'app-redux/hooks';
import {
    clearDefaultOrder,
    clearDefaultOrderLocal,
    updateCouponDefaultOrder,
    updateCouponDefaultOrderLocal,
    updateDefaultOrder,
} from 'app-redux/slices/orderSlice';
import Images from 'assets/images';
import Metrics from 'assets/metrics';
import { Themes } from 'assets/themes';
import { StyledButton, StyledIcon, StyledText, StyledTouchable } from 'components/base';
import AlertMessage from 'components/base/AlertMessage';
import CouponTab from 'feature/coupon/components/CouponTab';
import ModalCoupon from 'feature/order/components/ModalCoupon';
import { navigate } from 'navigation/NavigationService';
import { ORDER_ROUTE } from 'navigation/config/routes';
import React, { useEffect, useMemo, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import QRCode from 'react-native-qrcode-svg';
import { ScaledSheet, scale, verticalScale } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import { QR_TAB_TYPE } from 'utilities/enumData';
import { encryptData, generateDataSaveOrderOption, generateOrderQR, isAmela, showActionQR } from 'utilities/helper';
import {
    DiscountType,
    OrderType,
    OrderTypeMenu,
    QR_TAB_DATA,
    TabCouponStatus,
    staticValue,
} from 'utilities/staticData';

const ChooseCouponTab = (props: any) => {
    const dispatch = useDispatch();
    const { type = QR_TAB_TYPE.ORDER_DEFAULT, onPress, newOrder = '' } = props;
    const qrComponentData: any = QR_TAB_DATA[type];
    const {
        coupon,
        order,
        globalDataUnSave: { withoutAccount },
    } = useSelector((state: RootState) => state);
    const { user } = useSelector((state: RootState) => state.userInfo);

    const { defaultOrder, defaultOrderLocal } = order;
    const [showQrCode, setShowQrCode] = useState(!!defaultOrder?.coupons?.length);

    const couponOrderQR = useMemo(() => generateOrderQR(defaultOrder, user), [defaultOrder, user]);
    const qrEncrypt = useMemo(() => encryptData(couponOrderQR), [JSON.stringify(couponOrderQR)]);
    const handleOnPressQR = () => {
        // decryptData(qrEncrypt);
    };

    const handleUseCoupon = (item: any) => {
        if (item?.id === defaultOrderLocal?.coupons?.[0]?.id) {
            dispatch(clearDefaultOrderLocal());
        } else {
            dispatch(updateCouponDefaultOrderLocal([item]));
        }
    };

    const applyChooseDish = async (data?: any) => {
        const newOrder = { dishes: [], coupons: data };
        const defaultOrderSettingSaveOrderOption = generateDataSaveOrderOption(newOrder, OrderType.DEFAULT_SETTING);
        try {
            await saveOrderOption(defaultOrderSettingSaveOrderOption);
            dispatch(updateCouponDefaultOrder(data));
            dispatch(clearDefaultOrderLocal());
        } catch (error) {
            console.log('saveOrderDefault -> error', error);
            AlertMessage(error);
        }
    };

    const handleChooseDish = (coupons: any) => {
        dispatch(clearDefaultOrderLocal());
        dispatch(updateDefaultOrder(coupons));
    };

    const handleLongPress = () => {
        if (!isAmela()) return;

        showActionQR(qrEncrypt, newOrder);
    };

    const handleQrPress = () => {
        navigate(ORDER_ROUTE.ORDER_QR_CODE, { orderType: OrderTypeMenu.DEFAULT_ORDER, saveOrder: false });
    };

    const checkChooseCouponNoDish = useMemo(
        () => defaultOrderLocal?.coupons?.[0]?.coupon?.discountType === DiscountType.ALL_ORDER,
        [defaultOrderLocal],
    );
    const noCouponChoose = useMemo(() => !defaultOrderLocal?.coupons?.[0]?.coupon, [defaultOrderLocal]);

    const onBackChooseCoupon = async () => {
        try {
            const saveOrderParams = {
                orderType: OrderType.DEFAULT_SETTING,
                totalAmount: 0,
                dishes: [],
                coupons: [],
            };
            const res = await saveOrderOption(saveOrderParams);
            dispatch(clearDefaultOrderLocal());
            dispatch(clearDefaultOrder());
            setShowQrCode(false);

            console.log('saveOrderDefault -> res', res);
        } catch (error) {
            console.log('saveOrderDefault -> error', error);
        }
    };
    useEffect(() => {
        setShowQrCode(!!defaultOrder?.coupons?.length);
    }, [defaultOrder?.coupons?.length]);

    return (
        <View style={[styles.containerQrTab]}>
            {showQrCode && !!qrEncrypt ? (
                <>
                    <View style={[styles.qrCodeView]}>
                        <StyledTouchable
                            hitSlop={staticValue.DEFAULT_HIT_SLOP}
                            onPress={onBackChooseCoupon}
                            customStyle={styles.containerBack}>
                            <StyledIcon size={24} source={Images.icons.back} />
                        </StyledTouchable>

                        <TouchableOpacity
                            activeOpacity={1}
                            onLongPress={handleLongPress}
                            onPress={handleOnPressQR}
                            style={styles.qrView}>
                            <QRCode value={qrEncrypt} size={staticValue.QR_SIZE_2CM} />
                        </TouchableOpacity>

                        <StyledButton
                            onPress={handleQrPress}
                            title={'home.detailCouponOr'}
                            customContentStyle={styles.detailButton}
                            customStyleText={styles.textBtn}
                        />
                    </View>
                </>
            ) : (
                <>
                    <View style={styles.halfViewLeft}>
                        <View style={styles.titleView}>
                            <StyledText customStyle={styles.title} i18nText="notification.couponList" />
                        </View>
                        <ScrollView>
                            <CouponTab
                                canUse={TabCouponStatus.CAN_USE}
                                isHomeTab={true}
                                handleUseCoupon={handleUseCoupon}
                                order={defaultOrderLocal}
                            />
                        </ScrollView>
                    </View>
                    <View style={styles.halfViewRight}>
                        <View>
                            <View style={[styles.titleView, styles.titleRight]}>
                                <StyledText customStyle={styles.title} i18nText="home.listDishesOfCoupon" />
                            </View>
                            <View style={(checkChooseCouponNoDish || noCouponChoose) && styles.viewDish}>
                                {!noCouponChoose && !checkChooseCouponNoDish && (
                                    <ModalCoupon
                                        isHomeTab={true}
                                        listCouponsModal={defaultOrderLocal?.coupons}
                                        customStyle={[styles.customModal, styles.viewDish]}
                                        applyChooseDish={applyChooseDish}
                                        updateCouponsCart={(coupons: any) => handleChooseDish(coupons)}
                                        showButton={!checkChooseCouponNoDish && defaultOrder?.coupons}
                                    />
                                )}
                                {checkChooseCouponNoDish && (
                                    <StyledText i18nText="coupon.allOrder" customStyle={styles.allOrder} />
                                )}
                            </View>
                        </View>
                        {checkChooseCouponNoDish && (
                            <View style={styles.buttonView}>
                                <StyledButton
                                    onPress={() => applyChooseDish(defaultOrderLocal?.coupons)}
                                    title={'home.createOr'}
                                    customContentStyle={styles.detailButtonDish}
                                    customStyle={styles.button}
                                    customStyleText={styles.textBtn}
                                    disabled={noCouponChoose}
                                />
                            </View>
                        )}
                    </View>
                </>
            )}
        </View>
    );
};

export default ChooseCouponTab;

const styles = ScaledSheet.create({
    containerQrTab: {
        height: verticalScale(90) + scale(staticValue.QR_SIZE_HOME),
        justifyContent: 'center',
        flexDirection: 'row',
    },
    detailButton: {
        width: '170@s',
        padding: 0,
        paddingVertical: '8@vs',
    },
    detailButtonDish: {
        width: '100@s',
        padding: 0,
        paddingVertical: '8@vs',
    },
    button: {
        width: '100@s',
        marginTop: '0@s',
    },
    noQrCodeView: {
        alignItems: 'center',
        paddingHorizontal: '30@s',
    },
    qrCodeView: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexGrow: 1,
        paddingBottom: '15@vs',
    },
    content1: {
        textAlign: 'center',
        marginBottom: '25@vs',
        color: Themes.COLORS.mineShaft,
        fontSize: '12@ms0.3',
        lineHeight: '20@vs',
    },
    textRequire: {
        textAlign: 'center',
        marginBottom: '25@vs',
        color: Themes.COLORS.mineShaft,
        fontSize: '12@ms0.3',
        lineHeight: '20@ms',
    },
    content2: {
        fontSize: '12@ms0.3',
        lineHeight: '20@vs',
        color: Themes.COLORS.mineShaft,
        textAlign: 'center',
        marginBottom: '8@vs',
    },
    textBtn: {
        fontSize: '14@ms0.3',
    },
    listCoupon: {
        backgroundColor: Themes.COLORS.white,
        flexGrow: 1,
        paddingBottom: '10@vs',
    },
    viewDish: {
        height: '105@s',
    },
    listDish: {
        backgroundColor: Themes.COLORS.white,
        flexGrow: 1,
        paddingBottom: '10@vs',
        paddingHorizontal: '5@s',
    },
    halfViewLeft: {
        width: Metrics.screenWidth / 2,
        borderRightWidth: 1,
    },
    halfViewRight: {
        width: Metrics.screenWidth / 2,
        justifyContent: 'space-between',
    },
    buttonView: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '55@s',
    },
    titleView: {
        alignItems: 'center',
        borderBottomWidth: 0.5,
        paddingVertical: '5@vs',
        marginBottom: '5@vs',
        height: '28@s',
    },
    titleRight: {
        marginBottom: 0,
    },
    title: {
        fontSize: '16@ms0.3',
    },
    customImage: {
        width: '30@s',
        height: '30@s',
    },
    nameOrder: {
        marginRight: '0@s',
        marginLeft: '-15@vs',
    },
    containerBack: {
        alignSelf: 'flex-start',
        position: 'absolute',
        top: '15@vs',
        left: '15@s',
    },
    qrView: {
        marginTop: '20@vs',
    },
    customModal: {
        paddingHorizontal: '5@s',
        paddingTop: '5@vs',
        paddingBottom: 0,
    },
    allOrder: {
        paddingHorizontal: '5@s',
        fontWeight: '700',
        fontSize: '14@ms0.3',
        paddingVertical: '5@vs',
    },
});
