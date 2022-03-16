/* eslint-disable @typescript-eslint/no-unused-vars */
import { checkVerifyCode, forgotPassword, getVerifyCode, register } from 'api/modules/api-app/authenticate';
import { userInfoActions } from 'app-redux/slices/userInfoSlice';
import { Themes } from 'assets/themes';
import { StyledButton, StyledText, StyledTouchable } from 'components/base';
import AlertMessage from 'components/base/AlertMessage';
import StyledHeader from 'components/common/StyledHeader';
import TextUnderline from 'components/common/TextUnderline';
import useCountdown from 'hooks/useCountDown';
import { AUTHENTICATE_ROUTE } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React, { FunctionComponent, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Keyboard, Text, View } from 'react-native';
import { CodeField, Cursor, useClearByFocusCell } from 'react-native-confirmation-code-field';
import { ScaledSheet } from 'react-native-size-matters';
import { useDispatch } from 'react-redux';
import { staticValue, TEXT_OTP, VerifiedCodeType } from 'utilities/staticData';

const SendOTP: FunctionComponent = ({ route }: any) => {
    const dispatch = useDispatch();
    const codeInputRef = useRef<any>(null);
    const { countdown, resetCountdown, clearCountdown } = useCountdown(staticValue.COUNT_DOWN_OTP);
    const [retryOtpCount, setRetryOtpCount] = useState(0);
    const [wrongOtpCount, setWrongOtpCount] = useState(0);
    const { t } = useTranslation();
    const [code, setCode] = useState('');
    const { user = {}, type = VerifiedCodeType.REGISTER } = route?.params || {};
    const { email, password } = user;
    const maxResend = useMemo(() => retryOtpCount === staticValue.MAX_RETRY_OTP, [retryOtpCount]);
    const maxWrongOtp = useMemo(() => wrongOtpCount >= staticValue.MAX_WRONG_OTP, [wrongOtpCount]);
    const disabledResend = useMemo(() => countdown > 0 || maxResend, [countdown, maxResend]);

    const [props, getCellOnLayoutHandler] = useClearByFocusCell({ value: code, setValue: setCode });
    const isRegister = useMemo(() => type === VerifiedCodeType.REGISTER, [type]);

    useEffect(() => {
        codeInputRef?.current?.focus?.();
    }, []);

    const onCodeChange = (codeVer: string) => {
        if (codeVer.length === staticValue.OTP_LENGTH) Keyboard.dismiss();
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
                dispatch(userInfoActions.updateToken(response.data));
            } else {
                const verifyCode = await checkVerifyCode(email, code);
                if (verifyCode?.data?.isValid) {
                    navigate(AUTHENTICATE_ROUTE.CHANGE_PASS, { email, code });
                } else {
                    AlertMessage(t('alert.invalidOTP'));
                }
            }
        } catch (error: any) {
            if (error?.includes?.(staticValue.OTP_INVALID_MESSAGE)) {
                wrongOtpCount + 1 >= staticValue.MAX_WRONG_OTP
                    ? AlertMessage('otp.register.alertInvalidOtpMax', undefined, () =>
                          navigate(isRegister ? AUTHENTICATE_ROUTE.REGISTER : AUTHENTICATE_ROUTE.FORGOT_PASS),
                      )
                    : AlertMessage(error);
                setWrongOtpCount(wrongOtpCount + 1);
            } else AlertMessage(error);
        }
    };

    const actionResendSuccess = (reset = true) => {
        setCode('');
        if (reset) {
            resetCountdown();
            codeInputRef.current.focus();
        }
    };

    const resendOTP = async () => {
        setRetryOtpCount(retryOtpCount + 1);
        try {
            if (isRegister) {
                await getVerifyCode({ email, type });
                actionResendSuccess();
                return;
            }
            await forgotPassword(email);
        } catch (error) {
            AlertMessage(error);
        }
    };

    const renderCell = ({ index, symbol, isFocused }: any) => {
        return (
            <View
                key={index}
                onLayout={getCellOnLayoutHandler(index)}
                style={[styles.codeInput, { borderColor: symbol ? Themes.COLORS.secondary : Themes.COLORS.silver }]}
            >
                <Text style={styles.codeInputText}>{symbol || (isFocused ? <Cursor /> : null)}</Text>
            </View>
        );
    };

    return (
        <>
            <StyledHeader title={TEXT_OTP[type - 1].title} />
            <View style={styles.container}>
                <StyledText customStyle={styles.titleInputOtp} i18nText={TEXT_OTP[type - 1].titleInputOtp} />
                <StyledText customStyle={styles.textNote} i18nText={TEXT_OTP[type - 1].note} />
                <View style={styles.content}>
                    <CodeField
                        ref={codeInputRef}
                        {...props}
                        value={code}
                        onChangeText={onCodeChange}
                        cellCount={staticValue.OTP_LENGTH}
                        rootStyle={styles.otpInputBox}
                        keyboardType="number-pad"
                        textContentType="oneTimeCode"
                        renderCell={renderCell}
                        editable={!maxWrongOtp}
                    />
                    <TextUnderline
                        onPress={resendOTP}
                        customStyle={[
                            styles.containerResend,
                            (disabledResend || maxWrongOtp) && { borderColor: Themes.COLORS.silver },
                        ]}
                        title={'otp.register.resendOtp'}
                        customStyleText={[
                            styles.resend,
                            (disabledResend || maxWrongOtp) && { color: Themes.COLORS.silver },
                        ]}
                    />
                    {disabledResend && (
                        <StyledText
                            customStyle={styles.noteResend}
                            i18nText={maxResend ? 'otp.register.maxResend' : 'otp.register.noteResend'}
                            i18nParams={{ countdown }}
                        />
                    )}
                    <StyledButton
                        customStyle={styles.bthNext}
                        title={TEXT_OTP[type - 1].confirm}
                        onPress={confirm}
                        disabled={code?.length < staticValue.OTP_LENGTH || maxWrongOtp}
                    />
                </View>
            </View>
        </>
    );
};

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: '20@s',
        paddingTop: '30@vs',
        justifyContent: 'center',
    },
    content: {
        flex: 1,
    },
    titleInputOtp: {
        fontWeight: 'bold',
        fontSize: '24@ms0.3',
        lineHeight: '35@vs',
    },
    otpInput: {},
    containerResend: {
        marginTop: '20@vs',
        alignSelf: 'center',
        borderBottomWidth: 1,
        borderColor: Themes.COLORS.mineShaft,
    },
    resend: {
        color: Themes.COLORS.mineShaft,
        textAlign: 'center',
        fontSize: '12@ms0.3',
        lineHeight: '18@vs',
    },
    bthNext: {
        marginTop: '20@vs',
    },
    otpInputBox: {
        marginTop: '25@vs',
        marginHorizontal: '10@s',
    },
    codeInput: {
        width: '40@s',
        height: '50@vs',
        borderWidth: 1,
        borderRadius: '10@s',
        backgroundColor: Themes.COLORS.backGroundInput,
        alignItems: 'center',
        justifyContent: 'center',
    },
    codeInputText: {
        fontSize: '36@ms0.3',
        textAlign: 'center',
        lineHeight: '45@vs',
        fontWeight: 'bold',
        color: Themes.COLORS.textPrimary,
    },
    textNote: {
        lineHeight: '21@vs',
        color: Themes.COLORS.mineShaft,
        marginTop: '10@vs',
    },
    noteResend: {
        color: Themes.COLORS.error,
        textAlign: 'center',
        marginTop: '5@vs',
    },
});

export default SendOTP;
