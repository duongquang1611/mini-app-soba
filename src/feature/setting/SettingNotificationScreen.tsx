import StyledHeader from 'components/common/StyledHeader';
import React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

const SettingNotificationScreen = () => {
    return (
        <View style={styles.container}>
            <StyledHeader title={'Setting Notification'} />
            <View style={styles.body} />
        </View>
    );
};

export default SettingNotificationScreen;

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
    buttonSave: {},
});
