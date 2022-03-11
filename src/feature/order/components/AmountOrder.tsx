import { RootState } from 'app-redux/hooks';
import Images from 'assets/images';
import { Themes } from 'assets/themes';
import { StyledIcon, StyledText } from 'components/base';
import React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { useSelector } from 'react-redux';

const AmountOrder = () => {
    const { saveOrder } = useSelector((state: RootState) => state.order);
    const { dishes } = saveOrder || [];
    let numOrder = 0;
    dishes?.map((item: any) => {
        numOrder += item.amount;
        return item;
    });
    return (
        <View style={styles.numOrderView}>
            <View style={styles.row}>
                <StyledIcon source={Images.icons.bag} size={17} customStyle={styles.icBag} />
                <StyledText originValue={'content'} customStyle={styles.contentText} />
            </View>
            <View style={styles.row}>
                <StyledText originValue={`${numOrder}`} customStyle={styles.contentText} />
                <StyledText i18nText={'点'} customStyle={styles.contentText} />
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
});
