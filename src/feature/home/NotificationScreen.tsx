import React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import StyledHeader from 'components/common/StyledHeader';
import { Themes } from 'assets/themes';
import { StyledImage, StyledText } from 'components/base';
import { notificationListFake } from 'utilities/staticData';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TAB_NAVIGATION_ROOT } from 'navigation/config/routes';
import { useNavigation } from '@react-navigation/native';

const NotificationItem = (item: any) => {
    return (
        <TouchableOpacity
            style={styles.notificationItem}
            onPress={() => item?.navigation.navigate(TAB_NAVIGATION_ROOT.HOME_ROUTE.NOTIFICATION_DETAIL)}
        >
            <StyledImage source={{ uri: item.item?.img }} customStyle={styles.notificationImage} />
            <StyledText originValue={item.item.content} customStyle={styles.contentText} />
            <StyledText originValue={item.item.time} customStyle={styles.time} />
        </TouchableOpacity>
    );
};
const NotificationScreen = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView enableOnAndroid={true} showsVerticalScrollIndicator={false}>
                <StyledHeader title={'noti'} />
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
    },
    notificationImage: {
        width: '60@s',
        height: '60@s',
    },
    contentText: {
        width: '60%',
    },
    time: {
        alignSelf: 'flex-end',
    },
});
