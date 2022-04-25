/* eslint-disable @typescript-eslint/no-unused-vars */
import { useIsFocused } from '@react-navigation/native';
import { changePass, checkVerifyCode, getVerifyCode, register } from 'api/modules/api-app/authenticate';
import { userInfoActions } from 'app-redux/slices/userInfoSlice';
import { Themes } from 'assets/themes';
import { StyledButton, StyledText } from 'components/base';
import AlertMessage from 'components/base/AlertMessage';
import StyledKeyboardAware from 'components/base/StyledKeyboardAware';
import StyledOverlayLoading from 'components/base/StyledOverlayLoading';
import StyledHeader from 'components/common/StyledHeader';
import TextUnderline from 'components/common/TextUnderline';
import useCountdown from 'hooks/useCountDown';
import useKeyboardStatus from 'hooks/useKeyboardStatus';
import { AUTHENTICATE_ROUTE, SETTING_ROUTE } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React, { FunctionComponent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Keyboard, Text, View } from 'react-native';
import { CodeField, Cursor, useClearByFocusCell } from 'react-native-confirmation-code-field';
import { ScaledSheet } from 'react-native-size-matters';
import { useDispatch } from 'react-redux';
import { isAndroid, wait } from 'utilities/helper';
import { POPUP_TYPE, staticValue, TEXT_OTP, VerifiedCodeType } from 'utilities/staticData';

const SendOTP: FunctionComponent = ({ route }: any) => {
    const dispatch = useDispatch();
    const { isOpenKeyboard } = useKeyboardStatus();
    const codeInputRef = useRef<any>(null);
    const { countdown, resetCountdown, clearCountdown } = useCountdown(staticValue.COUNT_DOWN_OTP);
    const isFirstRun = useRef<any>(true);
    const isFocused = useIsFocused();
    const [retryOtpCount, setRetryOtpCount] = useState(0);
    const [wrongOtpCount, setWrongOtpCount] = useState(0);
    const [code, setCode] = useState('');
    const { user = {}, type = VerifiedCodeType.REGISTER } = route?.params || {};
    const { email, newPassword, oldPassword } = user;
    const maxResend = useMemo(() => retryOtpCount === staticValue.MAX_RETRY_OTP, [retryOtpCount]);
    const maxWrongOtp = useMemo(() => wrongOtpCount >= staticValue.MAX_WRONG_OTP, [wrongOtpCount]);
    const disabledResend = useMemo(() => countdown > 0 || maxResend, [countdown, maxResend]);
    const [loading, setLoading] = useState(false);
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({ value: code, setValue: setCode });
    const isResetPassword = useMemo(() => type === VerifiedCodeType.RESET_PASSWORD, [type]);
    const isRegister = useMemo(() => type === VerifiedCodeType.REGISTER, [type]);

    useEffect(() => {
        wait(500).then(() => {
            codeInputRef?.current?.focus?.();
        });
    }, []);

    useEffect(() => {
        if (isFirstRun?.current) {
            isFirstRun.current = false;
            return;
        }
        setCode('');
        clearCountdown();
    }, [isFocused]);

    const onCodeChange = (codeVer: string) => {
        if (codeVer.length === staticValue.OTP_LENGTH) Keyboard.dismiss();
        setCode(codeVer);
    };

    const handleConfirmResetPassword = async () => {
        try {
            // reset password
            const res = await checkVerifyCode({ email, verifiedCode: code, type });
            setLoading(false);
            if (res?.data?.isValid) {
                navigate(AUTHENTICATE_ROUTE.RESET_PASSWORD, { email });
            } else {
                handleWrongOtpMax();
                wrongOtpCount + 1 < staticValue.MAX_WRONG_OTP && AlertMessage('otp.error.otpInvalid');
            }
        } catch (error) {
            console.log('handleConfirmResetPassword -> error', error);
            AlertMessage(error);
        }
    };

    const handleConfirmChangePassword = async () => {
        // change password
        try {
            const res = await checkVerifyCode({ email, verifiedCode: code, type });
            setLoading(false);
            if (res?.data?.isValid) {
                const resChangePass = await changePass({ newPassword, oldPassword });
                AlertMessage('changePass.success', {
                    onClosedModalize: () => navigate(SETTING_ROUTE.EDIT_PROFILE),
                    type: POPUP_TYPE.SUCCESS,
                });
            } else {
                handleWrongOtpMax();
                wrongOtpCount + 1 < staticValue.MAX_WRONG_OTP && AlertMessage('otp.error.otpInvalid');
            }
        } catch (error) {
            console.log('handleConfirmResetPassword -> error', error);
            AlertMessage(error);
        }
    };

    const handleWrongOtpMax = async (error?: any) => {
        wrongOtpCount + 1 >= staticValue.MAX_WRONG_OTP
            ? AlertMessage('otp.register.alertInvalidOtpMax', {
                  onClosedModalize: () => {
                      navigate(
                          isRegister
                              ? AUTHENTICATE_ROUTE.REGISTER
                              : isResetPassword
                              ? AUTHENTICATE_ROUTE.FORGOT_PASS
                              : AUTHENTICATE_ROUTE.CHANGE_PASS,
                      );
                  },
              })
            : error && AlertMessage(error);
        setWrongOtpCount(wrongOtpCount + 1);
    };

    const confirm = async () => {
        try {
            if (code?.length < staticValue.OTP_LENGTH) {
                AlertMessage('alert.invalidOTP');
                return;
            }
            setLoading(true);
            if (isRegister) {
                const response = await register({
                    ...user,
                    verifiedCode: code,
                });
                setLoading(false);
                dispatch(userInfoActions.getUserInfoRequest(response?.data?.token));
                dispatch(userInfoActions.updateToken(response.data));
            } else if (isResetPassword) {
                await handleConfirmResetPassword();
            } else {
                await handleConfirmChangePassword();
            }
        } catch (error: any) {
            if (error?.includes?.(staticValue.OTP_INVALID_MESSAGE)) {
                handleWrongOtpMax(error);
            } else AlertMessage(error);
        } finally {
            setLoading(false);
        }
    };

    const actionResendSuccess = (reset = true) => {
        setCode('');
        if (reset) {
            if (!isOpenKeyboard && isAndroid) Keyboard.dismiss();
            resetCountdown();
            codeInputRef.current.focus();
        }
    };

    const resendOTP = async () => {
        setRetryOtpCount(retryOtpCount + 1);
        try {
            await getVerifyCode({ email, type });
            actionResendSuccess();
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
            <StyledOverlayLoading visible={loading} />
            <StyledHeader title={TEXT_OTP[type - 1].title} />
            <StyledKeyboardAware customStyle={styles.container} scrollEnabled={false} style={styles.awareView}>
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
            </StyledKeyboardAware>
        </>
    );
};

const styles = ScaledSheet.create({
    container: {
        paddingHorizontal: '20@s',
        paddingTop: '30@vs',
        justifyContent: 'center',
    },
    awareView: {
        flex: 1,
    },
    content: {
        flex: 1,
    },
    titleInputOtp: {
        fontWeight: 'bold',
        fontSize: '24@ms0.3',
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
        marginTop: '25@vs',
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
        fontSize: '36@vs',
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
