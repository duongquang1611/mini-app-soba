import { RootState } from 'app-redux/hooks';
import Metrics from 'assets/metrics';
import { Themes } from 'assets/themes';
import { StyledButton, StyledImage, StyledText, StyledTouchable } from 'components/base';
import DashView from 'components/common/DashView';
import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { useSelector } from 'react-redux';

export const OrderDish = (props: any) => {
    const {
        setChooseDish,
        chooseDish,
        item,
        idCoupon,
        setEnableButton,
        enableButton,
        customImageProps,
        customNameOrder,
        isHomeTab,
    } = props;

    const choose = chooseDish?.id === item?.id;
    const onChoose = () => {
        setChooseDish(item);
        const findItemChoose = enableButton?.find((itemChoose: any) => itemChoose?.id === idCoupon) || {};
        const findItemNotChange = enableButton?.filter((itemChoose: any) => itemChoose?.id !== idCoupon) || [];
        setEnableButton([...findItemNotChange, { ...findItemChoose, choose: item }]);
    };
    return (
        <StyledTouchable customStyle={styles.containerItem} onPress={onChoose}>
            <View style={styles.itemRow}>
                <StyledImage
                    resizeMode={'cover'}
                    source={{ uri: item?.dish?.thumbnail }}
                    customStyle={[styles.imgItem, customImageProps]}
                />
                <StyledText originValue={item?.dish?.title} customStyle={[styles.nameOrder, customNameOrder]} />
            </View>
            <View
                style={[
                    isHomeTab ? styles.chooseButtonHomeTab : styles.chooseButton,
                    {
                        backgroundColor: choose ? Themes.COLORS.primary : Themes.COLORS.white,
                        borderColor: choose ? Themes.COLORS.sweetPink : Themes.COLORS.silver,
                    },
                ]}
            />
        </StyledTouchable>
    );
};
export const OneCoupon = (props: any) => {
    const { item, enableButton, setEnableButton, dashView, isHomeTab } = props;
    const {
        globalData: { chooseBranch },
    } = useSelector((state: RootState) => state);
    const [chooseDish, setChooseDish] = useState(item?.choose);
    const newListCouponDish =
        item?.coupon?.couponDish?.filter((itemDish: any) =>
            itemDish?.restaurants?.map((itemBranch: any) => itemBranch?.id)?.includes(chooseBranch?.id),
        ) || [];

    return (
        <View>
            <StyledText
                originValue={item?.coupon?.title}
                customStyle={[styles.couponName, isHomeTab && styles.couponNameHomeTab]}
            />
            <StyledText
                i18nText={'coupon.chooseDish'}
                customStyle={[styles.conTentCoupon, isHomeTab && styles.conTentCouponHomeTab]}
            />
            {newListCouponDish?.map((itemDish: any, indexDish: number) => (
                <OrderDish
                    idCoupon={item?.id}
                    key={indexDish}
                    item={itemDish}
                    chooseDish={chooseDish}
                    setChooseDish={setChooseDish}
                    setEnableButton={setEnableButton}
                    enableButton={enableButton}
                    customImageProps={isHomeTab && styles.customImage}
                    customNameOrder={isHomeTab && styles.customNameOrder}
                    isHomeTab={isHomeTab}
                />
            ))}
            {dashView && <DashView customStyle={styles.dash} />}
        </View>
    );
};
const ModalCoupon = (props: any) => {
    const {
        listCouponsModal,
        setCartListCouponOrder,
        updateCouponsCart,
        cartListCouponAll,
        applyChooseDish,
        customStyle,
        isHomeTab,
        showButton,
    } = props;
    const [enableButton, setEnableButton] = useState(listCouponsModal?.map((item: any) => ({ ...item })));

    useEffect(() => {
        setEnableButton(listCouponsModal?.map((item: any) => ({ ...item })));
    }, [listCouponsModal]);

    const checkDisableButton = enableButton?.filter((item: any) => !item?.choose);
    const numCheck = enableButton?.filter((item: any) => item?.choose)?.length || 0;

    return (
        <>
            <ScrollView scrollEnabled={isHomeTab}>
                <View style={[styles.modalView, customStyle]}>
                    {!isHomeTab && listCouponsModal?.length > 1 && (
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
                            dashView={index < listCouponsModal?.length - 1}
                            key={index}
                            item={item}
                            setEnableButton={setEnableButton}
                            enableButton={enableButton}
                            isHomeTab={isHomeTab}
                        />
                    ))}
                    {!isHomeTab && (
                        <StyledButton
                            title={'order.keep'}
                            onPress={() => {
                                if (applyChooseDish) {
                                    applyChooseDish?.(enableButton);
                                } else {
                                    setCartListCouponOrder?.([...enableButton, ...cartListCouponAll]);
                                    updateCouponsCart?.([...enableButton, ...cartListCouponAll]);
                                }
                            }}
                            disabled={checkDisableButton.length > 0}
                            customStyle={styles.saveButton}
                        />
                    )}
                </View>
            </ScrollView>
            {showButton && isHomeTab && (
                <View style={styles.buttonView}>
                    <StyledButton
                        title={'home.createOr'}
                        onPress={() => {
                            if (applyChooseDish) {
                                applyChooseDish?.(enableButton);
                            } else {
                                setCartListCouponOrder?.([...enableButton, ...cartListCouponAll]);
                                updateCouponsCart?.([...enableButton, ...cartListCouponAll]);
                            }
                        }}
                        disabled={checkDisableButton.length > 0}
                        customContentStyle={styles.detailButton}
                        customStyle={styles.button}
                        customStyleText={styles.textBtn}
                    />
                </View>
            )}
        </>
    );
};

export default ModalCoupon;

const styles = ScaledSheet.create({
    itemRow: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    containerItem: {
        marginBottom: '15@vs',
        backgroundColor: Themes.COLORS.white,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    imgItem: {
        width: '60@s',
        height: '60@s',
        marginRight: '20@s',
    },
    nameOrder: {
        fontWeight: 'bold',
        flexShrink: 1,
        marginRight: '10@s',
    },
    couponName: {
        fontWeight: '700',
        fontSize: '16@ms0.3',
        paddingVertical: '10@vs',
    },
    couponNameHomeTab: {
        fontSize: '14@ms0.3',
        paddingVertical: '0@vs',
    },
    conTentCoupon: {
        fontWeight: '700',
        fontSize: '16@ms0.3',
        paddingBottom: '10@vs',
        color: Themes.COLORS.primary,
    },
    conTentCouponHomeTab: {
        fontSize: '12@ms0.3',
        paddingBottom: '5@vs',
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
    chooseButtonHomeTab: {
        width: '15@s',
        height: '15@s',
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
        width: Metrics.screenWidth,
        alignSelf: 'center',
    },
    customImage: {
        width: '30@s',
        height: '30@s',
    },
    customNameOrder: {
        marginRight: '0@s',
        marginLeft: '-15@vs',
    },
    saveHome: {
        width: '170@s',
        padding: 0,
        marginTop: '5@vs',
        paddingVertical: '8@vs',
    },
    detailButton: {
        width: '170@s',
        padding: 0,
        marginTop: '5@vs',
        paddingVertical: '8@vs',
    },
    buttonView: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        width: '170@s',
        marginTop: '5@s',
    },
    textBtn: {
        fontSize: '14@ms0.3',
        // lineHeight: '21@vs',
    },
});
