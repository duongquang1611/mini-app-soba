import { yupResolver } from '@hookform/resolvers/yup';
import { resetPassword } from 'api/modules/api-app/authenticate';
import Images from 'assets/images';
import { Themes } from 'assets/themes';
import { StyledButton, StyledInputForm } from 'components/base';
import AlertMessage from 'components/base/AlertMessage';
import StyledKeyboardAware from 'components/base/StyledKeyboardAware';
import StyledHeader from 'components/common/StyledHeader';
import useBackHandler from 'hooks/useBackHandler';
import { AUTHENTICATE_ROUTE } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React, { useCallback, useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Keyboard, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { checkPasswordMatch } from 'utilities/helper';
import { POPUP_TYPE } from 'utilities/staticData';
import { PASSWORD_MAX_LENGTH } from 'utilities/validate';
import yupValidate from 'utilities/yupValidate';
import * as yup from 'yup';

const REGISTER_DEFAULT_FORM = __DEV__
    ? {
          password: 'loveyou3000',
          confirmPassword: 'loveyou3000',
      }
    : {};

const ResetPasswordScreen = ({ route }: any) => {
    const passwordRef = useRef<any>(null);
    const passwordConfirmRef = useRef<any>(null);
    const { email } = route?.params || {};

    const yupSchema = yup.object().shape({
        password: yupValidate.password(),
        confirmPassword: yupValidate.password(),
    });

    const form = useForm({
        mode: 'onChange',
        resolver: yupResolver(yupSchema),
        defaultValues: REGISTER_DEFAULT_FORM,
    });

    const {
        formState: { isValid },
        handleSubmit,
        watch,
    } = form;

    const checkPassword = useCallback(() => checkPasswordMatch(watch()), [watch]);

    const submit = async (form: any) => {
        const { password: newPassword } = form;
        try {
            Keyboard.dismiss();
            await resetPassword({ email, newPassword });
            AlertMessage('resetPass.success', {
                onClosedModalize: () => navigate(AUTHENTICATE_ROUTE.LOGIN),
                type: POPUP_TYPE.SUCCESS,
            });
        } catch (error) {
            AlertMessage(error);
        }
    };

    const handleBack = () => {
        navigate(AUTHENTICATE_ROUTE.LOGIN);
        return true;
    };

    useBackHandler(handleBack);

    return (
        <>
            <StyledHeader title={'resetPass.title'} onPressBack={handleBack} />
            <View style={styles.container}>
                <StyledKeyboardAware customStyle={styles.contentScrollView}>
                    <FormProvider {...form}>
                        <StyledInputForm
                            ref={passwordRef}
                            name="password"
                            label={'resetPass.passLabel'}
                            customPlaceHolder={'resetPass.passPlaceholder'}
                            maxLength={PASSWORD_MAX_LENGTH}
                            onSubmitEditing={() => passwordConfirmRef.current.focus()}
                            isSecureTextEntry={true}
                            icYeyOff={Images.icons.eyeOff}
                            icYeyOn={Images.icons.eyeOn}
                            customStyle={styles.inputPassword}
                        />
                        <StyledInputForm
                            ref={passwordConfirmRef}
                            name={'confirmPassword'}
                            label={'resetPass.confirmPassLabel'}
                            customPlaceHolder={'resetPass.confirmPassLabel'}
                            returnKeyType={'done'}
                            maxLength={PASSWORD_MAX_LENGTH}
                            isSecureTextEntry={true}
                            icYeyOff={Images.icons.eyeOff}
                            icYeyOn={Images.icons.eyeOn}
                            customStyle={styles.inputPassword}
                            customErrorMessage={checkPassword()}
                            onSubmitEditing={Keyboard.dismiss}
                        />
                    </FormProvider>
                    <StyledButton
                        disabled={!(isValid && !checkPassword())}
                        title={'common.next'}
                        onPress={handleSubmit(submit)}
                        customStyle={styles.buttonSave}
                    />
                </StyledKeyboardAware>
            </View>
        </>
    );
};

export default ResetPasswordScreen;

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        paddingTop: '15@vs',
    },
    contentScrollView: {
        paddingBottom: '40@vs',
    },
    scrollView: {
        flex: 1,
    },
    title: {
        fontSize: '24@ms0.3',
        fontWeight: 'bold',
        marginLeft: '20@s',
        marginVertical: '30@vs',
        lineHeight: '32@vs',
    },
    inputPassword: {
        flex: 1,
    },
    inputBirthday: {
        flex: 1,
    },
    customContainerHeader: {
        paddingVertical: 0,
    },
    logo: {
        width: '125@s',
        height: '65@s',
        alignSelf: 'center',
        flex: 1,
    },
    body: {
        flex: 1,
    },
    buttonSave: {
        alignSelf: 'center',
        marginTop: '40@vs',
    },
    button: {
        width: '16@s',
        height: '16@s',
        borderRadius: 20,
        borderWidth: 1,
    },
    buttonGender: {
        flexDirection: 'row',
        marginTop: '12@vs',
        marginHorizontal: '20@s',
        alignItems: 'center',
    },
    buttonRule: {
        flexDirection: 'row',
        marginTop: '40@vs',
        marginHorizontal: '20@s',
        flexShrink: 1,
        alignItems: 'center',
    },
    textGender: {
        marginLeft: '15@s',
    },
    titleGender: {
        marginTop: '10@vs',
    },
    ruleButton: {
        borderRadius: 5,
    },
    contentRuleButton: {
        borderRadius: 3,
    },
    textNote: {
        color: Themes.COLORS.mineShaft,
        lineHeight: '21@vs',
        alignSelf: 'center',
        marginTop: '10@vs',
    },
    textLogin: {
        color: Themes.COLORS.primary,
    },
    btnLogin: {
        borderBottomWidth: 0.5,
        alignSelf: 'center',
        borderColor: Themes.COLORS.primary,
    },
    fakeRegisterInput: {
        bottom: -99999999,
        position: 'absolute',
    },
    textRule: {
        fontSize: '16@ms0.3',
        color: Themes.COLORS.mineShaft,
        lineHeight: '24@vs',
        marginLeft: '12@s',
    },
    textRuleCanPress: {
        color: Themes.COLORS.primary,
    },
    containerStyleTitleGender: {
        marginLeft: '20@s',
        marginBottom: 0,
    },
});
