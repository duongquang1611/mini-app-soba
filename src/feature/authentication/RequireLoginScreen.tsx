import { updateGlobalDataUnSave } from 'app-redux/slices/globalDataUnSaveSlice';
import { StyledButton, StyledText } from 'components/base';
import StyledHeader from 'components/common/StyledHeader';
import React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { useDispatch } from 'react-redux';

const RequireLoginScreen = ({ title }: any) => {
    const dispatch = useDispatch();

    const goToLogin = () => {
        dispatch(updateGlobalDataUnSave({ withoutAccount: false }));
    };

    return (
        <>
            <StyledHeader title={title} hasBack={false} largeTitleHeader />
            <View style={styles.container}>
                <StyledText i18nText="common.requireLogin" />
                <StyledButton onPress={goToLogin} title="common.goToLogin" customStyle={styles.loginBtn} />
            </View>
        </>
    );
};

export default RequireLoginScreen;

const styles = ScaledSheet.create({
    loginBtn: {},
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
