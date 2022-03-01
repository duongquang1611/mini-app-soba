import Metrics from 'assets/metrics';
import { Themes } from 'assets/themes';
import React, { memo } from 'react';
import Dash from 'react-native-dash';
import { ScaledSheet } from 'react-native-size-matters';

const DashView = (props: any) => {
    const { customStyle } = props;
    return (
        <Dash
            style={[styles.container, customStyle]}
            dashGap={2}
            dashLength={2}
            dashThickness={1}
            dashColor={Themes.COLORS.disabled}
        />
    );
};

const styles = ScaledSheet.create({
    container: {
        width: Metrics.screenWidth,
        height: 1,
    },
});

export default memo(DashView);
