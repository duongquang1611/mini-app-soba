import { StyledButton } from 'components/base';
import DashView from 'components/common/DashView';
import { STAMP_ROUTE } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React, { memo, useMemo } from 'react';
import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { scale, ScaledSheet, verticalScale } from 'react-native-size-matters';
import { StampCardType, StampSettingDuration } from 'utilities/enumData';
import { checkExpired } from 'utilities/helper';
import { staticValue } from 'utilities/staticData';
import StampTickItem from './StampTickItem';

const itemHeight = 67;
const separatorBottom = 10;
const separatorTop = 10;

const StampTickList = ({
    onPressItemStampTick,
    stampDetail,
    numCol = staticValue.DEFAULT_STAMP_TICK_COLUMN,
    data = [],
    fromNotify = false,
}: any) => {
    const { stamp = {} } = stampDetail || {};
    const { stampTicks = [], settingDuration, endDate, isBlock } = stamp;
    const isExchange = useMemo(() => stamp.cardType === StampCardType.EXCHANGE, [stamp.cardType]);
    const isNoExpired = useMemo(() => settingDuration === StampSettingDuration.NO_EXPIRED_DATE, [settingDuration]);
    const isExpired = useMemo(() => {
        return isNoExpired ? false : checkExpired(endDate);
    }, [endDate, isNoExpired]);

    const renderItem = ({ item, index }: any) => {
        const isOpen = item?.positionBox <= stampTicks.length;
        return (
            <StampTickItem
                isExchange={isExchange}
                item={item}
                numCol={numCol}
                onPress={() => onPressItemStampTick(item?.positionBox, isOpen)}
                isOpen={isOpen}
                key={`${index}`}
                index={index}
            />
        );
    };

    const goToExchangeCoupon = () => {
        navigate(STAMP_ROUTE.EXCHANGE_COUPON, { stampDetail });
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
            {isExchange && !fromNotify && !isBlock && (
                <StyledButton
                    title={'stampDetail.couponExchangeBtn'}
                    customStyle={styles.btnExchange}
                    disabled={isExpired}
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
        maxHeight: scale(itemHeight * 4) + verticalScale(separatorBottom * 4 + separatorTop),
    },
    dashView: {},
    btnExchange: {
        alignSelf: 'center',
        marginBottom: '20@vs',
    },
});

export default memo(StampTickList);
