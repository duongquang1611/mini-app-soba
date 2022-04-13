import { Themes } from 'assets/themes';
import { StyledText } from 'components/base';
import React, { useMemo } from 'react';
import { View } from 'react-native';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import { formatDate } from 'utilities/format';

const ItemHistory = ({ item }: any) => {
    const { receivedDate, coupon = {} } = item;
    const { title = '', stampCoupon = {} } = coupon?.[0] || {};
    const { stampAmount } = stampCoupon;

    const isLongText = useMemo(() => stampAmount && `${stampAmount}`?.length >= 2, [stampAmount]);

    return (
        <View style={styles.wrapItem}>
            <View style={styles.wrapTitleDate}>
                <StyledText originValue={`${formatDate(receivedDate)} : `} customStyle={styles.textDate} />
                <StyledText originValue={title} customStyle={styles.textTitle} />
            </View>
            {!!stampAmount && (
                <View style={styles.wrapCount}>
                    <StyledText
                        originValue={`-${stampAmount}`}
                        customStyle={[styles.textCount, isLongText && { fontSize: moderateScale(12, 0.3) }]}
                    />
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
        fontSize: '16@ms0.3',
        fontWeight: 'bold',
        color: Themes.COLORS.thunderbird,
    },
});

export default HistoryExchangeModal;
