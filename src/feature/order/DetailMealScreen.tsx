/* eslint-disable @typescript-eslint/no-unused-vars */
import { getDish } from 'api/modules/api-app/order';
import { RootState } from 'app-redux/hooks';
import { updateSaveOrder } from 'app-redux/slices/orderSlice';
import Images from 'assets/images';
import Metrics from 'assets/metrics';
import { Themes } from 'assets/themes';
import { StyledIcon, StyledText } from 'components/base';
import StyledHeaderImage from 'components/common/StyledHeaderImage';
import { goBack } from 'navigation/NavigationService';
import React, { useEffect, useRef, useState } from 'react';
import { ImageBackground, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { scale, ScaledSheet } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import { toLocalStringTime } from 'utilities/format';
import { sumAmount } from 'utilities/helper';
import { dataFakeDetailMeal, staticValue } from 'utilities/staticData';
import ButtonCart from './components/ButtonCart';
import OrderItem from './components/OrderItem';

const DetailMealScreen = (props: any) => {
    const { id, isNew, createDate } = props?.route?.params;
    const { saveOrder } = useSelector((state: RootState) => state.order);
    const findIdStore = isNew ? null : saveOrder?.dishes?.find((item: any) => item.createDate === createDate);
    const [num, setNum] = useState(findIdStore?.mainDish?.amount || 1);
    const [dish, setDish] = useState(dataFakeDetailMeal);

    const { title, description } = dish;
    const { dishOptions } = dataFakeDetailMeal;
    const [subDishDetail, setSubDishDetail] = useState(findIdStore?.subDishes || []);
    const dispatch = useDispatch();
    useEffect(() => {
        getMenuDetail();
    }, []);
    const getMenuDetail = async () => {
        try {
            const res = await getDish(id);
            setDish(res?.data);
        } catch (error) {
            console.log('file: DetailMealScreen.tsx -> line 51 -> getMenuDetail -> error', error);
        }
    };
    const add = () => {
        setNum(num + 1);
    };
    const minus = () => {
        if (num > 0) setNum(num - 1);
    };
    const amountValue = sumAmount({
        mainDish: {
            amount: num,
        },
        subDishes: subDishDetail,
    });
    let numOrder = useRef(0).current;
    saveOrder?.dishes?.forEach(async (rating: any) => {
        numOrder += rating?.totalAmount;
    });
    const newAmountOrder = createDate ? amountValue - findIdStore?.totalAmount + numOrder : amountValue + numOrder;
    const goToSaveOrder = () => {
        const orderChooseItem = { id };
        const dishesStore = isNew
            ? saveOrder?.dishes || []
            : saveOrder?.dishes?.filter((item: any) => item.createDate !== createDate) || [];

        const paramOrder =
            amountValue > 0
                ? {
                      dishes: [
                          ...dishesStore,
                          {
                              createDate: toLocalStringTime(new Date()),
                              totalAmount: amountValue,
                              mainDish: {
                                  id,
                                  name: dish?.title,
                                  image: dish?.thumbnail,
                                  amount: num,
                              },
                              subDishes: subDishDetail,
                          },
                      ],
                      coupons: [],
                  }
                : {};
        dispatch(updateSaveOrder(paramOrder));
        goBack();
    };
    return (
        <View style={styles.container}>
            <StyledHeaderImage images={dish?.images} content={title} />
            <KeyboardAwareScrollView
                contentContainerStyle={{ flex: 1 }}
                style={{ flex: 1 }}
                enableOnAndroid={true}
                showsVerticalScrollIndicator={false}
            >
                <StyledText originValue={description} isBlack customStyle={styles.contentText} />
                <View style={styles.body}>
                    {dishOptions.map((item) => (
                        <OrderItem
                            key={item.id}
                            data={item}
                            subDishDetail={subDishDetail}
                            setSubDishDetail={setSubDishDetail}
                        />
                    ))}
                </View>
            </KeyboardAwareScrollView>
            <View style={styles.quantityView}>
                <View style={styles.quantity}>
                    <TouchableOpacity onPress={minus}>
                        <StyledIcon
                            source={Images.icons.minus}
                            size={20}
                            customStyle={{ tintColor: num > 0 ? Themes.COLORS.primary : Themes.COLORS.silver }}
                        />
                    </TouchableOpacity>
                    <StyledText originValue={`${num}`} customStyle={styles.quantityText} />
                    <TouchableOpacity onPress={add}>
                        <StyledIcon source={Images.icons.add} size={20} />
                    </TouchableOpacity>
                </View>
                {newAmountOrder > staticValue.MAX_ORDER && (
                    <StyledText i18nText={'order.canNotAdd'} customStyle={styles.quantityErr} />
                )}
            </View>
            <ButtonCart
                checkDisable={newAmountOrder > staticValue.MAX_ORDER}
                goToSaveOrder={goToSaveOrder}
                amountValue={amountValue}
                numOrder={newAmountOrder}
            />
        </View>
    );
};

export default DetailMealScreen;

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: Themes.COLORS.lightGray,
    },
    body: {
        alignItems: 'center',
        flex: 1,
    },
    buttonSave: {},
    img: {
        width: '100%',
        height: '150@vs',
        zIndex: 1,
    },
    iconBack: {
        position: 'absolute',
        zIndex: 99,
        top: '30@vs',
        left: '20@s',
        backgroundColor: Themes.COLORS.red,
    },
    content: {
        width: '100%',
        padding: '20@s',
        backgroundColor: Themes.COLORS.lightGray,
    },
    imgItem: {
        width: '60@s',
        height: '60@s',
        marginRight: '20@s',
    },
    itemRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    containerItem: {
        width: '100%',
        backgroundColor: Themes.COLORS.white,
        paddingVertical: '5@vs',
        paddingHorizontal: '20@vs',
    },
    infoItem: {
        width: '70%',
    },
    addRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: Themes.COLORS.lightGray,
        borderRadius: 5,
        padding: '10@s',
        paddingHorizontal: '25@s',
    },
    numberOrderView: {
        flexDirection: 'row',
        width: '70@s',
        justifyContent: 'space-between',
    },
    choose: {
        width: '15@s',
        height: '15@s',
        borderRadius: 15,
        borderWidth: 1,
        borderColor: Themes.COLORS.primary,
    },
    secondaryView: {
        backgroundColor: Themes.COLORS.secondary,
        alignItems: 'center',
        justifyContent: 'center',
        height: '56@vs',
        marginBottom: Metrics.safeBottomPadding,
    },
    buttonGender: {
        flexDirection: 'row',
        width: (Metrics.screenWidth - scale(40)) / 2,
        alignSelf: 'flex-start',
        marginVertical: '15@vs',
    },
    rectangle: {
        width: '45@s',
        height: '45@s',
        position: 'absolute',
        left: 0,
        top: 0,
    },
    icBag: {
        marginTop: '3@vs',
        marginLeft: '2@s',
    },
    textCart: {
        fontWeight: 'bold',
        color: Themes.COLORS.white,
        fontSize: '18@ms0.3',
        width: '200@s',
        textAlign: 'center',
    },
    rowCart: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    contentText: {
        marginVertical: '10@vs',
        marginHorizontal: '20@s',
    },
    name: {
        fontSize: '16@ms0.3',
        fontWeight: 'bold',
        color: Themes.COLORS.primary,
        marginVertical: '10@vs',
    },
    nameOrder: {
        fontWeight: 'bold',
    },
    quantity: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    quantityView: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Themes.COLORS.white,
    },
    quantityText: {
        marginHorizontal: '20@s',
        marginVertical: 20,
        fontSize: '28@ms0.3',
        lineHeight: '30@vs',
    },
    quantityErr: {
        color: Themes.COLORS.primary,
        marginBottom: '10@vs',
    },
    quantitySideText: {
        marginHorizontal: '10@s',
    },
    contentSideText: {
        color: Themes.COLORS.primary,
        fontSize: '16@ms0.3',
        fontWeight: 'bold',
        width: '100%',
        paddingHorizontal: '20@s',
        backgroundColor: Themes.COLORS.white,
        paddingVertical: '10@vs',
    },
});
