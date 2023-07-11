import { getDetailHistoryDetail } from 'api/modules/api-app/order';
import Images from 'assets/images';
import { Themes } from 'assets/themes';
import { StyledIcon, StyledImage, StyledText } from 'components/base';
import AlertMessage from 'components/base/AlertMessage';
import StyledKeyboardAware from 'components/base/StyledKeyboardAware';
import DashView from 'components/common/DashView';
import StyledHeader from 'components/common/StyledHeader';
import AmountOrder from 'feature/order/components/AmountOrder';
import React, { useEffect, useRef, useState } from 'react';
import { RefreshControl, View } from 'react-native';
import { scale, ScaledSheet, verticalScale } from 'react-native-size-matters';
import { formatDate, formatRestaurantsCouponShow, YMDHm } from 'utilities/format';
import { numberWithCommas } from 'utilities/helper';

const OrderItem = (props: any) => {
    const { amount, billPrice, dish, subDishes, dishPrice } = props?.data;
    return (
        <>
            <View style={styles.orderItemView}>
                <StyledImage source={{ uri: dish?.thumbnail }} resizeMode={'cover'} customStyle={styles.imgOrder} />
                <View style={styles.orderTextView}>
                    <View style={[styles.rowPrice, { marginTop: scale(0) }]}>
                        <StyledText originValue={dish?.title} customStyle={styles.titleDish} />
                        <StyledText
                            i18nParams={{ price: numberWithCommas(dishPrice) }}
                            i18nText={'order.rangePrice'}
                            customStyle={styles.price}
                            isBlack
                        />
                    </View>
                    {subDishes?.map((item: any, index: number) => (
                        <View key={index} style={styles.rowPrice}>
                            <View style={styles.rowSub}>
                                <StyledText
                                    originValue={`+ ${item?.subDish?.title}`}
                                    isBlack
                                    customStyle={styles.subText}
                                />
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
                            <StyledText
                                i18nParams={{ price: numberWithCommas(item?.price) }}
                                i18nText={'order.rangePrice'}
                                customStyle={styles.price}
                                isBlack
                            />
                        </View>
                    ))}
                    <View style={styles.quantityItem}>
                        <View style={styles.rowPrice}>
                            <StyledText i18nText={'order.quantity'} customStyle={styles.titleDish} />
                            {amount && (
                                <StyledText
                                    originValue={amount < 10 ? `0${amount}` : amount}
                                    customStyle={styles.price}
                                    isBlack
                                />
                            )}
                        </View>
                        <View style={[styles.rowPrice, { marginTop: verticalScale(10) }]}>
                            <StyledText i18nText={'order.subtotal'} customStyle={styles.titleDish} />
                            <StyledText
                                i18nText={'order.rangePrice'}
                                i18nParams={{ price: numberWithCommas(billPrice) }}
                                customStyle={styles.price}
                                isBlack
                            />
                        </View>
                    </View>
                </View>
            </View>
            <DashView />
        </>
    );
};
const OrderHistoryDetailScreen = (props: any) => {
    const { id } = props?.route?.params;
    const [historyDetail, setHistoryDetail] = useState<any>({});
    const { createdDate, billDish = [], amount, totalPrice, billCoupon, totalPaid, restaurant } = historyDetail;
    let numDish = useRef(0).current;
    billDish?.forEach(async (rating: any) => {
        numDish += rating?.amount;
    });
    const [refreshing, setRefreshing] = useState(false);
    const getDetailHistory = async () => {
        try {
            const res = await getDetailHistoryDetail(id);
            setHistoryDetail(res?.data);
        } catch (error) {
            AlertMessage(error);
        }
    };
    const handleRefresh = async () => {
        try {
            setRefreshing(true);
            getDetailHistory();
        } catch (error) {
            console.log(error);
        } finally {
            setRefreshing(false);
        }
    };
    useEffect(() => {
        getDetailHistory();
    }, []);
    return (
        <>
            <StyledHeader title={'setting.orderHistoryDetailTitle'} />
            <View style={styles.container}>
                <StyledKeyboardAware
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            colors={[Themes.COLORS.primary]}
                            tintColor={Themes.COLORS.primary}
                            onRefresh={handleRefresh}
                        />
                    }
                >
                    <View style={styles.body}>
                        <View style={styles.restaurantView}>
                            <StyledText i18nText={'setting.restaurant'} isBlack />
                            <StyledText originValue={restaurant?.name} isBlack customStyle={styles.timeValue} />
                        </View>
                        <View style={styles.timeView}>
                            <StyledText i18nText={'setting.timeOrder'} isBlack />
                            <StyledText
                                originValue={formatDate(createdDate, YMDHm)}
                                isBlack
                                customStyle={styles.timeValue}
                            />
                        </View>
                        <AmountOrder customStyle={styles.amountStyle} total={amount} />
                        <View style={styles.grayView} />
                        <View style={styles.orderView}>
                            {billDish.map((item: any, index: number) => (
                                <OrderItem key={index} data={item} />
                            ))}
                        </View>
                        <View style={styles.contentView}>
                            <View style={styles.rowPrice}>
                                <View style={styles.totalDish}>
                                    <StyledText i18nText={'order.numOrderItem'} isBlack />
                                    <StyledText originValue={`${numDish}`} customStyle={styles.valueOrder} />
                                    <StyledText i18nText={'order.taste'} isBlack />
                                </View>
                                <StyledText
                                    i18nText={'order.rangePrice'}
                                    i18nParams={{ price: numberWithCommas(totalPrice) }}
                                    customStyle={styles.totalPrice}
                                    isBlack
                                />
                            </View>
                            {billCoupon?.map((itemCoupon: any, index: number) => (
                                <View key={index}>
                                    <View style={styles.rowPrice}>
                                        <View style={styles.contentRow}>
                                            <StyledIcon
                                                size={20}
                                                source={Images.icons.coupon}
                                                customStyle={styles.couponItem}
                                            />
                                            <StyledText
                                                i18nParams={{
                                                    restaurants: formatRestaurantsCouponShow(
                                                        itemCoupon?.coupon?.restaurants,
                                                        itemCoupon?.coupon?.isDiscountAllRestaurants,
                                                        false,
                                                    ),
                                                    title: itemCoupon?.coupon?.title,
                                                }}
                                                i18nText={'coupon.titleItemCoupon'}
                                                isBlack
                                                customStyle={{ flexShrink: 1 }}
                                            />
                                        </View>
                                        <StyledText
                                            i18nText={'order.rangeCouponPrice'}
                                            i18nParams={{ price: numberWithCommas(itemCoupon?.discount) }}
                                            customStyle={styles.price}
                                            isBlack
                                        />
                                    </View>
                                    {itemCoupon?.dish && (
                                        <StyledText
                                            i18nText={'order.couponUse'}
                                            i18nParams={{
                                                dish: itemCoupon?.dish?.title,
                                            }}
                                            customStyle={styles.dishUse}
                                            isBlack
                                        />
                                    )}
                                </View>
                            ))}

                            <View style={[styles.quantity, styles.priceSum]}>
                                <StyledText i18nText={'order.total'} customStyle={styles.priceSumValue} />
                                <StyledText
                                    i18nText={'order.rangePrice'}
                                    i18nParams={{ price: numberWithCommas(totalPaid) }}
                                    customStyle={styles.sumValue}
                                />
                            </View>
                        </View>
                    </View>
                </StyledKeyboardAware>
            </View>
        </>
    );
};

export default OrderHistoryDetailScreen;

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: Themes.COLORS.white,
    },
    body: {
        flexGrow: 1,
        paddingBottom: '20@vs',
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
        flex: 1,
    },
    orderTextView: {
        flexShrink: 1,
        marginLeft: '10@s',
    },
    titleOrder: {
        fontSize: '16@ms0.3',
        fontWeight: 'bold',
        color: Themes.COLORS.secondary,
        marginBottom: '5@vs',
        flexShrink: 1,
    },
    titleDish: {
        fontWeight: 'bold',
        color: Themes.COLORS.secondary,
        marginBottom: '5@vs',
        flexShrink: 1,
    },
    quantity: {
        backgroundColor: Themes.COLORS.lightGray,
        width: '100%',
        borderRadius: 5,
        paddingVertical: '15@vs',
        paddingHorizontal: '20@s',
        justifyContent: 'space-between',
        marginTop: '15@vs',
    },
    quantityItem: {
        backgroundColor: Themes.COLORS.lightGray,
        width: '100%',
        borderRadius: 5,
        paddingVertical: '5@vs',
        paddingHorizontal: '30@s',
        justifyContent: 'space-between',
        marginTop: '15@vs',
    },
    priceSum: {
        flexDirection: 'row',
        paddingVertical: '15@vs',
        alignItems: 'center',
    },
    orderView: {
        alignItems: 'center',
        width: '100%',
        backgroundColor: Themes.COLORS.white,
        paddingBottom: '10@vs',
        marginBottom: '10@vs',
    },
    row: {
        flexDirection: 'row',
    },
    subText: {
        flexShrink: 1,
        fontSize: '12@ms0.3',
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
    rowPrice: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: '10@vs',
    },
    price: {
        fontWeight: 'bold',
        marginLeft: '10@s',
    },
    totalPrice: {
        fontWeight: 'bold',
        marginLeft: '10@s',
        fontSize: '18@ms0.3',
    },
    contentRow: {
        flexDirection: 'row',
        alignItems: 'center',
        flexShrink: 1,
    },
    rowSub: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'flex-start',
        flexShrink: 1,
    },
    priceSumValue: {
        fontSize: '16@ms0.3',
        color: Themes.COLORS.primary,
        fontWeight: 'bold',
    },
    sumValue: {
        fontSize: '24@ms0.3',
        color: Themes.COLORS.primary,
        fontWeight: 'bold',
    },
    icBag: {
        tintColor: Themes.COLORS.secondary,
    },
    timeView: {
        paddingHorizontal: '20@s',
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        backgroundColor: Themes.COLORS.lightGray,
        paddingBottom: '15@vs',
    },
    restaurantView: {
        paddingVertical: '15@vs',
        paddingHorizontal: '20@s',
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        backgroundColor: Themes.COLORS.lightGray,
    },
    timeValue: {
        fontWeight: 'bold',
    },
    valueOrder: {
        color: Themes.COLORS.primary,
        fontWeight: 'bold',
        fontSize: '24@ms0.3',
        marginHorizontal: '10@s',
        marginBottom: '5@vs',
    },
    grayView: {
        height: '10@vs',
        backgroundColor: Themes.COLORS.lightGray,
    },
    amountStyle: {
        marginVertical: '5@vs',
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
    totalDish: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    couponItem: {
        tintColor: Themes.COLORS.primary,
        marginRight: '10@s',
    },
    dishUse: {
        color: Themes.COLORS.silver,
        fontSize: '12@ms0.3',
        marginTop: '10@vs',
    },
    imgOrder: {
        width: '70@s',
        height: '70@s',
    },
});
