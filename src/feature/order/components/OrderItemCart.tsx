import { updateCartOrder } from 'app-redux/slices/orderSlice';
import Images from 'assets/images';
import { Themes } from 'assets/themes';
import { StyledIcon, StyledImage, StyledText, StyledTouchable } from 'components/base';
import DashView from 'components/common/DashView';
import { TAB_NAVIGATION_ROOT } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { useDispatch } from 'react-redux';
import { OrderTypeMenu, staticValue } from 'utilities/staticData';

const OrderItemCart = (props: any) => {
    const { hideDashView = false, customValue } = props;
    const { subDishes, createDate, mainDish, totalAmount } = props?.data;
    const dispatch = useDispatch();
    const { name, image } = mainDish;
    const { cancelItem, canChange, goDetailMenu, notGoDetail, saveOrder, isDefaultOrder, SaveAllOrderCart, orderType } =
        props;
    const num = mainDish?.amount;
    const updateOrder = (currentNum: number) => {
        const cartDishOrder = saveOrder?.dishes || [];
        const findIndexDishEdit = saveOrder?.dishes?.findIndex((item: any) => item.createDate === createDate);
        const orderEdit = saveOrder?.dishes?.find((item: any) => item.createDate === createDate);
        const orderChange = {
            ...orderEdit,
            mainDish: { ...orderEdit?.mainDish, amount: currentNum },
            totalAmount: (totalAmount / mainDish.amount) * currentNum,
        };
        const newCartDishOrder = [...cartDishOrder];
        newCartDishOrder?.splice(findIndexDishEdit, 1, orderChange);
        if (orderType !== OrderTypeMenu.CART_ORDER) {
            SaveAllOrderCart({ ...saveOrder, dishes: newCartDishOrder });
        } else {
            SaveAllOrderCart({ ...saveOrder, dishes: newCartDishOrder });
            dispatch(updateCartOrder({ ...saveOrder, dishes: newCartDishOrder }));
        }
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
        if (goDetailMenu) {
            goDetailMenu();
        } else {
            navigate(TAB_NAVIGATION_ROOT.ORDER_ROUTE.DETAIL_MEAL, {
                id: mainDish?.id,
                createDate,
                isDefaultOrder,
                order: saveOrder,
                setOrder: SaveAllOrderCart,
                orderType,
            });
        }
    };

    return (
        <StyledTouchable disabled={notGoDetail} onPress={goToDetail} customStyle={styles.dishView}>
            {cancelItem && (
                <StyledTouchable customStyle={styles.buttonCancel} onPress={() => cancelItem(createDate)}>
                    <StyledIcon source={Images.icons.cancel} size={17} customStyle={styles.icCancel} />
                </StyledTouchable>
            )}
            <View style={styles.orderItemView}>
                <View style={{ borderRadius: 1, overflow: 'hidden' }}>
                    <StyledImage source={{ uri: image }} resizeMode={'contain'} customStyle={styles.image} />
                </View>
                <View style={styles.orderTextView}>
                    <StyledText originValue={name} customStyle={styles.titleOrder} />
                    {subDishes?.map((item: any, index: number) => (
                        <View key={index} style={styles.rowSub}>
                            <StyledText originValue={`+ ${item?.title}`} isBlack customStyle={styles.addValue} />
                            {item?.amount > 1 && (
                                <View style={styles.numView}>
                                    <StyledText
                                        i18nParams={{ amount: item?.amount }}
                                        i18nText={'order.rangeSubDish'}
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
                            <StyledText
                                originValue={customValue && num < 10 ? `0${num}` : `${num}`}
                                customStyle={styles.quantityText}
                            />
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
            {!hideDashView && <DashView />}
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
        flexShrink: 1,
        marginLeft: '10@vs',
        justifyContent: 'space-between',
        marginRight: '5@s',
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
    icCancel: {},
    addValue: {
        marginVertical: '3@vs',
        flexShrink: 1,
    },
    changeText: {
        fontWeight: 'bold',
    },
    rowSub: {
        marginVertical: '2@vs',
        flexDirection: 'row',
        alignItems: 'flex-start',
        flexShrink: 1,
    },
    numView: {
        backgroundColor: Themes.COLORS.headerBackground,
        borderRadius: 5,
        paddingHorizontal: '5@s',
        paddingVertical: '2@vs',
        marginLeft: '10@s',
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
    buttonCancel: {
        position: 'absolute',
        right: '0@s',
        width: '35@s',
        height: '35@vs',
        alignItems: 'flex-end',
        zIndex: 2,
        paddingTop: '5@vs',
        paddingRight: '5@vs',
    },
    dishView: {
        width: '100%',
    },
    image: {
        width: '70@vs',
        height: '70@s',
    },
});
