import { StyledButton } from 'components/base';
import StyledHeader from 'components/common/StyledHeader';
import React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

const ContactScreen = () => {
    const contact = () => {
        console.log('contact');
    };
    return (
        <View style={styles.container}>
            <StyledHeader title={'Contact'} />
            <View style={styles.body}>
                <StyledButton title={'Contact us'} onPress={contact} customStyle={styles.buttonSave} />
            </View>
        </View>
    );
};

export default ContactScreen;

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
