import { yupResolver } from '@hookform/resolvers/yup';
import { checkIsExistEmail, getVerifyCode } from 'api/modules/api-app/authenticate';
import { StyledButton } from 'components/base';
import AlertMessage from 'components/base/AlertMessage';
import StyledInputForm from 'components/base/StyledInputForm';
import StyledKeyboardAware from 'components/base/StyledKeyboardAware';
import StyledHeader from 'components/common/StyledHeader';
import { AUTHENTICATE_ROUTE } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React, { FunctionComponent } from 'react';
import { useForm } from 'react-hook-form';
import { Keyboard } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { VerifiedCodeType } from 'utilities/staticData';
import yupValidate from 'utilities/yupValidate';
import * as yup from 'yup';

const DEFAULT_FORM = __DEV__
    ? {
          email: 'yeuquaimo001@love.you',
      }
    : {};

const ForgotPwdScreen: FunctionComponent = () => {
    const yupSchema = yup.object().shape({
        email: yupValidate.email(),
    });

    const form = useForm({
        mode: 'onChange',
        resolver: yupResolver(yupSchema),
        defaultValues: DEFAULT_FORM,
    });

    const {
        handleSubmit,
        formState: { isValid },
    } = form;

    const handleGetVerifyCode = async ({ email }: any) => {
        try {
            const res = await checkIsExistEmail({ email });
            if (res?.data?.isExisted === false) {
                AlertMessage('error.emailNotExisted');
                return;
            }
            Keyboard.dismiss();
            await getVerifyCode({ email, type: VerifiedCodeType.RESET_PASSWORD });
            navigate(AUTHENTICATE_ROUTE.SEND_OTP, { user: { email }, type: VerifiedCodeType.RESET_PASSWORD });
        } catch (error) {
            AlertMessage(error);
        }
    };
    return (
        <>
            <StyledHeader title={'forgotPass.title'} />
            <StyledKeyboardAware customStyle={styles.container} scrollEnabled={false} style={styles.awareView}>
                <StyledInputForm
                    label={'forgotPass.email.label'}
                    name={'email'}
                    customPlaceHolder={'forgotPass.email.placeholder'}
                    keyboardType="email-address"
                    returnKeyType={'done'}
                    onSubmitEditing={Keyboard.dismiss}
                    form={form}
                    customStyle={styles.input}
                />
                <StyledButton
                    title={'common.next'}
                    onPress={handleSubmit(handleGetVerifyCode)}
                    customStyle={styles.buttonSave}
                    disabled={!isValid}
                />
            </StyledKeyboardAware>
        </>
    );
};

const styles = ScaledSheet.create({
    container: {
        paddingTop: '15@vs',
    },
    buttonSave: {
        marginTop: '90@vs',
        alignSelf: 'center',
    },
    input: {},
    awareView: {
        flex: 1,
    },
});
export default ForgotPwdScreen;
