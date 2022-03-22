import { useNavigation } from '@react-navigation/native';
import { getMenu } from 'api/modules/api-app/order';
import { RootState } from 'app-redux/hooks';
import { store } from 'app-redux/store';
import Images from 'assets/images';
import Metrics from 'assets/metrics';
import { Themes } from 'assets/themes';
import { StyledIcon, StyledImage, StyledText, StyledTouchable } from 'components/base';
import AlertMessage from 'components/base/AlertMessage';
import ModalizeManager from 'components/base/modal/ModalizeManager';
import StyledHeader from 'components/common/StyledHeader';
import { TAB_NAVIGATION_ROOT } from 'navigation/config/routes';
import React, { useEffect, useRef, useState } from 'react';
import { ImageBackground, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { scale, ScaledSheet, verticalScale } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import { logger } from 'utilities/helper';
import { MODAL_ID, staticValue, stepGuide } from 'utilities/staticData';
import ButtonCart from './components/ButtonCart';
import ListViewSelect from './components/ListViewSelect';
import ModalDetailMenu from './components/ModalDetailMenu';

const ItemMenu = (props: any) => {
    const { saveOrder } = useSelector((state: RootState) => state.order);
    let num = useRef(0).current;
    saveOrder?.dishes
        ?.filter((itemOrder: any) => itemOrder?.mainDish?.id === props?.item?.id)
        ?.forEach(async (rating: any) => {
            num += rating?.mainDish?.amount;
        });
    const isSetting = false;
    const gotoNew = () => {
        props?.navigation.navigate(TAB_NAVIGATION_ROOT.ORDER_ROUTE.DETAIL_MEAL, { id: props?.item?.id, isNew: true });
    };
    return (
        <StyledTouchable onPress={num > 0 ? props?.goToDetailModal : gotoNew}>
            <ImageBackground
                imageStyle={styles.imageBorder}
                source={{ uri: props?.item?.thumbnail }}
                style={[styles.image, { borderColor: num > 0 ? Themes.COLORS.primary : Themes.COLORS.white }]}
            >
                <StyledText originValue={props?.item?.title} customStyle={styles.name} />
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
const StepItem = (item: any) => (
    <View style={styles.rowStep}>
        <View style={styles.numberView}>
            <StyledText originValue={item?.item?.index} customStyle={styles.numberValue} />
        </View>
        <StyledIcon source={item?.item?.icon} size={80} customStyle={styles.icStep} />
        <View style={styles.containView}>
            <Text style={styles.title}>
                {item?.item?.name}
                <Text style={styles.contentName}>{item?.item?.contentName}</Text>
            </Text>
            <StyledText originValue={item?.item?.content} isBlack />
        </View>
    </View>
);
const ModalGuide = () => (
    <View>
        <StyledImage source={Images.photo.line} customStyle={styles.line1} />
        <StyledImage source={Images.photo.line} customStyle={styles.line2} />
        <View>
            {stepGuide.map((item) => (
                <StepItem key={item.name} item={item} />
            ))}
        </View>
    </View>
);
const MenuScreen = () => {
    const { saveOrder } = useSelector((state: RootState) => state.order);
    const { dishes } = saveOrder || [];
    let numOrder = useRef(0).current;
    saveOrder?.dishes?.forEach(async (rating: any) => {
        numOrder += rating?.totalAmount;
    });
    const { resource } = store.getState();
    const { categories, menu } = resource?.resource?.data;
    const modalize = ModalizeManager();
    const [menuList, setMenu] = useState(menu);
    const [category, setCategory] = useState<any>();
    const [listSubCategory, setListSubCategory] = useState<any>([]);
    const [recommendSelected, setRecommendSelected] = useState(null);

    useEffect(() => {
        getMenuList();
    }, []);

    const getMenuList = async () => {
        try {
            const res = await getMenu();
            setMenu(res?.data);
        } catch (error) {
            logger(error);
            AlertMessage(error);
        }
    };
    const onPressCategory = (item: any) => {
        setCategory(item.id);
        setListSubCategory(item.subCategories);
        setRecommendSelected(null);
    };
    const onPressRecommend = (item: any) => {
        setRecommendSelected(item.id);
    };
    const gotoCart = () => {
        navigation.navigate(TAB_NAVIGATION_ROOT.ORDER_ROUTE.CART);
    };
    const showModal = () => {
        modalize.show(
            MODAL_ID.ORDER_GUIDE,
            <ModalGuide />,
            {
                modalHeight: verticalScale(420),
                scrollViewProps: {
                    contentContainerStyle: { flexGrow: 1 },
                },
            },
            { title: 'order.editCouponTitle' },
        );
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

    const navigation = useNavigation();
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

    return (
        <View style={styles.container}>
            <StyledHeader
                onPressRight={showModal}
                title={'order.menuTitle'}
                iconRight={Images.icons.question}
                hasBack={false}
                largeTitleHeader
            />
            <View style={styles.categoryContainer}>
                <ListViewSelect onPressCategory={onPressCategory} data={categories} category={category} isCategory />
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
                        <ItemMenu
                            goToDetailModal={() => showModalDetail(item?.id)}
                            navigation={navigation}
                            key={item.id}
                            item={item}
                        />
                    )}
                />
            </View>
            <ButtonCart
                checkDisable={numOrder > staticValue.MAX_ORDER}
                goToSaveOrder={gotoCart}
                amountValue={numOrder}
                numOrder={numOrder}
                isMenu
            />
        </View>
    );
};

export default MenuScreen;

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
    numberChoose: {
        color: Themes.COLORS.white,
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
});
