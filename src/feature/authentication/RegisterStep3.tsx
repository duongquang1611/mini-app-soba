import { StyledButton } from 'components/base';
import { HOME_ROUTE } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import StyledHeader from 'components/common/StyledHeader';
import AlertMessage from 'components/base/AlertMessage';
import { logger } from 'utilities/logger';
import { useTranslation } from 'react-i18next';
import AuthenticateService from 'utilities/authenticate/AuthenticateService';

const RegisterStep3 = () => {
    const { t } = useTranslation();

    const confirm = async () => {
        try {
            // if (code?.length < 5) {
            //     AlertMessage(t('alert.invalidOTP'));
            //     return;
            // }
            // if (route?.params?.register) {
            //     const response = await register({ email, password, verifiedCode: code });
            //     const data = {
            //         ...response,
            //         user: { email, isSave: true },
            //     };
            //     AuthenticateService.handlerLogin(data);
            // } else {
            //     const verifyCode = await checkVerifyCode(email, code);
            //     if (verifyCode?.data?.isValid) {
            //         navigate(AUTHENTICATE_ROUTE.CHANGE_PASS, { email, code });
            //     } else {
            //         AlertMessage(t('alert.invalidOTP'));
            //     }
            // }
            // AuthenticateService.handlerLogin(data);
            navigate(HOME_ROUTE.ROOT);
        } catch (error) {
            logger(error);
            AlertMessage(error);
        }
    };
    return (
        <View style={styles.container}>
            <StyledHeader title={'register'} />
            <View style={styles.body}>
                <StyledButton title={'confirm'} onPress={confirm} customStyle={styles.buttonSave} />
            </View>
        </View>
    );
};

export default RegisterStep3;

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
