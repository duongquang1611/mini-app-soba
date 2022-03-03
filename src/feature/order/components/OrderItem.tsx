import Images from 'assets/images';
import { Themes } from 'assets/themes';
import { StyledImage, StyledText } from 'components/base';
import React, { useState } from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { scale, ScaledSheet } from 'react-native-size-matters';

export const OrderChild = (data: any) => {
    const [choose, setChoose] = useState(false);
    return (
        <View style={styles.containerItem}>
            <View style={styles.itemRow}>
                <View style={styles.itemRow}>
                    <StyledImage source={Images.photo.defaultImage} customStyle={styles.imgItem} />
                    <StyledText originValue={data?.item.name} customStyle={styles.nameOrder} />
                </View>
                <TouchableOpacity
                    onPress={() => {
                        setChoose(!choose);
                    }}
                    style={[
                        styles.chooseButton,
                        {
                            backgroundColor: choose ? Themes.COLORS.primary : Themes.COLORS.white,
                            borderColor: choose ? '#FBA29D' : Themes.COLORS.silver,
                        },
                    ]}
                />
            </View>
        </View>
    );
};
const OrderItem = (data: any) => {
    return (
        <View style={[styles.containerItem, { paddingHorizontal: scale(20) }]}>
            <StyledText originValue={data?.data?.name} customStyle={styles.name} />
            {data.data.dishes?.map((item: any, index: number) => (
                <OrderChild key={index} item={item} />
            ))}
        </View>
    );
};

export default OrderItem;

const styles = ScaledSheet.create({
    imgItem: {
        width: '60@s',
        height: '60@s',
        marginRight: '20@s',
    },
    itemRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    containerItem: {
        width: '100%',
        marginBottom: '10@vs',
        backgroundColor: Themes.COLORS.white,
    },
    infoItem: {
        width: '70%',
    },
    chooseButton: {
        width: '16@s',
        height: '16@s',
        borderRadius: 16,
        borderWidth: 2,
    },
    nameOrder: {
        fontWeight: 'bold',
    },
    name: {
        fontSize: '16@ms0.3',
        fontWeight: 'bold',
        color: Themes.COLORS.primary,
        marginVertical: '10@vs',
    },
});
