import { StyledText, StyledTouchable } from 'components/base';
import React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { Themes } from 'assets/themes';
import { TAB_NAVIGATION_ROOT } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import { fakeDataEditMenu } from 'utilities/staticData';
import { OrderItemCart } from '../CartScreen';

const ModalDetailMenu = (props: any) => {
    const { id } = props;
    const goDetailNew = () => {
        props?.closeModal();
        navigate(TAB_NAVIGATION_ROOT.ORDER_ROUTE.DETAIL_MEAL, { id, newOrder: true });
    };
    const goDetailEdit = () => {
        props?.closeModal();
        navigate(TAB_NAVIGATION_ROOT.ORDER_ROUTE.DETAIL_MEAL, { id });
    };
    return (
        <View style={styles.container}>
            <View style={styles.paddingView}>
                <StyledTouchable onPress={goDetailNew}>
                    <StyledText i18nText={'order.addNew'} customStyle={styles.addNew} />
                </StyledTouchable>
                <StyledText i18nText={'order.editMenu'} customStyle={styles.edit} />
            </View>
            {fakeDataEditMenu.map((item: any, index: number) => (
                <OrderItemCart canChange={false} key={index} data={item} goDetailMenu={goDetailEdit} />
            ))}
        </View>
    );
};

export default ModalDetailMenu;

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        paddingVertical: '20@vs',
    },
    paddingView: {
        paddingHorizontal: '20@s',
    },
    addNew: {
        fontSize: '16@ms0.3',
        fontWeight: '700',
    },
    edit: {
        fontSize: '16@ms0.3',
        fontWeight: '700',
        color: Themes.COLORS.primary,
        marginVertical: '10@vs',
    },
});
