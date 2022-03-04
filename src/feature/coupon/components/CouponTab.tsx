import { StyledList } from 'components/base';
import CouponItem from 'components/common/CouponItem';
import DashView from 'components/common/DashView';
import { COUPON_ROUTE } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { listCouponFake } from 'utilities/staticData';

interface CouponTabProps {
    canUse?: boolean;
}

const CouponTab = (props: CouponTabProps) => {
    const { canUse } = props;

    const goToDetail = (item: any) => {
        navigate(COUPON_ROUTE.DETAIL_COUPON, { canUse, item });
    };

    const renderItem = ({ item }: any) => {
        return <CouponItem canUse={canUse} item={item} goToDetail={goToDetail} />;
    };

    return (
        <View style={styles.container}>
            <StyledList data={listCouponFake} renderItem={renderItem} ItemSeparatorComponent={DashView} />
        </View>
    );
};
const styles = ScaledSheet.create({
    container: {
        flex: 1,
    },
});

export default CouponTab;
