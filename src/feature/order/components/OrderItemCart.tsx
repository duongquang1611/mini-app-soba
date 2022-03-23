import { RootState } from 'app-redux/hooks';
import { updateCartOrder } from 'app-redux/slices/orderSlice';
import Images from 'assets/images';
import { Themes } from 'assets/themes';
import { StyledIcon, StyledText, StyledTouchable } from 'components/base';
import DashView from 'components/common/DashView';
import { TAB_NAVIGATION_ROOT } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import { staticValue } from 'utilities/staticData';

const OrderItemCart = (props: any) => {
    const { subDishes, createDate, mainDish, totalAmount } = props?.data;
    const { cartOrder } = useSelector((state: RootState) => state.order);
    const dispatch = useDispatch();
    const { name, image } = mainDish;
    const { cancelItem, canChange, goDetailMenu } = props;
    const num = mainDish?.amount;

    const updateOrder = (currentNum: number) => {
        const cartDishOrder = cartOrder?.dishes || [];
        const findIndexDishEdit = cartOrder?.dishes?.findIndex((item: any) => item.createDate === createDate);
        const orderEdit = cartOrder?.dishes?.find((item: any) => item.createDate === createDate);
        const orderChange = {
            ...orderEdit,
            mainDish: { ...orderEdit.mainDish, amount: currentNum },
            totalAmount: (totalAmount / mainDish.amount) * currentNum,
        };
        const newCartDishOrder = [...cartDishOrder];
        newCartDishOrder?.splice(findIndexDishEdit, 1, orderChange);
        dispatch(updateCartOrder({ ...cartOrder, dishes: newCartDishOrder }));
    };

    const add = () => {
        const currentNum = num;
        updateOrder(currentNum + 1);
    };

    const minus = () => {
        if (num > 0) {
            const currentNum = num;
            updateOrder(currentNum - 1);
        }
    };

    const goToDetail = () => {
        navigate(TAB_NAVIGATION_ROOT.ORDER_ROUTE.DETAIL_MEAL, { id: mainDish?.id, createDate });
    };

    return (
        <StyledTouchable disabled={!goDetailMenu} onPress={goDetailMenu}>
            <View style={styles.orderItemView}>
                <StyledTouchable onPress={goToDetail}>
                    <StyledIcon source={{ uri: image }} size={70} />
                </StyledTouchable>
                <View style={styles.orderTextView}>
                    {cancelItem && (
                        <StyledTouchable onPress={() => cancelItem(createDate)}>
                            <StyledIcon source={Images.icons.cancel} size={17} customStyle={styles.icCancel} />
                        </StyledTouchable>
                    )}
                    <StyledTouchable onPress={goToDetail} customStyle={styles.buttonName}>
                        <StyledText originValue={name} customStyle={styles.titleOrder} />
                    </StyledTouchable>
                    {subDishes?.map((item: any, index: number) => (
                        <View key={index} style={styles.rowSub}>
                            <StyledText originValue={`+ ${item?.title}`} isBlack customStyle={styles.addValue} />
                            {item?.amount > 1 && (
                                <View style={styles.numView}>
                                    <StyledText
                                        originValue={`x ${item?.amount}`}
                                        isBlack
                                        customStyle={styles.addValueText}
                                    />
                                </View>
                            )}
                        </View>
                    ))}
                    <View style={styles.quantity}>
                        <StyledText i18nText={'order.quantity'} customStyle={styles.changeText} />
                        <View style={styles.row}>
                            {canChange && (
                                <StyledTouchable disabled={num <= 1} onPress={minus}>
                                    <StyledIcon
                                        source={Images.icons.minus}
                                        size={20}
                                        customStyle={{
                                            tintColor: num > 1 ? Themes.COLORS.primary : Themes.COLORS.silver,
                                        }}
                                    />
                                </StyledTouchable>
                            )}
                            <StyledText originValue={`${num}`} customStyle={styles.quantityText} />
                            {canChange && (
                                <StyledTouchable onPress={add} disabled={num >= staticValue.MAX_ORDER}>
                                    <StyledIcon
                                        source={Images.icons.add}
                                        size={20}
                                        customStyle={{
                                            tintColor:
                                                num < staticValue.MAX_ORDER
                                                    ? Themes.COLORS.primary
                                                    : Themes.COLORS.silver,
                                        }}
                                    />
                                </StyledTouchable>
                            )}
                        </View>
                    </View>
                </View>
            </View>
            <DashView />
        </StyledTouchable>
    );
};

export default OrderItemCart;

const styles = ScaledSheet.create({
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
    rowSub: {
        flexDirection: 'row',
        marginVertical: '2@vs',
        alignItems: 'center',
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
    row: {
        flexDirection: 'row',
    },
    quantityText: {
        marginHorizontal: '10@s',
    },
    buttonName: {
        alignSelf: 'flex-start',
    },
});
