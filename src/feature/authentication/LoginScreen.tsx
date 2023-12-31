import { yupResolver } from '@hookform/resolvers/yup';
import { updateGlobalDataUnSave } from 'app-redux/slices/globalDataUnSaveSlice';
import Images from 'assets/images';
import { Themes } from 'assets/themes';
import { StyledButton, StyledIcon, StyledImage, StyledInputForm, StyledText } from 'components/base';
import StyledKeyboardAware from 'components/base/StyledKeyboardAware';
import StyledOverlayLoading from 'components/base/StyledOverlayLoading';
import TextUnderline from 'components/common/TextUnderline';
import { AUTHENTICATE_ROUTE } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React, { FunctionComponent, useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Keyboard, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { scale, ScaledSheet, verticalScale } from 'react-native-size-matters';
import { useDispatch } from 'react-redux';
import { useLogin } from 'utilities/authenticate/AuthenticateService';
import { EMAIL_MAX_LENGTH, PASSWORD_MAX_LENGTH } from 'utilities/validate';
import yupValidate from 'utilities/yupValidate';
import * as yup from 'yup';

const DEFAULT_FORM: any = __DEV__
    ? {
          //   email: 'komoro.app.test001@gmail.com',
          //   password: 'Test0320',
      }
    : {};

const LoginScreen: FunctionComponent = () => {
    const passwordRef = useRef<any>(null);
    const dispatch = useDispatch();

    const { requestLogin, loading } = useLogin();
    const insets = useSafeAreaInsets();

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

    const useAppWithoutAcc = () => {
        dispatch(updateGlobalDataUnSave({ withoutAccount: true }));
    };

    return (
        <StyledKeyboardAware customStyle={styles.scrollView}>
            <StyledOverlayLoading visible={loading} />
            <View style={styles.header}>
                <StyledImage
                    source={Images.photo.logo}
                    customStyle={[styles.logo, { marginTop: insets?.top || verticalScale(10) }]}
                />
                <StyledIcon source={Images.photo.ptLogin} size={188} customStyle={styles.img} />
            </View>
            <StyledText customStyle={styles.title} i18nText={'authen.login.buttonLogin'} />
            <View style={styles.body}>
                <FormProvider {...form}>
                    <StyledInputForm
                        label="authen.login.label.email"
                        name="email"
                        customPlaceHolder="authen.login.placeholderEmail"
                        keyboardType="email-address"
                        maxLength={EMAIL_MAX_LENGTH}
                        onSubmitEditing={() => passwordRef.current.focus()}
                    />
                    <StyledInputForm
                        label="authen.login.label.password"
                        name="password"
                        customPlaceHolder="authen.login.placeholderPassword"
                        ref={passwordRef}
                        returnKeyType="done"
                        maxLength={PASSWORD_MAX_LENGTH}
                        isSecureTextEntry={true}
                        icYeyOff={Images.icons.eyeOff}
                        icYeyOn={Images.icons.eyeOn}
                        customStyle={styles.inputPass}
                        onSubmitEditing={Keyboard.dismiss}
                    />
                </FormProvider>
                <View style={styles.buttonView}>
                    <TextUnderline
                        onPress={goToForgotPassword}
                        customStyle={styles.forgotButton}
                        title={'authen.login.forgotPasswordText'}
                        customStyleText={styles.forgotText}
                        color={Themes.COLORS.primary}
                    />
                    <StyledButton
                        onPress={handleSubmit(requestLogin)}
                        title="authen.login.buttonLogin"
                        disabled={!isValid}
                        customStyle={[styles.loginButton]}
                    />
                    <StyledButton
                        onPress={useAppWithoutAcc}
                        title="authen.login.withoutAccount"
                        customContentStyle={styles.btnWithoutAcc}
                        colors={[Themes.COLORS.secondary, Themes.COLORS.secondary, Themes.COLORS.secondary]}
                    />
                    <StyledText i18nText="authen.login.noAccountText" isBlack />
                    <TextUnderline
                        onPress={doRegister}
                        customStyle={styles.registerButton}
                        title={'authen.login.registerText'}
                        color={Themes.COLORS.primary}
                        customStyleText={styles.registerText}
                    />
                </View>
            </View>
        </StyledKeyboardAware>
    );
};

const styles = ScaledSheet.create({
    body: {
        flex: 1,
        marginTop: '20@vs',
    },
    scrollView: {
        paddingBottom: '30@vs',
    },
    loginButton: {
        marginTop: '20@vs',
        marginBottom: '5@vs',
    },
    btnWithoutAcc: {
        marginBottom: '20@vs',
    },
    registerButton: {
        alignItems: 'center',
    },
    forgotButton: {
        alignSelf: 'flex-end',
        marginTop: '12@vs',
        marginBottom: '40@vs',
    },
    title: {
        fontWeight: 'bold',
        fontSize: '20@ms0.3',
        marginLeft: '20@s',
        marginTop: '15@vs',
    },
    errorMessage: {
        color: Themes.COLORS.borderInputError,
    },
    img: {
        position: 'absolute',
        top: verticalScale(225) - scale(130),
    },
    logo: {
        width: '125@s',
        height: '65@s',
    },
    buttonView: {
        paddingHorizontal: '20@s',
        width: '100%',
        alignItems: 'center',
    },
    forgotText: {
        fontSize: '16@ms0.3',
    },
    registerText: {
        fontSize: '14@ms0.3',
    },
    header: {
        width: '100%',
        height: '225@vs',
        backgroundColor: Themes.COLORS.headerBackground,
        borderBottomRightRadius: 50,
        alignItems: 'center',
        marginBottom: '50@vs',
    },
    inputPass: {
        flex: 1,
    },
});

export default LoginScreen;
