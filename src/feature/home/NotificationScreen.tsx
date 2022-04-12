import { getNotificationList, readAllNotification } from 'api/modules/api-app/notification';
import Images from 'assets/images';
import { Themes } from 'assets/themes';
import { StyledIcon, StyledText } from 'components/base';
import AlertMessage from 'components/base/AlertMessage';
import StyledKeyboardAware from 'components/base/StyledKeyboardAware';
import DashView from 'components/common/DashView';
import StyledHeader from 'components/common/StyledHeader';
import { HOME_ROUTE, SETTING_ROUTE } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ScaledSheet } from 'react-native-size-matters';
import { logger } from 'utilities/helper';
import { categoryNotification, NotificationCategory, statusReadNotification } from 'utilities/staticData';

const NotificationItem = (props: any) => {
    const { item, read } = props;
    const { id, content, isRead, receivedDate, category } = item;
    const [readItem, setReadItem] = useState(read);
    const goToHistoryOrder = () => {
        setReadItem(true);
        navigate(SETTING_ROUTE.ORDER_HISTORY);
    };
    const goToDetail = () => {
        setReadItem(true);
        navigate(HOME_ROUTE.NOTIFICATION_DETAIL, { id });
    };
    return (
        <>
            <TouchableOpacity
                style={[
                    styles.notificationItem,
                    {
                        backgroundColor:
                            isRead === statusReadNotification.READ || readItem
                                ? Themes.COLORS.white
                                : Themes.COLORS.readNotificationBackground,
                    },
                ]}
                onPress={() => (category === categoryNotification.ORDER_HISTORY ? goToHistoryOrder() : goToDetail())}
            >
                <StyledIcon source={getIcon(category)} size={30} customStyle={styles.notificationImage} />
                <View style={styles.contentText}>
                    <StyledText originValue={content} customStyle={styles.content} />
                    <StyledText originValue={receivedDate} customStyle={styles.time} />
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
    const [listNoti, setListNoti] = useState([]);
    const [read, setRead] = useState(false);
    useEffect(() => {
        getNotification();
    }, []);
    const getNotification = async () => {
        try {
            const res = await getNotificationList();
            setListNoti(res?.data);
        } catch (error) {
            logger(error);
            AlertMessage(error);
        }
    };
    const readNotification = async () => {
        try {
            await readAllNotification();
            setRead(true);
        } catch (error) {
            logger(error);
            AlertMessage(error);
        }
    };
    return (
        <View style={styles.container}>
            <StyledHeader
                title={'notification.notificationTiTle'}
                textRight={'notification.readAllNotification'}
                onPressRight={readNotification}
            />
            <StyledKeyboardAware>
                <View style={styles.body}>
                    {listNoti?.map((item, index) => (
                        <NotificationItem key={index} item={item} read={read} />
                    ))}
                </View>
            </StyledKeyboardAware>
        </View>
    );
};

export default NotificationScreen;

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
