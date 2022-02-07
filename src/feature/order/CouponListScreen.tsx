import { StyledButton } from 'components/base';
import StyledHeader from 'components/common/StyledHeader';
import { TAB_NAVIGATION_ROOT } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

const CouponListScreen = () => {
    const confirm = () => {
        navigate(TAB_NAVIGATION_ROOT.ORDER_ROUTE.DETAIL_SHOP);
    };
    return (
        <View style={styles.container}>
            <StyledHeader title={'couponList'} />
            <View style={styles.body}>
                <StyledButton title={'detail shop'} onPress={confirm} customStyle={styles.buttonSave} />
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
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        marginHorizontal: '20@s',
    },
    buttonSave: {},
});
