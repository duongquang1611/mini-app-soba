import Images from 'assets/images';
import { Themes } from 'assets/themes';
import { StyledIcon, StyledText } from 'components/base';
import DashView from 'components/common/DashView';
import StyledHeader from 'components/common/StyledHeader';
import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { scale, ScaledSheet, verticalScale } from 'react-native-size-matters';
import { listOrderDefault } from 'utilities/staticData';

const OrderItem = (data: any) => {
    return (
        <>
            <View style={styles.orderItemView}>
                <StyledIcon source={{ uri: data?.data?.img }} size={70} />
                <View style={styles.orderTextView}>
                    <StyledText originValue={data?.data?.name} customStyle={styles.titleOrder} />
                    {data?.data?.listAdd?.map((item: any, index: number) => (
                        <View key={index} style={styles.rowPrice}>
                            <StyledText originValue={`+ ${item?.name}`} isBlack />
                            <StyledText originValue={`￥ ${item?.price}`} customStyle={styles.price} isBlack />
                        </View>
                    ))}
                    <View style={styles.quantity}>
                        <View style={styles.rowPrice}>
                            <StyledText originValue={'個数'} customStyle={styles.titleOrder} />
                            <StyledText originValue={data?.data?.quantity} customStyle={styles.price} isBlack />
                        </View>
                        <View style={[styles.rowPrice, { marginTop: verticalScale(10) }]}>
                            <StyledText originValue={'小計'} customStyle={styles.titleOrder} />
                            <StyledText originValue={`￥ ${data?.data?.quantity}`} customStyle={styles.price} isBlack />
                        </View>
                    </View>
                </View>
            </View>
            <DashView />
        </>
    );
};
const OrderHistoryDetailScreen = () => {
    // const confirm = () => {
    //     navigate(TAB_NAVIGATION_ROOT.HOME_ROUTE.CART);
    // };
    return (
        <View style={styles.container}>
            <StyledHeader title={'setting.orderHistoryDetailTitle'} />
            <KeyboardAwareScrollView enableOnAndroid={true} showsVerticalScrollIndicator={false}>
                <View style={styles.body}>
                    <View style={styles.timeView}>
                        <StyledText i18nText={'setting.timeOrder'} isBlack />
                        <StyledText originValue={' : '} isBlack />
                        <StyledText originValue={'2021年11月6日　5時36分'} isBlack customStyle={styles.timeValue} />
                    </View>
                    <View style={styles.numOrderView}>
                        <View style={styles.row}>
                            <StyledIcon source={Images.icons.bag} customStyle={styles.icBag} size={17} />
                            <StyledText originValue={'content'} customStyle={styles.contentText} />
                        </View>
                        <View style={styles.row}>
                            <StyledText originValue={'4'} customStyle={styles.contentText} />
                            <StyledText i18nText={'点'} customStyle={styles.contentText} />
                        </View>
                    </View>
                    <View style={styles.orderView}>
                        {listOrderDefault.map((item, index) => (
                            <OrderItem key={index} data={item} />
                        ))}
                    </View>
                    <View style={styles.contentView}>
                        <View style={styles.rowPrice}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <StyledText originValue={'注文数'} isBlack />
                                <StyledText originValue={' 2 '} customStyle={styles.valueOrder} />
                                <StyledText originValue={'点'} isBlack />
                            </View>
                            <StyledText originValue={`￥ ${1600}`} customStyle={styles.price} isBlack />
                        </View>
                        <View style={styles.rowPrice}>
                            <View style={styles.contentRow}>
                                <StyledIcon
                                    size={20}
                                    source={Images.icons.coupon}
                                    customStyle={{ tintColor: Themes.COLORS.primary, marginBottom: scale(5) }}
                                />
                                <StyledText originValue={'クーポンタイトル'} customStyle={styles.titleOrder} />
                            </View>
                            <StyledText originValue={`￥ ${1600}`} customStyle={styles.price} isBlack />
                        </View>
                        <View style={[styles.quantity, styles.priceSum]}>
                            <StyledText i18nText={'合計'} customStyle={styles.priceSumValue} />
                            <StyledText originValue={'￥1400'} customStyle={styles.priceSumValue} />
                        </View>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </View>
    );
};

export default OrderHistoryDetailScreen;

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
        color: Themes.COLORS.secondary,
        marginBottom: '5@vs',
    },
    quantity: {
        backgroundColor: Themes.COLORS.lightGray,
        width: '100%',
        borderRadius: 5,
        paddingVertical: '5@vs',
        paddingHorizontal: '20@s',
        justifyContent: 'space-between',
        marginTop: '10@vs',
    },
    priceSum: {
        flexDirection: 'row',
        paddingVertical: '10@vs',
    },
    orderView: {
        alignItems: 'center',
        width: '100%',
        backgroundColor: Themes.COLORS.white,
        paddingVertical: '10@vs',
        marginBottom: '10@vs',
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
    rowPrice: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: '10@vs',
    },
    price: {
        fontWeight: 'bold',
    },
    contentRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    priceSumValue: {
        fontSize: '16@ms0.3',
        color: Themes.COLORS.primary,
        fontWeight: 'bold',
    },
    icBag: {
        tintColor: Themes.COLORS.secondary,
    },
    timeView: {
        paddingVertical: '10@vs',
        paddingHorizontal: '20@s',
        marginTop: '10@vs',
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
    },
    timeValue: {
        fontWeight: 'bold',
        marginLeft: '15@s',
    },
    valueOrder: {
        color: Themes.COLORS.primary,
        fontWeight: 'bold',
        fontSize: '24@ms0.3',
        marginHorizontal: '5@s',
    },
});
