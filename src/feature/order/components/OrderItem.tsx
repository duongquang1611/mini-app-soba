import Images from 'assets/images';
import { Themes } from 'assets/themes';
import { StyledIcon, StyledImage, StyledText } from 'components/base';
import React, { useState } from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { scale, ScaledSheet } from 'react-native-size-matters';

export const OrderChild = (data: any) => {
    const { isRequired, item, subDishDetail, setSubDishDetail } = data;
    const { dish } = item;
    const checkOrder = subDishDetail?.find((item: any) => item.id === dish.id)?.value;
    let checkChoose = isRequired;
    if (checkOrder === 1) {
        checkChoose = true;
    } else checkChoose = false;
    const [choose, setChoose] = useState(checkChoose);

    const onChoose = () => {
        const chooseValue = choose;
        setChoose(!chooseValue);
        if (chooseValue) {
            setSubDishDetail(subDishDetail.filter((item: any) => item.id !== dish.id));
        } else {
            setSubDishDetail([
                ...subDishDetail,
                {
                    id: dish.id,
                    title: dish.title,
                    value: 1,
                },
            ]);
        }
    };
    return (
        <View style={styles.containerItem}>
            <View style={styles.itemRow}>
                <View style={styles.itemRow}>
                    <StyledImage source={{ uri: dish.thumbnail }} customStyle={styles.imgItem} />
                    <StyledText originValue={dish.title} customStyle={styles.nameOrder} />
                </View>
                <TouchableOpacity
                    onPress={onChoose}
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
const OrderChildCanChange = (data: any) => {
    const { isRequired, item, subDishDetail, setSubDishDetail } = data;
    const { dish, defaultValue } = item;
    const checkOrder = subDishDetail?.find((item: any) => item.id === dish.id)?.value;
    const checkChoose = checkOrder || 0;
    const [num, setNum] = useState(checkChoose || defaultValue);
    const onChoose = (numChoose: number) => {
        setNum(numChoose);
        if (numChoose === 0) {
            setSubDishDetail(subDishDetail.filter((item: any) => item.id !== dish.id));
        } else {
            setSubDishDetail([
                ...subDishDetail.filter((item: any) => item.id !== dish.id),
                {
                    id: dish.id,
                    title: dish.title,
                    value: numChoose,
                },
            ]);
        }
    };
    const add = () => {
        const numChoose = num + 1;
        onChoose(numChoose);
    };
    const minus = () => {
        if ((isRequired && num > 1) || (!isRequired && num > 0)) {
            const numChoose = num - 1;

            onChoose(numChoose);
        }
    };
    return (
        <View style={styles.containerItem}>
            <View style={styles.itemRow}>
                <View style={styles.itemRow}>
                    <StyledImage source={{ uri: dish.thumbnail }} customStyle={styles.imgItem} />
                    <StyledText originValue={dish.title} customStyle={styles.nameOrder} />
                </View>
                <View style={styles.itemRow}>
                    <TouchableOpacity onPress={minus}>
                        <StyledIcon
                            source={Images.icons.minus}
                            size={20}
                            customStyle={{ tintColor: num > 0 ? Themes.COLORS.primary : Themes.COLORS.silver }}
                        />
                    </TouchableOpacity>
                    <StyledText originValue={`${num}`} customStyle={styles.quantitySideText} />
                    <TouchableOpacity onPress={add}>
                        <StyledIcon source={Images.icons.add} size={20} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};
const OrderItem = (data: any) => {
    const { subDishDetail, setSubDishDetail } = data;
    const { subDish, title, isRequired, type } = data?.data;
    return (
        <View style={[styles.containerItem, { paddingHorizontal: scale(20) }]}>
            <StyledText originValue={title} customStyle={styles.name} />
            {subDish?.map((item: any, index: number) => (
                <>
                    {type === 1 ? (
                        <OrderChild
                            key={index}
                            item={item}
                            isRequired={isRequired}
                            subDishDetail={subDishDetail}
                            setSubDishDetail={setSubDishDetail}
                        />
                    ) : (
                        <OrderChildCanChange
                            key={item.id}
                            item={item}
                            isRequired={isRequired}
                            subDishDetail={subDishDetail}
                            setSubDishDetail={setSubDishDetail}
                        />
                    )}
                </>
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
    quantitySideText: {
        marginHorizontal: '10@s',
    },
});
