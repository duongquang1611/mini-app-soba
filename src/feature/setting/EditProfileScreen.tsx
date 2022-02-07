import { StyledButton } from 'components/base';
import StyledHeader from 'components/common/StyledHeader';
import React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

const EditProfileScreen = () => {
    const editProfile = () => {
        console.log('edit');
    };
    const cancel = () => {
        console.log('cancel');
    };
    return (
        <View style={styles.container}>
            <StyledHeader title={'EditProfile'} />
            <View style={styles.body}>
                <StyledButton title={'editProfile'} onPress={editProfile} customStyle={styles.buttonSave} />
                <StyledButton title={'cancel'} onPress={cancel} customStyle={styles.buttonSave} />
            </View>
        </View>
    );
};

export default EditProfileScreen;

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
