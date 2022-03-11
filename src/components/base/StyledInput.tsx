import Images from 'assets/images';
import { Themes } from 'assets/themes';
import React, { forwardRef, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    ColorValue,
    ReturnKeyTypeOptions,
    StyleProp,
    TextInput,
    TextInputProps,
    TextStyle,
    View,
    ViewStyle,
    Text,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { ScaledSheet } from 'react-native-size-matters';
import { autoCompleteType, textContentType } from 'utilities/CommonInterface';
import { toLocalStringBirthday } from 'utilities/format';
import { StyledIcon, StyledTouchable } from '.';
import StyledText from './StyledText';

export interface StyledInputProps extends TextInputProps {
    containerStyle?: StyleProp<ViewStyle>;
    customStyle?: StyleProp<TextStyle>;
    customLabelStyle?: StyleProp<TextStyle>;
    customErrorStyle?: StyleProp<TextStyle>;
    customPlaceHolder?: string;
    placeholderTextColor?: ColorValue;
    customUnderlineColor?: ColorValue;
    customReturnKeyType?: ReturnKeyTypeOptions;
    ref?: any;
    errorMessage?: string;
    label?: any;
    labelRequire?: string;
    textContentType?: textContentType;
    autoCompleteType?: autoCompleteType;
    isSecureTextEntry?: boolean;
    icYeyOff?: any;
    icYeyOn?: any;
    icBirthday?: any;
    valueInput?: string;
}

const StyledInput = (props: StyledInputProps, ref: any) => {
    const {
        isSecureTextEntry,
        icYeyOff,
        icYeyOn,
        icBirthday,
        valueInput,
        customPlaceHolder,
        labelRequire = '',
        label,
        customLabelStyle,
    } = props;

    const [isFocused, setIsFocused] = useState(false);
    const [date, changeDate] = useState('');
    const [isTextEntry, SetTextEntry] = useState(isSecureTextEntry);
    const changeEntryText = () => {
        SetTextEntry(!isTextEntry);
    };
    const input = useRef<TextInput>(null);
    const { t } = useTranslation();
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date: any) => {
        changeDate(toLocalStringBirthday(date));
        hideDatePicker();
    };
    return (
        <View style={[styles.container, props.containerStyle]}>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
            {!!label && (
                <Text style={[styles.label, customLabelStyle]}>
                    {t(label)}
                    {!!labelRequire && <Text style={styles.labelRequire}>{labelRequire}</Text>}
                </Text>
            )}
            <View style={[styles.containerInput, styles.textInput]}>
                <TextInput
                    ref={ref || input}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    style={[
                        { width: '100%' },
                        props.customStyle,
                        !isFocused && !!props?.errorMessage && { borderColor: Themes.COLORS.borderInputError },
                    ]}
                    value={icBirthday ? date : valueInput}
                    placeholderTextColor={props.placeholderTextColor || Themes.COLORS.grey}
                    placeholder={customPlaceHolder ? (t(customPlaceHolder as any) as string) : ''}
                    underlineColorAndroid={props.customUnderlineColor || 'transparent'}
                    autoCompleteType={props.autoCompleteType || 'off'}
                    textContentType={props.textContentType || 'none'}
                    importantForAutofill="yes"
                    autoCorrect={false}
                    returnKeyType={props.customReturnKeyType || 'next'}
                    blurOnSubmit={!!props.customReturnKeyType}
                    secureTextEntry={isTextEntry || false}
                    {...props}
                />
                {isSecureTextEntry ? (
                    <StyledTouchable onPress={changeEntryText} customStyle={{}}>
                        {isTextEntry ? (
                            <StyledIcon size={15} source={icYeyOff || Images.icons.eyeOff} />
                        ) : (
                            <StyledIcon size={15} source={icYeyOn || Images.icons.eyeOn} />
                        )}
                    </StyledTouchable>
                ) : null}
                {icBirthday && (
                    <TouchableOpacity onPress={showDatePicker}>
                        <StyledIcon customStyle={styles.icEntry} size={15} source={icBirthday} />
                    </TouchableOpacity>
                )}
            </View>
            {!!props?.errorMessage && !isFocused && (
                <StyledText i18nText={props.errorMessage} customStyle={[styles.errorMessage, props.customErrorStyle]} />
            )}
        </View>
    );
};
const styles = ScaledSheet.create({
    textInput: {
        width: '100%',
        borderRadius: 10,
        padding: '12@s',
        borderWidth: 1,
        borderColor: Themes.COLORS.silver,
        backgroundColor: Themes.COLORS.backGroundInput,
    },
    errorMessage: {
        fontSize: 12,
        color: Themes.COLORS.borderInputError,
        marginTop: 5,
    },
    container: {
        marginVertical: '8@vs',
        width: '100%',
        paddingHorizontal: '20@vs',
    },
    containerInput: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    label: {
        marginVertical: '10@vs',
        fontWeight: 'bold',
        fontSize: '14@ms0.3',
        color: Themes.COLORS.mineShaft,
    },
    labelRequire: {
        color: Themes.COLORS.primary,
    },
    icEntry: {
        tintColor: Themes.COLORS.silver,
    },
});

export default forwardRef(StyledInput);
