import { StyledButton, StyledInputForm, StyledText } from 'components/base';
import { AUTHENTICATE_ROUTE } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React, { useRef, useState } from 'react';
import { Button, View } from 'react-native';
import { scale, ScaledSheet } from 'react-native-size-matters';
import StyledHeader from 'components/common/StyledHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { Themes } from 'assets/themes';
import Metrics from 'assets/metrics';
import Images from 'assets/images';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import UpLoadAvatar from './components/UpLoadAvatar';

const RegisTerScreen = () => {
    const goToRegis = () => {
        navigate(AUTHENTICATE_ROUTE.REGISTER_STEP_1);
    };
    const { t } = useTranslation();
    const [stateGender, setStateGender] = useState({
        gender: null,
        maleButtonColor: Themes.COLORS.white,
        femaleButtonColor: Themes.COLORS.white,
    });
    const [rule, setRule] = useState(false);
    const passwordRef = useRef<any>(null);
    const passwordConfirmRef = useRef<any>(null);

    const registerSchema = yup.object().shape({
        // email: yupValidate.email(),
        // password: yupValidate.password(),
        // confirmPassword: yupValidate.password('password'),
    });

    const form = useForm({
        mode: 'onChange',
        resolver: yupResolver(registerSchema),
    });
    const {
        formState: { isValid },
        setValue,
        handleSubmit,
    } = form;

    const submit = async (user: any) => {
        // const res = await checkIsExistEmail(user?.email);
        // if (res?.data?.isExisted) {
        //     AlertMessage(t('error.emailExisted'));
        //     return;
        // }
        // await getVerifyCode(user?.email);
        navigate(AUTHENTICATE_ROUTE.SEND_OTP, { ...user, register: true });
    };
    return (
        <KeyboardAwareScrollView
            // style={styles.container}
            // contentContainerStyle={styles.container}
            enableOnAndroid={true}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.container}>
                <StyledHeader title={'register'} />
                <SafeAreaView style={styles.body}>
                    <FormProvider {...form}>
                        <UpLoadAvatar setValue={setValue} />
                        <StyledInputForm
                            label={'email'}
                            name={'email'}
                            placeholder={t('authen.register.namePlaceholder')}
                            keyboardType="email-address"
                            returnKeyType={'next'}
                            onSubmitEditing={() => passwordRef.current.focus()}
                        />
                        <StyledInputForm
                            label="password"
                            name="password"
                            customPlaceHolder="authen.login.placeholderPassword"
                            ref={passwordRef}
                            returnKeyType={'next'}
                            maxLength={20}
                            onSubmitEditing={() => passwordConfirmRef.current.focus()}
                            isSecureTextEntry={true}
                            icYeyOff={Images.icons.eyeOff}
                            icYeyOn={Images.icons.eyeOn}
                        />
                        <StyledInputForm
                            label={'confirmPassword'}
                            name={'confirmPassword'}
                            customPlaceHolder="authen.login.placeholderPassword"
                            ref={passwordConfirmRef}
                            returnKeyType={'done'}
                            maxLength={20}
                            onSubmitEditing={handleSubmit(submit)}
                            isSecureTextEntry={true}
                            icYeyOff={Images.icons.eyeOff}
                            icYeyOn={Images.icons.eyeOn}
                        />
                        <StyledInputForm
                            label={'name'}
                            name={'name'}
                            placeholder={t('authen.register.namePlaceholder')}
                            keyboardType="email-address"
                            returnKeyType={'next'}
                            onSubmitEditing={() => passwordRef.current.focus()}
                        />
                        <StyledInputForm
                            label={'birthday'}
                            name={'birthday'}
                            placeholder={t('authen.register.birthdayPlaceholder')}
                            ref={passwordRef}
                            secureTextEntry={true}
                            returnKeyType={'next'}
                            maxLength={32}
                            // onSubmitEditing={() => passwordConfirmRef.current.focus()}
                        />
                        <StyledText customStyle={styles.titleGender} i18nText={'gender'} />
                        <TouchableOpacity
                            style={styles.buttonGender}
                            onPress={() => {
                                setStateGender({
                                    gender: 'male',
                                    maleButtonColor: Themes.COLORS.red,
                                    femaleButtonColor: Themes.COLORS.white,
                                });
                            }}
                        >
                            <View style={[styles.button, { backgroundColor: stateGender.maleButtonColor }]} />
                            <StyledText customStyle={styles.textGender} i18nText={'male'} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttonGender}
                            onPress={() => {
                                setStateGender({
                                    gender: 'female',
                                    maleButtonColor: Themes.COLORS.white,
                                    femaleButtonColor: Themes.COLORS.red,
                                });
                            }}
                        >
                            <View style={[styles.button, { backgroundColor: stateGender.femaleButtonColor }]} />
                            <StyledText customStyle={styles.textGender} i18nText={'Female'} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttonGender}
                            onPress={() => {
                                setRule(!rule);
                            }}
                        >
                            <View
                                style={[
                                    styles.ruleButton,
                                    { backgroundColor: rule ? Themes.COLORS.red : Themes.COLORS.white },
                                ]}
                            />
                            <StyledText customStyle={styles.textGender} i18nText={'rule'} />
                        </TouchableOpacity>
                    </FormProvider>

                    {/* <StyledButton
                    onPress={submit}
                    title={'Confirm'}
                    customStyle={[styles.loginButton, !isValid && { backgroundColor: 'lightgray' }]}
                    // disabled={!isValid}
                /> */}
                    <StyledButton title={'confirm'} onPress={goToRegis} customStyle={styles.buttonSave} />
                </SafeAreaView>
            </View>
        </KeyboardAwareScrollView>
    );
};

export default RegisTerScreen;

const styles = ScaledSheet.create({
    container: {
        flex: 1,
    },
    body: {
        flex: 1,
        alignItems: 'center',
    },
    buttonSave: {},
    button: {
        width: '16@s',
        height: '16@s',
        borderRadius: 20,
        borderWidth: 1,
    },
    buttonGender: {
        flexDirection: 'row',
        width: Metrics.screenWidth - scale(40),
        alignSelf: 'flex-start',
        marginVertical: '15@vs',
    },
    textGender: {
        marginLeft: '15@s',
    },
    titleGender: {
        alignSelf: 'flex-start',
        marginLeft: '20@s',
        marginTop: '10@vs',
    },
    ruleButton: {
        width: '16@s',
        height: '16@s',
        borderRadius: 5,
        borderWidth: 1,
    },
});
