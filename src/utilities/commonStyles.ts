import { Themes } from 'assets/themes';
import { Platform } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

export const commonStyles = ScaledSheet.create({
    shadow: {
        ...Platform.select({
            ios: {
                shadowColor: Themes.COLORS.black,
                shadowOffset: {
                    width: 0,
                    height: 0,
                },
                shadowOpacity: 0.1,
                shadowRadius: 2,
            },
            android: {
                elevation: 2,
                shadowColor: Themes.COLORS.black,
            },
        }),
    },
    nonShadow: {
        ...Platform.select({
            ios: {
                shadowColor: Themes.COLORS.transparent,
                shadowOpacity: 0,
            },
            android: {
                elevation: 0,
            },
        }),
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomView: {
        width: '100%',
        height: '30@vs',
    },
    separatorBottom: {
        height: '5@vs',
        width: '100%',
        backgroundColor: Themes.COLORS.backgroundPrimary,
    },
});
