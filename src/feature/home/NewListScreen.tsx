import { StyledButton } from 'components/base';
import { AUTHENTICATE_ROUTE, TAB_NAVIGATION_ROOT } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import StyledHeader from 'components/common/StyledHeader';

const NewListScreen = () => {
    const confirm = () => {
        navigate(TAB_NAVIGATION_ROOT.HOME_ROUTE.NEW_DETAIL);
    };
    return (
        <View style={styles.container}>
            <StyledHeader title={'new list'} />
            <View style={styles.body}>
                <StyledButton title={'new Detail'} onPress={confirm} customStyle={styles.buttonSave} />
            </View>
        </View>
    );
};

export default NewListScreen;

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
