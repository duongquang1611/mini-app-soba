import Metrics from 'assets/metrics';
import { Themes } from 'assets/themes';
import LinearView from 'components/common/LinearView';
import React, { FunctionComponent } from 'react';
import { StyleProp, TextStyle, View, ViewStyle } from 'react-native';
import { scale, ScaledSheet } from 'react-native-size-matters';
import { StyledText, StyledTouchable } from '.';

interface StyledButtonProps {
    title: any;
    customStyle?: StyleProp<ViewStyle>;
    customContentStyle?: StyleProp<ViewStyle>;
    customStyleText?: StyleProp<TextStyle>;
    onPress?(params?: any): void;
    onLongPress?(): void;
    disabled?: boolean;
    outline?: boolean;
    isNormal?: boolean;
    colors?: any[];
}

const WrapTextComponent = ({ children, outline, disabled, colors, customStyle }: any) => {
    return outline ? (
        <View style={[styles.secondaryBtn, customStyle]}>{children}</View>
    ) : (
        <LinearView style={[styles.linear, customStyle]} disabled={disabled} colors={colors}>
            {children}
        </LinearView>
    );
};

const StyledButton: FunctionComponent<StyledButtonProps> = (props: StyledButtonProps) => {
    const {
        title,
        customStyle,
        onPress,
        customStyleText,
        onLongPress,
        disabled = false,
        outline = false,
        isNormal = false,
        customContentStyle,
        colors,
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
                        { color: outline ? Themes.COLORS.primary : Themes.COLORS.white },
                        customStyleText,
                    ]}
                />
            ) : (
                <WrapTextComponent
                    outline={outline}
                    disabled={disabled}
                    colors={colors}
                    customStyle={customContentStyle}
                >
                    <StyledText
                        i18nText={title}
                        customStyle={[
                            styles.textButtonLinear,
                            outline && { color: Themes.COLORS.primary, fontWeight: 'normal' },
                            disabled && { color: Themes.COLORS.silver },
                            customStyleText,
                        ]}
                    />
                </WrapTextComponent>
            )}
        </StyledTouchable>
    );
};

const styles = ScaledSheet.create({
    container: {
        width: Metrics.screenWidth - scale(40),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: '10@vs',
    },
    textButton: {
        color: Themes.COLORS.white,
        fontWeight: 'bold',
    },
    textButtonLinear: {
        color: Themes.COLORS.white,
        fontWeight: 'bold',
    },
    linear: {
        width: '100%',
        paddingVertical: '15@vs',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    secondaryBtn: {
        paddingVertical: '5@vs',
        paddingHorizontal: '10@vs',
        borderWidth: 1,
        borderColor: Themes.COLORS.primary,
        borderRadius: 5,
    },
});

export default StyledButton;
