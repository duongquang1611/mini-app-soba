/* eslint-disable @typescript-eslint/no-unused-vars */
import { yupResolver } from '@hookform/resolvers/yup';
import { checkIsExistEmail, getVerifyCode } from 'api/modules/api-app/authenticate';
import { IRestaurants } from 'app-redux/slices/globalDataSlice';
import Images from 'assets/images';
import { Themes } from 'assets/themes';
import { StyledButton, StyledIcon, StyledImage, StyledInputForm, StyledText, StyledTouchable } from 'components/base';
import AlertMessage from 'components/base/AlertMessage';
import StyledInput, { LabelInput } from 'components/base/StyledInput';
import StyledKeyboardAware from 'components/base/StyledKeyboardAware';
import StyledOverlayLoading from 'components/base/StyledOverlayLoading';
import RadioCheckView from 'components/common/RadioCheckView';
import StyledHeader from 'components/common/StyledHeader';
import { navigate } from 'navigation/NavigationService';
import { AUTHENTICATE_ROUTE } from 'navigation/config/routes';
import React, { useCallback, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Keyboard, Text, View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { ScaledSheet } from 'react-native-size-matters';
import { checkPasswordMatch, getConfig, openURL } from 'utilities/helper';
import { CONFIG_KEYS, GENDER_DATA, VerifiedCodeType, staticValue } from 'utilities/staticData';
import { PASSWORD_MAX_LENGTH, USERNAME_MAX_LENGTH } from 'utilities/validate';
import yupValidate from 'utilities/yupValidate';
import * as yup from 'yup';
import ModalChooseRestaurants from './components/ModalChooseRestaurants';
import UpLoadAvatar from './components/UpLoadAvatar';

const REGISTER_DEFAULT_FORM = __DEV__
    ? {
          email: 'yeuquaimo050@love.you',
          password: 'loveyou3000',
          confirmPassword: 'loveyou3000',
          fullName: 'DuongQuang',
          birthday: '',
          gender: '',
      }
    : {};

const RegisterScreen = () => {
    const { t } = useTranslation();
    const modalRef = useRef<Modalize>();
    const [chooseBranch, setChooseBranch] = useState<IRestaurants>({
        id: 0,
        name: '',
    });
    const [rule, setRule] = useState(__DEV__);
    const passwordRef = useRef<any>(null);
    const passwordConfirmRef = useRef<any>(null);
    const fullNameRef = useRef<any>(null);
    const [loading, setLoading] = useState(false);
    const policyUrl = getConfig(CONFIG_KEYS.POLICY);

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
            setLoading(true);
            const res = await checkIsExistEmail({ email: user?.email });
            if (res?.data?.isExisted) {
                setLoading(false);
                AlertMessage('error.emailExisted');
                return;
            }
            Keyboard.dismiss();
            await getVerifyCode({ email: user?.email, type: VerifiedCodeType.REGISTER });
            setLoading(false);
            const newUser = { ...user, frequentlyUsedRestaurantId: chooseBranch?.id };
            delete newUser.confirmPassword;
            if (newUser?.gender) {
                newUser.gender = Number(newUser.gender);
            }
            if (newUser.birthday === '') {
                delete newUser.birthday;
            }
            if (newUser.gender === '') {
                delete newUser.gender;
            }
            navigate(AUTHENTICATE_ROUTE.SEND_OTP, { user: newUser, type: VerifiedCodeType.REGISTER });
        } catch (error) {
            setLoading(false);
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
                onPress={() => setValueForm('gender', item.value)}>
                <RadioCheckView check={watch('gender') === item.value} />
                <StyledText customStyle={styles.textGender} originValue={item.title} />
            </StyledTouchable>
        );
    };
    const goToLogin = () => {
        navigate(AUTHENTICATE_ROUTE.LOGIN);
    };

    const openPolicy = () => {
        openURL(policyUrl);
    };

    return (
        <View style={styles.container}>
            <StyledOverlayLoading visible={loading} />
            <StyledHeader
                title={'register'}
                renderCenter={renderCenter}
                customContainer={styles.customContainerHeader}
            />
            <ModalChooseRestaurants ref={modalRef} chooseBranch={chooseBranch} selectBranch={setChooseBranch} />

            <StyledKeyboardAware
                style={styles.scrollView}
                customStyle={styles.contentScrollView}
                enableResetScrollToCoords={false}
                enableOnAndroid={false}>
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
                        maxLength={PASSWORD_MAX_LENGTH}
                        isSecureTextEntry={true}
                        icYeyOff={Images.icons.eyeOff}
                        icYeyOn={Images.icons.eyeOn}
                        customStyle={styles.inputPassword}
                        customErrorMessage={checkPassword()}
                        onSubmitEditing={() => fullNameRef.current.focus()}
                        containerStyle={styles.normalInputContainer}
                    />
                    <StyledInputForm
                        ref={fullNameRef}
                        name={'fullName'}
                        returnKeyType={'done'}
                        customPlaceHolder={'authen.hintRegister.fullName'}
                        maxLength={USERNAME_MAX_LENGTH}
                        label={'authen.labelRegister.fullName'}
                        containerStyle={styles.normalInputContainer}
                        onSubmitEditing={Keyboard.dismiss}
                    />
                    <StyledInputForm
                        name={'birthday'}
                        label={'authen.labelRegister.birthday'}
                        customPlaceHolder={'authen.hintRegister.birthday'}
                        icBirthday={Images.icons.calendar}
                        customStyle={styles.inputBirthday}
                        editable={false}
                        labelRequire={''}
                        pointerEvents={'none'}
                        handleConfirm={(text: string) => setValueForm('birthday', text)}
                        containerStyle={styles.normalInputContainer}
                    />
                    <LabelInput
                        label={'authen.labelRegister.gender'}
                        customStyle={styles.titleGender}
                        containerStyle={styles.containerStyleTitleGender}
                        labelRequire={''}
                    />
                    {GENDER_DATA.map(renderItemGender)}
                    <View style={styles.containerContent}>
                        <LabelInput
                            label={'authen.register.selectBranchStore.labelInput'}
                            customStyle={styles.cssLabel}
                            labelRequire={'*'}
                        />
                        <View style={styles.viewInput}>
                            <StyledInput
                                value={
                                    !chooseBranch?.id && chooseBranch?.name
                                        ? t('authen.register.selectBranchStore.noBranch')
                                        : chooseBranch?.name
                                }
                                containerStyle={styles.restaurant}
                                pointerEvents="none"
                                customPlaceHolder="authen.register.selectBranchStore.placeHolderBranch"
                                editable={false}
                                selectTextOnFocus={false}
                            />
                            <StyledTouchable
                                customStyle={styles.btnOpenModal}
                                onPress={() => {
                                    Keyboard?.dismiss();
                                    modalRef?.current?.open();
                                }}>
                                <StyledText
                                    i18nText={'authen.register.selectBranchStore.descriptionInput'}
                                    customStyle={styles.cssTxtInput}
                                />
                            </StyledTouchable>
                        </View>
                        <View style={styles.viewCheckSquare}>
                            <StyledText
                                i18nText="authen.register.selectBranchStore.attention.first"
                                customStyle={[styles.textBlack, styles.attention]}
                            />
                            <StyledText
                                i18nText="authen.register.selectBranchStore.attention.second"
                                customStyle={styles.textBlack}
                            />
                            <StyledText
                                i18nText="authen.register.selectBranchStore.attention.three"
                                customStyle={styles.textBlack}
                            />
                        </View>
                    </View>
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
                    disabled={!(isValid && rule && !checkPassword() && chooseBranch?.name)}
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

export default RegisterScreen;

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
        marginTop: '20@vs',
        marginHorizontal: '20@s',
        flexShrink: 1,
        alignItems: 'center',
    },
    textGender: {
        marginLeft: '10@s',
        color: Themes.COLORS.mineShaft,
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
    ml20: {
        marginLeft: '20@s',
    },
    cssLabel: {
        marginTop: '10@vs',
        fontSize: '16@ms0.3',
        marginBottom: '-5@vs',
    },
    containerContent: {
        paddingHorizontal: '20@s',
        paddingTop: '10@vs',
    },
    viewInput: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    textBlack: {
        color: Themes.COLORS.black,
        lineHeight: '20@vs',
        marginTop: '8@vs',
    },
    cssTxtInput: {
        fontSize: '16@vs',
        fontWeight: 'bold',
        color: Themes.COLORS.textSecondary,
    },
    viewCheckSquare: {
        marginTop: '3@vs',
    },
    viewFooter: {
        backgroundColor: Themes.COLORS.white,
        height: '34@vs',
    },
    describeLabel: {
        color: Themes.COLORS.black,
        lineHeight: '20@vs',
        fontWeight: '400',
    },
    restaurant: {
        width: '235@s',
        paddingVertical: '0@s',
        borderRadius: 10,
        borderColor: Themes.COLORS.silver,
        backgroundColor: Themes.COLORS.backGroundInput,
        paddingHorizontal: 0,
    },
    btnOpenModal: {
        borderWidth: 1,
        height: '50@vs',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: '11@s',
        width: '90@s',
        borderRadius: 5,
    },
    attention: {
        marginTop: 0,
        fontWeight: '700',
    },
});
