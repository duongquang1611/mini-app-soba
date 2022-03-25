import Metrics from 'assets/metrics';
import { Themes } from 'assets/themes';
import { StyledButton, StyledImage, StyledText, StyledTouchable } from 'components/base';
import DashView from 'components/common/DashView';
import React, { useState } from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

const OrderDish = (props: any) => {
    const { setChooseDish, chooseDish, item, idCoupon, setEnableButton, enableButton } = props;
    const choose = chooseDish?.id === item?.id;
    const onChoose = () => {
        setChooseDish(item);
        const findItemChoose = enableButton?.find((itemChoose: any) => itemChoose?.id === idCoupon) || {};
        const findItemNotChange = enableButton?.filter((itemChoose: any) => itemChoose?.id !== idCoupon) || [];
        setEnableButton([...findItemNotChange, { ...findItemChoose, choose: item }]);
    };
    return (
        <View style={styles.containerItem}>
            <StyledTouchable customStyle={styles.itemRow} onPress={onChoose}>
                <View style={styles.itemRow}>
                    <StyledImage source={{ uri: item?.dish?.thumbnail }} customStyle={styles.imgItem} />
                    <StyledText originValue={item?.dish?.title} customStyle={styles.nameOrder} />
                </View>
                <View
                    style={[
                        styles.chooseButton,
                        {
                            backgroundColor: choose ? Themes.COLORS.primary : Themes.COLORS.white,
                            borderColor: choose ? Themes.COLORS.sweetPink : Themes.COLORS.silver,
                        },
                    ]}
                />
            </StyledTouchable>
        </View>
    );
};
const OneCoupon = (props: any) => {
    const { item, enableButton, setEnableButton, dashView } = props;
    const [chooseDish, setChooseDish] = useState(item?.choose);
    return (
        <View>
            <StyledText originValue={item?.coupon?.title} customStyle={styles.couponName} />
            <StyledText i18nText={'coupon.chooseDish'} customStyle={styles.conTentCoupon} />
            {item?.coupon?.couponDish?.map((itemDish: any, indexDish: number) => (
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
            {dashView && <DashView customStyle={styles.dash} />}
        </View>
    );
};
const ModalCoupon = (props: any) => {
    const { listCouponsModal, setCartListCouponOrder, updateCouponsCart, cartListCouponAll, applyChooseDish } = props;
    const [enableButton, setEnableButton] = useState(listCouponsModal?.map((item: any) => ({ ...item })));
    const checkDisableButton = enableButton?.filter((item: any) => !item?.choose);
    const numCheck = enableButton?.filter((item: any) => item?.choose)?.length || 0;
    return (
        <View style={styles.modalView}>
            {listCouponsModal?.length >= 1 && (
                <StyledText
                    i18nText={'order.rangeEditMenu'}
                    i18nParams={{
                        numOrderCheck: numCheck,
                        numOrder: listCouponsModal?.length,
                    }}
                    customStyle={styles.textNumCheck}
                />
            )}
            {listCouponsModal?.map((item: any, index: number) => (
                <OneCoupon
                    dashView={listCouponsModal?.length > 1}
                    key={index}
                    item={item}
                    setEnableButton={setEnableButton}
                    enableButton={enableButton}
                />
            ))}
            <StyledButton
                title={'order.keep'}
                onPress={() => {
                    if (applyChooseDish) {
                        applyChooseDish?.(enableButton);
                    } else {
                        setCartListCouponOrder?.([...cartListCouponAll, ...enableButton]);
                        updateCouponsCart([...cartListCouponAll, ...enableButton]);
                    }
                }}
                disabled={checkDisableButton.length > 0}
                customStyle={styles.saveButton}
            />
        </View>
    );
};

export default ModalCoupon;

const styles = ScaledSheet.create({
    itemRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    containerItem: {
        width: '100%',
        marginBottom: '15@vs',
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
    couponName: {
        fontWeight: '700',
        fontSize: '16@ms0.3',
        paddingVertical: '10@vs',
    },
    conTentCoupon: {
        fontWeight: '700',
        fontSize: '16@ms0.3',
        paddingBottom: '10@vs',
        color: Themes.COLORS.primary,
    },
    modalView: {
        paddingHorizontal: '20@s',
        paddingBottom: '20@s',
    },
    chooseButton: {
        width: '20@s',
        height: '20@s',
        borderRadius: 16,
        borderWidth: 2,
    },
    saveButton: {
        alignSelf: 'center',
        marginBottom: Metrics.safeBottomPadding,
    },
    textNumCheck: {
        color: Themes.COLORS.primary,
        fontSize: '16@ms0.3',
        fontWeight: '700',
        marginTop: '30@vs',
        marginBottom: '5@vs',
    },
    dash: {
        marginVertical: '5@vs',
    },
});
