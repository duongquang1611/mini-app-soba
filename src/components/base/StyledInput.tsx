import Images from 'assets/images';
import { Themes } from 'assets/themes';
import React, { forwardRef, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    ColorValue,
    ReturnKeyTypeOptions,
    StyleProp,
    Text,
    TextInput,
    TextInputProps,
    TextStyle,
    View,
    ViewStyle,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { ScaledSheet } from 'react-native-size-matters';
import { autoCompleteType, textContentType } from 'utilities/CommonInterface';
import { formatDate, YYYYMMDD } from 'utilities/format';
import { getYesterday } from 'utilities/helper';
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
    onPress?: any;
    handleConfirm?: any;
}

export const LabelInput = ({ label, labelRequire = '*', customStyle }: any) => {
    return (
        <View style={styles.wrapLabel}>
            <StyledText i18nText={label} customStyle={customStyle} />
            {!!labelRequire && <Text style={[styles.label, styles.labelRequire, customStyle]}>{labelRequire}</Text>}
        </View>
    );
};

const WrapInput = ({ onPress, children, customStyle }: any) => {
    return onPress ? (
        <StyledTouchable customStyle={customStyle} onPress={onPress}>
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
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirmDate = (date: any) => {
        handleConfirm?.(date.toISOString());
        hideDatePicker();
    };
    return (
        <View style={[styles.container, props.containerStyle]}>
            {!!icBirthday && (
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    date={valueInput ? new Date(valueInput) : new Date()}
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
                    !isFocused && !!props?.errorMessage && { borderColor: Themes.COLORS.borderInputError },
                ]}
                onPress={icBirthday ? showDatePicker : onPress}
            >
                <TextInput
                    ref={ref || input}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    style={[styles.input, props.customStyle]}
                    value={icBirthday ? formatDate(valueInput || '', YYYYMMDD) : valueInput}
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
            </WrapInput>
            {!!props?.errorMessage && (
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
    input: {
        paddingVertical: 0,
        width: '100%',
    },
    errorMessage: {
        fontSize: '12@ms0.3',
        lineHeight: '16@vs',
        color: Themes.COLORS.borderInputError,
        marginTop: '5@vs',
        marginLeft: '2@s',
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
        alignItems: 'center',
    },
    label: {
        fontWeight: 'bold',
        lineHeight: '18@vs',
        fontSize: '14@ms0.3',
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
        marginVertical: '10@vs',
        alignItems: 'center',
    },
});

export default forwardRef(StyledInput);
