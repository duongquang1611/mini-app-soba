import { Themes } from 'assets/themes';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

const LinearView = ({ children, colors = Themes.COLORS.defaultLinear, ...otherProps }: any) => {
    return (
        <LinearGradient
            colors={colors}
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
