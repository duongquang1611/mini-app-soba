import { StyledButton } from 'components/base';
import DashView from 'components/common/DashView';
import { STAMP_ROUTE } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React, { memo } from 'react';
import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { scale, ScaledSheet, verticalScale } from 'react-native-size-matters';
import CouponExchangeItem from './CouponExchangeItem';

const createItem = (on = false, rd = Math.random()) => {
    return { id: rd, status: on, date: '2022-03-02T06:49:49.039Z' };
};
const data = Array(50).fill(createItem(true), 0, 8).fill(createItem(), 8, 100);

const itemHeight = 67;
const separatorBottom = 10;
const separatorTop = 10;
const numCol = 7;
// const numCol = staticValue.COLUMNS_COUPON_EXCHANGE[Math.round(Math.random() * 2)];

const ListHistoryCouponExchange = ({ caseType, onPressItemHistory }: any) => {
    for (let index = 0; index < 6; index++) {
        const newIndex = index + 10 + Math.round(Math.random() * 10);
        data[newIndex] = {
            ...data[newIndex],
            giftType: Math.ceil(Math.random() * 2),
        };
    }
    const renderItem = ({ item }: any) => {
        return <CouponExchangeItem item={item} numCol={numCol} onPress={onPressItemHistory} />;
    };

    const goToExchangeCoupon = () => {
        navigate(STAMP_ROUTE.EXCHANGE_COUPON);
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
            {caseType !== 2 && (
                <StyledButton
                    title={'stampDetail.couponExchangeBtn'}
                    customStyle={styles.btnExchange}
                    disabled={caseType === 1}
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

export default memo(ListHistoryCouponExchange);
