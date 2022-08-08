import { getListHistoryOrder } from 'api/modules/api-app/order';
import Images from 'assets/images';
import { Themes } from 'assets/themes';
import { StyledIcon, StyledList, StyledText, StyledTouchable } from 'components/base';
import DashView from 'components/common/DashView';
import StyledHeader from 'components/common/StyledHeader';
import usePaging from 'hooks/usePaging';
import { SETTING_ROUTE } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { formatDate, YMDHm } from 'utilities/format';
import { numberWithCommas } from 'utilities/helper';

const OrderItem = ({ item }: any) => {
    const { title, createdDate, amount, totalPaid, id, restaurant } = item || {};
    return (
        <StyledTouchable
            customStyle={styles.orderItem}
            onPress={() => navigate(SETTING_ROUTE.ORDER_HISTORY_DETAIL, { id })}
        >
            <View style={styles.nameOrderRow}>
                <StyledIcon source={Images.icons.order} size={25} />
                <View style={styles.viewInfo}>
                    <StyledText
                        i18nParams={{ amount, title }}
                        i18nText={'order.rangeHistoryTitleItem'}
                        customStyle={styles.contentText}
                        numberOfLines={1}
                    />
                    <StyledText
                        i18nText={'setting.rangeRestaurant'}
                        i18nParams={{ restaurant: restaurant?.name }}
                        customStyle={styles.restaurant}
                    />
                    <StyledText originValue={formatDate(createdDate, YMDHm)} customStyle={styles.time} />
                    <View style={styles.priceRow}>
                        <StyledText
                            i18nParams={{ totalPaid: numberWithCommas(totalPaid) }}
                            i18nText={'order.rangeTimeHistoryOrder'}
                            customStyle={styles.price}
                        />
                    </View>
                </View>
            </View>
        </StyledTouchable>
    );
};
const renderItemHistory = ({ item }: any) => <OrderItem key={item.id} item={item} />;

const OrderHistoryScreen = () => {
    const { pagingData, onRefresh, onLoadMore } = usePaging(getListHistoryOrder);
    const { list, refreshing } = pagingData;
    return (
        <>
            <StyledHeader title={'setting.orderHistoryTitle'} />

            <View style={styles.container}>
                <View style={styles.grayView} />
                <StyledList
                    data={list}
                    renderItem={renderItemHistory}
                    ItemSeparatorComponent={DashView}
                    ListFooterComponent={DashView}
                    customStyle={styles.body}
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    noDataText={'order.noDataOrderHistory'}
                    onEndReached={onLoadMore}
                />
            </View>
        </>
    );
};

export default OrderHistoryScreen;

const styles = ScaledSheet.create({
    container: {
        flex: 1,
    },
    body: {
        flexGrow: 1,
        paddingBottom: '20@vs',
    },
    buttonSave: {},
    orderItem: {
        width: '100%',
        backgroundColor: Themes.COLORS.white,
        paddingHorizontal: '20@s',
        paddingVertical: '10@vs',
    },
    nameOrderRow: {
        flexDirection: 'row',
        width: '100%',
        flex: 1,
    },
    notificationImage: {
        width: '60@s',
        height: '60@s',
    },
    contentText: {
        color: Themes.COLORS.secondary,
        fontWeight: 'bold',
    },
    viewInfo: {
        flexShrink: 1,
        paddingLeft: '10@s',
    },
    time: {
        color: Themes.COLORS.silver,
        marginVertical: '10@vs',
        fontSize: '14@ms0.3',
    },
    restaurant: {
        color: Themes.COLORS.silver,
        marginTop: '10@vs',
        fontSize: '14@ms0.3',
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    price: {
        fontWeight: 'bold',
        color: Themes.COLORS.primary,
    },
    grayView: {
        height: '10@vs',
        backgroundColor: Themes.COLORS.lightGray,
    },
});
