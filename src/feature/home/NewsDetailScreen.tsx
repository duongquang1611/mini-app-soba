/* eslint-disable @typescript-eslint/no-unused-vars */
import { Themes } from 'assets/themes';
import { StyledText } from 'components/base';
import StyledHeaderImage from 'components/common/StyledHeaderImage';
import React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { imagesList } from 'utilities/staticData';

const NewsDetailScreen = () => {
    const confirm = () => null;
    return (
        <View style={styles.container}>
            <StyledHeaderImage images={imagesList} content={'士たげぎ究品きト掲応'} />
            <View style={styles.body}>
                <StyledText customStyle={styles.time} originValue={'2021年11月2日'} />
                <StyledText originValue={'content'} isBlack />
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
