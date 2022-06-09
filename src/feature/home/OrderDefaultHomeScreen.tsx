/* eslint-disable @typescript-eslint/no-unused-vars */
import { getOrderDefault } from 'api/modules/api-app/home';
import Images from 'assets/images';
import { Themes } from 'assets/themes';
import { StyledButton, StyledIcon, StyledImage, StyledText } from 'components/base';
import AlertMessage from 'components/base/AlertMessage';
import StyledKeyboardAware from 'components/base/StyledKeyboardAware';
import StyledHeader from 'components/common/StyledHeader';
import AmountOrder from 'feature/order/components/AmountOrder';
import { TAB_NAVIGATION_ROOT } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ScaledSheet } from 'react-native-size-matters';
import { logger } from 'utilities/helper';
import { listOrderDefault } from 'utilities/staticData';

const OrderDefaultItem = (data: any) => {
    return (
        <TouchableOpacity style={styles.orderView}>
            <StyledImage source={{ uri: data?.data?.img }} resizeMode={'contain'} customStyle={styles.image} />
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
const OrderDefaultHomeScreen = () => {
    const [data, setData] = useState<any>();
    useEffect(() => {
        getData();
    }, []);
    const getData = async () => {
        try {
            const res = await getOrderDefault();
            setData(res?.data);
        } catch (error) {
            logger(error);
            AlertMessage(error);
        }
    };
    const edit = () => {
        navigate(TAB_NAVIGATION_ROOT.HOME_ROUTE.EDIT_ORDER);
    };
    const confirm = () => null;
    return (
        <View style={styles.container}>
            <StyledHeader title={'いつもの！選択'} iconRight={Images.icons.question} />
            <StyledKeyboardAware>
                <View style={styles.body}>
                    <View style={styles.qrView}>
                        <StyledImage source={Images.photo.qrCode} customStyle={styles.img} />
                        <StyledButton title={'注文編集'} onPress={edit} customStyle={styles.buttonSave} />
                    </View>
                    <AmountOrder />
                    <View style={styles.qrView}>
                        {listOrderDefault.map((item, index) => (
                            <OrderDefaultItem key={index} data={item} />
                        ))}
                    </View>
                </View>
            </StyledKeyboardAware>
        </View>
    );
};

export default OrderDefaultHomeScreen;

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
        paddingVertical: '20@vs',
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
        width: '162@s',
        height: '162@s',
        marginVertical: '10@vs',
        marginBottom: '15@vs',
    },
    contentView: {
        width: '100%',
        paddingHorizontal: '20@s',
        marginVertical: '15@vs',
    },
    buttonSave: {
        width: '162@s',
        alignSelf: 'center',
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
    },
    icBag: {
        tintColor: Themes.COLORS.secondary,
    },
    addText: {
        marginVertical: '3@vs',
    },
    quantityText: {
        fontWeight: 'bold',
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
    image: {
        width: '70@s',
        height: '70@s',
    },
});
