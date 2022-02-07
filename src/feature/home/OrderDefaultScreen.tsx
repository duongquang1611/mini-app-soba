import { StyledButton } from 'components/base';
import { AUTHENTICATE_ROUTE } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import StyledHeader from 'components/common/StyledHeader';

const OrderDefaultScreen = () => {
    const confirm = () => {};
    return (
        <View style={styles.container}>
            <StyledHeader title={'OrderDefault'} />
            <View style={styles.body}>
                <StyledButton title={'confirm'} onPress={confirm} customStyle={styles.buttonSave} />
            </View>
        </View>
    );
};

export default OrderDefaultScreen;

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
