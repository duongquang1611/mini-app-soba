/* eslint-disable @typescript-eslint/no-unused-vars */
import { Themes } from 'assets/themes';
import { StyledButton, StyledInputForm } from 'components/base';
import StyledHeader from 'components/common/StyledHeader';
import React, { useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import * as yup from 'yup';

const ContactScreen = () => {
    const contact = () => {
        console.log('contact');
    };
    const registerSchema = yup.object().shape({
        // email: yupValidate.email(),
        // password: yupValidate.password(),
        // confirmPassword: yupValidate.password('password'),
    });
    const form = useForm({
        mode: 'onChange',
        // resolver: yupResolver(registerSchema),
    });
    const {
        formState: { isValid },
        setValue,
        handleSubmit,
    } = form;
    const contentRef = useRef<any>(null);
    const { t } = useTranslation();
    return (
        <View style={styles.container}>
            <StyledHeader title={'setting.contactTitle'} />
            <View style={styles.body}>
                <FormProvider {...form}>
                    <StyledInputForm
                        label={'setting.position'}
                        name={'position'}
                        placeholder={t('setting.position')}
                        keyboardType="email-address"
                        returnKeyType={'next'}
                        onSubmitEditing={() => contentRef.current.focus()}
                    />
                    <StyledInputForm
                        label={'setting.content'}
                        name={'content'}
                        ref={contentRef}
                        placeholder={t('setting.content')}
                        keyboardType="email-address"
                        returnKeyType={'next'}
                        onSubmitEditing={contact}
                        customStyle={styles.contentInput}
                        multiline
                    />
                </FormProvider>
            </View>
            <View style={styles.buttonView}>
                <StyledButton title={'setting.send'} onPress={contact} customStyle={styles.buttonSave} />
            </View>
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
        marginVertical: '10@vs',
        backgroundColor: Themes.COLORS.white,
    },
    buttonSave: {},
    buttonView: {
        paddingVertical: '10@vs',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Themes.COLORS.white,
    },
    contentInput: {
        height: '160@vs',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        borderRadius: 5,
    },
});
