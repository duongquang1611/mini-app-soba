import Metrics from 'assets/metrics';
import { Themes } from 'assets/themes';
import { StyledButton, StyledImage, StyledText } from 'components/base';
import ModalizeManager from 'components/base/modal/ModalizeManager';
import StyledHeader from 'components/common/StyledHeader';
import CouponTab from 'feature/coupon/components/CouponTab';
import { goBack } from 'navigation/NavigationService';
import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { ScaledSheet, verticalScale } from 'react-native-size-matters';
import { DiscountType, MODAL_ID, TabCouponStatus } from 'utilities/staticData';

const OrderDish = (props: any) => {
    const { setChooseDish, chooseDish, item, idCoupon, setEnableButton, enableButton } = props;
    const { image, title, id } = item;
    const choose = chooseDish?.id === id;
    const onChoose = () => {
        setChooseDish(item);
        const findItemChoose = enableButton?.find((itemChoose: any) => itemChoose?.id === idCoupon);
        const findItemNotChange = enableButton?.find((itemChoose: any) => itemChoose?.id !== idCoupon) || [];
        setEnableButton([...findItemNotChange, { ...findItemChoose, choose: item }]);
    };
    return (
        <View style={styles.containerItem}>
            <View style={styles.itemRow}>
                <View style={styles.itemRow}>
                    <StyledImage source={{ uri: image }} customStyle={styles.imgItem} />
                    <StyledText originValue={title} customStyle={styles.nameOrder} />
                </View>
                <TouchableOpacity
                    onPress={onChoose}
                    style={[
                        styles.chooseButton,
                        {
                            backgroundColor: choose ? Themes.COLORS.primary : Themes.COLORS.white,
                            borderColor: choose ? Themes.COLORS.sweetPink : Themes.COLORS.silver,
                        },
                    ]}
                />
            </View>
        </View>
    );
};

const OneCoupon = (props: any) => {
    const { item, enableButton, setEnableButton } = props;
    const [chooseDish, setChooseDish] = useState(item?.choose);

    return (
        <View>
            <StyledText originValue={item?.coupon?.title} customStyle={styles.couponName} />
            <StyledText i18nText={'coupon.chooseDish'} customStyle={styles.conTentCoupon} />
            {item?.coupon?.couponDish?.dish?.map((itemDish: any, indexDish: number) => (
                <OrderDish
                    idCoupon={item?.id}
                    key={indexDish}
                    item={itemDish}
                    chooseDish={chooseDish}
                    setChooseDish={setChooseDish}
                    setEnableButton={setEnableButton}
                    enableButton={enableButton}
                />
            ))}
        </View>
    );
};

const ModalCoupon = (props: any) => {
    const { listCouponsModal, setCartListCouponOrder, updateCouponsCart, cartListCouponAll } = props;
    const [enableButton, setEnableButton] = useState(listCouponsModal?.map((item: any) => ({ ...item })));
    const checkDisableButton = enableButton?.filter((item: any) => !item?.choose);

    return (
        <View style={styles.modalView}>
            {listCouponsModal?.map((item: any, index: number) => (
                <OneCoupon key={index} item={item} setEnableButton={setEnableButton} enableButton={enableButton} />
            ))}
            <StyledButton
                title={'order.keep'}
                onPress={() => {
                    setCartListCouponOrder([...cartListCouponAll, ...enableButton]);
                    updateCouponsCart([...cartListCouponAll, ...enableButton]);
                }}
                disabled={checkDisableButton.length > 0}
                customStyle={{ alignSelf: 'center' }}
            />
        </View>
    );
};
const CouponListScreen = (props: any) => {
    const { cartOrder, setCartOrder } = props.route?.params;
    const [cartListCouponOrder, setCartListCouponOrder] = useState(cartOrder);
    const modalize = ModalizeManager();
    const updateCart = () => {
        setCartOrder(cartListCouponOrder);
        modalize.dismiss(MODAL_ID.APPLY_COUPON);
        goBack();
    };
    const updateCouponsCart = (coupons: any) => {
        setCartOrder({ ...cartListCouponOrder, coupons });
        modalize.dismiss(MODAL_ID.APPLY_COUPON);
        goBack();
    };
    const saveCartCoupon = () => {
        const listCouponsModal = cartListCouponOrder?.coupons?.filter(
            (item: any) => item?.coupon?.discountType === DiscountType.EACH_DISH,
        );
        const listCouponsAll = cartListCouponOrder?.coupons?.filter(
            (item: any) => item?.coupon?.discountType === DiscountType.ALL_ORDER,
        );
        if (listCouponsModal.length > 0) {
            showApplyCoupon(listCouponsModal, listCouponsAll);
        } else updateCart();
    };
    const numberItemListCoupon = 3;
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
                modalHeight: verticalScale(numberItemListCoupon * 60 + 250),
                scrollViewProps: {
                    contentContainerStyle: { flexGrow: 1 },
                },
            },
            { title: 'order.applyCoupon' },
        );
    };
    const handleUseCoupon = (itemCoupon: any) => {
        const findCouponCart = cartListCouponOrder?.coupons?.find((item: any) => item?.id === itemCoupon?.id);
        if (findCouponCart) {
            const newCoupons = cartListCouponOrder?.coupons?.filter((item: any) => item?.id !== itemCoupon?.id) || [];

            setCartListCouponOrder({ ...cartListCouponOrder, coupons: newCoupons });
        } else {
            setCartListCouponOrder({ ...cartListCouponOrder, coupons: [...cartListCouponOrder?.coupons, itemCoupon] });
        }
    };
    return (
        <View style={styles.container}>
            <StyledHeader title={'order.couponTitle'} />
            <CouponTab
                status={TabCouponStatus.CAN_USE}
                cartOrder={cartListCouponOrder}
                handleUseCoupon={handleUseCoupon}
            />
            <View style={styles.buttonView}>
                <StyledButton title={'order.useCoupon'} onPress={saveCartCoupon} customStyle={styles.buttonSave} />
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
        marginVertical: '10@vs',
        marginBottom: Metrics.safeBottomPadding,
    },
    buttonSave: {},
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
