// import { StyledButton } from 'components/base';
// import { navigate } from 'navigation/NavigationService';
// import React from 'react';
// import { View } from 'react-native';
// import { ScaledSheet } from 'react-native-size-matters';
// import StyledHeader from 'components/common/StyledHeader';
// import { TAB_NAVIGATION_ROOT } from 'navigation/config/routes';

// const CartScreen = () => {
//     const goToCouponList = () => {
//         navigate(TAB_NAVIGATION_ROOT.ORDER_ROUTE.COUPON_LIST);
//     };
//     const goToOrderQrCode = () => {
//         navigate(TAB_NAVIGATION_ROOT.ORDER_ROUTE.ORDER_QR_CODE);
//     };
//     return (
//         <View style={styles.container}>
//             <StyledHeader title={'cart screen'} />
//             <View style={styles.body}>
//                 <StyledButton title={'couponListScreen'} onPress={goToCouponList} customStyle={styles.buttonSave} />
//                 <StyledButton title={'qrCodeScreen'} onPress={goToOrderQrCode} customStyle={styles.buttonSave} />
//             </View>
//         </View>
//     );
// };

// export default CartScreen;

// const styles = ScaledSheet.create({
//     container: {
//         flex: 1,
//     },
//     body: {
//         justifyContent: 'center',
//         alignItems: 'center',
//         flex: 1,
//         marginHorizontal: '20@s',
//     },
//     buttonSave: {},
// });

import { StyledButton, StyledIcon, StyledText } from 'components/base';
import { TAB_NAVIGATION_ROOT } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import StyledHeader from 'components/common/StyledHeader';
import { Themes } from 'assets/themes';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { coupon, listOrderDefault } from 'utilities/staticData';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Images from 'assets/images';

const ItemCoupon = (data: any) => {
    return (
        <View style={styles.rowItem}>
            <StyledIcon source={Images.icons.coupon} size={20} customStyle={styles.icCoupon} />
            <StyledText originValue={data?.data?.name} customStyle={styles.nameCoupon} isBlack />
            <StyledIcon source={Images.icons.cancel} size={15} />
        </View>
    );
};
export const OrderItem = (data: any) => {
    return (
        <>
            <View style={styles.orderItemView}>
                <StyledIcon source={{ uri: data?.data?.img }} size={70} />
                <View style={styles.orderTextView}>
                    <TouchableOpacity>
                        <StyledIcon source={Images.icons.cancel} size={17} customStyle={styles.icCancel} />
                    </TouchableOpacity>
                    <StyledText originValue={data?.data?.name} customStyle={styles.titleOrder} />
                    {data?.data?.listAdd?.map((item: any, index: number) => (
                        <View key={index}>
                            <StyledText originValue={`+ ${item?.name}`} isBlack customStyle={styles.addValue} />
                        </View>
                    ))}
                    <View style={styles.quantity}>
                        <StyledText i18nText={'個数'} customStyle={styles.changeText} />
                        <View style={styles.row}>
                            <TouchableOpacity>
                                <StyledIcon source={Images.icons.minus} size={20} />
                            </TouchableOpacity>
                            <StyledText originValue={data?.data?.quantity} customStyle={styles.quantityText} />
                            <TouchableOpacity>
                                <StyledIcon source={Images.icons.add} size={20} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.dot} />
        </>
    );
};
const CartScreen = () => {
    const confirm = () => {
        navigate(TAB_NAVIGATION_ROOT.HOME_ROUTE.CART);
    };
    const goToCouponList = () => {
        navigate(TAB_NAVIGATION_ROOT.ORDER_ROUTE.COUPON_LIST);
    };
    return (
        <View style={styles.container}>
            <StyledHeader title={'カート'} textRight={'注文キャンセル'} />
            <KeyboardAwareScrollView enableOnAndroid={true} showsVerticalScrollIndicator={false}>
                <View style={styles.body}>
                    <View style={styles.numOrderView}>
                        <View style={styles.row}>
                            <StyledIcon source={Images.icons.bag} size={17} customStyle={styles.icBag} />
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
                        <StyledText customStyle={styles.title} i18nText={'クーポンリスト'} />
                        {coupon.map((item, index) => (
                            <ItemCoupon key={index} data={item} />
                        ))}
                        {coupon.length === 0 && (
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
                        <StyledButton title={'ＱＲコード発行'} onPress={confirm} />
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
    dot: {
        width: '100%',
        borderWidth: 0.5,
        borderStyle: 'dashed',
        borderColor: Themes.COLORS.silver,
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
});
