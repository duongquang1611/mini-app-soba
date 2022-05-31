/* eslint-disable @typescript-eslint/no-unused-vars */
import { yupResolver } from '@hookform/resolvers/yup';
import { editProfile, getProfile } from 'api/modules/api-app/authenticate';
import { userInfoActions } from 'app-redux/slices/userInfoSlice';
import Images from 'assets/images';
import Metrics from 'assets/metrics';
import { Themes } from 'assets/themes';
import { StyledButton, StyledInputForm, StyledText, StyledTouchable } from 'components/base';
import AlertMessage from 'components/base/AlertMessage';
import { LabelInput } from 'components/base/StyledInput';
import StyledKeyboardAware from 'components/base/StyledKeyboardAware';
import RadioCheckView from 'components/common/RadioCheckView';
import StyledHeader from 'components/common/StyledHeader';
import TextUnderline from 'components/common/TextUnderline';
import UpLoadAvatar from 'feature/authentication/components/UpLoadAvatar';
import { cloneDeep } from 'lodash';
import { APP_ROUTE, AUTHENTICATE_ROUTE, SETTING_ROUTE } from 'navigation/config/routes';
import { goBack, navigate } from 'navigation/NavigationService';
import React, { useCallback, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Keyboard, View } from 'react-native';
import { scale, ScaledSheet } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import { formatDate, YYYYMMDD_NORMAL } from 'utilities/format';
import { GENDER_DATA, POPUP_TYPE, staticValue } from 'utilities/staticData';
import { USERNAME_MAX_LENGTH } from 'utilities/validate';
import yupValidate from 'utilities/yupValidate';
import * as yup from 'yup';

const EditProfileScreen = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const { user = {} } = useSelector((state: any) => state.userInfo);
    const birthdayRef = useRef<any>(null);
    const fullNameRef = useRef<any>(null);

    const registerSchema = yup.object().shape({
        fullName: yupValidate.fullName(),
        birthday: yupValidate.birthday(),
        gender: yupValidate.gender(),
    });

    const form = useForm({
        mode: 'onChange',
        resolver: yupResolver(registerSchema),
        defaultValues: {
            email: user?.member?.email,
            birthday: user?.member?.birthday,
            gender: `${user?.member?.gender}`,
            fullName: user?.member?.fullName,
            avatar: user?.member?.avatar,
        },
    });

    const {
        formState: { isValid },
        setValue,
        handleSubmit,
        watch,
    } = form;

    const goToChangePass = () => {
        navigate(AUTHENTICATE_ROUTE.CHANGE_PASS);
    };

    const saveEdit = useCallback(async (user: any) => {
        try {
            Keyboard.dismiss();
            setLoading(true);
            const newUser = cloneDeep(user);
            delete newUser.email;
            if (newUser?.gender) {
                newUser.gender = Number(newUser.gender);
            }
            if (!newUser?.avatar) {
                delete newUser.avatar;
            }
            // if (newUser.birthday) {
            //     newUser.birthday = formatDate(newUser.birthday, YYYYMMDD_NORMAL);
            // }
            await editProfile(newUser);
            const resProfile = await getProfile();
            dispatch(userInfoActions.getUserInfoSuccess(resProfile?.data));
            setLoading(false);
            AlertMessage('profile.updateSuccess', {
                onClosedModalize: () => navigate(APP_ROUTE.MAIN_TAB, { screen: SETTING_ROUTE.ROOT }),
                type: POPUP_TYPE.SUCCESS,
            });
        } catch (error) {
            setLoading(false);
            AlertMessage(error);
        }
    }, []);

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

    return (
        <View style={styles.container}>
            <StyledHeader title={'setting.editProfileTitle'} />
            <StyledKeyboardAware
                style={styles.scrollView}
                customStyle={styles.contentScrollView}
                enableResetScrollToCoords={false}
                enableOnAndroid={false}
            >
                <FormProvider {...form}>
                    <View style={styles.fakeFormInput}>
                        <StyledInputForm name={'avatar'} />
                        <StyledInputForm name={'gender'} />
                    </View>
                    <UpLoadAvatar setValue={(img: any) => setValueForm('avatar', img)} avatar={user?.member?.avatar} />
                    <StyledInputForm
                        name={'email'}
                        label={'authen.labelRegister.email'}
                        customPlaceHolder={'authen.hintRegister.email'}
                        keyboardType="email-address"
                        returnKeyType={'next'}
                        onSubmitEditing={() => fullNameRef.current.focus()}
                        editable={false}
                        containerStyle={styles.emailContainer}
                        customStyle={styles.inputEmail}
                        wrapInputStyle={styles.wrapInputEmail}
                    />
                    <StyledInputForm
                        label={'authen.labelRegister.fullName'}
                        name={'fullName'}
                        ref={fullNameRef}
                        maxLength={USERNAME_MAX_LENGTH}
                        customPlaceHolder={'authen.hintRegister.fullName'}
                        returnKeyType={'done'}
                        containerStyle={styles.inputContainer}
                        onSubmitEditing={Keyboard.dismiss}
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
                        containerStyle={styles.inputContainer}
                    />
                    <LabelInput
                        label={'authen.labelRegister.gender'}
                        customStyle={styles.titleGender}
                        containerStyle={styles.containerStyleTitleGender}
                    />
                    {GENDER_DATA.map(renderItemGender)}
                </FormProvider>
                <TextUnderline
                    onPress={goToChangePass}
                    customStyle={styles.changePassBtn}
                    title={'common.changePass'}
                    customStyleText={styles.changePassText}
                    color={Themes.COLORS.primary}
                />
                <View style={styles.rowBtnFooter}>
                    <StyledButton
                        isNormal
                        onPress={goBack}
                        title={'setting.cancel'}
                        customStyle={styles.buttonCancel}
                        customStyleText={styles.cancelText}
                    />
                    <View style={styles.separatorBtn} />
                    <StyledButton
                        title={'setting.editProfile'}
                        onPress={handleSubmit(saveEdit)}
                        customStyle={styles.buttonSave}
                        disabled={!isValid}
                    />
                </View>
            </StyledKeyboardAware>
        </View>
    );
};

export default EditProfileScreen;

const styles = ScaledSheet.create({
    container: {
        flex: 1,
    },
    contentScrollView: {
        paddingBottom: '60@vs',
    },
    scrollView: {
        flex: 1,
        paddingTop: '23@vs',
    },
    buttonSave: {
        flex: 1,
    },
    buttonCancel: {
        flex: 1,
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
        marginTop: '12@vs',
        marginHorizontal: '20@s',
        alignItems: 'center',
    },
    textGender: {
        marginLeft: '15@s',
        color: Themes.COLORS.mineShaft,
    },
    titleGender: {
        alignSelf: 'flex-start',
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
    },
    rowBtnFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: '20@s',
        marginTop: '18@vs',
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
    emailContainer: {
        marginTop: '50@vs',
    },
    inputContainer: {
        marginTop: '13@vs',
    },
    containerStyleTitleGender: {
        marginBottom: 0,
        marginLeft: '20@s',
        marginTop: '13@vs',
    },
    changePassBtn: {
        alignSelf: 'flex-start',
        marginLeft: '20@s',
        marginTop: '38@vs',
    },
    changePassText: {
        fontWeight: 'bold',
    },
    inputBirthday: {
        flex: 1,
    },
    inputEmail: {
        backgroundColor: Themes.COLORS.disabled,
        flex: 1,
        paddingHorizontal: '15@s',
        color: Themes.COLORS.silver,
    },
    wrapInputEmail: {
        paddingHorizontal: 0,
        overflow: 'hidden',
    },
    separatorBtn: {
        width: '10@s',
    },
    fakeFormInput: {
        bottom: -99999999,
        position: 'absolute',
    },
});
