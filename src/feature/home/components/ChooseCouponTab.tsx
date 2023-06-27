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
import CouponTab from 'feature/coupon/components/CouponTab';
import ModalCoupon from 'feature/order/components/ModalCoupon';
import { navigate } from 'navigation/NavigationService';
import { ORDER_ROUTE } from 'navigation/config/routes';
import React, { useMemo, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { ScaledSheet, scale, verticalScale } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import { QR_TAB_TYPE } from 'utilities/enumData';
import { encryptData, generateDataSaveOrderOption, generateOrderQR } from 'utilities/helper';
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
    const { type = QR_TAB_TYPE.ORDER_DEFAULT, qrValue, onPress, newOrder = '' } = props;
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
    const qrEncrypt = useMemo(() => encryptData(couponOrderQR), [JSON.stringify(defaultOrder)]);
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
            setShowQrCode(true);
        } catch (error) {
            console.log('saveOrderDefault -> error', error);
        }
    };

    const handleChooseDish = (coupons: any) => {
        dispatch(clearDefaultOrderLocal());
        dispatch(updateDefaultOrder(coupons));
        setShowQrCode(true);
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
                orderType: OrderType.DEFAULT_HOME,
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

    return (
        <View style={[styles.containerQrTab]}>
            {showQrCode && !!qrEncrypt ? (
                <>
                    <View style={[styles.qrCodeView]}>
                        <StyledTouchable
                            hitSlop={staticValue.DEFAULT_HIT_SLOP}
                            onPress={onBackChooseCoupon}
                            customStyle={styles.containerBack}
                        >
                            <StyledIcon size={24} source={Images.icons.back} />
                        </StyledTouchable>

                        <TouchableOpacity activeOpacity={1} onPress={handleOnPressQR} style={styles.qrView}>
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
                        <CouponTab
                            canUse={TabCouponStatus.CAN_USE}
                            isHomeTab={true}
                            handleUseCoupon={handleUseCoupon}
                            order={defaultOrderLocal}
                        />
                    </View>
                    <View style={styles.halfViewRight}>
                        <View style={styles.titleView}>
                            <StyledText customStyle={styles.title} i18nText="home.listDishesOfCoupon" />
                        </View>
                        <View style={(checkChooseCouponNoDish || noCouponChoose) && styles.viewDish}>
                            {!noCouponChoose && (
                                <ModalCoupon
                                    isHomeTab={true}
                                    listCouponsModal={defaultOrderLocal?.coupons}
                                    customStyle={[styles.customModal, styles.viewDish]}
                                    applyChooseDish={applyChooseDish}
                                    updateCouponsCart={(coupons: any) => handleChooseDish(coupons)}
                                    showButton={!checkChooseCouponNoDish && defaultOrder?.coupons}
                                />
                            )}
                        </View>
                        {checkChooseCouponNoDish ||
                            (noCouponChoose && (
                                <View style={styles.buttonView}>
                                    <StyledButton
                                        onPress={() => applyChooseDish(defaultOrderLocal?.coupons)}
                                        title={'home.createOr'}
                                        customContentStyle={styles.detailButton}
                                        customStyle={styles.button}
                                        customStyleText={styles.textBtn}
                                        disabled={noCouponChoose}
                                    />
                                </View>
                            ))}
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
        backgroundColor: Themes.COLORS.white,
        flexDirection: 'row',
    },
    detailButton: {
        width: '170@s',
        padding: 0,
        marginTop: '5@vs',
        paddingVertical: '8@vs',
    },
    button: {
        width: '170@s',
        marginTop: '5@s',
    },
    noQrCodeView: {
        alignItems: 'center',
        paddingHorizontal: '30@s',
    },
    qrCodeView: {
        alignItems: 'center',
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
        // lineHeight: '21@vs',
    },
    listCoupon: {
        backgroundColor: Themes.COLORS.white,
        flexGrow: 1,
        paddingBottom: '10@vs',
    },
    viewDish: {
        height: '115@s',
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
    },
    buttonView: {
        alignItems: 'center',
        justifyContent: 'center',
        // flexGrow: 1,
    },
    titleView: {
        alignItems: 'center',
        borderBottomWidth: 0.5,
        paddingVertical: '5@vs',
        marginBottom: '5@vs',
        height: '28@s',
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
    },
    qrView: {
        marginTop: '20@vs',
    },
    customModal: {
        paddingHorizontal: '5@s',
        paddingTop: '5@vs',
    },
});
