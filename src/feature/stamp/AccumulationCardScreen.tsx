import { StyledButton } from 'components/base';
import StyledHeader from 'components/common/StyledHeader';
import { TAB_NAVIGATION_ROOT } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

const AccumulationCardScreen = () => {
    const detailCoupon = () => {
        navigate(TAB_NAVIGATION_ROOT.COUPON_ROUTE.DETAIL_COUPON);
    };
    return (
        <View style={styles.container}>
            <StyledHeader title={'Accumulation Card'} />
            <View style={styles.body}>
                <StyledButton title={'detailCoupon'} onPress={detailCoupon} />
            </View>
        </View>
    );
};

export default AccumulationCardScreen;

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
});
