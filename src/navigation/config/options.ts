import { Themes } from 'assets/themes';
import { CardStyleInterpolators } from '@react-navigation/stack';
import transition from './transition';

const navigationConfigs = {
    cardStyle: {
        backgroundColor: Themes.COLORS.white,
    },
    headerShown: false,
    gestureEnabled: false,
    // gestureDirection: 'default',
    cardShadowEnabled: true,
    cardOverlayEnabled: true,
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    transitionSpec: {
        open: transition,
        close: transition,
    },
};

export default navigationConfigs;
