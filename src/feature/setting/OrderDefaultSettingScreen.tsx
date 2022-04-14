/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Images from 'assets/images';
import Metrics from 'assets/metrics';
import { Themes } from 'assets/themes';
import { StyledButton, StyledIcon, StyledText } from 'components/base';
import { StyledImageBackground } from 'components/base/StyledImage';
import LinearView from 'components/common/LinearView';
import StyledHeader from 'components/common/StyledHeader';
import { SETTING_ROUTE } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React, { useRef, useState } from 'react';
import { View } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { scale, ScaledSheet } from 'react-native-size-matters';
import { listImage } from 'utilities/staticData';

const list = [
    { category: 'all' },
    { category: 'category1' },
    { category: 'category2' },
    { category: 'category3' },
    { category: 'category4' },
];
const ItemOrder = (item: any) => {
    const [choose, setChoose] = useState(false);
    const gotoDetail = () => {
        setChoose(!choose);
        navigate(SETTING_ROUTE.DEFAULT_ORDER_DETAIL);
    };
    return (
        <TouchableOpacity onPress={gotoDetail}>
            <StyledImageBackground
                source={{ uri: item?.item?.img }}
                style={[styles.image, { borderColor: choose ? Themes.COLORS.primary : Themes.COLORS.white }]}
            >
                <StyledText originValue={item?.item?.name} customStyle={styles.name} />
                {choose ? <StyledIcon source={Images.icons.tick} size={20} /> : null}
            </StyledImageBackground>
        </TouchableOpacity>
    );
};

const OrderDefaultSettingScreen = () => {
    const save = () => {};
    const [categoryRef, setCategoryRef] = useState(useRef());
    const [category, setCategory] = useState('');
    const [selected, setSelected] = useState();
    const onPressCategory = (item: any) => {
        setCategory(item.category);
        setSelected(item.category);
    };
    const renderCategoryItems = ({ item, index }: any) => {
        return (
            <LinearView
                style={[styles.linear, { borderWidth: selected === item.category ? 0 : 1 }]}
                colors={selected === item.category ? ['#DF2115', '#A61F17'] : ['#fff', '#fff']}
            >
                <TouchableOpacity
                    style={[styles.tabCategoryHeader]}
                    disabled={selected === item.category}
                    activeOpacity={0.7}
                    onPress={() => {
                        onPressCategory(item);
                    }}
                >
                    <StyledText
                        customStyle={{
                            color: selected === item.category ? Themes.COLORS.white : Themes.COLORS.primary,
                            fontWeight: selected === item.category ? 'bold' : '400',
                            fontSize: 14,
                        }}
                        originValue={item.category}
                    />
                </TouchableOpacity>
            </LinearView>
        );
    };

    return (
        <View style={styles.container}>
            <StyledHeader title={'setting.orderDefaultTitle'} iconRight={Images.icons.question} />
            {/* <View style={styles.contentView}>
                <StyledIcon source={Images.icons.selected} size={15} />
                <StyledText customStyle={styles.contentText} i18nText={'text'} />
            </View> */}
            <View style={styles.categoryContainer}>
                {list.length > 1 ? (
                    <FlatList
                        horizontal
                        data={list}
                        showsHorizontalScrollIndicator={false}
                        renderItem={renderCategoryItems}
                        onEndReachedThreshold={0.1}
                        keyExtractor={(item) => item.category}
                    />
                ) : null}
            </View>
            <View style={styles.body}>
                <FlatList
                    numColumns={2}
                    data={listImage}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <ItemOrder key={item.id} item={item} />}
                />
            </View>
            <View style={styles.secondaryView}>
                <StyledImageBackground source={Images.icons.rectangle} style={styles.rectangle}>
                    <StyledIcon source={Images.icons.bag_happy} size={35} customStyle={styles.icBag} />
                </StyledImageBackground>
                <TouchableOpacity style={styles.rowCart}>
                    <StyledText i18nText={'setting.viewCart'} customStyle={styles.textCart} />
                    <StyledText originValue={'（4）'} customStyle={styles.textCart} />
                </TouchableOpacity>
            </View>
            <View style={styles.saveView}>
                <StyledButton title={'common.save'} onPress={save} customStyle={styles.buttonSave} />
            </View>
        </View>
    );
};

export default OrderDefaultSettingScreen;

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: Themes.COLORS.lightGray,
    },
    categoryContainer: {
        paddingHorizontal: '20@s',
        marginTop: '10@vs',
        backgroundColor: Themes.COLORS.white,
    },
    body: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: Themes.COLORS.white,
    },
    buttonSave: {
        marginVertical: '20@vs',
        alignSelf: 'center',
    },
    contentView: {
        width: '100%',
        backgroundColor: Themes.COLORS.mercury,
        flexDirection: 'row',
        padding: '20@vs',
        justifyContent: 'space-between',
    },
    linear: {
        paddingVertical: '5@vs',
        borderRadius: 5,
        width: '90@s',
        marginRight: '15@s',
        borderColor: Themes.COLORS.primary,
        marginTop: '10@vs',
    },
    contentText: {
        width: '90%',
    },
    tabCategoryHeader: {
        alignItems: 'center',
        width: '90@s',
    },
    image: {
        width: (Metrics.screenWidth - scale(60)) / 2,
        height: (Metrics.screenWidth - scale(60)) / 2,
        backgroundColor: Themes.COLORS.gray,
        margin: '10@s',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        flexDirection: 'row',
        paddingBottom: '15@vs',
        paddingHorizontal: '6@s',
        borderWidth: 3,
        borderRadius: 5,
    },
    secondaryView: {
        backgroundColor: Themes.COLORS.secondary,
        alignItems: 'center',
        justifyContent: 'center',
        height: '56@vs',
    },
    rectangle: {
        width: '45@s',
        height: '45@s',
        position: 'absolute',
        left: 0,
        top: 0,
    },
    icBag: {
        marginTop: '3@vs',
        marginLeft: '2@s',
    },
    textCart: {
        fontWeight: 'bold',
        color: Themes.COLORS.white,
        fontSize: '18@ms0.3',
    },
    rowCart: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    saveView: {
        width: '100%',
        backgroundColor: Themes.COLORS.white,
    },
    name: {
        color: Themes.COLORS.white,
        fontWeight: 'bold',
        fontSize: '16@ms0.3',
    },
});
