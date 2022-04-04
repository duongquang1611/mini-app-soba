import { StyledButton } from 'components/base';
import DashView from 'components/common/DashView';
import React, { memo, useMemo } from 'react';
import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { scale, ScaledSheet, verticalScale } from 'react-native-size-matters';
import { StampCardType } from 'utilities/enumData';
import { staticValue } from 'utilities/staticData';
import StampTickItem from './StampTickItem';

const itemHeight = 67;
const separatorBottom = 10;
const separatorTop = 10;

const StampTickList = ({
    onPressItemHistory,
    stampDetail,
    numCol = staticValue.DEFAULT_STAMP_TICK_COLUMN,
    data = [],
}: any) => {
    const { leftAmount, stamp = {} } = stampDetail || {};
    const isExchange = useMemo(() => stamp.cardType === StampCardType.EXCHANGE, [stamp.cardType]);

    // open box: couponsCumulative length > 0
    // noodle on: createdDate &&  couponsCumulative length <= 0
    // noodle off: normal
    // close box: couponsExchange

    const renderItem = ({ item }: any) => {
        return <StampTickItem item={item} numCol={numCol} onPress={onPressItemHistory} />;
    };

    const goToExchangeCoupon = () => {
        // navigate(STAMP_ROUTE.EXCHANGE_COUPON);
    };

    return (
        <>
            <DashView customStyle={styles.dashView} />
            <View style={styles.wrapListCoupon}>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    numColumns={numCol}
                    contentContainerStyle={styles.listCoupon}
                    keyExtractor={(item: any, index: number) => index.toString()}
                />
            </View>
            <DashView customStyle={styles.dashView} />
            {isExchange && (
                <StyledButton
                    title={'stampDetail.couponExchangeBtn'}
                    customStyle={styles.btnExchange}
                    disabled={leftAmount <= 0}
                    onPress={goToExchangeCoupon}
                />
            )}
        </>
    );
};

const styles = ScaledSheet.create({
    wrapItem: {
        borderRadius: 5,
        marginBottom: verticalScale(separatorBottom),
        alignItems: 'center',
        justifyContent: 'center',
        height: scale(itemHeight),
    },
    listCoupon: {
        justifyContent: 'space-between',
        paddingHorizontal: '20@s',
        flexGrow: 1,
    },
    wrapListCoupon: {
        paddingTop: '10@vs',
        maxHeight: scale(itemHeight * 4) + verticalScale(separatorBottom * 3 + separatorTop),
    },
    dashView: {
        marginTop: '10@vs',
    },
    btnExchange: {
        alignSelf: 'center',
        marginBottom: '20@vs',
    },
});

export default memo(StampTickList);
