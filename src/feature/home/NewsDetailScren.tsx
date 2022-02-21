import { StyledButton, StyledText } from 'components/base';
import { AUTHENTICATE_ROUTE } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import StyledHeader from 'components/common/StyledHeader';
import StyledHeaderImage from 'components/common/StyledHeaderImage';
import Images from 'assets/images';
import { imagesList } from 'utilities/staticData';
import { Themes } from 'assets/themes';

const NewsDetailScreen = () => {
    const confirm = () => {};
    return (
        <View style={styles.container}>
            {/* <StyledHeader title={'new detail'} /> */}
            <StyledHeaderImage images={imagesList} />
            <View style={styles.body}>
                <StyledText customStyle={styles.time} originValue={'2021年11月2日'} />
                <StyledText originValue={'content'} />
            </View>
        </View>
    );
};

export default NewsDetailScreen;

const styles = ScaledSheet.create({
    container: {
        flex: 1,
    },
    body: {
        flex: 1,
        marginHorizontal: '20@s',
    },
    buttonSave: {},
    time: {
        color: Themes.COLORS.silver,
        marginBottom: '10@vs',
    },
});
