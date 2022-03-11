/* eslint-disable @typescript-eslint/no-unused-vars */
import { yupResolver } from '@hookform/resolvers/yup';
import { Themes } from 'assets/themes';
import { StyledButton, StyledInputForm } from 'components/base';
import StyledHeader from 'components/common/StyledHeader';
import React, { useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Keyboard, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import * as yup from 'yup';

const ContactScreen = () => {
    const registerSchema = yup.object().shape({
        position: yup.string().required(),
        content: yup.string().required(),
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
    const contentRef = useRef<any>(null);
    const { t } = useTranslation();

    const sendContact = (formData: any) => {
        console.log('sendContact -> formData', formData);
    };

    return (
        <View style={styles.container}>
            <StyledHeader title={'setting.contactTitle'} />
            <View style={styles.body}>
                <FormProvider {...form}>
                    <StyledInputForm
                        label={'setting.position'}
                        labelRequire={'*'}
                        name={'position'}
                        placeholder={t('setting.position')}
                        keyboardType="email-address"
                        returnKeyType={'next'}
                        onSubmitEditing={() => contentRef.current.focus()}
                    />
                    <StyledInputForm
                        labelRequire={'*'}
                        label={'setting.content'}
                        name={'content'}
                        returnKeyType={'done'}
                        ref={contentRef}
                        placeholder={t('setting.content')}
                        keyboardType="email-address"
                        onSubmitEditing={Keyboard.dismiss}
                        customStyle={styles.contentInput}
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
    },
});
