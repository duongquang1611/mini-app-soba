import { Themes } from 'assets/themes';
import React from 'react';
import { Animated, StyleProp, ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { scale, ScaledSheet } from 'react-native-size-matters';

interface Props {
    enable: boolean;
    customStyle?: StyleProp<ViewStyle>;
    onPress?: any;
    setEnable?(isTest: boolean): void;
}
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const StyledSwitch = (props: Props) => {
    const { enable, customStyle, onPress, setEnable } = props;
    const animateSwitchOff = new Animated.Value(0);
    const animateSwitchOn = new Animated.Value(scale(26));

    const onSwitch = () => {
        Animated.timing(animateSwitchOff, {
            toValue: scale(26),
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            setEnable?.(true);
            onPress?.(true);
        });
    };

    const offSwitch = () => {
        Animated.timing(animateSwitchOn, {
            toValue: -scale(26),
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            setEnable?.(false);
            onPress?.(false);
        });
    };

    return (
        <Animated.View
            style={[
                {
                    backgroundColor: enable ? Themes.COLORS.seaGreen : Themes.COLORS.silver,
                },
                styles.container,
                customStyle,
            ]}
        >
            <AnimatedTouchable
                onPress={enable ? offSwitch : onSwitch}
                style={[
                    styles.round,
                    {
                        transform: [{ translateX: enable ? animateSwitchOn : animateSwitchOff }],
                    },
                ]}
            />
        </Animated.View>
    );
};
const styles = ScaledSheet.create({
    container: {
        height: '28@s',
        width: '55@s',
        borderRadius: '55@s',
        justifyContent: 'center',
        paddingHorizontal: '1@s',
        paddingVertical: '1@s',
    },
    round: {
        height: '26@s',
        width: '26@s',
        borderRadius: '26@s',
        backgroundColor: Themes.COLORS.white,
    },
});

export default StyledSwitch;
