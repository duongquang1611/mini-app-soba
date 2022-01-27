import StyledHeader from 'components/common/StyledHeader';
import React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

const NewStampScreen = () => {
    return (
        <View style={styles.container}>
            <StyledHeader title={'new year stamp'} />
            <></>
        </View>
    );
};
const styles = ScaledSheet.create({
    container: {
        flex: 1,
    },
});
export default NewStampScreen;
