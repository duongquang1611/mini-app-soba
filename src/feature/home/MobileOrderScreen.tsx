import { StyledButton } from 'components/base';
import { TAB_NAVIGATION_ROOT } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import StyledHeader from 'components/common/StyledHeader';

const MobileOrderScreen = () => {
    const confirm = () => {
        navigate(TAB_NAVIGATION_ROOT.HOME_ROUTE.CART);
    };
    return (
        <View style={styles.container}>
            <StyledHeader title={'mobileOrder'} />
            <View style={styles.body}>
                <StyledButton title={'Cart Screen'} onPress={confirm} customStyle={styles.buttonSave} />
            </View>
        </View>
    );
};

export default MobileOrderScreen;

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
