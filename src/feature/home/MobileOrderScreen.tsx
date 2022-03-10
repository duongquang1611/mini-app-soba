import { getMobileOrder } from 'api/modules/api-app/home';
import { RootState } from 'app-redux/hooks';
import Images from 'assets/images';
import { Themes } from 'assets/themes';
import { StyledButton, StyledIcon, StyledText } from 'components/base';
import AlertMessage from 'components/base/AlertMessage';
import StyledHeader from 'components/common/StyledHeader';
import { TAB_NAVIGATION_ROOT } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ScaledSheet } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import { logger } from 'utilities/helper';
import { coupon } from 'utilities/staticData';
import QRCode from 'react-native-qrcode-svg';
import { clearSaveOrder, updateSaveOrder } from 'app-redux/slices/saveOrderSlice';
import { OrderItemCart } from 'feature/order/CartScreen';
import AmountOrder from 'feature/order/components/AmountOrder';

const ItemCoupon = (data: any) => {
    return (
        <View style={styles.rowItem}>
            <StyledIcon source={Images.icons.coupon} size={15} customStyle={styles.icCoupon} />
            <StyledText originValue={data?.data?.name} customStyle={styles.nameCoupon} isBlack />
        </View>
    );
};
const MobileOrderScreen = () => {
    const { saveOrder } = useSelector((state: RootState) => state.saveOrder);
    const [data, setData] = useState<any>();
    const dispatch = useDispatch();
    useEffect(() => {
        getData();
    }, []);
    const getData = async () => {
        try {
            const res = await getMobileOrder();
            setData(res?.data);
        } catch (error) {
            logger(error);
            AlertMessage(error);
        }
    };
    const edit = () => {
        navigate(TAB_NAVIGATION_ROOT.ORDER_ROUTE.CART);
    };
    const cancelCart = () => {
        dispatch(clearSaveOrder());
    };
    const cancelItem = (id: number) => {
        const newDishes = saveOrder?.dishes?.filter((item: any) => item?.id !== id);
        dispatch(updateSaveOrder({ ...saveOrder, dishes: newDishes }));
    };
    return (
        <View style={styles.container}>
            <StyledHeader title={'事前注文QRコード'} iconRight={Images.icons.question} />
            <KeyboardAwareScrollView enableOnAndroid={true} showsVerticalScrollIndicator={false}>
                <View style={styles.body}>
                    <View style={styles.qrView}>
                        <QRCode value={JSON.stringify(saveOrder)} size={180} />
                        <StyledButton title={'注文編集'} onPress={edit} customStyle={styles.buttonSave} />
                        <StyledButton
                            isNormal={true}
                            title={'注文キャンセル'}
                            onPress={cancelCart}
                            customStyle={styles.cancelButton}
                            customStyleText={styles.cancelText}
                        />
                    </View>
                    <AmountOrder />
                    <View style={styles.qrView}>
                        {saveOrder?.dishes?.map((item: any, index: number) => (
                            <OrderItemCart canChange={false} key={index} data={item} onCancel={cancelItem} />
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
