import { Themes } from 'assets/themes';
import { StyledIcon, StyledText } from 'components/base';
import DashView from 'components/common/DashView';
import { HOME_ROUTE } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { formatDate } from 'utilities/format';

const ListNewsItem = (props: any) => {
    const { data } = props || {};
    const { id, thumbnail, title, description, publishDate } = data;
    return (
        <View>
            <TouchableOpacity style={styles.listNewsView} onPress={() => navigate(HOME_ROUTE.NEW_DETAIL, { id })}>
                <StyledIcon source={{ uri: thumbnail }} size={70} />
                <View style={styles.newsTextView}>
                    <StyledText originValue={title} customStyle={styles.titleNew} numberOfLines={1} />
                    <StyledText originValue={description} isBlack customStyle={styles.contentNew} numberOfLines={2} />
                    <StyledText originValue={formatDate(publishDate)} customStyle={styles.time} />
                </View>
            </TouchableOpacity>
            <DashView />
        </View>
    );
};

export default ListNewsItem;

const styles = ScaledSheet.create({
    listNewsView: {
        width: '100%',
        paddingVertical: '10@vs',
        paddingHorizontal: '20@s',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: Themes.COLORS.white,
        flex: 1,
    },
    newsTextView: {
        flexShrink: 1,
        marginLeft: '10@s',
    },
    titleNew: {
        fontSize: '16@ms0.3',
        fontWeight: 'bold',
        marginBottom: '5@vs',
    },
    contentNew: {
        marginVertical: '5@vs',
    },
    time: {
        color: Themes.COLORS.silver,
        fontSize: '12@ms0.3',
    },
});
