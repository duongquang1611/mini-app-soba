import { RootState } from 'app-redux/hooks';
import Images from 'assets/images';
import Metrics from 'assets/metrics';
import { Themes } from 'assets/themes';
import { StyledIcon, StyledImage, StyledList, StyledText, StyledTouchable } from 'components/base';
import ModalizeManager from 'components/base/modal/ModalizeManager';
import StyledHeader from 'components/common/StyledHeader';
import TextUnderline from 'components/common/TextUnderline';
import { getResourcesData } from 'feature/home/HomeScreen';
import { ORDER_ROUTE } from 'navigation/config/routes';
import { goBack, navigate } from 'navigation/NavigationService';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ImageBackground, Linking, Text, View } from 'react-native';
import { scale, ScaledSheet } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import { funcFilterStatus, isIos, sumTotalAmount } from 'utilities/helper';
import { MODAL_ID, OrderTypeMenu, staticValue, stepGuide } from 'utilities/staticData';
import ButtonCart from './components/ButtonCart';
import ListViewSelect from './components/ListViewSelect';
import ModalDetailMenu from './components/ModalDetailMenu';

const ItemMenu = (props: any) => {
    const { order, orderType, setOrder } = props;
    let num = useRef(0).current;
    order?.dishes
        ?.filter((itemOrder: any) => itemOrder?.mainDish?.id === props?.item?.id)
        ?.forEach(async (rating: any) => {
            num += rating?.mainDish?.amount;
        });
    const isSetting = false;
    const gotoNew = () => {
        navigate(ORDER_ROUTE.DETAIL_MEAL, { id: props?.item?.id, isNew: true, orderType, setOrder });
    };
    return (
        <StyledTouchable onPress={num > 0 ? props?.goToDetailModal : gotoNew}>
            <ImageBackground
                source={{ uri: props?.item?.thumbnail }}
                style={[
                    styles.image,
                    {
                        borderColor: num > 0 ? Themes.COLORS.primary : Themes.COLORS.white,
                    },
                ]}
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
const StepItem = (item: any) => (
    <View style={item?.largeView ? [styles.rowStep, { height: scale(140) }] : styles.rowStep}>
        <View style={styles.numberView}>
            <StyledText originValue={item?.item?.index} customStyle={styles.numberValue} />
        </View>
        <StyledImage source={item?.item?.icon} customStyle={styles.icStep} />
        <View style={styles.containView}>
            <Text style={[styles.title, styles.textGuide]}>
                {item?.item?.name}
                <Text style={[styles.contentName, styles.textGuide]}>{item?.item?.contentName}</Text>
            </Text>
            <StyledText originValue={item?.item?.content} isBlack customStyle={styles.textGuide} />
            <View>
                <TextUnderline
                    onPress={() => Linking.openURL(item?.item?.link)}
                    title={item?.item?.textLink}
                    color={Themes.COLORS.primary}
                />
            </View>
        </View>
    </View>
);
const ModalGuide = () => (
    <View>
        <StyledImage source={Images.photo.line} customStyle={styles.line1} />
        <StyledImage source={Images.photo.line} customStyle={styles.line2} />
        <View>
            {stepGuide.map((item, index) => (
                <StepItem key={item.name} item={item} largeView={isIos && index === 2} />
            ))}
        </View>
    </View>
);

const MenuEditQrScreen = (props: any) => {
    const { orderType, order, setOrder } = props?.route?.params || { orderType: OrderTypeMenu.CART_ORDER };
    const { resource } = useSelector((state: RootState) => state);
    const [orderEditMenu, setOrderEditMenu] = useState(order);

    const { dishes } = orderEditMenu || [];
    const numOrder = sumTotalAmount(orderEditMenu);
    const { categories, menu } = resource?.data || {};
    const listEnableCategory: any[] = useMemo(() => funcFilterStatus(categories), [categories]);
    const modalize = ModalizeManager();
    const [category, setCategory] = useState<any>(listEnableCategory?.[0]?.id);
    const [listSubCategory, setListSubCategory] = useState<any>(
        funcFilterStatus(listEnableCategory?.[0]?.subCategories),
    );
    const menuList = useMemo(() => funcFilterStatus(menu), [menu]);
    const [recommendSelected, setRecommendSelected] = useState(listSubCategory?.[0]?.id);
    const onPressCategory = (item: any) => {
        setCategory(item.id);
        const newListCategory: any[] = funcFilterStatus(item?.subCategories);
        setListSubCategory(newListCategory);
        setRecommendSelected(newListCategory?.[0]?.id);
    };

    useEffect(() => {
        const categoryIds = listEnableCategory.map((item: any) => item?.id);
        if (categoryIds?.length > 0) {
            // item category is selecting not exist
            if (!categoryIds?.includes?.(category)) {
                onPressCategory(listEnableCategory[0]);
            } else {
                // item category is selecting exist
                const currentListCategories = listEnableCategory.find((item: any) => item?.id === category) || {};
                const newListSubCategories: any[] = funcFilterStatus(currentListCategories?.subCategories);
                const subCategoryIds = newListSubCategories.map((item: any) => item?.id);
                if (!subCategoryIds?.includes?.(recommendSelected) && subCategoryIds?.length > 0) {
                    setRecommendSelected(subCategoryIds?.[0]);
                }
                setListSubCategory(newListSubCategories);
            }
        }
    }, [listEnableCategory]);

    const onPressRecommend = (item: any) => {
        setRecommendSelected(item.id);
    };

    const gotoCart = () => {
        // navigate(ORDER_ROUTE., { orderType, setOrder, order });
        goBack();
    };
    const showModal = () => {
        modalize.show(
            MODAL_ID.ORDER_GUIDE,
            <ModalGuide />,
            {
                modalHeight: isIos ? scale(425) + Metrics.safeBottomPadding : scale(465) + Metrics.safeBottomPadding,
                scrollViewProps: {
                    contentContainerStyle: { flexGrow: 1 },
                },
            },
            { title: 'order.orderGuide' },
        );
    };
    const setAllOrderEdit = (order: any) => {
        setOrder(order);
        setOrderEditMenu(order);
    };
    const showModalDetail = (id: any) => {
        const numberItemListCoupon = dishes?.filter((item: any) => item?.mainDish?.id === id)?.length || 0;
        const point = numberItemListCoupon <= 3 ? numberItemListCoupon * 60 + 300 : Metrics.screenHeight * 0.8;

        modalize.show(
            MODAL_ID.DETAIL_MENU,
            <ModalDetailMenu
                orderType={orderType}
                dishes={dishes}
                id={id}
                closeModal={() => modalize.dismiss(MODAL_ID.DETAIL_MENU)}
                setOrder={setAllOrderEdit}
                order={orderEditMenu}
            />,
            {
                modalHeight: Metrics.screenHeight * 0.8,
                snapPoint: point,
                scrollViewProps: {
                    contentContainerStyle: { flexGrow: 1 },
                },
            },
            { title: 'order.editCouponTitle' },
        );
    };

    const menuFilter = menuList?.filter((item: any) => {
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
                // hasBack={false}
                largeTitleHeader
            />
            <View style={styles.categoryContainer}>
                <ListViewSelect
                    onPressCategory={onPressCategory}
                    data={funcFilterStatus(categories)}
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
                <StyledList
                    numColumns={2}
                    data={menuFilter}
                    keyExtractor={(item: any) => item.id}
                    renderItem={({ item }: any) => (
                        <ItemMenu
                            orderType={orderType}
                            order={orderEditMenu}
                            setOrder={setAllOrderEdit}
                            goToDetailModal={() => showModalDetail(item?.id)}
                            key={item.id}
                            item={item}
                        />
                    )}
                    onRefresh={getResourcesData}
                    refreshing={false}
                />
            </View>
            {numOrder > staticValue.MAX_ORDER && (
                <View style={styles.quantityErrView}>
                    <StyledText i18nText={'order.errorMaxOrder'} customStyle={styles.quantityErr} />
                </View>
            )}
            {numOrder > 0 && <ButtonCart goToSaveOrder={gotoCart} amountValue={numOrder} numOrder={numOrder} isMenu />}
        </View>
    );
};

export default MenuEditQrScreen;

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
        width: '220@s',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    icStep: {
        width: '80@vs',
        height: '80@vs',
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
        height: isIos ? '120@s' : '140@s',
        justifyContent: 'space-between',
    },
    line1: {
        position: 'absolute',
        width: 2,
        height: isIos ? '70@s' : '90@s',
        left: '32@s',
        top: isIos ? '85@s' : '95@s',
    },
    line2: {
        position: 'absolute',
        width: 2,
        height: isIos ? '80@s' : '90@s',
        left: '32@s',
        top: isIos ? '205@s' : '235@s',
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
        width: (Metrics.screenWidth - scale(40)) / 2,
        height: (Metrics.screenWidth - scale(40)) / 2,
        backgroundColor: Themes.COLORS.white,
        margin: '5@s',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        flexDirection: 'row',
        paddingBottom: '15@vs',
        paddingHorizontal: '6@s',
        borderWidth: 3,
        borderRadius: 7,
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
    textLink: {
        backgroundColor: Themes.COLORS.primary,
    },
    textGuide: {
        lineHeight: scale(24),
    },
});
