import { yupResolver } from '@hookform/resolvers/yup';
import { checkIsExistEmail, getVerifyCode } from 'api/modules/api-app/authenticate';
import Images from 'assets/images';
import { Themes } from 'assets/themes';
import { StyledButton, StyledIcon, StyledImage, StyledInputForm, StyledText, StyledTouchable } from 'components/base';
import AlertMessage from 'components/base/AlertMessage';
import { LabelInput } from 'components/base/StyledInput';
import StyledKeyboardAware from 'components/base/StyledKeyboardAware';
import RadioCheckView from 'components/common/RadioCheckView';
import StyledHeader from 'components/common/StyledHeader';
import { AUTHENTICATE_ROUTE } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React, { useCallback, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Keyboard, Text, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { checkPasswordMatch, openURL } from 'utilities/helper';
import { GENDER_DATA, staticValue, VerifiedCodeType } from 'utilities/staticData';
import { PASSWORD_MAX_LENGTH, USERNAME_MAX_LENGTH } from 'utilities/validate';
import yupValidate from 'utilities/yupValidate';
import * as yup from 'yup';
import UpLoadAvatar from './components/UpLoadAvatar';

const REGISTER_DEFAULT_FORM = __DEV__
    ? {
          email: 'yeuquaimo005@love.you',
          password: 'loveyou3000',
          confirmPassword: 'loveyou3000',
          fullName: 'DuongQuang',
          birthday: '2022-03-14T05:53:39.027Z',
          gender: '1',
      }
    : {};

const RegisTerScreen = () => {
    const [rule, setRule] = useState(__DEV__);
    const passwordRef = useRef<any>(null);
    const passwordConfirmRef = useRef<any>(null);
    const fullNameRef = useRef<any>(null);

    const registerSchema = yup.object().shape({
        email: yupValidate.email(),
        password: yupValidate.password(),
        confirmPassword: yupValidate.password(),
        fullName: yupValidate.fullName(),
        birthday: yupValidate.birthday(),
        gender: yupValidate.gender(),
    });

    const form = useForm({
        mode: 'onChange',
        resolver: yupResolver(registerSchema),
        defaultValues: REGISTER_DEFAULT_FORM,
    });
    const {
        formState: { isValid },
        setValue,
        handleSubmit,
        watch,
    } = form;

    const checkPassword = useCallback(() => checkPasswordMatch(watch()), [watch]);

    const submit = async (user: any) => {
        try {
            const res = await checkIsExistEmail({ email: user?.email });
            if (res?.data?.isExisted) {
                AlertMessage('error.emailExisted');
                return;
            }
            Keyboard.dismiss();
            await getVerifyCode({ email: user?.email, type: VerifiedCodeType.REGISTER });
            const newUser = { ...user };
            delete newUser.confirmPassword;
            if (newUser?.gender) {
                newUser.gender = Number(newUser.gender);
            }
            navigate(AUTHENTICATE_ROUTE.SEND_OTP, { user: newUser, type: VerifiedCodeType.REGISTER });
        } catch (error) {
            AlertMessage(error);
        }
    };

    const renderCenter = () => {
        return <StyledImage source={Images.photo.logo} customStyle={styles.logo} />;
    };

    const setValueForm = (field: any, value: string | number) => {
        setValue(field, value, staticValue.ACTION_WHENS_SET_VALUE);
    };

    const renderItemGender = (item: any) => {
        return (
            <StyledTouchable
                customStyle={styles.buttonGender}
                key={item.title}
                onPress={() => setValueForm('gender', item.value)}
            >
                <RadioCheckView check={watch('gender') === item.value} />
                <StyledText customStyle={styles.textGender} originValue={item.title} />
            </StyledTouchable>
        );
    };
    const goToLogin = () => {
        navigate(AUTHENTICATE_ROUTE.LOGIN);
    };

    const openPolicy = () => {
        openURL('https://fb.com');
    };

    return (
        <View style={styles.container}>
            <StyledHeader
                title={'register'}
                renderCenter={renderCenter}
                customContainer={styles.customContainerHeader}
            />

            <StyledKeyboardAware
                style={styles.scrollView}
                customStyle={styles.contentScrollView}
                enableResetScrollToCoords={false}
                enableOnAndroid={false}
            >
                <StyledText customStyle={styles.title} i18nText={'authen.register.title'} />
                <FormProvider {...form}>
                    <View style={styles.fakeRegisterInput}>
                        <StyledInputForm name={'avatar'} />
                        <StyledInputForm name={'gender'} />
                    </View>
                    <UpLoadAvatar setValue={(img: any) => setValueForm('avatar', img)} />
                    <StyledInputForm
                        name={'email'}
                        label={'authen.labelRegister.email'}
                        customPlaceHolder={'authen.hintRegister.email'}
                        keyboardType="email-address"
                        onSubmitEditing={() => passwordRef.current.focus()}
                        containerStyle={styles.emailContainer}
                    />
                    <StyledInputForm
                        ref={passwordRef}
                        name="password"
                        label={'authen.labelRegister.password'}
                        customPlaceHolder={'authen.hintRegister.password'}
                        maxLength={PASSWORD_MAX_LENGTH}
                        onSubmitEditing={() => passwordConfirmRef.current.focus()}
                        isSecureTextEntry={true}
                        icYeyOff={Images.icons.eyeOff}
                        icYeyOn={Images.icons.eyeOn}
                        customStyle={styles.inputPassword}
                        containerStyle={styles.normalInputContainer}
                    />
                    <StyledInputForm
                        ref={passwordConfirmRef}
                        name={'confirmPassword'}
                        label={'authen.labelRegister.confirmPassword'}
                        customPlaceHolder={'authen.hintRegister.confirmPassword'}
                        returnKeyType={'done'}
                        maxLength={PASSWORD_MAX_LENGTH}
                        isSecureTextEntry={true}
                        icYeyOff={Images.icons.eyeOff}
                        icYeyOn={Images.icons.eyeOn}
                        customStyle={styles.inputPassword}
                        customErrorMessage={checkPassword()}
                        containerStyle={styles.normalInputContainer}
                    />
                    <StyledInputForm
                        ref={fullNameRef}
                        name={'fullName'}
                        customPlaceHolder={'authen.hintRegister.fullName'}
                        maxLength={USERNAME_MAX_LENGTH}
                        label={'authen.labelRegister.fullName'}
                        containerStyle={styles.normalInputContainer}
                    />
                    <StyledInputForm
                        name={'birthday'}
                        label={'authen.labelRegister.birthday'}
                        customPlaceHolder={'authen.hintRegister.birthday'}
                        icBirthday={Images.icons.calendar}
                        customStyle={styles.inputBirthday}
                        editable={false}
                        pointerEvents={'none'}
                        handleConfirm={(text: string) => setValueForm('birthday', text)}
                        containerStyle={styles.normalInputContainer}
                    />
                    <LabelInput
                        label={'authen.labelRegister.gender'}
                        customStyle={styles.titleGender}
                        containerStyle={styles.containerStyleTitleGender}
                    />
                    {GENDER_DATA.map(renderItemGender)}
                    <View style={styles.buttonRule}>
                        <StyledTouchable onPress={() => setRule(!rule)}>
                            <StyledIcon source={rule ? Images.icons.tickSquare : Images.icons.untickSquare} size={20} />
                        </StyledTouchable>
                        <Text style={styles.textRule}>
                            <Text onPress={openPolicy} style={styles.textRuleCanPress}>
                                {'利用規約、'}
                            </Text>
                            {'および'}
                            <Text onPress={openPolicy} style={styles.textRuleCanPress}>
                                {'プライバシーポリシー\n'}
                            </Text>
                            {'に同意する'}
                        </Text>
                    </View>
                </FormProvider>
                <StyledButton
                    disabled={!(isValid && rule && !checkPassword())}
                    title={'common.next'}
                    onPress={handleSubmit(submit)}
                    customStyle={styles.buttonSave}
                />
                <StyledText customStyle={styles.textNote} i18nText={'authen.register.note'} />
                <StyledTouchable customStyle={styles.btnLogin} onPress={goToLogin}>
                    <StyledText customStyle={styles.textLogin} i18nText={'authen.register.login'} />
                </StyledTouchable>
            </StyledKeyboardAware>
        </View>
    );
};

export default RegisTerScreen;

const styles = ScaledSheet.create({
    container: {
        flex: 1,
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
        marginTop: '20@vs',
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
        marginLeft: '10@s',
    },
    titleGender: {
        marginTop: '18@vs',
    },
    contentRuleButton: {
        borderRadius: 3,
    },
    textNote: {
        color: Themes.COLORS.mineShaft,
        lineHeight: '21@vs',
        alignSelf: 'center',
        marginTop: '20@vs',
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
    emailContainer: {
        marginTop: '25@vs',
    },
    normalInputContainer: {
        marginTop: '13@vs',
    },
});
