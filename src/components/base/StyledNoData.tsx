import Images from 'assets/images';
import { Themes } from 'assets/themes';
import React, { FunctionComponent } from 'react';
import { ActivityIndicator, StyleProp, TextStyle, View, ViewStyle } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import StyledIcon from './StyledIcon';
import StyledText from './StyledText';
import StyledTouchable from './StyledTouchable';

interface StyledListNoDataProps {
    text?: string;
    canRefresh?: boolean;
    loading?: boolean;
    onRefresh?(): any;
    customStyle?: StyleProp<ViewStyle>;
    customStyleText?: StyleProp<TextStyle>;
}

const NO_DATA_TEXT = 'No data';
const RELOAD = 'Reload';

const StyledNoData: FunctionComponent<StyledListNoDataProps> = (props: StyledListNoDataProps) => {
    const { loading, customStyle, text = NO_DATA_TEXT, canRefresh, customStyleText, onRefresh } = props;

    return (
        <View style={[styles.container, customStyle]}>
            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator />
                </View>
            ) : (
                <>
                    <StyledIcon size={50} source={Images.icons.noData} customStyle={styles.iconNoData} />
                    <StyledText i18nText={text} customStyle={[styles.textNoData, customStyleText]} />
                </>
            )}
            {!!canRefresh && !loading ? (
                <StyledTouchable onPress={onRefresh}>
                    <StyledText i18nText={RELOAD} customStyle={styles.textReload} />
                </StyledTouchable>
            ) : (
                <View />
            )}
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    textNoData: {
        fontSize: '16@ms0.3',
        color: Themes.COLORS.silver,
        textAlign: 'center',
    },
    textReload: {
        margin: '12@s',
        color: Themes.COLORS.primary,
    },
    loadingContainer: {
        alignItems: 'center',
    },
    iconNoData: {
        marginBottom: '20@vs',
    },
});

export default StyledNoData;
