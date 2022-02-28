import { Themes } from 'assets/themes';
import { StyledButton, StyledImage, StyledText, StyledTouchable } from 'components/base';
import RadioCheckView from 'components/common/RadioCheckView';
import React, { memo, useState } from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { STAMP_DATA } from 'utilities/staticData';

const ItemChooseStamp = memo(({ item, onPress, check }: any) => {
    const { url, name = '', id } = item;
    return (
        <StyledTouchable customStyle={styles.itemContainer} onPress={() => onPress(id)}>
            <View style={styles.itemContent}>
                <StyledImage source={{ uri: url }} customStyle={styles.imgItem} />
                <StyledText originValue={name} customStyle={styles.textName} />
            </View>
            <RadioCheckView check={check} />
        </StyledTouchable>
    );
});

const ChooseStampList = ({ onPress }: any) => {
    const [chooseID, setChooseID] = useState();

    const renderItem = ({ item }: any) => {
        return <ItemChooseStamp item={item} check={chooseID === item.id} onPress={setChooseID} key={item?.id} />;
    };

    return (
        <View style={styles.container}>
            <StyledText i18nText={'chooseStamp.orderId'} customStyle={styles.textOrder} />
            <StyledText i18nText={'chooseStamp.pleaseChoose'} customStyle={styles.textPlsChoose} />
            {/* <StyledList data={STAMP_DATA} renderItem={renderItem} customStyle={styles.listChoose} /> */}
            <View style={styles.listChoose}>{STAMP_DATA.map((item: any) => renderItem({ item }))}</View>
            <StyledButton title={'common.yes'} customStyle={styles.btnYes} onPress={onPress} />
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: '20@s',
    },
    btnYes: {
        marginBottom: '25@vs',
        alignSelf: 'center',
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '15@vs',
    },
    separator: {
        height: '15@vs',
    },
    imgItem: {
        width: '60@s',
        height: '60@s',
        borderRadius: 1,
    },
    itemContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textName: {
        fontSize: '16@ms0.3',
        fontWeight: 'bold',
        marginLeft: '10@s',
    },
    listChoose: {},
    textOrder: {
        fontSize: '18@ms0.3',
        fontWeight: 'bold',
        marginTop: '20@vs',
    },
    textPlsChoose: {
        fontSize: '16@ms0.3',
        color: Themes.COLORS.primary,
        marginVertical: '15@vs',
        fontWeight: 'bold',
    },
});

export default ChooseStampList;
