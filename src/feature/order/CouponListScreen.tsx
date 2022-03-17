import { getCouponList } from 'api/modules/api-app/coupon';
import Metrics from 'assets/metrics';
import { Themes } from 'assets/themes';
import { StyledButton, StyledText } from 'components/base';
import AlertMessage from 'components/base/AlertMessage';
import ModalizeManager from 'components/base/modal/ModalizeManager';
import CouponItem from 'components/common/CouponItem';
import StyledHeader from 'components/common/StyledHeader';
import { TAB_NAVIGATION_ROOT } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ScaledSheet, verticalScale } from 'react-native-size-matters';
import { logger } from 'utilities/helper';
import { listCouponFake, MODAL_ID } from 'utilities/staticData';
import { OrderChild } from './components/OrderItem';

const data = [
    { name: 'mon 1', id: 1, choose: true },
    { name: 'mon 1', id: 2, choose: true },
    { name: 'mon 1', id: 3, choose: true },
];
const ModalCoupon = () => (
    <View style={styles.modalView}>
        <StyledText originValue={'90％割引'} customStyle={styles.couponName} />
        <StyledText i18nText={'クーポンを適用する商品を選択してください'} customStyle={styles.conTentCoupon} />
        {data.map((item, index) => (
            <OrderChild key={index} item={item} />
        ))}
        <StyledButton
            title={'order.keep'}
            onPress={() => {
                console.log('keep');
            }}
            customStyle={{ alignSelf: 'center' }}
        />
    </View>
);
const CouponListScreen = () => {
    const modalize = ModalizeManager();
    const [listCoupon, setListCoupon] = useState(listCouponFake);
    useEffect(() => {
        getListCoupon();
    }, []);
    const getListCoupon = async () => {
        try {
            const res = await getCouponList();
            setListCoupon(res?.data);
        } catch (error) {
            logger(error);
            AlertMessage(error);
        }
    };

    const numberItemListCoupon = 3;
    const showApplyCoupon = () => {
        modalize.show(
            MODAL_ID.APPLY_COUPON,
            <ModalCoupon />,
            {
                modalHeight: verticalScale(numberItemListCoupon * 60 + 250),
                scrollViewProps: {
                    contentContainerStyle: { flexGrow: 1 },
                },
            },
            { title: 'order.applyCoupon' },
        );
    };
    return (
        <View style={styles.container}>
            <StyledHeader title={'order.couponTitle'} />
            <KeyboardAwareScrollView enableOnAndroid={true} showsVerticalScrollIndicator={false}>
                <View style={styles.body}>
                    {listCoupon.map((item, index) => (
                        <CouponItem canUse={true} key={index} item={item} />
                    ))}
                </View>
            </KeyboardAwareScrollView>
            <View style={styles.buttonView}>
                <StyledButton title={'order.useCoupon'} onPress={showApplyCoupon} customStyle={styles.buttonSave} />
            </View>
        </View>
    );
};

export default CouponListScreen;

const styles = ScaledSheet.create({
    container: {
        flex: 1,
    },
    body: {
        flex: 1,
    },
    buttonView: {
        backgroundColor: Themes.COLORS.white,
        alignItems: 'center',
        width: '100%',
        marginVertical: '10@vs',
        marginBottom: Metrics.safeBottomPadding,
    },
    buttonSave: {},
    couponName: {
        fontWeight: 'bold',
        fontSize: '16@ms0.3',
        paddingVertical: '10@vs',
    },
    conTentCoupon: {
        fontWeight: 'bold',
        fontSize: '16@ms0.3',
        paddingBottom: '10@vs',
        color: Themes.COLORS.primary,
    },
    modalView: {
        paddingHorizontal: '20@s',
    },
});
