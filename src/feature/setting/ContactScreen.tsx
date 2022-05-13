/* eslint-disable @typescript-eslint/no-unused-vars */
import { yupResolver } from '@hookform/resolvers/yup';
import { contact } from 'api/modules/api-app/setting';
import { Themes } from 'assets/themes';
import { StyledButton, StyledInputForm } from 'components/base';
import AlertMessage from 'components/base/AlertMessage';
import StyledKeyboardAware from 'components/base/StyledKeyboardAware';
import StyledHeader from 'components/common/StyledHeader';
import { goBack } from 'navigation/NavigationService';
import React, { useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Keyboard, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { POPUP_TYPE } from 'utilities/staticData';
import { CONTACT_MAX_LENGTH } from 'utilities/validate';
import * as yup from 'yup';

const ContactScreen = () => {
    const registerSchema = yup.object().shape({
        title: yup.string().required('error.required'),
        description: yup.string().required('error.required'),
    });

    const form = useForm({
        mode: 'onChange',
        resolver: yupResolver(registerSchema),
    });
    const {
        formState: { isValid },
        handleSubmit,
    } = form;
    const contentRef = useRef<any>(null);
    const { t } = useTranslation();

    const sendContact = async (formData: any) => {
        Keyboard.dismiss();
        try {
            await contact(formData);
            AlertMessage('setting.sendContactSuccess', {
                onClosedModalize: () => {
                    goBack();
                },
                type: POPUP_TYPE.SUCCESS,
            });
        } catch (error) {
            console.log('sendContact -> formData', formData);
            AlertMessage(error);
        }
    };

    return (
        <View style={styles.container}>
            <StyledHeader title={'setting.contactTitle'} />
            <StyledKeyboardAware
                style={styles.scrollView}
                customStyle={styles.contentScrollView}
                enableResetScrollToCoords={false}
                enableOnAndroid={false}
            >
                <View style={styles.body}>
                    <FormProvider {...form}>
                        <StyledInputForm
                            label={'setting.position'}
                            name={'title'}
                            placeholder={t('setting.position')}
                            keyboardType="email-address"
                            returnKeyType={'next'}
                            maxLength={CONTACT_MAX_LENGTH}
                            onSubmitEditing={() => contentRef.current.focus()}
                        />
                        <StyledInputForm
                            label={'setting.content'}
                            name={'description'}
                            returnKeyType={'next'}
                            ref={contentRef}
                            placeholder={t('setting.content')}
                            keyboardType="email-address"
                            customStyle={styles.contentInput}
                            textAlignVertical={'top'}
                            multiline
                        />
                    </FormProvider>
                    <View style={styles.buttonView}>
                        <StyledButton
                            title={'setting.send'}
                            onPress={handleSubmit(sendContact)}
                            disabled={!isValid}
                            customStyle={styles.buttonSave}
                        />
                    </View>
                </View>
            </StyledKeyboardAware>
        </View>
    );
};

export default ContactScreen;

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: Themes.COLORS.lightGray,
    },
    body: {
        flex: 1,
        marginTop: '10@vs',
        backgroundColor: Themes.COLORS.white,
    },
    buttonSave: {
        marginTop: '22@vs',
    },
    buttonView: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Themes.COLORS.white,
    },
    contentInput: {
        height: '160@vs',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        borderRadius: 5,
        paddingTop: '10@vs',
    },
    contentScrollView: {
        paddingBottom: '40@vs',
    },
    scrollView: {
        flex: 1,
        backgroundColor: Themes.COLORS.white,
    },
});
