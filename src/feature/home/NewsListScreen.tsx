import React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import StyledHeader from 'components/common/StyledHeader';
import { Themes } from 'assets/themes';
import { listNews } from 'utilities/staticData';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';
import { StyledText } from 'components/base';
import { ListNewsItem } from './HomeScreen';

const NewsListScreen = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView enableOnAndroid={true} showsVerticalScrollIndicator={false}>
                <StyledHeader title={'news'} />
                <View style={styles.body}>
                    {listNews.map((news, index) => (
                        <ListNewsItem key={index} data={news} navigation={navigation} />
                    ))}
                </View>
            </KeyboardAwareScrollView>
        </View>
    );
};

export default NewsListScreen;

const styles = ScaledSheet.create({
    container: {
        flex: 1,
    },
    body: {
        flex: 1,

        backgroundColor: Themes.COLORS.lightGray,
    },
    buttonSave: {},
    notificationItem: {
        width: '100%',
        backgroundColor: Themes.COLORS.white,
        marginVertical: '2@vs',
        paddingHorizontal: '20@s',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: '10@vs',
    },
    notificationImage: {
        width: '60@s',
        height: '60@s',
    },
    contentText: {
        width: '60%',
    },
});
