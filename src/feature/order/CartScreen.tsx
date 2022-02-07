import { StyledButton } from 'components/base';
import { navigate } from 'navigation/NavigationService';
import React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import StyledHeader from 'components/common/StyledHeader';
import { TAB_NAVIGATION_ROOT } from 'navigation/config/routes';

const CartScreen = () => {
    const goToCouponList = () => {
        navigate(TAB_NAVIGATION_ROOT.ORDER_ROUTE.COUPON_LIST);
    };
    const goToOrderQrCode = () => {
        navigate(TAB_NAVIGATION_ROOT.ORDER_ROUTE.ORDER_QR_CODE);
    };
    return (
        <View style={styles.container}>
            <StyledHeader title={'cart screen'} />
            <View style={styles.body}>
                <StyledButton title={'couponListScreen'} onPress={goToCouponList} customStyle={styles.buttonSave} />
                <StyledButton title={'qrCodeScreen'} onPress={goToOrderQrCode} customStyle={styles.buttonSave} />
            </View>
        </View>
    );
};

export default CartScreen;

const styles = ScaledSheet.create({
    container: {
        flex: 1,
    },
    body: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        marginHorizontal: '20@s',
    },
    buttonSave: {},
});
