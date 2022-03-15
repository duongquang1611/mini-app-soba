import { Themes } from 'assets/themes';
import React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

const RadioCheckView = ({ check, customStyle, customContentStyle }: any) => {
    return (
        <View
            style={[
                styles.container,
                { borderColor: check ? Themes.COLORS.opacityPrimary(0.4) : Themes.COLORS.silver },
                customStyle,
            ]}
        >
            <View
                style={[
                    styles.content,
                    { backgroundColor: check ? Themes.COLORS.primary : Themes.COLORS.transparent },
                    customContentStyle,
                ]}
            />
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        width: '20@s',
        height: '20@s',
        borderRadius: 100,
        overflow: 'hidden',
        borderWidth: 1.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        width: '100%',
        height: '100%',
        borderRadius: 50,
    },
});

export default RadioCheckView;
