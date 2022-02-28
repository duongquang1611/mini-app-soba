import { Themes } from 'assets/themes';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

const colorsDisabled = [Themes.COLORS.disabled, Themes.COLORS.disabled];

const LinearView = ({ children, colors = Themes.COLORS.defaultLinear, disabled = false, ...otherProps }: any) => {
    return (
        <LinearGradient
            colors={disabled ? colorsDisabled : colors}
            start={{ x: 0.0, y: 0.5 }}
            end={{ x: 1, y: 1 }}
            useAngle={true}
            angle={90}
            angleCenter={{ x: 0.7, y: 0.7 }}
            {...otherProps}
        >
            {children}
        </LinearGradient>
    );
};

export default LinearView;
