import { yupResolver } from '@hookform/resolvers/yup';
import Images from 'assets/images';
import { Themes } from 'assets/themes';
import { StyledButton, StyledImage, StyledInputForm, StyledText, StyledTouchable } from 'components/base';
import StyledOverlayLoading from 'components/base/StyledOverlayLoading';
import { AUTHENTICATE_ROUTE } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React, { FunctionComponent, useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { SafeAreaView, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ScaledSheet } from 'react-native-size-matters';
import { useLogin } from 'utilities/authenticate/AuthenticateService';
import yupValidate from 'utilities/yupValidate';
import * as yup from 'yup';

const DEFAULT_FORM: any = {
    email: 'hoan.nguyen@amela.vn',
    password: '123123123',
};

const LoginScreen: FunctionComponent = () => {
    const passwordRef = useRef<any>(null);
    const { requestLogin, loading } = useLogin();

    const yupSchema = yup.object().shape({
        email: yupValidate.email(),
        password: yupValidate.password(),
    });
    const form = useForm({
        mode: 'onChange', // validate form onChange
        defaultValues: DEFAULT_FORM,
        resolver: yupResolver(yupSchema),
        reValidateMode: 'onChange',
        criteriaMode: 'firstError', // first error from each field will be gathered.
    });
    const {
        formState: { isValid },
        handleSubmit,
    } = form;

    const doRegister = () => {
        navigate(AUTHENTICATE_ROUTE.REGISTER);
    };
    const goToForgotPassword = () => {
        navigate(AUTHENTICATE_ROUTE.FORGOT_PASS);
    };

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled"
            enableOnAndroid={true}
            showsVerticalScrollIndicator={false}
            enableResetScrollToCoords={false}
        >
            <StyledOverlayLoading visible={loading} />
            <StyledImage source={Images.photo.defaultImage} customStyle={styles.img} />
            <StyledText customStyle={styles.title} i18nText={'login'} />
            <SafeAreaView style={styles.body}>
                <FormProvider {...form}>
                    <StyledInputForm
                        label="email"
                        name="email"
                        customPlaceHolder="authen.login.placeholderEmail"
                        keyboardType="email-address"
                        maxLength={32}
                        onSubmitEditing={() => passwordRef.current.focus()}
                    />
                    <StyledInputForm
                        label="password"
                        name="password"
                        customPlaceHolder="authen.login.placeholderPassword"
                        ref={passwordRef}
                        returnKeyType="done"
                        maxLength={20}
                        isSecureTextEntry={true}
                        icYeyOff={Images.icons.eyeOff}
                        icYeyOn={Images.icons.eyeOn}
                    />
                </FormProvider>
                <View style={styles.buttonView}>
                    <StyledTouchable onPress={goToForgotPassword} customStyle={styles.forgotButton}>
                        <StyledText customStyle={styles.forgotText} i18nText="authen.login.forgotPasswordText" />
                    </StyledTouchable>
                    <StyledButton
                        onPress={handleSubmit(requestLogin)}
                        title="authen.login.buttonLogin"
                        disabled={!isValid}
                        customStyle={[
                            styles.loginButton,
                            // { backgroundColor: isValid ? Themes.COLORS.primary : Themes.COLORS.primary },
                        ]}
                    />

                    <StyledTouchable onPress={doRegister} customStyle={styles.registerButton}>
                        <StyledText i18nText="authen.login.registerText" />
                    </StyledTouchable>
                </View>
            </SafeAreaView>
        </KeyboardAwareScrollView>
    );
};

const styles = ScaledSheet.create({
    container: {
        flex: 1,
    },
    body: {
        flex: 1,
        marginTop: '20@vs',
        // paddingHorizontal: '20@s',
    },
    loginButton: {
        marginTop: 20,
    },
    registerButton: {
        marginTop: 20,
    },
    forgotButton: {
        alignSelf: 'flex-end',
        marginTop: 20,
        borderBottomWidth: 1,
        borderColor: Themes.COLORS.primary,
    },
    title: {
        fontWeight: 'bold',
        fontSize: '20@ms0.3',
        marginLeft: '20@s',
    },
    errorMessage: {
        color: Themes.COLORS.borderInputError,
    },
    img: {
        width: '100%',
        height: '300@vs',
    },
    buttonView: {
        paddingHorizontal: '20@s',
        width: '100%',
        alignItems: 'center',
    },
    forgotText: {
        color: Themes.COLORS.primary,
    },
});

export default LoginScreen;
