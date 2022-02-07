import { StyledButton } from 'components/base';
import StyledHeader from 'components/common/StyledHeader';
import { TAB_NAVIGATION_ROOT } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

const MenuScreen = () => {
    const confirm = () => {
        navigate(TAB_NAVIGATION_ROOT.ORDER_ROUTE.DETAIL_MEAL);
    };
    const goToCart = () => {
        navigate(TAB_NAVIGATION_ROOT.HOME_ROUTE.CART);
    };
    return (
        <View style={styles.container}>
            <StyledHeader title={'MenuScreen'} />
            <View style={styles.body}>
                <StyledButton title={'detail meal screen'} onPress={confirm} customStyle={styles.buttonSave} />
                <StyledButton title={'cart screen'} onPress={goToCart} customStyle={styles.buttonSave} />
            </View>
        </View>
    );
};

export default MenuScreen;

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
