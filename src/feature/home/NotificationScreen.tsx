import { getNotificationList, readAllNotification } from 'api/modules/api-app/notification';
import { updateNotificationUnRead } from 'app-redux/slices/globalDataSlice';
import Images from 'assets/images';
import { Themes } from 'assets/themes';
import { StyledIcon, StyledList, StyledText } from 'components/base';
import AlertMessage from 'components/base/AlertMessage';
import DashView from 'components/common/DashView';
import StyledHeader from 'components/common/StyledHeader';
import usePaging from 'hooks/usePaging';
import { HOME_ROUTE, SETTING_ROUTE } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ScaledSheet } from 'react-native-size-matters';
import { useDispatch } from 'react-redux';
import { formatDate } from 'utilities/format';
import { categoryNotification, NotificationCategory, statusReadNotification } from 'utilities/staticData';

const NotificationItem = (props: any) => {
    const { item, read } = props;
    const { id, content, isRead, receivedDate, category, title } = item;
    const [readItem, setReadItem] = useState(false);
    const goToHistoryOrder = () => {
        setReadItem(true);
        navigate(SETTING_ROUTE.ORDER_HISTORY);
    };
    const goToDetail = () => {
        setReadItem(true);
        navigate(HOME_ROUTE.NOTIFICATION_DETAIL, { id });
    };
    const getTitleItem = () => {
        if (category === NotificationCategory.CANCEL_PAYMENT || category === NotificationCategory.SUCCESS_PAYMENT)
            return content || '';
        return title || '';
    };
    return (
        <>
            <TouchableOpacity
                style={[
                    styles.notificationItem,
                    {
                        backgroundColor:
                            isRead === statusReadNotification.READ || read || readItem
                                ? Themes.COLORS.white
                                : Themes.COLORS.readNotificationBackground,
                    },
                ]}
                onPress={() => (category === categoryNotification.ORDER_HISTORY ? goToHistoryOrder() : goToDetail())}
            >
                <StyledIcon source={getIcon(category)} size={30} customStyle={styles.notificationImage} />
                <View style={styles.contentText}>
                    <StyledText originValue={getTitleItem()} customStyle={styles.content} />
                    <StyledText originValue={formatDate(receivedDate)} customStyle={styles.time} />
                </View>
            </TouchableOpacity>
            <DashView />
        </>
    );
};

const getIcon = (category: any) => {
    switch (category) {
        case NotificationCategory.PROMOTION:
            return Images.icons.promotion;
        case NotificationCategory.COUPON:
            return Images.icons.coupon;
        case NotificationCategory.STAMP:
            return Images.icons.stamp_card;
        case NotificationCategory.OTHER:
            return Images.icons.shop;
        case NotificationCategory.SUCCESS_PAYMENT:
            return Images.icons.shop;
        default:
            return Images.icons.shop;
    }
};
const NotificationScreen = () => {
    const [read, setRead] = useState(false);
    const { pagingData, onRefresh, onLoadMore } = usePaging(getNotificationList, {}, 'notifications');
    const { list, refreshing } = pagingData;
    const { notifications = [], totalUnread = {} } = list;
    useEffect(() => {
        dispatch(updateNotificationUnRead(totalUnread));
    }, [totalUnread]);
    const dispatch = useDispatch();
    const readNotification = async () => {
        try {
            await readAllNotification();
            dispatch(updateNotificationUnRead(0));
            setRead(true);
        } catch (error) {
            console.log('readNotification -> error', error);
            AlertMessage(error);
        }
    };
    const renderItemNoti = ({ item }: any) => {
        return <NotificationItem item={item} read={read} />;
    };
    return (
        <View style={styles.container}>
            <StyledHeader
                title={'notification.notificationTiTle'}
                textRight={'notification.readAllNotification'}
                onPressRight={readNotification}
            />
            <View style={styles.grayView} />
            <StyledList
                data={notifications}
                renderItem={renderItemNoti}
                ItemSeparatorComponent={DashView}
                ListFooterComponent={DashView}
                customStyle={styles.body}
                refreshing={refreshing}
                onRefresh={onRefresh}
                noDataText={'stamp.noData'}
                onEndReached={onLoadMore}
            />
        </View>
    );
};

export default NotificationScreen;

const styles = ScaledSheet.create({
    container: {
        flex: 1,
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
        paddingHorizontal: '20@s',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: '10@vs',
        alignItems: 'center',
    },
    notificationImage: {},
    contentText: {
        width: '85%',
    },
    time: {
        color: Themes.COLORS.silver,
    },
    content: {
        fontWeight: 'bold',
        marginBottom: '10@vs',
    },
});
