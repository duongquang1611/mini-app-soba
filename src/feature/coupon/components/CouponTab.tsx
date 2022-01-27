import { StyledButton, StyledText } from 'components/base';
import { TAB_NAVIGATION_ROOT } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

interface CouponTabProps {
    canUse?: boolean;
}
const goToDetail = () => {
    navigate(TAB_NAVIGATION_ROOT.COUPON_ROUTE.DETAIL_COUPON);
};

const CouponTab = (props: CouponTabProps) => {
    const { canUse } = props;
    return (
        <View style={styles.container}>
            <StyledButton title={'detail coupon'} onPress={goToDetail} />
            {canUse ? <StyledText originValue={'can use'} /> : <StyledText originValue={'used'} />}
        </View>
    );
};
const styles = ScaledSheet.create({
    container: {
        flex: 1,
    },
});
export default CouponTab;
