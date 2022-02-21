import { StyledButton, StyledIcon, StyledText } from 'components/base';
import { TAB_NAVIGATION_ROOT } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React from 'react';
import { View } from 'react-native';
import { ScaledSheet, verticalScale } from 'react-native-size-matters';
import StyledHeader from 'components/common/StyledHeader';
import { Themes } from 'assets/themes';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { listOrderDefault } from 'utilities/staticData';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Images from 'assets/images';

const OrderItem = (data: any) => {
    return (
        <View style={styles.orderItemView}>
            <StyledIcon source={{ uri: data?.data?.img }} size={70} />
            <View style={styles.orderTextView}>
                <StyledText originValue={data?.data?.name} customStyle={styles.titleOrder} />
                {data?.data?.listAdd?.map((item: any, index: number) => (
                    <View key={index} style={styles.rowPrice}>
                        <StyledText originValue={`+ ${item?.name}`} />
                        <StyledText originValue={`￥ ${item?.price}`} customStyle={styles.price} />
                    </View>
                ))}
                <View style={styles.quantity}>
                    <View style={styles.rowPrice}>
                        <StyledText originValue={'個数'} customStyle={styles.titleOrder} />
                        <StyledText originValue={data?.data?.quantity} customStyle={styles.price} />
                    </View>
                    <View style={[styles.rowPrice, { marginTop: verticalScale(10) }]}>
                        <StyledText originValue={'小計'} customStyle={styles.titleOrder} />
                        <StyledText originValue={`￥ ${data?.data?.quantity}`} customStyle={styles.price} />
                    </View>
                </View>
            </View>
        </View>
    );
};
const OrderHistoryDetailScreen = () => {
    const confirm = () => {
        navigate(TAB_NAVIGATION_ROOT.HOME_ROUTE.CART);
    };
    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView enableOnAndroid={true} showsVerticalScrollIndicator={false}>
                <StyledHeader title={'order detail'} />
                <View style={styles.body}>
                    <View style={styles.numOrderView}>
                        <View style={styles.row}>
                            <StyledIcon source={Images.icons.eyeOff} size={17} />
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
                            <StyledText originValue={'小計'} customStyle={styles.titleOrder} />
                            <StyledText originValue={`￥ ${1600}`} customStyle={styles.price} />
                        </View>
                        <View style={styles.rowPrice}>
                            <View style={styles.contentRow}>
                                <StyledIcon size={20} source={Images.icons.eyeOff} />
                                <StyledText originValue={'クーポンタイトル'} customStyle={styles.titleOrder} />
                            </View>
                            <StyledText originValue={`￥ ${1600}`} customStyle={styles.price} />
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
        paddingVertical: '10@vs',
        paddingHorizontal: '20@s',
        justifyContent: 'space-between',
        marginTop: '10@vs',
    },
    priceSum: {
        flexDirection: 'row',
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
});
