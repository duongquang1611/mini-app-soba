import { RootState } from 'app-redux/hooks';
import { Themes } from 'assets/themes';
import { StyledList } from 'components/base';
import CouponItem from 'components/common/CouponItem';
import { getCouponData } from 'feature/home/HomeScreen';
import { COUPON_ROUTE } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import { TabCouponStatus } from 'utilities/staticData';

interface CouponTabProps {
    canUse?: TabCouponStatus;
    cartListCouponOrder?: any;
    handleUseCoupon?: any;
}

const CouponTab = (props: CouponTabProps) => {
    const { canUse, handleUseCoupon, cartListCouponOrder } = props;
    const { coupon } = useSelector((state: RootState) => state);
    const { couponsCanUse, couponsUsed } = coupon;

    const goToDetail = (item: any) => {
        navigate(COUPON_ROUTE.DETAIL_COUPON, { item, canUse, handleUseCoupon, cartOrder: cartListCouponOrder });
    };

    const handleUseCouponItem = (item: any) => {
        handleUseCoupon?.(item);
    };

    const renderItem = ({ item }: any) => {
        return (
            <CouponItem
                canUse={canUse}
                item={item}
                goToDetail={goToDetail}
                cartOrder={cartListCouponOrder}
                handleUseCoupon={() => handleUseCouponItem(item)}
            />
        );
    };

    return (
        <View style={styles.container}>
            <StyledList
                data={canUse ? couponsCanUse : couponsUsed}
                renderItem={renderItem}
                customStyle={styles.listCoupon}
                onRefresh={() => getCouponData(canUse)}
                refreshing={false}
            />
        </View>
    );
};
const styles = ScaledSheet.create({
    container: {
        flex: 1,
    },
    listCoupon: {
        marginTop: '10@vs',
        backgroundColor: Themes.COLORS.white,
        flexGrow: 1,
    },
});

export default CouponTab;
