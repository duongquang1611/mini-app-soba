/* eslint-disable @typescript-eslint/no-unused-vars */
import { RootState } from 'app-redux/hooks';
import { updateGlobalDataUnSave } from 'app-redux/slices/globalDataUnSaveSlice';
import { updateCouponOrder } from 'app-redux/slices/orderSlice';
import Images from 'assets/images';
import Metrics from 'assets/metrics';
import { Themes } from 'assets/themes';
import { StyledButton, StyledIcon, StyledList, StyledText, StyledTouchable } from 'components/base';
import ModalCoupon, { OrderDish } from 'feature/order/components/ModalCoupon';
import { navigate } from 'navigation/NavigationService';
import { AUTHENTICATE_ROUTE, HOME_ROUTE, ORDER_ROUTE } from 'navigation/config/routes';
import React, { useMemo, useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { ScaledSheet, scale, verticalScale } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import { QR_TAB_TYPE } from 'utilities/enumData';
import { checkSameData, encryptData, isAmela, showActionQR } from 'utilities/helper';
import { DiscountType, QR_TAB_DATA, staticValue } from 'utilities/staticData';
import CouponItemQR from './CouponItemQR';

const ChooseCouponTab = (props: any) => {
    const dispatch = useDispatch();
    const { type = QR_TAB_TYPE.ORDER_DEFAULT, qrValue, onPress, newOrder = '' } = props;
    const [couponChoose, setCouponChoose] = useState<any>(null);
    const [chooseDish, setChooseDish] = useState<any>([]);
    const [enableButton, setEnableButton] = useState([]);
    const [showQrCode, setShowQrCode] = useState(false);
    const qrComponentData: any = QR_TAB_DATA[type];
    const {
        coupon,
        order,
        globalDataUnSave: { withoutAccount },
    } = useSelector((state: RootState) => state);

    const { couponsCanUse = [] } = coupon || {};
    const { defaultOrder, defaultOrderLocal, couponOrder } = order;
    const [cartListCouponOrder, setCartListCouponOrder] = useState(couponOrder);

    const {
        textButton,
        textButtonNoEdit,
        textButtonEdited,
        content1,
        content2,
        navigateScreen,
        orderType,
        createButton,
    } = qrComponentData;
    const qrEncrypt = useMemo(() => encryptData(qrValue), [JSON.stringify(qrValue)]);

    const handleQrPress = () => {
        if (qrValue) {
            type === QR_TAB_TYPE.CHECK_IN ? onPress?.() : navigate(navigateScreen, { orderType, saveOrder: false });
        } else {
            switch (type) {
                case QR_TAB_TYPE.ORDER_DEFAULT:
                    navigate(AUTHENTICATE_ROUTE.ORDER_DEFAULT_MENU, { screen: HOME_ROUTE.HOME });
                    break;
                case QR_TAB_TYPE.MOBILE_ORDER:
                    navigate(ORDER_ROUTE.ROOT);
                    break;
                default:
                    break;
            }
        }
    };

    const handleLongPress = () => {
        if (!isAmela()) return;

        type === QR_TAB_TYPE.CHECK_IN
            ? showActionQR(qrEncrypt, qrValue, 'QR Check In', 'QR Encrypt')
            : showActionQR(qrEncrypt, newOrder);
    };

    const handleOnPressQR = () => {
        // decryptData(qrEncrypt);
    };
    const getTextButton = () => {
        if (type !== QR_TAB_TYPE.ORDER_DEFAULT) {
            return textButton;
        }
        return checkSameData(defaultOrder, defaultOrderLocal) ? textButtonNoEdit : textButtonEdited;
    };

    const goToLogin = () => {
        dispatch(updateGlobalDataUnSave({ withoutAccount: false }));
    };

    const handleUseCoupon = (item: any) => {
        if (item?.coupon?.discountType === DiscountType.EACH_DISH) {
            // show popup choose dish to use coupon
            showApplyCoupon([item]);
        } else {
            // coupon apply all order
            // dispatch(updateCouponCartOrder([item]));
            // goToCart();
        }
    };
    const showApplyCoupon = (listCouponsModal: any) => {
        console.log({ listCouponsModal });
    };

    const CreateQrCode = () => {
        setShowQrCode(true);
    };

    const applyChooseDish = (data?: any) => {
        console.log({ data });
        dispatch(updateCouponOrder(data));
        // goToCart();
    };

    const renderItemCoupon = ({ item }: any) => {
        return (
            <CouponItemQR
                // isTabCoupon={isTabCoupon}
                canUse={true}
                item={item}
                goToDetail={() => {}}
                cartOrder={cartListCouponOrder}
                handleUseCoupon={() => setCouponChoose(item)}
                orderType={orderType}
                order={order}
            />
        );
    };
    const renderItemDish = ({ item }: any) => {
        console.log({ item });
        return (
            <OrderDish
                idCoupon={item?.id}
                item={item}
                chooseDish={chooseDish}
                setChooseDish={setChooseDish}
                setEnableButton={setEnableButton}
                enableButton={enableButton}
                customImageProps={styles.customImage}
                customNameOrder={styles.nameOrder}
                isMultiChoose={true}
                applyChooseDish={applyChooseDish}
            />
        );
    };

    return (
        <View style={[styles.containerQrTab]}>
            {showQrCode ? (
                <>
                    <View style={[styles.qrCodeView]}>
                        <StyledTouchable
                            hitSlop={staticValue.DEFAULT_HIT_SLOP}
                            onPress={() => setShowQrCode(false)}
                            customStyle={styles.containerBack}
                        >
                            <StyledIcon size={24} source={Images.icons.back} />
                        </StyledTouchable>

                        <TouchableOpacity
                            activeOpacity={1}
                            onLongPress={handleLongPress}
                            delayLongPress={staticValue.DELAY_LONG_PRESS}
                            onPress={handleOnPressQR}
                            style={styles.qrView}
                        >
                            <QRCode value={'aa'} size={staticValue.QR_SIZE_2CM} />
                        </TouchableOpacity>

                        <StyledButton
                            onPress={() => {}}
                            title={getTextButton()}
                            customContentStyle={styles.detailButton}
                            customStyleText={styles.textBtn}
                        />
                    </View>
                </>
            ) : (
                <>
                    <View style={styles.halfViewLeft}>
                        <View style={styles.titleView}>
                            <StyledText customStyle={styles.title} i18nText="aaa" />
                        </View>
                        <StyledList
                            data={couponsCanUse}
                            renderItem={renderItemCoupon}
                            customStyle={styles.listCoupon}
                            refreshing={false}
                            noDataText={'coupon.noData'}
                        />
                    </View>
                    <View style={styles.halfViewRight}>
                        <View style={styles.titleView}>
                            <StyledText customStyle={styles.title} i18nText="aaa" />
                        </View>
                        <View style={styles.viewDish}>
                            {/* {!!couponChoose?.coupon?.couponDish && (
                                <StyledList
                                    data={couponChoose?.coupon?.couponDish || []}
                                    renderItem={renderItemDish}
                                    customStyle={styles.listDish}
                                    refreshing={false}
                                    noDataText={'coupon.noData'}
                                />
                            )} */}
                            <ScrollView>
                                <ModalCoupon
                                    isHomeTab={true}
                                    listCouponsModal={[couponChoose]}
                                    customStyle={styles.customModal}
                                    // cartListCouponAll={listCouponsNoChange}
                                    updateCouponsCart={(coupons: any) => dispatch(updateCouponOrder(coupons))}
                                />
                            </ScrollView>
                        </View>
                        <View style={styles.buttonView}>
                            <StyledButton
                                onPress={CreateQrCode}
                                title={'createButton'}
                                customContentStyle={styles.detailButton}
                                customStyle={styles.button}
                                customStyleText={styles.textBtn}
                            />
                        </View>
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
        color: Themes.COLORS.headerBackground,
        fontSize: '14@ms0.3',
        lineHeight: '21@vs',
    },
    listCoupon: {
        backgroundColor: Themes.COLORS.white,
        flexGrow: 1,
        paddingBottom: '10@vs',
    },
    viewDish: {
        height: '100@vs',
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
        // flexGrow: 1,
    },
    titleView: {
        alignItems: 'center',
        borderBottomWidth: 0.5,
        paddingVertical: '5@vs',
        marginBottom: '5@vs',
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
    },
    qrView: {
        marginTop: '20@vs',
    },
    customModal: {
        paddingHorizontal: '5@s',
    },
});
