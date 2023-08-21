import Images from 'assets/images';
import { Themes } from 'assets/themes';
import React, { forwardRef, useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    ColorValue,
    Keyboard,
    ReturnKeyTypeOptions,
    StyleProp,
    Text,
    TextInput,
    TextInputProps,
    TextStyle,
    View,
    ViewStyle,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { ScaledSheet } from 'react-native-size-matters';
import { autoCompleteType, textContentType } from 'utilities/CommonInterface';
import { formatDate, YYYYMMDD } from 'utilities/format';
import { formatUTC, getYesterday } from 'utilities/helper';
import { StyledIcon, StyledTouchable } from '.';
import StyledText from './StyledText';

export interface StyledInputProps extends TextInputProps {
    containerStyle?: StyleProp<ViewStyle>;
    wrapInputStyle?: StyleProp<ViewStyle>;
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
    onPress?: any;
    handleConfirm?: any;
    customErrorMessage?: any;
    useUTC?: boolean;
    disabled?: boolean;
}

export const LabelInput = ({ label, labelRequire = '*', customStyle, containerStyle }: any) => {
    return (
        <View style={[styles.wrapLabel, containerStyle]}>
            <StyledText i18nText={label} customStyle={[styles.label, customStyle]} />
            {!!labelRequire && <Text style={[styles.label, styles.labelRequire, customStyle]}>{labelRequire}</Text>}
        </View>
    );
};

const WrapInput = ({ onPress, children, customStyle, disabled }: any) => {
    return onPress ? (
        <StyledTouchable customStyle={customStyle} onPress={onPress} disabled={disabled}>
            {children}
        </StyledTouchable>
    ) : (
        <View style={customStyle}>{children}</View>
    );
};

const StyledInput = (props: StyledInputProps, ref: any) => {
    const {
        isSecureTextEntry,
        icYeyOff,
        icYeyOn,
        icBirthday,
        valueInput,
        customPlaceHolder,
        labelRequire,
        label,
        customLabelStyle,
        onPress,
        handleConfirm,
        customErrorMessage,
        errorMessage,
        wrapInputStyle,
        useUTC = true,
        disabled = false,
    } = props;

    const [isFocused, setIsFocused] = useState(false);
    const [isTextEntry, SetTextEntry] = useState(isSecureTextEntry);
    const changeEntryText = () => {
        SetTextEntry(!isTextEntry);
    };
    const input = useRef<TextInput>(null);
    const { t } = useTranslation();
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        Keyboard.dismiss();
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirmDate = useCallback((date: any) => {
        hideDatePicker();
        handleConfirm?.(useUTC ? formatUTC(date) : date.toISOString());
    }, []);

    return (
        <View style={[styles.container, props.containerStyle]}>
            {!!icBirthday && (
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    date={valueInput ? new Date(valueInput) : getYesterday()}
                    onConfirm={handleConfirmDate}
                    onCancel={hideDatePicker}
                    maximumDate={getYesterday()}
                />
            )}
            {!!label && <LabelInput labelRequire={labelRequire} label={label} customStyle={customLabelStyle} />}
            <WrapInput
                customStyle={[
                    styles.containerInput,
                    styles.textInput,
                    wrapInputStyle,
                    !isFocused &&
                        !!(errorMessage || customErrorMessage) && { borderColor: Themes.COLORS.borderInputError },
                ]}
                onPress={icBirthday ? showDatePicker : onPress}
                disabled={disabled}>
                <TextInput
                    ref={ref || input}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    style={[styles.input, props.customStyle]}
                    value={icBirthday ? formatDate(valueInput || '', YYYYMMDD) : valueInput}
                    placeholderTextColor={props.placeholderTextColor || Themes.COLORS.silver}
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
                            <StyledIcon size={24} source={icYeyOff || Images.icons.eyeOff} />
                        ) : (
                            <StyledIcon size={24} source={icYeyOn || Images.icons.eyeOn} />
                        )}
                    </StyledTouchable>
                ) : null}
                {icBirthday && (
                    <StyledTouchable onPress={showDatePicker} disabled={disabled}>
                        <StyledIcon customStyle={styles.icEntry} size={24} source={icBirthday} />
                    </StyledTouchable>
                )}
            </WrapInput>
            {!!(errorMessage || customErrorMessage) && (
                <StyledText
                    i18nText={errorMessage || customErrorMessage}
                    customStyle={[styles.errorMessage, props.customErrorStyle]}
                />
            )}
        </View>
    );
};
const styles = ScaledSheet.create({
    textInput: {
        width: '100%',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Themes.COLORS.silver,
        backgroundColor: Themes.COLORS.backGroundInput,
        paddingHorizontal: '15@s',
    },
    input: {
        paddingVertical: 0,
        width: '100%',
        color: Themes.COLORS.textPrimary,
        height: '50@vs',
        fontSize: '16@ms0.3',
    },
    errorMessage: {
        fontSize: '12@ms0.3',
        lineHeight: '16@vs',
        color: Themes.COLORS.borderInputError,
        marginTop: '5@vs',
        marginLeft: '2@s',
    },
    container: {
        marginTop: '7@vs',
        marginBottom: '7@vs',
        width: '100%',
        paddingHorizontal: '20@vs',
    },
    containerInput: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    label: {
        fontWeight: 'bold',
        lineHeight: '24@vs',
        fontSize: '16@ms0.3',
        color: Themes.COLORS.mineShaft,
    },
    labelRequire: {
        color: Themes.COLORS.primary,
    },
    icEntry: {
        tintColor: Themes.COLORS.silver,
    },
    wrapLabel: {
        flexDirection: 'row',
        marginVertical: '5@vs',
        alignItems: 'center',
    },
});

export default forwardRef(StyledInput);
