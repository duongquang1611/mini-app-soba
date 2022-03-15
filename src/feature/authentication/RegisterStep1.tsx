/* eslint-disable @typescript-eslint/no-unused-vars */
import { updateGlobalData } from 'app-redux/slices/globalDataSlice';
import Images from 'assets/images';
import Metrics from 'assets/metrics';
import { Themes } from 'assets/themes';
import { StyledButton, StyledIcon, StyledImage, StyledText } from 'components/base';
import LinearView from 'components/common/LinearView';
import StyledHeader from 'components/common/StyledHeader';
import { AUTHENTICATE_ROUTE } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { scale, ScaledSheet } from 'react-native-size-matters';
import { useDispatch } from 'react-redux';

const list = [
    { category: 'all' },
    { category: 'category1' },
    { category: 'category2' },
    { category: 'category3' },
    { category: 'category4' },
];
const listImage = [
    {
        id: 1,
        img: 'https://image.shutterstock.com/image-photo/wild-tropical-pulasan-fruit-nephelium-600w-2028303242.jpg',
    },
    {
        id: 2,
        img: 'https://image.shutterstock.com/image-photo/wild-tropical-pulasan-fruit-nephelium-600w-2028303242.jpg',
    },
    {
        id: 3,
        img: 'https://image.shutterstock.com/image-photo/wild-tropical-pulasan-fruit-nephelium-600w-2028303242.jpg',
    },
    {
        id: 4,
        img: 'https://image.shutterstock.com/image-photo/wild-tropical-pulasan-fruit-nephelium-600w-2028303242.jpg',
    },
    {
        id: 5,
        img: 'https://image.shutterstock.com/image-photo/wild-tropical-pulasan-fruit-nephelium-600w-2028303242.jpg',
    },
    {
        id: 6,
        img: 'https://image.shutterstock.com/image-photo/wild-tropical-pulasan-fruit-nephelium-600w-2028303242.jpg',
    },
    {
        id: 7,
        img: 'https://image.shutterstock.com/image-photo/wild-tropical-pulasan-fruit-nephelium-600w-2028303242.jpg',
    },
    {
        id: 8,
        img: 'https://image.shutterstock.com/image-photo/wild-tropical-pulasan-fruit-nephelium-600w-2028303242.jpg',
    },
];
const RegisterStep1 = () => {
    const dispatch = useDispatch();
    const goToRegis = () => {
        navigate(AUTHENTICATE_ROUTE.REGISTER_STEP_2);
    };
    const [categoryRef, setCategoryRef] = useState(useRef());
    const [category, setCategory] = useState('');
    const [selected, setSelected] = useState();
    const onPressCategory = (item: any) => {
        setCategory(item.category);
        setSelected(item.category);
    };

    useEffect(() => {
        dispatch(updateGlobalData({ viewedOrderDefault: true }));
    }, []);

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
                            fontWeight: 'bold',
                            color: selected === item.category ? Themes.COLORS.white : Themes.COLORS.primary,
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
            <StyledHeader title={'register'} hasBack={false} />
            <View style={styles.contentView}>
                <StyledIcon source={Images.icons.selected} size={15} />
                <StyledText customStyle={styles.contentText} i18nText={'text'} />
            </View>
            <View style={styles.categoryContainer}>
                {list.length > 1 ? (
                    <FlatList
                        // ref={(e) => {
                        //     setCategoryRef(e);
                        // }}
                        horizontal
                        data={list}
                        showsHorizontalScrollIndicator={false}
                        renderItem={renderCategoryItems}
                        // ListFooterComponent={this.renderFooter}
                        // refreshing={refreshing}
                        // onEndReached={this.fetchMoreDay}
                        onEndReachedThreshold={0.1}
                        keyExtractor={(item) => item.category}
                        // onScrollToIndexFailed={(info) => {
                        //     wait(500).then(() => {
                        //         categoryRef?.scrollToIndex({
                        //             index: info.index,
                        //             animated: true,
                        //         });
                        //     });
                        // }}
                    />
                ) : null}
            </View>
            <View style={styles.body}>
                <FlatList
                    numColumns={2}
                    data={listImage}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity key={item.id}>
                            <StyledImage source={{ uri: item.img }} customStyle={styles.image} />
                        </TouchableOpacity>
                    )}
                />
                <StyledButton title={'confirm'} onPress={goToRegis} customStyle={styles.buttonSave} />
            </View>
        </View>
    );
};

export default RegisterStep1;

const styles = ScaledSheet.create({
    container: {
        flex: 1,
    },
    categoryContainer: {
        paddingHorizontal: '20@s',
    },
    body: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        marginHorizontal: '10@s',
    },
    buttonSave: {
        marginVertical: '20@vs',
    },
    contentView: {
        width: '100%',
        backgroundColor: Themes.COLORS.mercury,
        flexDirection: 'row',
        padding: '20@vs',
        justifyContent: 'space-between',
    },
    linear: {
        paddingVertical: '8@vs',
        borderRadius: 5,
        width: '90@s',
        marginRight: '5@s',
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
    },
});
