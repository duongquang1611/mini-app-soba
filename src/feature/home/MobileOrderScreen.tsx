import Images from 'assets/images';
import { Themes } from 'assets/themes';
import { StyledButton, StyledIcon, StyledImage, StyledText } from 'components/base';
import StyledHeader from 'components/common/StyledHeader';
import { TAB_NAVIGATION_ROOT } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ScaledSheet } from 'react-native-size-matters';
import { coupon, listOrderDefault } from 'utilities/staticData';

// const OrderDefaultItem = (data: any) => {
//     return (
//         <TouchableOpacity style={styles.orderView}>
//             <StyledIcon source={{ uri: data?.data?.img }} size={70} />
//             <View style={styles.orderTextView}>
//                 <StyledText originValue={data?.data?.name} customStyle={styles.titleOrder} />
//                 {data?.data?.listAdd?.map((item: any, index: number) => (
//                     <View key={index}>
//                         <StyledText originValue={`+ ${item?.name}`} />
//                     </View>
//                 ))}
//                 <View style={styles.quantity}>
//                     <StyledText i18nText={'個数'} />
//                     <StyledText originValue={data?.data?.quantity} />
//                 </View>
//             </View>
//         </TouchableOpacity>
//     );
// };
const OrderDefaultItem = (data: any) => {
    return (
        <TouchableOpacity style={styles.orderView}>
            <StyledIcon source={{ uri: data?.data?.img }} size={70} />
            <View style={styles.orderTextView}>
                <StyledText originValue={data?.data?.name} customStyle={styles.titleOrder} />
                {data?.data?.listAdd?.map((item: any, index: number) => (
                    <View key={index} style={{ flexDirection: 'row' }}>
                        <StyledText originValue={`+ ${item?.name}`} isBlack customStyle={styles.addText} />
                        {item?.num && (
                            <View style={styles.numView}>
                                <StyledText originValue={`x ${item?.num}`} isBlack customStyle={styles.addValue} />
                            </View>
                        )}
                    </View>
                ))}
                <View style={styles.quantity}>
                    <StyledText i18nText={'個数'} customStyle={styles.quantityText} />
                    <StyledText originValue={data?.data?.quantity} isBlack />
                </View>
            </View>
        </TouchableOpacity>
    );
};
const ItemCoupon = (data: any) => {
    return (
        <View style={styles.rowItem}>
            <StyledIcon source={Images.icons.coupon} size={15} customStyle={styles.icCoupon} />
            <StyledText originValue={data?.data?.name} customStyle={styles.nameCoupon} isBlack />
        </View>
    );
};
const MobileOrderScreen = () => {
    const edit = () => {
        navigate(TAB_NAVIGATION_ROOT.HOME_ROUTE.EDIT_ORDER);
    };
    const cancel = () => null;
    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView enableOnAndroid={true} showsVerticalScrollIndicator={false}>
                <StyledHeader title={'事前注文QRコード'} iconRight={Images.icons.question} />
                <View style={styles.body}>
                    <View style={styles.qrView}>
                        <StyledImage source={Images.photo.qrCode} customStyle={styles.img} />
                        <StyledButton title={'注文編集'} onPress={edit} customStyle={styles.buttonSave} />
                        <StyledButton
                            isNormal={true}
                            title={'注文キャンセル'}
                            onPress={cancel}
                            customStyle={styles.cancelButton}
                            customStyleText={styles.cancelText}
                        />
                    </View>
                    <View style={styles.numOrderView}>
                        <View style={styles.row}>
                            <StyledIcon source={Images.icons.bag} size={17} customStyle={styles.icBag} />
                            <StyledText originValue={'注文数'} customStyle={styles.contentText} />
                        </View>
                        <View style={styles.row}>
                            <StyledText originValue={'4'} customStyle={styles.contentText} />
                            <StyledText i18nText={'点'} customStyle={styles.contentText} />
                        </View>
                    </View>
                    <View style={styles.qrView}>
                        {listOrderDefault.map((item, index) => (
                            <OrderDefaultItem key={index} data={item} />
                        ))}
                    </View>
                    <View style={styles.contentView}>
                        <StyledText customStyle={styles.title} i18nText={'クーポンリスト'} />
                        {coupon.map((item, index) => (
                            <ItemCoupon key={index} data={item} />
                        ))}
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </View>
    );
};

export default MobileOrderScreen;

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: Themes.COLORS.lightGray,
    },
    body: {
        flex: 1,
    },
    qrView: {
        alignItems: 'center',
        width: '100%',
        backgroundColor: Themes.COLORS.white,
        paddingVertical: '10@vs',
        marginBottom: '10@vs',
    },
    numOrderView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: Themes.COLORS.white,
        paddingVertical: '10@vs',
        paddingHorizontal: '20@s',
        marginBottom: '10@vs',
    },
    titleText: {
        color: Themes.COLORS.secondary,
        fontSize: '20@ms0.3',
    },
    img: {
        width: '180@vs',
        height: '180@vs',
        marginVertical: '15@vs',
    },
    contentView: {
        width: '100%',
        paddingHorizontal: '20@s',
        backgroundColor: Themes.COLORS.white,
        paddingVertical: '10@vs',
    },
    buttonSave: {
        width: '162@s',
        alignSelf: 'center',
    },
    cancelButton: {
        width: '162@s',
        alignSelf: 'center',
        marginVertical: '10@vs',
        marginTop: '15@vs',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    contentText: {
        marginLeft: '5@s',
        fontSize: '18@ms0.3',
        fontWeight: 'bold',
    },
    orderView: {
        width: '100%',
        paddingVertical: '10@vs',
        paddingHorizontal: '20@s',
        flexDirection: 'row',
        justifyContent: 'space-between',
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
    },
    rowItem: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        marginTop: '10@vs',
        backgroundColor: Themes.COLORS.white,
    },
    nameCoupon: {
        width: '93%',
    },
    title: {
        fontSize: '16@ms0.3',
        color: Themes.COLORS.secondary,
        fontWeight: 'bold',
    },
    cancelText: {
        color: Themes.COLORS.primary,
        fontWeight: 'bold',
    },
    icBag: {
        tintColor: Themes.COLORS.secondary,
    },
    numView: {
        backgroundColor: Themes.COLORS.headerBackground,
        borderRadius: 5,
        paddingHorizontal: '5@s',
        paddingVertical: '2@vs',
        marginLeft: '5@s',
    },
    addValue: {
        color: Themes.COLORS.primary,
        fontSize: '12@ms0.3',
    },
    quantityText: {
        fontWeight: 'bold',
    },
    addText: {
        marginVertical: '3@vs',
    },
    icCoupon: {
        tintColor: Themes.COLORS.primary,
    },
});
