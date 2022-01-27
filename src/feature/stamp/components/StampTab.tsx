import { StyledButton, StyledText } from 'components/base';
import { TAB_NAVIGATION_ROOT } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

interface StampTabProps {
    canUse?: boolean;
}
const goToDetail = () => {
    navigate(TAB_NAVIGATION_ROOT.STAMP_ROUTE.CARD_DETAIL);
};

const StampTab = (props: StampTabProps) => {
    const { canUse } = props;
    return (
        <View style={styles.container}>
            <StyledButton title={'detail stamp'} onPress={goToDetail} />
            {canUse ? <StyledText originValue={'can use'} /> : <StyledText originValue={'used'} />}
        </View>
    );
};
const styles = ScaledSheet.create({
    container: {
        flex: 1,
    },
});
export default StampTab;
