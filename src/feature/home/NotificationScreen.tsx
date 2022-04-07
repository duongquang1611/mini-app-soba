import { getNotificationList } from 'api/modules/api-app/notification';
import Images from 'assets/images';
import { Themes } from 'assets/themes';
import { StyledIcon, StyledText } from 'components/base';
import AlertMessage from 'components/base/AlertMessage';
import StyledKeyboardAware from 'components/base/StyledKeyboardAware';
import StyledHeader from 'components/common/StyledHeader';
import { HOME_ROUTE } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ScaledSheet } from 'react-native-size-matters';
import { logger } from 'utilities/helper';

const NotificationItem = (props: any) => {
    const { item } = props;
    return (
        <TouchableOpacity
            style={styles.notificationItem}
            onPress={() => navigate(HOME_ROUTE.NOTIFICATION_DETAIL, { id: item?.id })}
        >
            <StyledIcon source={getIcon(item?.img)} size={30} customStyle={styles.notificationImage} />
            <View style={styles.contentText}>
                <StyledText originValue={item.content} customStyle={styles.content} />
                <StyledText originValue={item.time} customStyle={styles.time} />
            </View>
        </TouchableOpacity>
    );
};

const getIcon = (key: string) => {
    switch (key) {
        case 'promotion':
            return Images.icons.promotion;
        case 'coupon':
            return Images.icons.coupon;
        case 'stampCard':
            return Images.icons.stamp_card;
        case 'other':
            return Images.icons.shop;
        default:
            return Images.icons.promotion;
    }
};
const NotificationScreen = () => {
    const [listNoti, setListNoti] = useState([]);
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
    return (
        <View style={styles.container}>
            <StyledHeader title={'notification.notificationTiTle'} textRight={'notification.readAllNotification'} />
            <StyledKeyboardAware>
                <View style={styles.body}>
                    {listNoti?.map((item, index) => (
                        <NotificationItem key={index} item={item} />
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
        marginVertical: '2@vs',
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
