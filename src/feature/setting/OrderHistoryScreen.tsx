import { useNavigation } from '@react-navigation/native';
import { Themes } from 'assets/themes';
import { StyledIcon, StyledText } from 'components/base';
import StyledHeader from 'components/common/StyledHeader';
import { TAB_NAVIGATION_ROOT } from 'navigation/config/routes';
import React from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ScaledSheet } from 'react-native-size-matters';
import { orderHistoryListFake } from 'utilities/staticData';

const OrderItem = (item: any) => {
    return (
        <TouchableOpacity
            style={styles.orderItem}
            onPress={() => item?.navigation.navigate(TAB_NAVIGATION_ROOT.SETTING_ROUTE.ORDER_HISTORY_DETAIL)}
        >
            <View style={styles.nameOrderRow}>
                <StyledIcon source={{ uri: item.item?.img }} size={20} />
                <View style={styles.viewInfo}>
                    <StyledText originValue={item.item.name} customStyle={styles.contentText} />
                    <StyledText originValue={item.item.time} customStyle={styles.time} />
                    <View style={styles.priceRow}>
                        <StyledText i18nText={'合計：'} customStyle={styles.price} />
                        <StyledText originValue={item.item.price} customStyle={styles.price} />
                    </View>
                </View>
            </View>
            <View style={styles.line} />
        </TouchableOpacity>
    );
};
const OrderHistoryScreen = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView enableOnAndroid={true} showsVerticalScrollIndicator={false}>
                <StyledHeader title={'order history'} />
                <View style={styles.body}>
                    {orderHistoryListFake?.map((item) => (
                        <OrderItem key={item.id} item={item} navigation={navigation} />
                    ))}
                </View>
            </KeyboardAwareScrollView>
        </View>
    );
};

export default OrderHistoryScreen;

const styles = ScaledSheet.create({
    container: {
        flex: 1,
    },
    body: {
        flex: 1,

        backgroundColor: Themes.COLORS.lightGray,
    },
    buttonSave: {},
    orderItem: {
        width: '100%',
        backgroundColor: Themes.COLORS.white,
        // marginVertical: '2@vs',
        paddingHorizontal: '20@s',
        paddingVertical: '10@vs',
    },
    nameOrderRow: {
        flexDirection: 'row',
        width: '100%',
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
        width: '60%',
        paddingHorizontal: '20@s',
    },
    time: {
        color: Themes.COLORS.silver,
        marginVertical: '10@vs',
    },
    priceRow: {
        flexDirection: 'row',
    },
    price: {
        fontWeight: 'bold',
        color: Themes.COLORS.primary,
    },
    line: {
        width: '100%',
        borderWidth: 0.5,
        borderStyle: 'dashed',
        marginTop: '10@vs',
    },
});
