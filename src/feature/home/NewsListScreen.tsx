import { getNewsList } from 'api/modules/api-app/home';
import { Themes } from 'assets/themes';
import { StyledList } from 'components/base';
import DashView from 'components/common/DashView';
import StyledHeader from 'components/common/StyledHeader';
import usePaging from 'hooks/usePaging';
import React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import ListNewsItem from './components/ListNewsItem';

const NewsListScreen = () => {
    const { pagingData, onRefresh, onLoadMore } = usePaging(getNewsList);
    const { list, refreshing } = pagingData;
    const renderItemNews = ({ item }: any) => {
        return <ListNewsItem data={item} />;
    };
    return (
        <>
            <StyledHeader title={'home.newsTitle'} />
            <View style={styles.grayView} />
            <View style={styles.container}>
                <StyledList
                    data={list}
                    renderItem={renderItemNews}
                    ItemSeparatorComponent={DashView}
                    ListFooterComponent={DashView}
                    customStyle={styles.body}
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    noDataText={'home.newsNoData'}
                    onEndReached={onLoadMore}
                />
            </View>
        </>
    );
};

export default NewsListScreen;

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: Themes.COLORS.white,
    },
    body: {
        flexGrow: 1,
        paddingBottom: '20@vs',
    },
    grayView: {
        height: '10@vs',
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
