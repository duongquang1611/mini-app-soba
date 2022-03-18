import { getCouponList } from 'api/modules/api-app/coupon';
import { Themes } from 'assets/themes';
import { StyledList } from 'components/base';
import CouponItem from 'components/common/CouponItem';
import usePaging from 'hooks/usePaging';
import { COUPON_ROUTE } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { TabCouponStatus } from 'utilities/staticData';

interface CouponTabProps {
    status?: TabCouponStatus;
}

const CouponTab = (props: CouponTabProps) => {
    const { status } = props;
    const { pagingData, onRefresh, onLoadMore } = usePaging(getCouponList, {
        status,
    });

    const goToDetail = (item: any) => {
        navigate(COUPON_ROUTE.DETAIL_COUPON, { item });
    };

    const renderItem = ({ item }: any) => {
        return <CouponItem canUse={status} item={item} goToDetail={goToDetail} />;
    };

    return (
        <View style={styles.container}>
            <StyledList
                data={pagingData.list}
                renderItem={renderItem}
                customStyle={styles.listCoupon}
                onRefresh={onRefresh}
                onEndReached={onLoadMore}
                refreshing={pagingData.refreshing}
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
