import { StyledButton } from 'components/base';
import StyledHeader from 'components/common/StyledHeader';
import { TAB_NAVIGATION_ROOT } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

const ExchangeStampScreen = () => {
    const onPress = () => {
        navigate(TAB_NAVIGATION_ROOT.STAMP_ROUTE.NEW_STAMP);
    };
    return (
        <View style={styles.container}>
            <StyledHeader title={'Exchange Stamp'} />
            <View style={styles.body}>
                <StyledButton title={'newStamp'} onPress={onPress} />
            </View>
        </View>
    );
};

export default ExchangeStampScreen;

const styles = ScaledSheet.create({
    container: {
        flex: 1,
    },
    body: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        marginHorizontal: '20@s',
    },
});
