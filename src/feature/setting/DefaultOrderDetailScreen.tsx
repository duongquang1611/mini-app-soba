import { StyledIcon, StyledImage, StyledText } from 'components/base';
import React, { useState } from 'react';
import { ImageBackground, View } from 'react-native';
import { scale, ScaledSheet } from 'react-native-size-matters';
import Images from 'assets/images';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Themes } from 'assets/themes';
import { dataFakeOderDefault, imagesList } from 'utilities/staticData';
import StyledHeaderImage from 'components/common/StyledHeaderImage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Metrics from 'assets/metrics';
import { navigate } from 'navigation/NavigationService';
import { TAB_NAVIGATION_ROOT } from 'navigation/config/routes';

const OrderChild = (data: any) => {
    const [choose, setChoose] = useState(false);
    return (
        <View style={styles.containerItem}>
            <View style={styles.itemRow}>
                <View style={styles.itemRow}>
                    <StyledImage source={Images.photo.defaultImage} customStyle={styles.imgItem} />
                    <StyledText originValue={data?.item.name} customStyle={styles.nameOrder} />
                </View>
                <TouchableOpacity
                    onPress={() => {
                        setChoose(!choose);
                    }}
                    style={[
                        styles.chooseButton,
                        {
                            backgroundColor: choose ? Themes.COLORS.primary : Themes.COLORS.white,
                            borderColor: choose ? '#FBA29D' : Themes.COLORS.silver,
                        },
                    ]}
                />
            </View>
        </View>
    );
};
const OrderItem = (data: any) => {
    return (
        <View style={[styles.containerItem, { paddingHorizontal: scale(20) }]}>
            <StyledText originValue={data?.data?.name} customStyle={styles.name} />
            {data.data.dishes?.map((item: any, index: number) => (
                <OrderChild key={index} item={item} />
            ))}
        </View>
    );
};
const goToSaveOrder = () => {
    navigate(TAB_NAVIGATION_ROOT.SETTING_ROUTE.ORDER_SAVE);
};
const DefaultOrderDetailScreen = () => {
    const [num, setNum] = useState(1);
    const add = () => {
        setNum(num + 1);
    };
    const minus = () => {
        if (num > 0) setNum(num - 1);
    };
    return (
        <View style={styles.container}>
            <StyledHeaderImage images={imagesList} content={'たぬきそば'} />
            <KeyboardAwareScrollView enableOnAndroid={true} showsVerticalScrollIndicator={false}>
                <StyledText originValue={'content'} isBlack customStyle={styles.contentText} />
                <View style={styles.body}>
                    {dataFakeOderDefault.map((item) => (
                        <OrderItem key={item.id} data={item} />
                    ))}
                </View>
            </KeyboardAwareScrollView>
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
            <View style={styles.secondaryView}>
                <ImageBackground source={Images.icons.rectangle} style={styles.rectangle}>
                    <StyledIcon source={Images.icons.bag_happy} size={35} customStyle={styles.icBag} />
                </ImageBackground>
                <TouchableOpacity style={styles.rowCart} onPress={goToSaveOrder}>
                    <StyledText i18nText={'setting.viewCart'} customStyle={styles.textCart} />
                    <StyledText originValue={'（4）'} customStyle={styles.textCart} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default DefaultOrderDetailScreen;

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
        marginBottom: '10@vs',
        backgroundColor: Themes.COLORS.white,
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
    },
    rowCart: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    chooseButton: {
        width: '16@s',
        height: '16@s',
        borderRadius: 16,
        borderWidth: 2,
    },
    contentText: {
        marginVertical: '10@vs',
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
        backgroundColor: Themes.COLORS.white,
        paddingVertical: '5@vs',
    },
    quantityText: {
        marginHorizontal: '20@s',
        fontSize: '38@ms0.3',
    },
});
