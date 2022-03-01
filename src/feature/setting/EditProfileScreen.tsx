// import { StyledButton } from 'components/base';
// import StyledHeader from 'components/common/StyledHeader';
// import React from 'react';
// import { View } from 'react-native';
// import { ScaledSheet } from 'react-native-size-matters';

// const EditProfileScreen = () => {
//     const editProfile = () => {
//         console.log('edit');
//     };
//     const cancel = () => {
//         console.log('cancel');
//     };
//     return (
//         <View style={styles.container}>
//             <StyledHeader title={'EditProfile'} />
//             <View style={styles.body}>
//                 <StyledButton title={'editProfile'} onPress={editProfile} customStyle={styles.buttonSave} />
//                 <StyledButton title={'cancel'} onPress={cancel} customStyle={styles.buttonSave} />
//             </View>
//         </View>
//     );
// };

// export default EditProfileScreen;

// const styles = ScaledSheet.create({
//     container: {
//         flex: 1,
//     },
//     body: {
//         justifyContent: 'center',
//         alignItems: 'center',
//         flex: 1,
//         marginHorizontal: '20@s',
//     },
//     buttonSave: {},
// });

/* eslint-disable @typescript-eslint/no-unused-vars */

import { yupResolver } from '@hookform/resolvers/yup';
import Metrics from 'assets/metrics';
import { Themes } from 'assets/themes';
import { StyledButton, StyledInputForm, StyledText } from 'components/base';
import StyledHeader from 'components/common/StyledHeader';
import UpLoadAvatar from 'feature/authentication/components/UpLoadAvatar';
import { AUTHENTICATE_ROUTE } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React, { useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import { scale, ScaledSheet } from 'react-native-size-matters';
import * as yup from 'yup';

const EditProfileScreen = () => {
    const goToRegis = () => {
        // navigate(AUTHENTICATE_ROUTE.REGISTER_STEP_1);
    };
    const { t } = useTranslation();
    const [stateGender, setStateGender] = useState({
        gender: null,
        maleButtonColor: Themes.COLORS.white,
        femaleButtonColor: Themes.COLORS.white,
        femaleBorderColor: Themes.COLORS.silver,
        maleBorderColor: Themes.COLORS.silver,
    });
    const [rule, setRule] = useState(false);
    const birthdayRef = useRef<any>(null);
    const nameRef = useRef<any>(null);

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
    const changePass = () => {
        navigate(AUTHENTICATE_ROUTE.CHANGE_PASS);
    };
    return (
        <View style={styles.container}>
            <StyledHeader title={'setting.editProfileTitle'} />
            <KeyboardAwareScrollView enableOnAndroid={true} showsVerticalScrollIndicator={false}>
                <SafeAreaView style={styles.body}>
                    <FormProvider {...form}>
                        <UpLoadAvatar setValue={setValue} />
                        <StyledInputForm
                            label={'common.email'}
                            name={'email'}
                            placeholder={t('authen.register.emailPlaceholder')}
                            keyboardType="email-address"
                            returnKeyType={'next'}
                            onSubmitEditing={() => nameRef.current.focus()}
                        />
                        <StyledInputForm
                            label={'common.name'}
                            name={'name'}
                            ref={nameRef}
                            placeholder={t('authen.register.namePlaceholder')}
                            returnKeyType={'next'}
                            onSubmitEditing={() => birthdayRef.current.focus()}
                        />
                        <StyledInputForm
                            label={'common.birthday'}
                            name={'birthday'}
                            placeholder={t('authen.register.birthdayPlaceholder')}
                            ref={birthdayRef}
                            secureTextEntry={true}
                            returnKeyType={'next'}
                            maxLength={32}
                            // onSubmitEditing={() => passwordConfirmRef.current.focus()}
                        />
                        <StyledText customStyle={styles.titleGender} isBlack i18nText={'common.gender'} />
                        <View style={styles.row}>
                            <TouchableOpacity
                                style={styles.buttonGender}
                                onPress={() => {
                                    setStateGender({
                                        gender: 'male',
                                        maleButtonColor: Themes.COLORS.primary,
                                        femaleButtonColor: Themes.COLORS.white,
                                        femaleBorderColor: Themes.COLORS.silver,
                                        maleBorderColor: '#FBA29D',
                                    });
                                }}
                            >
                                <View
                                    style={[
                                        styles.button,
                                        {
                                            backgroundColor: stateGender.maleButtonColor,
                                            borderColor: stateGender.maleBorderColor,
                                        },
                                    ]}
                                />
                                <StyledText customStyle={styles.textGender} i18nText={'male'} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.buttonGender}
                                onPress={() => {
                                    setStateGender({
                                        gender: 'female',
                                        maleButtonColor: Themes.COLORS.white,
                                        femaleButtonColor: Themes.COLORS.primary,
                                        femaleBorderColor: '#FBA29D',
                                        maleBorderColor: Themes.COLORS.silver,
                                    });
                                }}
                            >
                                <View
                                    style={[
                                        styles.button,
                                        {
                                            backgroundColor: stateGender.femaleButtonColor,
                                            borderColor: stateGender.femaleBorderColor,
                                        },
                                    ]}
                                />
                                <StyledText customStyle={styles.textGender} i18nText={'Female'} />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            style={[styles.buttonGender, { width: Metrics.screenWidth - scale(40) }]}
                            onPress={() => {
                                setRule(!rule);
                            }}
                        >
                            <View
                                style={[
                                    styles.ruleButton,
                                    {
                                        backgroundColor: rule ? Themes.COLORS.primary : Themes.COLORS.white,
                                        borderColor: rule ? '#FBA29D' : Themes.COLORS.silver,
                                    },
                                ]}
                            />
                            <StyledText customStyle={styles.textGender} i18nText={'rule'} />
                        </TouchableOpacity>
                    </FormProvider>
                    <TouchableOpacity style={styles.buttonChangePass} onPress={changePass}>
                        <StyledText customStyle={styles.changePass} i18nText={'パスワード変更'} />
                    </TouchableOpacity>
                    <View style={styles.row}>
                        <StyledButton
                            isNormal
                            onPress={submit}
                            title={'setting.cancel'}
                            customStyle={styles.buttonCancel}
                            customStyleText={styles.cancelText}
                        />
                        <StyledButton
                            title={'setting.editProfile'}
                            onPress={goToRegis}
                            customStyle={styles.buttonSave}
                        />
                    </View>
                </SafeAreaView>
            </KeyboardAwareScrollView>
        </View>
    );
};

export default EditProfileScreen;

const styles = ScaledSheet.create({
    container: {
        flex: 1,
    },
    body: {
        flex: 1,
        alignItems: 'center',
    },
    buttonSave: {
        width: (Metrics.screenWidth - scale(60)) / 2,
    },
    buttonCancel: {
        width: (Metrics.screenWidth - scale(60)) / 2,
        borderWidth: 1,
        borderColor: Themes.COLORS.primary,
    },
    button: {
        width: '16@s',
        height: '16@s',
        borderRadius: 20,
        borderWidth: 1,
    },
    buttonGender: {
        flexDirection: 'row',
        width: (Metrics.screenWidth - scale(40)) / 2,
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
        fontWeight: 'bold',
    },
    ruleButton: {
        width: '16@s',
        height: '16@s',
        borderRadius: 5,
        borderWidth: 2,
    },
    row: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: '20@s',
    },
    cancelText: {
        color: Themes.COLORS.secondary,
    },
    changePass: {
        color: Themes.COLORS.primary,
        fontWeight: 'bold',
    },
    buttonChangePass: {
        width: Metrics.screenWidth - scale(40),
        paddingVertical: '10@s',
    },
});
