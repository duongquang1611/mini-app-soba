/* eslint-disable @typescript-eslint/no-unused-vars */
import { getNewsDetail } from 'api/modules/api-app/home';
import { Themes } from 'assets/themes';
import { StyledText } from 'components/base';
import AlertMessage from 'components/base/AlertMessage';
import StyledKeyboardAware from 'components/base/StyledKeyboardAware';
import StyledHeaderImage from 'components/common/StyledHeaderImage';
import React, { useEffect, useState } from 'react';
import { RefreshControl, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { formatDate } from 'utilities/format';
import { logger } from 'utilities/helper';

const NewsDetailScreen = (props: any) => {
    const { id } = props?.route?.params;
    console.log({ id });
    const [news, setNews] = useState<any>({});
    console.log({ news });
    const { images, title, publishDate, description } = news || {};
    const [refreshing, setRefreshing] = useState(false);
    useEffect(() => {
        getNews();
    }, []);
    const getNews = async () => {
        try {
            const res = await getNewsDetail(id);
            setNews(res?.data);
        } catch (error) {
            logger(error);
            AlertMessage(error);
        }
    };
    const handleRefresh = async () => {
        try {
            setRefreshing(true);
            await getNews();
        } catch (error) {
            console.log(error);
        } finally {
            setRefreshing(false);
        }
    };

    return (
        <View style={styles.container}>
            <StyledKeyboardAware
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        colors={[Themes.COLORS.primary]}
                        tintColor={Themes.COLORS.primary}
                        onRefresh={handleRefresh}
                    />
                }
            >
                <StyledHeaderImage images={images || []} content={title} />
                <View style={styles.grayView} />
                <View style={styles.body}>
                    <StyledText originValue={formatDate(publishDate)} customStyle={styles.time} />
                    <StyledText originValue={description} isBlack />
                </View>
            </StyledKeyboardAware>
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
        paddingHorizontal: '20@s',
        paddingVertical: '20@vs',
    },
    buttonSave: {},
    time: {
        color: Themes.COLORS.silver,
        marginBottom: '10@vs',
    },
    grayView: {
        height: '10@vs',
        backgroundColor: Themes.COLORS.lightGray,
    },
});
