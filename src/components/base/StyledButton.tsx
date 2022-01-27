import React, { FunctionComponent } from 'react';
import { StyleProp, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Themes } from 'assets/themes';
import { StyledText, StyledTouchable } from '.';

interface StyledButtonProps {
    title: any;
    customStyle?: StyleProp<ViewStyle>;
    customStyleText?: StyleProp<TextStyle>;
    onPress(params?: any): void;
    onLongPress?(): void;
    disabled?: boolean;
    isSecondaryButton?: boolean;
}

const StyledButton: FunctionComponent<StyledButtonProps> = (props: StyledButtonProps) => {
    const {
        title,
        customStyle,
        onPress,
        customStyleText,
        onLongPress,
        disabled = false,
        isSecondaryButton = false,
    } = props;
    return (
        <StyledTouchable
            customStyle={[
                styles.container,
                { backgroundColor: isSecondaryButton ? Themes.COLORS.white : Themes.COLORS.primary },
                customStyle,
            ]}
            onPress={onPress}
            onLongPress={onLongPress}
            disabled={disabled}
        >
            <StyledText
                i18nText={title}
                customStyle={[
                    styles.textButton,
                    { color: isSecondaryButton ? Themes.COLORS.primary : Themes.COLORS.white },
                    customStyleText,
                ]}
            />
        </StyledTouchable>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        width: 300,
        borderColor: Themes.COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        borderWidth: 1,
        marginTop: 10,
    },
    textButton: {
        color: Themes.COLORS.textSecondary,
        fontWeight: 'bold',
    },
});

export default StyledButton;
