import React, { FunctionComponent } from 'react';
import { StyleProp, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Themes } from 'assets/themes';
import Metrics from 'assets/metrics';
import { scale } from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';
import { StyledText, StyledTouchable } from '.';

interface StyledButtonProps {
    title: any;
    customStyle?: StyleProp<ViewStyle>;
    customStyleText?: StyleProp<TextStyle>;
    onPress(params?: any): void;
    onLongPress?(): void;
    disabled?: boolean;
    isSecondaryButton?: boolean;
    isNormal?: boolean;
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
        isNormal = false,
    } = props;
    return (
        <StyledTouchable
            customStyle={[styles.container, customStyle]}
            onPress={onPress}
            onLongPress={onLongPress}
            disabled={disabled}
        >
            {isNormal ? (
                <StyledText
                    i18nText={title}
                    customStyle={[
                        styles.textButton,
                        { color: isSecondaryButton ? Themes.COLORS.primary : Themes.COLORS.white },
                        customStyleText,
                    ]}
                />
            ) : (
                <LinearGradient style={styles.linear} colors={['#DF2115', '#A61F17']}>
                    <StyledText
                        i18nText={title}
                        customStyle={[
                            styles.textButton,
                            { color: isSecondaryButton ? Themes.COLORS.primary : Themes.COLORS.white },
                            customStyleText,
                        ]}
                    />
                </LinearGradient>
            )}
        </StyledTouchable>
    );
};

const styles = StyleSheet.create({
    container: {
        width: Metrics.screenWidth - scale(40),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 10,
    },
    textButton: {
        color: Themes.COLORS.textSecondary,
        fontWeight: 'bold',
    },
    linear: {
        width: '100%',
        paddingVertical: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
});

export default StyledButton;
