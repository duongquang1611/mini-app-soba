import { useNavigation } from '@react-navigation/native';
import { Themes } from 'assets/themes';
import StyledKeyboardAware from 'components/base/StyledKeyboardAware';
import StyledHeader from 'components/common/StyledHeader';
import React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { ListNewsItem } from './HomeScreen';

const NewsListScreen = (props: any) => {
    const { listNews } = props?.route?.params;
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <StyledKeyboardAware>
                <StyledHeader title={'ニュース一覧'} />
                <View style={styles.body}>
                    {listNews.map((news: any, index: number) => (
                        <ListNewsItem key={index} data={news} navigation={navigation} />
                    ))}
                </View>
            </StyledKeyboardAware>
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
