/* eslint-disable @typescript-eslint/no-unused-vars */
import { checkVerifyCode, forgotPassword, getVerifyCode, register } from 'api/modules/api-app/authenticate';
import { userInfoActions } from 'app-redux/slices/userInfoSlice';
import { Themes } from 'assets/themes';
import { StyledButton, StyledText, StyledTouchable } from 'components/base';
import AlertMessage from 'components/base/AlertMessage';
import StyledHeader from 'components/common/StyledHeader';
import { AUTHENTICATE_ROUTE } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React, { FunctionComponent, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import CodeInput from 'react-native-confirmation-code-input';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ScaledSheet } from 'react-native-size-matters';
import { useDispatch } from 'react-redux';
import { staticValue, VerifiedCodeType } from 'utilities/staticData';

const SendOTP: FunctionComponent = ({ route }: any) => {
    const dispatch = useDispatch();
    const [code, setCode] = useState('');
    const { t } = useTranslation();
    const { user, type } = route?.params;
    const { email, password } = user;
    const isRegister = useMemo(() => type === VerifiedCodeType.REGISTER, [type]);
    const onCodeFilled = (codeVer: string) => {
        setCode(codeVer);
    };

    const confirm = async () => {
        try {
            if (code?.length < staticValue.OTP_LENGTH) {
                AlertMessage(t('alert.invalidOTP'));
                return;
            }
            if (isRegister) {
                const response = await register({
                    ...user,
                    verifiedCode: code,
                });
                console.log(response.data);
                dispatch(userInfoActions.updateToken(response.data));
                // navigate(AUTHENTICATE_ROUTE.REGISTER_STEP_1);
            } else {
                const verifyCode = await checkVerifyCode(email, code);
                if (verifyCode?.data?.isValid) {
                    navigate(AUTHENTICATE_ROUTE.CHANGE_PASS, { email, code });
                } else {
                    AlertMessage(t('alert.invalidOTP'));
                }
            }
        } catch (error) {
            console.log('confirm -> error', error);
            AlertMessage(error);
        }
    };

    const resendOTP = async () => {
        try {
            if (isRegister) {
                await getVerifyCode(email);
                AlertMessage(t('alert.success'));
                return;
            }
            await forgotPassword(email);
            AlertMessage(t('alert.success'));
        } catch (error) {
            AlertMessage(error);
        }
    };

    return (
        <View style={styles.flex1}>
            <KeyboardAwareScrollView enableOnAndroid={true} showsVerticalScrollIndicator={false}>
                <StyledHeader title={isRegister ? 'regis' : 'SendOtpForgotPass'} />
                <StyledText customStyle={styles.title} i18nText={isRegister ? 'regis' : 'SendOtpForgotPass'} />
                <View style={styles.container}>
                    <CodeInput
                        codeLength={6}
                        keyboardType="numeric"
                        space={20}
                        size={30}
                        activeColor={Themes.COLORS.black}
                        containerStyle={styles.otpInput}
                        codeInputStyle={styles.underlineStyleBase}
                        onFulfill={onCodeFilled}
                    />
                    <StyledTouchable onPress={resendOTP} customStyle={styles.containerResend}>
                        <StyledText customStyle={styles.resend} i18nText="common.sendOTP.resend" />
                    </StyledTouchable>
                    <StyledButton
                        customStyle={styles.flex1}
                        title={isRegister ? 'common.sendOTP.sendForgotPassword' : 'common.sendOTP.buttonNext'}
                        onPress={confirm}
                    />
                </View>
            </KeyboardAwareScrollView>
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignContent: 'center',
    },
    title: {
        fontWeight: 'bold',
        fontSize: '20@ms0.3',
        marginLeft: '20@s',
        marginVertical: '20@vs',
    },
    otpInput: {
        width: '100%',
        flex: 1,
        marginVertical: 10,
    },
    underlineStyleBase: {
        width: 45,
        height: 55,
        borderColor: Themes.COLORS.black,
        borderRadius: 15,
        color: Themes.COLORS.black,
        marginHorizontal: 20,
    },
    containerResend: {
        width: '100%',
        flex: 1,
        marginTop: 30,
    },
    resend: {
        textDecorationLine: 'underline',
        textDecorationColor: Themes.COLORS.black,
        color: Themes.COLORS.black,
        textAlign: 'center',
        width: '100%',
    },
    flex1: {
        flex: 1,
    },
});

export default SendOTP;
