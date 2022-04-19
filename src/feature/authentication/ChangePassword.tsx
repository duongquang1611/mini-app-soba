import { yupResolver } from '@hookform/resolvers/yup';
import { getVerifyCode } from 'api/modules/api-app/authenticate';
import Images from 'assets/images';
import { Themes } from 'assets/themes';
import { StyledButton } from 'components/base';
import AlertMessage from 'components/base/AlertMessage';
import StyledInputForm from 'components/base/StyledInputForm';
import StyledKeyboardAware from 'components/base/StyledKeyboardAware';
import StyledOverlayLoading from 'components/base/StyledOverlayLoading';
import StyledHeader from 'components/common/StyledHeader';
import { AUTHENTICATE_ROUTE } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React, { FunctionComponent, useCallback, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Keyboard, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import { CheckPasswordType } from 'utilities/enumData';
import { checkPasswordMatch } from 'utilities/helper';
import { VerifiedCodeType } from 'utilities/staticData';
import { PASSWORD_MAX_LENGTH } from 'utilities/validate';
import yupValidate from 'utilities/yupValidate';
import * as yup from 'yup';

const changePassForm = __DEV__
    ? {
          oldPassword: 'loveyou3000',
          newPassword: 'abc12345',
          confirmNewPassword: 'abc12345',
      }
    : {};

const ChangePassword: FunctionComponent = () => {
    const { user } = useSelector((state: any) => state.userInfo);
    const newPassRef = useRef<any>(null);
    const oldPassRef = useRef<any>(null);
    const confirmNewPassRef = useRef<any>(null);
    const [loading, setLoading] = useState(false);

    const changePasswordSchema = yup.object().shape({
        oldPassword: yupValidate.password(),
        newPassword: yupValidate.password(),
        confirmNewPassword: yupValidate.password(),
    });
    const form = useForm({
        mode: 'all',
        resolver: yupResolver(changePasswordSchema),
        defaultValues: changePassForm,
    });
    const {
        handleSubmit,
        formState: { isValid },
        watch,
    } = form;

    const checkConfirmPassword = useCallback(() => {
        const { newPassword: password, confirmNewPassword: confirmPassword } = watch();
        return checkPasswordMatch({ password, confirmPassword });
    }, [watch]);

    const checkNewPassword = useCallback(() => {
        const { newPassword: password, oldPassword } = watch();
        return checkPasswordMatch({ password, oldPassword, type: CheckPasswordType.CHECK_NEW_PASS });
    }, [watch]);

    const handleGetVerifyCode = async ({ oldPassword, newPassword }: any) => {
        const email = user?.member?.email;
        try {
            Keyboard.dismiss();
            setLoading(true);
            await getVerifyCode({ email, type: VerifiedCodeType.CHANGE_PASSWORD });
            setLoading(false);
            navigate(AUTHENTICATE_ROUTE.SEND_OTP, {
                user: { oldPassword, newPassword, email },
                type: VerifiedCodeType.CHANGE_PASSWORD,
            });
        } catch (error) {
            setLoading(false);
            AlertMessage(error);
        }
    };

    return (
        <>
            <StyledHeader title={'changePass.title'} />
            <StyledOverlayLoading visible={loading} />
            <View style={styles.container}>
                <StyledKeyboardAware customStyle={styles.contentScrollView}>
                    <FormProvider {...form}>
                        <StyledInputForm
                            ref={oldPassRef}
                            name={'oldPassword'}
                            label={'changePass.oldPassLabel'}
                            customPlaceHolder={'changePass.oldPassPlaceholder'}
                            maxLength={PASSWORD_MAX_LENGTH}
                            isSecureTextEntry={true}
                            icYeyOff={Images.icons.eyeOff}
                            icYeyOn={Images.icons.eyeOn}
                            onSubmitEditing={() => newPassRef?.current?.focus()}
                            customStyle={styles.inputPassword}
                            containerStyle={styles.inputContainer}
                        />
                        <StyledInputForm
                            ref={newPassRef}
                            name={'newPassword'}
                            label={'changePass.newPassLabel'}
                            customPlaceHolder={'changePass.newPassPlaceholder'}
                            maxLength={PASSWORD_MAX_LENGTH}
                            onSubmitEditing={() => confirmNewPassRef?.current?.focus()}
                            isSecureTextEntry={true}
                            icYeyOff={Images.icons.eyeOff}
                            icYeyOn={Images.icons.eyeOn}
                            customStyle={styles.inputPassword}
                            customErrorMessage={checkNewPassword()}
                            containerStyle={styles.inputContainer}
                        />

                        <StyledInputForm
                            ref={confirmNewPassRef}
                            name={'confirmNewPassword'}
                            label={'changePass.confirmNewPassLabel'}
                            customPlaceHolder={'changePass.confirmNewPassPlaceholder'}
                            returnKeyType={'done'}
                            maxLength={PASSWORD_MAX_LENGTH}
                            isSecureTextEntry={true}
                            icYeyOff={Images.icons.eyeOff}
                            icYeyOn={Images.icons.eyeOn}
                            customStyle={styles.inputPassword}
                            customErrorMessage={checkConfirmPassword()}
                            onSubmitEditing={Keyboard.dismiss}
                            containerStyle={styles.inputContainer}
                        />
                    </FormProvider>
                    <StyledButton
                        disabled={!(isValid && !checkConfirmPassword() && !checkNewPassword())}
                        title={'common.next'}
                        onPress={handleSubmit(handleGetVerifyCode)}
                        customStyle={styles.buttonSave}
                    />
                </StyledKeyboardAware>
            </View>
        </>
    );
};

const styles = ScaledSheet.create({
    contentScrollView: {
        paddingTop: '5@vs',
    },
    container: {
        flex: 1,
    },
    buttonSave: {
        backgroundColor: Themes.COLORS.white,
        alignSelf: 'center',
        marginTop: '50@vs',
    },
    inputPassword: {
        flex: 1,
    },
    inputContainer: {
        marginBottom: 0,
        marginTop: '25@vs',
    },
});

export default ChangePassword;
