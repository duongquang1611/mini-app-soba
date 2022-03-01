import Images from 'assets/images';
import Metrics from 'assets/metrics';
import { Themes } from 'assets/themes';
import { StyledButton, StyledIcon } from 'components/base';
import DashView from 'components/common/DashView';
import React from 'react';
import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { scale, ScaledSheet, verticalScale } from 'react-native-size-matters';
import { staticValue } from 'utilities/staticData';

const createItem = (on = false, rd = Math.random()) => {
    return {
        id: rd,
        status: on,
    };
};
const data = Array(100).fill(createItem(true), 0, 8).fill(createItem(), 8, 100);
const itemHeight = 67;
const separatorBottom = 10;
const separatorTop = 10;

const ListCouponExchange = ({ caseType }: any) => {
    const renderItem = ({ item }: any) => {
        return (
            <View
                style={[
                    styles.wrapItem,
                    {
                        backgroundColor: item.status ? Themes.COLORS.headerBackground : Themes.COLORS.disabled,
                        width:
                            (Metrics.screenWidth - scale(40 + 10 * (staticValue.COLUMNS_COUPON_EXCHANGE - 1))) /
                            staticValue.COLUMNS_COUPON_EXCHANGE,
                    },
                ]}
            >
                <StyledIcon source={item?.status ? Images.icons.noodlesOn : Images.icons.noodlesOff} size={40} />
            </View>
        );
    };

    return (
        <>
            <DashView customStyle={styles.dashView} />
            <View style={styles.wrapListCoupon}>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    numColumns={staticValue.COLUMNS_COUPON_EXCHANGE}
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
        marginRight: '10@s',
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

export default ListCouponExchange;
