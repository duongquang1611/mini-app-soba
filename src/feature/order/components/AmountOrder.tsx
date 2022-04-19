import { RootState } from 'app-redux/hooks';
import Images from 'assets/images';
import { Themes } from 'assets/themes';
import { StyledIcon, StyledText } from 'components/base';
import React, { useRef } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { useSelector } from 'react-redux';

interface AmountOrderProps {
    order?: any;
    customStyle?: StyleProp<ViewStyle>;
    total?: number;
}
const AmountOrder = (props: AmountOrderProps) => {
    const { order, customStyle, total } = props;
    const { cartOrder } = useSelector((state: RootState) => state.order);
    const { dishes, coupons } = order || cartOrder || [];
    let numOrder = useRef(0).current;
    dishes?.map((item: any) => {
        numOrder += item.totalAmount;
        return item;
    });
    numOrder += coupons?.length || 0;
    return (
        <View style={[styles.numOrderView, customStyle]}>
            <View style={styles.row}>
                <StyledIcon source={Images.icons.bagTick} size={20} customStyle={styles.icBag} />
                <StyledText i18nText={'order.numOrder'} customStyle={styles.contentText} />
            </View>
            <View style={styles.row}>
                <StyledText originValue={`${total || numOrder}`} customStyle={styles.valuetext} />
                <StyledText i18nText={'order.point'} customStyle={styles.valuetext} />
            </View>
        </View>
    );
};

export default AmountOrder;

const styles = ScaledSheet.create({
    numOrderView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: Themes.COLORS.white,
        paddingVertical: '10@vs',
        paddingHorizontal: '20@s',
        width: '100%',
        marginVertical: '10@vs',
    },
    contentText: {
        marginLeft: '5@s',
        fontSize: '18@ms0.3',
        fontWeight: 'bold',
    },
    icBag: {
        tintColor: Themes.COLORS.secondary,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    valuetext: {
        marginLeft: '5@s',
        fontSize: '24@ms0.3',
        fontWeight: 'bold',
    },
});
