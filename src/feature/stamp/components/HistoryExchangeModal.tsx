import { Themes } from 'assets/themes';
import { StyledText } from 'components/base';
import React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { formatDate, formatRestaurantsCouponShow } from 'utilities/format';

const ItemHistory = ({ item }: any) => {
    const { receivedDate, coupon = {} } = item;
    const { title = '', stampCoupon = {}, restaurants, isDiscountAllRestaurants } = coupon?.[0] || {};
    const { stampAmount } = stampCoupon;

    return (
        <View style={styles.wrapItem}>
            <View style={styles.wrapTitleDate}>
                <StyledText originValue={`${formatDate(receivedDate)} : `} customStyle={styles.textDate} />
                <StyledText
                    i18nParams={{
                        restaurants: formatRestaurantsCouponShow(restaurants, isDiscountAllRestaurants, false),
                        title,
                    }}
                    i18nText={'coupon.titleItemCoupon'}
                    customStyle={styles.textTitle}
                />
            </View>
            {!!stampAmount && (
                <View style={styles.wrapCount}>
                    <StyledText originValue={`-${stampAmount}`} customStyle={styles.textCount} />
                </View>
            )}
        </View>
    );
};
const HistoryExchangeModal = ({ data = [] }: any) => {
    const renderItem = (item: any, index: number) => {
        return <ItemHistory item={item} key={index} />;
    };

    return <View style={styles.container}>{data.map(renderItem)}</View>;
};

const styles = ScaledSheet.create({
    container: {
        paddingHorizontal: '20@s',
        paddingVertical: '20@vs',
    },
    wrapItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '15@vs',
    },
    wrapTitleDate: {
        flexDirection: 'row',
        flex: 1,
    },
    textDate: {
        color: Themes.COLORS.mineShaft,
    },
    textTitle: {
        fontWeight: 'bold',
        color: Themes.COLORS.primary,
        flexShrink: 1,
        marginRight: '10@s',
    },
    wrapCount: {
        width: '26@s',
        height: '26@s',
        borderRadius: 50,
        borderWidth: 1,
        borderColor: Themes.COLORS.thunderbird,
        backgroundColor: Themes.COLORS.opacityThunderbird(0.4),
        justifyContent: 'center',
        alignItems: 'center',
    },
    textCount: {
        fontSize: '12@ms0.3',
        fontWeight: 'bold',
        color: Themes.COLORS.thunderbird,
    },
});

export default HistoryExchangeModal;
