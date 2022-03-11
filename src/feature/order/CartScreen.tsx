/* eslint-disable @typescript-eslint/no-unused-vars */
import { getCart } from 'api/modules/api-app/order';
import { RootState } from 'app-redux/hooks';
import { clearSaveOrder, updateSaveOrder } from 'app-redux/slices/orderSlice';
import Images from 'assets/images';
import { Themes } from 'assets/themes';
import { StyledButton, StyledIcon, StyledText } from 'components/base';
import DashView from 'components/common/DashView';
import StyledHeader from 'components/common/StyledHeader';
import { TAB_NAVIGATION_ROOT } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ScaledSheet } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import { logger } from 'utilities/helper';
import { coupon, listOrderDefault } from 'utilities/staticData';
import AmountOrder from './components/AmountOrder';

const ItemCoupon = (data: any) => {
    return (
        <View style={styles.rowItem}>
            <StyledIcon source={Images.icons.coupon} size={20} customStyle={styles.icCoupon} />
            <StyledText originValue={data?.data?.name} customStyle={styles.nameCoupon} isBlack />
            <StyledIcon source={Images.icons.cancel} size={15} />
        </View>
    );
};
export const OrderItemCart = (data: any) => {
    const { image, name, amount, subDish, id } = data?.data;
    const { onCancel, canChange } = data;
    const [num, setNum] = useState(amount);
    const add = () => {
        setNum(num + 1);
    };
    const minus = () => {
        if (num > 0) setNum(num - 1);
    };

    const goToDetail = () => {
        navigate(TAB_NAVIGATION_ROOT.ORDER_ROUTE.DETAIL_MEAL, { id });
    };

    return (
        <>
            <View style={styles.orderItemView}>
                <TouchableOpacity onPress={goToDetail}>
                    <StyledIcon source={{ uri: image }} size={70} />
                </TouchableOpacity>
                <View style={styles.orderTextView}>
                    <TouchableOpacity onPress={onCancel}>
                        <StyledIcon source={Images.icons.cancel} size={17} customStyle={styles.icCancel} />
                    </TouchableOpacity>
                    <StyledText originValue={name} customStyle={styles.titleOrder} />
                    {subDish?.map((item: any, index: number) => (
                        <View key={index} style={styles.rowSub}>
                            <StyledText originValue={`+ ${item?.title}`} isBlack customStyle={styles.addValue} />
                            {item?.value > 1 && (
                                <View style={styles.numView}>
                                    <StyledText
                                        originValue={`x ${item?.value}`}
                                        isBlack
                                        customStyle={styles.addValueText}
                                    />
                                </View>
                            )}
                        </View>
                    ))}
                    <View style={styles.quantity}>
                        <StyledText i18nText={'個数'} customStyle={styles.changeText} />
                        <View style={styles.row}>
                            {canChange && (
                                <TouchableOpacity onPress={minus}>
                                    <StyledIcon
                                        source={Images.icons.minus}
                                        size={20}
                                        customStyle={{
                                            tintColor: num > 0 ? Themes.COLORS.primary : Themes.COLORS.silver,
                                        }}
                                    />
                                </TouchableOpacity>
                            )}
                            <StyledText originValue={`${num}`} customStyle={styles.quantityText} />
                            {canChange && (
                                <TouchableOpacity onPress={add}>
                                    <StyledIcon source={Images.icons.add} size={20} />
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                </View>
            </View>
            <DashView />
        </>
    );
};
const CartScreen = () => {
    const { saveOrder } = useSelector((state: RootState) => state.order);
    const dispatch = useDispatch();
    const [cart, setCart] = useState(saveOrder);
    useEffect(() => {
        getCartData();
    }, []);
    const getCartData = async () => {
        try {
            const res = await getCart();
            setCart(res?.data);
        } catch (error) {
            console.log('file: CartScreen.tsx -> line 69 -> getCartData -> error', error);
        }
    };
    const cancelCart = () => {
        dispatch(clearSaveOrder());
    };
    const cancelItem = (id: number) => {
        const newDishes = saveOrder?.dishes?.filter((item: any) => item?.id !== id);
        dispatch(updateSaveOrder({ ...saveOrder, dishes: newDishes }));
    };
    const confirm = () => {
        navigate(TAB_NAVIGATION_ROOT.HOME_ROUTE.CART);
    };
    const goToCouponList = () => {
        navigate(TAB_NAVIGATION_ROOT.ORDER_ROUTE.COUPON_LIST);
    };
    const createORCode = () => {
        navigate(TAB_NAVIGATION_ROOT.HOME_ROUTE.MOBILE_ORDER);
    };
    return (
        <View style={styles.container}>
            <StyledHeader title={'カート'} textRight={'注文キャンセル'} onPressRight={cancelCart} />
            <KeyboardAwareScrollView enableOnAndroid={true} showsVerticalScrollIndicator={false}>
                <View style={styles.body}>
                    <AmountOrder />
                    <View style={styles.orderView}>
                        {cart?.dishes?.map((item: any, index: number) => (
                            <OrderItemCart onCancel={cancelItem} key={index} data={item} canChange={true} />
                        ))}
                    </View>
                    <View style={styles.contentView}>
                        <StyledText customStyle={styles.title} i18nText={'クーポンリスト'} />
                        {saveOrder?.coupons?.map((item: any, index: number) => (
                            <ItemCoupon key={index} data={item} />
                        ))}
                        {saveOrder?.coupons?.length === 0 && (
                            <View style={styles.noCouponView}>
                                <StyledIcon source={Images.icons.noCoupon} size={40} />
                                <StyledText customStyle={styles.noCoupon} i18nText={'なし'} />
                            </View>
                        )}
                        <TouchableOpacity onPress={goToCouponList} style={styles.moreCouponView}>
                            <StyledText customStyle={styles.moreCoupon} i18nText={'クーポン追加'} />
                            <StyledIcon source={Images.icons.add} size={20} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.contentView}>
                        <StyledButton title={'ＱＲコード発行'} onPress={createORCode} />
                        <StyledButton
                            isNormal={true}
                            title={'商品追加'}
                            onPress={confirm}
                            customStyle={styles.productAddition}
                            customStyleText={styles.textProduct}
                        />
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </View>
    );
};

export default CartScreen;

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: Themes.COLORS.lightGray,
    },
    body: {
        flex: 1,
        alignItems: 'center',
    },
    productAddition: {
        backgroundColor: Themes.COLORS.white,
        borderWidth: 1,
        borderColor: Themes.COLORS.primary,
        paddingVertical: 15,
    },
    orderItemView: {
        width: '100%',
        paddingVertical: '10@vs',
        paddingHorizontal: '20@s',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: Themes.COLORS.white,
    },
    orderTextView: {
        width: '75%',
        justifyContent: 'space-between',
    },
    titleOrder: {
        fontSize: '16@ms0.3',
        fontWeight: 'bold',
        marginBottom: '5@vs',
    },
    quantity: {
        backgroundColor: Themes.COLORS.lightGray,
        width: '100%',
        borderRadius: 5,
        paddingVertical: '10@vs',
        paddingHorizontal: '20@s',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginTop: '10@vs',
        alignItems: 'center',
    },
    orderView: {
        alignItems: 'center',
        width: '100%',
        backgroundColor: Themes.COLORS.white,
        paddingVertical: '10@vs',
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
    quantityText: {
        marginHorizontal: '10@s',
    },
    textProduct: {
        color: Themes.COLORS.secondary,
    },
    contentView: {
        backgroundColor: Themes.COLORS.white,
        width: '100%',
        paddingHorizontal: '20@s',
        paddingVertical: '10@vs',
        marginBottom: '10@vs',
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
        width: '80%',
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
    icCancel: {
        position: 'absolute',
        right: 0,
        top: '5@vs',
    },
    addValue: {
        marginVertical: '3@vs',
    },
    changeText: {
        fontWeight: 'bold',
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
    numView: {
        backgroundColor: Themes.COLORS.headerBackground,
        borderRadius: 5,
        paddingHorizontal: '5@s',
        paddingVertical: '2@vs',
        marginLeft: '5@s',
    },
    addValueText: {
        color: Themes.COLORS.primary,
        fontSize: '12@ms0.3',
    },
    rowSub: {
        flexDirection: 'row',
        marginVertical: '2@vs',
        alignItems: 'center',
    },
});
