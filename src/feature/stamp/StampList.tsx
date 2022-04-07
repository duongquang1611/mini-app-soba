import { getStampList } from 'api/modules/api-app/stamp';
import Images from 'assets/images';
import { Themes } from 'assets/themes';
import { StyledIcon, StyledList, StyledText, StyledTouchable } from 'components/base';
import DashView from 'components/common/DashView';
import LinearView from 'components/common/LinearView';
import usePaging, { SIZE_LIMIT } from 'hooks/usePaging';
import { STAMP_ROUTE } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import StampItem from './components/StampItem';

interface StampListProps {
    canUse?: boolean;
    showEarnStamp?: any;
}

const StampList = (props: StampListProps) => {
    const { canUse = false, showEarnStamp } = props;
    const { pagingData, onRefresh, onLoadMore } = usePaging(
        getStampList,
        {
            status: Number(canUse),
            take: SIZE_LIMIT,
        },
        'stamps',
    );
    const { list, refreshing } = pagingData;
    const { stamps = [], untickedStamps = {} } = list;
    const { untickStampsAmount = 0 } = untickedStamps;

    const goToDetail = (item: any) => {
        navigate(STAMP_ROUTE.STAMP_CARD_DETAIL, { item });
    };

    const renderItemStamp = ({ item }: any) => {
        return <StampItem item={item} onPress={() => goToDetail(item)} isBottomTab={true} />;
    };

    return (
        <View style={styles.container}>
            {untickStampsAmount ? (
                <>
                    <StyledTouchable onPress={showEarnStamp}>
                        <LinearView style={styles.wrapNote}>
                            <StyledIcon source={Images.icons.message} size={20} />
                            <StyledText
                                i18nText={'stamp.noteUse'}
                                i18nParams={{ count: untickStampsAmount }}
                                customStyle={styles.noteUse}
                            />
                        </LinearView>
                    </StyledTouchable>
                </>
            ) : null}
            <StyledList
                data={stamps}
                renderItem={renderItemStamp}
                ItemSeparatorComponent={DashView}
                ListFooterComponent={DashView}
                customStyle={styles.listStamp}
                refreshing={refreshing}
                onRefresh={onRefresh}
                noDataText={'stamp.noData'}
                onEndReached={onLoadMore}
            />
        </View>
    );
};
const styles = ScaledSheet.create({
    container: {
        flex: 1,
    },
    noteUse: {
        color: Themes.COLORS.lightGray,
        marginLeft: '11@s',
        lineHeight: '20@vs',
    },
    wrapNote: {
        flexDirection: 'row',
        paddingVertical: '6@vs',
        alignItems: 'center',
        paddingHorizontal: '42@s',
    },
    listStamp: {
        marginTop: '5@vs',
        backgroundColor: Themes.COLORS.white,
        flexGrow: 1,
        paddingBottom: '20@vs',
    },
});
export default StampList;
