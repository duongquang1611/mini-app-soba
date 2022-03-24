/* eslint-disable @typescript-eslint/no-unused-vars */
import Images from 'assets/images';
import { Themes } from 'assets/themes';
import { StyledIcon, StyledImage, StyledText } from 'components/base';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { scale, ScaledSheet } from 'react-native-size-matters';
import { MenuType, staticValue } from 'utilities/staticData';

export const OrderChild = (data: any) => {
    const { isRequired, item, subDishDetail, setSubDishDetail, dishOptionsId } = data;
    const { dish, id } = item;
    const checkChooseItem = subDishDetail?.find((item: any) => item.subDishId === id)?.amount;
    const checkChooseDishOption = subDishDetail?.find(
        (item: any) => item?.dishOption?.dishOptionsId === dishOptionsId,
    )?.amount;
    const listSubNotChange = subDishDetail?.filter((item: any) => item?.dishOption?.dishOptionsId !== dishOptionsId);
    const onChoose = () => {
        if (!checkChooseDishOption || !checkChooseItem) {
            setSubDishDetail([
                ...listSubNotChange,
                {
                    dishOption: {
                        dishOptionsId,
                    },
                    subDishId: id,
                    title: dish.title,
                    selected: 1,
                    amount: 1,
                },
            ]);
        } else setSubDishDetail(listSubNotChange);
    };
    return (
        <View style={styles.containerItem}>
            <View style={styles.itemRow}>
                <View style={styles.itemRow}>
                    <StyledImage source={{ uri: dish.thumbnail }} customStyle={styles.imgItem} />
                    <StyledText numberOfLines={1} originValue={dish.title} customStyle={styles.nameOrder} />
                </View>
                <TouchableOpacity
                    onPress={onChoose}
                    style={[
                        styles.chooseButton,
                        {
                            backgroundColor: checkChooseItem ? Themes.COLORS.primary : Themes.COLORS.white,
                            borderColor: checkChooseItem ? Themes.COLORS.sweetPink : Themes.COLORS.silver,
                        },
                    ]}
                />
            </View>
        </View>
    );
};
const OrderChildCanChange = (data: any) => {
    const { item, subDishDetail, setSubDishDetail, dishOptionsId } = data || {};
    const { dish } = item;
    const checkChoose = subDishDetail?.find((itemSub: any) => itemSub?.subDishId === item?.id)?.amount || 0;
    const [num, setNum] = useState(checkChoose);
    useEffect(() => {
        setNum(checkChoose);
    }, [checkChoose]);
    const onChoose = (numChoose: number) => {
        setNum(numChoose);
        if (numChoose === 0) {
            setSubDishDetail(subDishDetail.filter((itemSub: any) => itemSub.subDishId !== item.id));
        } else {
            setSubDishDetail([
                ...subDishDetail.filter((itemSub: any) => itemSub.subDishId !== item.id),
                {
                    dishOption: {
                        dishOptionsId,
                    },
                    subDishId: item?.id,
                    title: dish.title,
                    selected: 1,
                    amount: numChoose,
                },
            ]);
        }
    };
    const add = () => {
        const numChoose = num + 1;
        onChoose(numChoose);
    };
    const minus = () => {
        if (num > 0) {
            const numChoose = num - 1;
            onChoose(numChoose);
        }
    };
    return (
        <View style={styles.containerItem}>
            <View style={styles.itemRow}>
                <View style={styles.itemRow}>
                    <StyledImage source={{ uri: dish.thumbnail }} customStyle={styles.imgItem} />
                    <StyledText numberOfLines={1} originValue={dish.title} customStyle={styles.nameOrder} />
                </View>
                <View style={styles.itemRow}>
                    <TouchableOpacity onPress={minus} disabled={num === 0}>
                        <StyledIcon
                            source={Images.icons.minus}
                            size={20}
                            customStyle={{ tintColor: num > 0 ? Themes.COLORS.primary : Themes.COLORS.silver }}
                        />
                    </TouchableOpacity>
                    <StyledText originValue={`${num}`} customStyle={styles.quantitySideText} />
                    <TouchableOpacity onPress={add} disabled={num >= staticValue.MAX_ORDER}>
                        <StyledIcon
                            source={Images.icons.add}
                            size={20}
                            customStyle={{
                                tintColor: num < staticValue.MAX_ORDER ? Themes.COLORS.primary : Themes.COLORS.silver,
                            }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};
const OrderItem = (data: any) => {
    const { subDishDetail, setSubDishDetail } = data;
    const { subDish, title, isRequired, type, id } = data?.data || {};
    return (
        <View style={[styles.containerItem, { paddingHorizontal: scale(20) }]}>
            <View style={styles.itemRow}>
                <StyledText originValue={title} customStyle={styles.name} />
                {isRequired === MenuType.ENABLE && (
                    <View style={styles.require}>
                        <StyledText i18nText={'order.require'} customStyle={styles.requireText} />
                    </View>
                )}
            </View>
            {subDish?.map((item: any, index: number) => (
                <View key={index}>
                    {type === 1 ? (
                        <OrderChild
                            key={index}
                            item={item}
                            isRequired={isRequired}
                            subDishDetail={subDishDetail}
                            setSubDishDetail={setSubDishDetail}
                            dishOptionsId={id}
                        />
                    ) : (
                        <OrderChildCanChange
                            key={item.id}
                            item={item}
                            isRequired={isRequired}
                            subDishDetail={subDishDetail}
                            setSubDishDetail={setSubDishDetail}
                            dishOptionsId={id}
                        />
                    )}
                </View>
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
        width: '170@s',
    },
    name: {
        fontSize: '16@ms0.3',
        fontWeight: 'bold',
        color: Themes.COLORS.primary,
        marginVertical: '10@vs',
        width: '80%',
    },
    quantitySideText: {
        width: '30@s',
        textAlign: 'center',
    },
    require: {
        padding: '5@s',
        backgroundColor: Themes.COLORS.headerBackground,
        borderRadius: 10,
    },
    requireText: {
        color: Themes.COLORS.primary,
        fontSize: '12@ms0.3',
    },
});
