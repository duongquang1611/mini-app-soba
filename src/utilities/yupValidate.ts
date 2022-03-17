import * as yup from 'yup';
import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH, REGEX_PHONE, SPECIAL_CHAR, USERNAME_MAX_LENGTH } from './validate';

const yupValidate = {
    fullName: () =>
        yup
            .string()
            .required('error.required')
            .trim('error.trimSpace')
            .strict(true)
            .max(USERNAME_MAX_LENGTH, 'error.maxFullName')
            .matches(SPECIAL_CHAR, 'error.errorSpecialCharacter'),

    email: () => yup.string().required('error.required').trim('error.trimSpace').email('error.emailInvalid'),

    birthday: () => yup.string().required('error.required'),

    gender: () => yup.string().required('error.required'),

    phone: () => yup.string().required('error.required').matches(REGEX_PHONE, 'error.phoneInvalid'),

    /**
     * @param ref : the name of StyledInputForm want to compare
     * @param isMatchCurrentPassword
     * password() : input password
     * password(ref) : input passwordConfirm, have to be the same with password
     * password(ref, false) : input newPassword, have not to be the same with currentPassword
     */
    password: (ref?: string, isMatchCurrentPassword = true): any => {
        if (ref) {
            // NEW PASSWORD
            if (!isMatchCurrentPassword)
                return yupValidate.password().not([yup.ref(ref), null], 'error.duplicatePassword');

            // CONFIRM PASSWORD
            return yup
                .string()
                .required('error.required')
                .oneOf([yup.ref(ref), null], 'error.passwordNotMatch');
        }

        return yup
            .string()
            .required('error.required')
            .trim('error.trimSpace')
            .strict(true)
            .min(PASSWORD_MIN_LENGTH, 'error.passwordLength')
            .max(PASSWORD_MAX_LENGTH, 'error.passwordLength');
        // .matches(REGEX_PASSWORD, ('error.validatePassword'));
    },
};

export default yupValidate;
