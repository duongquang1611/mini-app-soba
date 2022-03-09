import { getStampList } from 'api/modules/api-app/stamp';
import Images from 'assets/images';
import { Themes } from 'assets/themes';
import { StyledIcon, StyledList, StyledText, StyledTouchable } from 'components/base';
import DashView from 'components/common/DashView';
import LinearView from 'components/common/LinearView';
import usePaging from 'hooks/usePaging';
import { STAMP_ROUTE } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { STAMP_DATA } from 'utilities/staticData';
import StampItem from './components/StampItem';

interface StampListProps {
    canUse?: boolean;
    showEarnStamp?: any;
}

const StampList = (props: StampListProps) => {
    const { canUse = false, showEarnStamp } = props;
    const { pagingData, onRefresh } = usePaging(getStampList, {
        type: Number(canUse),
    });
    const { list, refreshing } = pagingData;

    const goToDetail = (item: any) => {
        navigate(STAMP_ROUTE.STAMP_CARD_DETAIL, { item });
    };

    const renderItemStamp = ({ item }: any) => {
        return <StampItem item={item} onPress={() => goToDetail(item)} />;
    };
    return (
        <View style={styles.container}>
            {canUse ? (
                <>
                    <StyledTouchable onPress={showEarnStamp}>
                        <LinearView style={styles.wrapNote}>
                            <StyledIcon source={Images.icons.message} size={20} />
                            <StyledText i18nText={'stamp.noteUse'} customStyle={styles.noteUse} />
                        </LinearView>
                    </StyledTouchable>
                </>
            ) : null}
            <StyledList
                data={(list.length > 0 ? list : STAMP_DATA).filter((item: any) => item.used === !canUse)}
                renderItem={renderItemStamp}
                ItemSeparatorComponent={DashView}
                customStyle={styles.listStamp}
                refreshing={refreshing}
                onRefresh={onRefresh}
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
        paddingVertical: '4@vs',
        alignItems: 'center',
        paddingHorizontal: '42@s',
    },
    listStamp: {
        marginTop: '5@vs',
        backgroundColor: Themes.COLORS.white,
        flexGrow: 1,
    },
});
export default StampList;
