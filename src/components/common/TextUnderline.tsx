import { Themes } from 'assets/themes';
import { StyledText, StyledTouchable } from 'components/base';
import React from 'react';
import { ScaledSheet } from 'react-native-size-matters';

const TextUnderline = ({
    customStyle,
    onPress,
    title,
    customStyleText,
    disabled,
    color = Themes.COLORS.mineShaft,
}: any) => {
    return (
        <StyledTouchable
            onPress={onPress}
            customStyle={[styles.wrapTitle, { borderColor: color }, customStyle]}
            disabled={!onPress || disabled}
        >
            <StyledText customStyle={[styles.title, { color }, customStyleText]} i18nText={title} />
        </StyledTouchable>
    );
};

const styles = ScaledSheet.create({
    wrapTitle: {
        alignSelf: 'center',
        borderBottomWidth: 0.5,
        borderColor: Themes.COLORS.mineShaft,
    },
    title: {
        color: Themes.COLORS.mineShaft,
        textAlign: 'center',
        fontSize: '12@ms0.3',
        lineHeight: '18@vs',
    },
});

export default TextUnderline;
