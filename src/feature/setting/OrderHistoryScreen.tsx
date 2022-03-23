import Images from 'assets/images';
import { Themes } from 'assets/themes';
import { StyledIcon, StyledText, StyledTouchable } from 'components/base';
import StyledKeyboardAware from 'components/base/StyledKeyboardAware';
import StyledHeader from 'components/common/StyledHeader';
import { SETTING_ROUTE } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { orderHistoryListFake } from 'utilities/staticData';

const OrderItem = (item: any) => {
    return (
        <StyledTouchable customStyle={styles.orderItem} onPress={() => navigate(SETTING_ROUTE.ORDER_HISTORY_DETAIL)}>
            <View style={styles.nameOrderRow}>
                <StyledIcon source={Images.icons.order} size={25} />
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
        </StyledTouchable>
    );
};
const OrderHistoryScreen = () => {
    return (
        <View style={styles.container}>
            <StyledHeader title={'setting.orderHistoryTitle'} />
            <StyledKeyboardAware>
                <View style={styles.body}>
                    {orderHistoryListFake?.map((item) => (
                        <OrderItem key={item.id} item={item} />
                    ))}
                </View>
            </StyledKeyboardAware>
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
        alignItems: 'center',
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
        borderColor: Themes.COLORS.silver,
    },
});
