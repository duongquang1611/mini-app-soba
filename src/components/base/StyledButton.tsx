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
    customStyleText?: StyleProp<TextStyle>;
    onPress(params?: any): void;
    onLongPress?(): void;
    disabled?: boolean;
    outline?: boolean;
    isNormal?: boolean;
}

const WrapTextComponent = ({ children, outline }: any) => {
    return outline ? (
        <View style={styles.secondaryBtn}>{children}</View>
    ) : (
        <LinearView style={styles.linear}>{children}</LinearView>
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
    } = props;

    return (
        <StyledTouchable
            customStyle={[styles.container, customStyle]}
            onPress={onPress}
            onLongPress={onLongPress}
            disabled={disabled || !onPress}
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
                <WrapTextComponent outline={outline}>
                    <StyledText
                        i18nText={title}
                        customStyle={[
                            styles.textButtonLinear,
                            outline && { color: Themes.COLORS.primary, fontWeight: 'normal' },
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
        marginTop: 10,
    },
    textButton: {
        color: Themes.COLORS.textSecondary,
    },
    textButtonLinear: {
        color: Themes.COLORS.white,
        fontWeight: 'bold',
    },
    linear: {
        width: '100%',
        paddingVertical: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    secondaryBtn: {
        paddingVertical: '5@vs',
        paddingHorizontal: '10@s',
        borderWidth: 1,
        borderColor: Themes.COLORS.primary,
        borderRadius: 5,
    },
});

export default StyledButton;
