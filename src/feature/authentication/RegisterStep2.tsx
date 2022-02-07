import { StyledButton } from 'components/base';
import { AUTHENTICATE_ROUTE } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import StyledHeader from 'components/common/StyledHeader';

const RegisterStep2 = () => {
    const goToRegis = () => {
        navigate(AUTHENTICATE_ROUTE.REGISTER_STEP_3);
    };
    return (
        <View style={styles.container}>
            <StyledHeader title={'register'} />
            <View style={styles.body}>
                <StyledButton title={'confirm'} onPress={goToRegis} customStyle={styles.buttonSave} />
            </View>
        </View>
    );
};

export default RegisterStep2;

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
