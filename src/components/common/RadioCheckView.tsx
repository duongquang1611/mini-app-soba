import { Themes } from 'assets/themes';
import React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

const RadioCheckView = ({ check, customStyle }: any) => {
    return (
        <View
            style={[
                styles.container,
                {
                    borderColor: check ? Themes.COLORS.borderCheckbox : Themes.COLORS.silver,
                    backgroundColor: check ? Themes.COLORS.primary : Themes.COLORS.transparent,
                },
                customStyle,
            ]}
        />
    );
};

const styles = ScaledSheet.create({
    container: {
        width: '20@s',
        height: '20@s',
        borderRadius: 100,
        overflow: 'hidden',
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default RadioCheckView;
