import { useNavigation } from '@react-navigation/native';
import Images from 'assets/images';
import { Themes } from 'assets/themes';
import { StyledIcon, StyledText } from 'components/base';
import StyledHeader from 'components/common/StyledHeader';
import { TAB_NAVIGATION_ROOT } from 'navigation/config/routes';
import React from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ScaledSheet } from 'react-native-size-matters';
import { notificationListFake } from 'utilities/staticData';

const NotificationItem = (item: any) => {
    return (
        <TouchableOpacity
            style={styles.notificationItem}
            onPress={() => item?.navigation.navigate(TAB_NAVIGATION_ROOT.HOME_ROUTE.NOTIFICATION_DETAIL)}
        >
            <StyledIcon source={getIcon(item.item?.img)} size={30} customStyle={styles.notificationImage} />
            <View style={styles.contentText}>
                <StyledText originValue={item.item.content} customStyle={styles.content} />
                <StyledText originValue={item.item.time} customStyle={styles.time} />
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
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <StyledHeader title={'通知一覧 '} textRight="すべて既読" />
            <KeyboardAwareScrollView enableOnAndroid={true} showsVerticalScrollIndicator={false}>
                <View style={styles.body}>
                    {notificationListFake?.map((item) => (
                        <NotificationItem key={item.id} item={item} navigation={navigation} />
                    ))}
                </View>
            </KeyboardAwareScrollView>
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
