import { Themes } from 'assets/themes';
import i18next from 'i18next';
import * as React from 'react';
import { memo } from 'react';
import { Normalize, useTranslation } from 'react-i18next';
import { StyleProp, Text, TextProps, TextStyle } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { logger } from 'utilities/helper';
import { Resource } from 'utilities/i18next';

interface StyledTextProps extends TextProps {
    customStyle?: StyleProp<TextStyle>;
    i18nParams?: any;
    isBlack?: any;
    disabled?: boolean;
}

interface StyledTextWithOriginValue extends StyledTextProps {
    originValue: string;
    i18nText?: never;
}

interface StyledTextWithI18nValue extends StyledTextProps {
    originValue?: never;
    i18nText: string;
}

type StyledTextCombineProps = StyledTextWithOriginValue | StyledTextWithI18nValue;

const StyledText = (props: StyledTextCombineProps) => {
    const { t } = useTranslation();
    const { style, originValue, i18nText, i18nParams, isBlack, disabled } = props;
    let value;

    if (style) {
        logger('StyledText should use customStyle to avoid override default style text', true);
    }

    if (originValue) {
        value = originValue;
    } else if (i18nText || i18next.exists(i18nText || '', i18nParams)) {
        value = t(i18nText as Normalize<Resource>, i18nParams);
    } else {
        value = i18nText || '';
    }

    return (
        <Text
            style={[
                styles.text,
                {
                    color: isBlack ? Themes.COLORS.mineShaft : Themes.COLORS.textPrimary,
                },
                props.customStyle,
                disabled && { color: Themes.COLORS.silver },
            ]}
            {...props}
        >
            {value}
        </Text>
    );
};

const styles = ScaledSheet.create({
    text: {
        color: Themes.COLORS.textPrimary,
        fontSize: '14@ms0.3',
        lineHeight: '21@vs',
    },
});

export default memo(StyledText);
