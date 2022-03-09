import { getExchangeCouponHistory } from 'api/modules/api-app/stamp';
import { Themes } from 'assets/themes';
import { StyledText } from 'components/base';
import usePaging from 'hooks/usePaging';
import React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { formatDate } from 'utilities/format';

const itemData = {
    title: 'string',
    createdDate: '2022-03-09',
    amount: 5,
};
const data = Array(20).fill(itemData);

const ItemHistory = ({ item }: any) => {
    const { createdDate, title = '', amount = 0 } = item;
    return (
        <View style={styles.wrapItem}>
            <View style={styles.wrapTitleDate}>
                <StyledText originValue={`${formatDate(createdDate)} : `} customStyle={styles.textDate} />
                <StyledText originValue={title} customStyle={styles.textTitle} />
            </View>
            <View style={styles.wrapCount}>
                <StyledText originValue={amount} customStyle={styles.textCount} />
            </View>
        </View>
    );
};
const HistoryExchangeModal = () => {
    const { pagingData } = usePaging(getExchangeCouponHistory, {
        take: 100,
    });
    const { list = [] } = pagingData;

    const renderItem = (item: any, index: number) => {
        return <ItemHistory item={item} key={index} />;
    };

    return <View style={styles.container}>{(list.length > 0 ? list : data).map(renderItem)}</View>;
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
    },
    textDate: {
        color: Themes.COLORS.mineShaft,
    },
    textTitle: {
        fontWeight: 'bold',
        color: Themes.COLORS.primary,
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
