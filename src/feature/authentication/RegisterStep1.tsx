import { getMenu } from 'api/modules/api-app/order';
import { RootState } from 'app-redux/hooks';
import { updateGlobalData } from 'app-redux/slices/globalDataSlice';
import { store } from 'app-redux/store';
import Images from 'assets/images';
import Metrics from 'assets/metrics';
import { Themes } from 'assets/themes';
import { StyledButton, StyledIcon, StyledText, StyledTouchable } from 'components/base';
import AlertMessage from 'components/base/AlertMessage';
import ModalizeManager from 'components/base/modal/ModalizeManager';
import StyledHeader from 'components/common/StyledHeader';
import ListViewSelect from 'feature/order/components/ListViewSelect';
import ModalDetailMenu from 'feature/order/components/ModalDetailMenu';
import { ORDER_ROUTE } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React, { useEffect, useRef, useState } from 'react';
import { ImageBackground, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { scale, ScaledSheet, verticalScale } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import { sumTotalAmount } from 'utilities/helper';
import { MenuType, MODAL_ID, staticValue } from 'utilities/staticData';

const ItemMenu = (props: any) => {
    const { orderDefault } = useSelector((state: RootState) => state.order);
    let num = useRef(0).current;
    orderDefault?.dishes
        ?.filter((itemOrder: any) => itemOrder?.mainDish?.id === props?.item?.id)
        ?.forEach(async (rating: any) => {
            num += rating?.mainDish?.amount;
        });
    const isSetting = false;
    const gotoNew = () => {
        navigate(ORDER_ROUTE.DETAIL_MEAL, { id: props?.item?.id, isNew: true });
    };
    return (
        <StyledTouchable onPress={num > 0 ? props?.goToDetailModal : gotoNew}>
            <ImageBackground
                imageStyle={styles.imageBorder}
                source={{ uri: props?.item?.thumbnail }}
                style={[styles.image, { borderColor: num > 0 ? Themes.COLORS.primary : Themes.COLORS.white }]}
            >
                <StyledText originValue={props?.item?.title} numberOfLines={1} customStyle={styles.name} />
                {num > 0 && isSetting ? <StyledIcon source={Images.icons.tick} size={20} /> : null}
                {num && !isSetting ? (
                    <View style={styles.numberChooseView}>
                        <StyledText originValue={`${num}`} customStyle={styles.numberChoose} />
                    </View>
                ) : null}
            </ImageBackground>
        </StyledTouchable>
    );
};
const RegisterStep1 = () => {
    const { orderDefault } = useSelector((state: RootState) => state.order);
    const { dishes } = orderDefault || [];
    const numOrder = sumTotalAmount(orderDefault);
    const { resource } = store.getState();
    const { categories, menu } = resource?.resource?.data || {};
    const listEnableCategory = categories?.filter((item: any) => item?.status === MenuType.ENABLE);
    const modalize = ModalizeManager();
    const [menuList, setMenu] = useState(menu);
    const [category, setCategory] = useState<any>(listEnableCategory?.[0]?.id);
    const [listSubCategory, setListSubCategory] = useState<any>(
        listEnableCategory?.[0]?.subCategories?.filter((item: any) => item?.status === MenuType.ENABLE),
    );
    const [recommendSelected, setRecommendSelected] = useState(listSubCategory?.[0]?.id);
    const dispatch = useDispatch();
    useEffect(() => {
        getMenuList();
        dispatch(updateGlobalData({ viewedOrderDefault: true }));
    }, []);
    const getMenuList = async () => {
        try {
            const res = await getMenu();
            setMenu(res?.data?.filter((item: any) => item?.status === MenuType.ENABLE));
        } catch (error) {
            console.log('getMenuList -> error', error);
            AlertMessage(error);
        }
    };
    const onPressCategory = (item: any) => {
        setCategory(item.id);
        const newListCategory = item?.subCategories?.filter((item: any) => item?.status === MenuType.ENABLE);
        setListSubCategory(newListCategory);
        setRecommendSelected(newListCategory?.[0]?.id);
    };
    const onPressRecommend = (item: any) => {
        setRecommendSelected(item.id);
    };
    const numberItemListCoupon = dishes?.length;
    const showModalDetail = (id: any) => {
        modalize.show(
            MODAL_ID.DETAIL_MENU,
            <ModalDetailMenu dishes={dishes} id={id} closeModal={() => modalize.dismiss(MODAL_ID.DETAIL_MENU)} />,
            {
                modalHeight: verticalScale(numberItemListCoupon * 60 + 300),
                scrollViewProps: {
                    contentContainerStyle: { flexGrow: 1 },
                },
            },
            { title: 'order.editCouponTitle' },
        );
    };

    const menuFilter = menuList.filter((item: any) => {
        if (category) {
            const check = item?.category?.find((itemCate: any) => itemCate?.categoryId === category);
            if (!check?.categoryId) return false;
        }
        if (recommendSelected) {
            const check = item?.subCategory?.find(
                (itemSubCate: any) => itemSubCate?.subCategoryId === recommendSelected,
            );
            if (!check?.subCategoryId) return false;
        }
        return item;
    });
    const skipOrderDefault = () => {
        dispatch(updateGlobalData({ skipOrderDefault: true }));
    };

    return (
        <View style={styles.container}>
            <StyledHeader
                onPressRight={skipOrderDefault}
                title={'setting.orderDefaultTitle'}
                textRight={'authen.register.skipOrderDefault'}
                hasBack={false}
                largeTitleHeader
            />
            <View style={styles.categoryContainer}>
                <ListViewSelect
                    onPressCategory={onPressCategory}
                    data={categories?.filter((item: any) => item?.status === MenuType.ENABLE)}
                    category={category}
                    isCategory
                />
            </View>
            {listSubCategory?.length > 0 && (
                <View style={styles.recommendContainer}>
                    <ListViewSelect
                        recommendSelected={recommendSelected}
                        onPressCategory={onPressRecommend}
                        data={listSubCategory}
                        category={category}
                    />
                </View>
            )}

            <View style={styles.body}>
                <FlatList
                    numColumns={2}
                    data={menuFilter}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <ItemMenu goToDetailModal={() => showModalDetail(item?.id)} key={item.id} item={item} />
                    )}
                />
            </View>
            {numOrder > staticValue.MAX_ORDER && (
                <View style={styles.quantityErrView}>
                    <StyledText i18nText={'order.errorMaxOrder'} customStyle={styles.quantityErr} />
                </View>
            )}
            <View style={styles.buttonSave}>
                <StyledButton title={'common.save'} />
            </View>
        </View>
    );
};

export default RegisterStep1;

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: Themes.COLORS.lightGray,
    },
    categoryContainer: {
        marginTop: '10@vs',
        paddingVertical: '10@vs',
        backgroundColor: Themes.COLORS.white,
    },
    recommendContainer: {
        backgroundColor: Themes.COLORS.white,
        marginTop: '-5@vs',
    },
    body: {
        justifyContent: 'center',
        flex: 1,
        backgroundColor: Themes.COLORS.white,
        paddingHorizontal: '10@s',
    },
    buttonSave: {
        paddingVertical: '20@vs',
        marginBottom: Metrics.safeBottomPadding,
        backgroundColor: Themes.COLORS.white,
        alignItems: 'center',
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
        marginRight: '15@s',
        borderColor: Themes.COLORS.primary,
    },
    contentText: {
        width: '90%',
    },
    title: {
        color: Themes.COLORS.secondary,
        fontWeight: 'bold',
        fontSize: '16@ms0.3',
    },
    contentName: {
        fontWeight: 'normal',
        color: Themes.COLORS.textSecondary,
        fontSize: '14@ms0.3',
    },
    containView: {
        width: '200@s',
        justifyContent: 'space-between',
    },
    icStep: {
        marginRight: '20@s',
    },
    numberView: {
        width: '24@s',
        height: '24@s',
        backgroundColor: Themes.COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 24,
    },
    numberValue: {
        color: Themes.COLORS.white,
    },
    rowStep: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: '20@s',
        height: '100@s',
        justifyContent: 'space-between',
    },
    line1: {
        position: 'absolute',
        width: 2,
        height: '55@s',
        left: '32@s',
        top: '70@s',
    },
    line2: {
        position: 'absolute',
        width: 2,
        height: '55@s',
        left: '32@s',
        top: '175@s',
    },
    tabCategoryHeader: {
        alignItems: 'center',
        width: '90@s',
    },
    tabRecommendHeader: {
        alignItems: 'center',
        marginRight: '10@s',
        padding: '10@vs',
        paddingVertical: '8@vs',
        borderWidth: 1,
        borderColor: Themes.COLORS.secondary,
        borderRadius: 50,
        marginVertical: '10@vs',
    },
    image: {
        width: (Metrics.screenWidth - scale(50)) / 2,
        height: (Metrics.screenWidth - scale(50)) / 2,
        backgroundColor: Themes.COLORS.white,
        margin: '5@s',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        flexDirection: 'row',
        paddingBottom: '15@vs',
        paddingHorizontal: '6@s',
        borderWidth: 3,
        borderRadius: 5,
        overflow: 'hidden',
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
    numberChoose: {
        color: Themes.COLORS.headerBackground,
    },
    numberChooseView: {
        position: 'absolute',
        top: '10@s',
        right: '10@s',
        width: '20@s',
        height: '20@s',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Themes.COLORS.primary,
        borderRadius: 15,
    },
    row: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    buttonCategory: {
        width: '20@s',
        alignItems: 'center',
    },
    buttonPre: {
        transform: [{ rotate: '180deg' }],
    },
    buttonSubCategory: {
        tintColor: Themes.COLORS.secondary,
    },
    imageBorder: { borderRadius: 5 },
    quantityErr: {
        color: Themes.COLORS.primary,
    },
    quantityErrView: {
        color: Themes.COLORS.white,
        padding: '10@vs',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
});
