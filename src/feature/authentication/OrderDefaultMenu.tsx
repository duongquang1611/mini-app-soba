import { getMenu } from 'api/modules/api-app/order';
import { RootState } from 'app-redux/hooks';
import { updateGlobalData } from 'app-redux/slices/globalDataSlice';
import { updateDefaultOrder, updateDefaultOrderLocal } from 'app-redux/slices/orderSlice';
import Images from 'assets/images';
import Metrics from 'assets/metrics';
import { Themes } from 'assets/themes';
import { StyledButton, StyledIcon, StyledList, StyledText, StyledTouchable } from 'components/base';
import ModalizeManager from 'components/base/modal/ModalizeManager';
import { StyledImageBackground } from 'components/base/StyledImage';
import StyledKeyboardAware from 'components/base/StyledKeyboardAware';
import StyledHeader from 'components/common/StyledHeader';
import ButtonCart from 'feature/order/components/ButtonCart';
import ListViewSelect from 'feature/order/components/ListViewSelect';
import ModalDetailMenu from 'feature/order/components/ModalDetailMenu';
import ModalGuideMenu from 'feature/order/components/ModalGuideMenu';
import useBackHandler from 'hooks/useBackHandler';
import { APP_ROUTE, HOME_ROUTE, ORDER_ROUTE, SETTING_ROUTE } from 'navigation/config/routes';
import { navigate, reset } from 'navigation/NavigationService';
import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { scale, ScaledSheet, verticalScale } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import { checkHasDataOrder, checkSameData, isIos, sumTotalAmount } from 'utilities/helper';
import { MenuType, MODAL_ID, OrderTypeMenu, staticValue } from 'utilities/staticData';

const ItemMenu = (props: any) => {
    const { order, setOrder } = props;
    let num = useRef(0).current;
    order?.dishes
        ?.filter((itemOrder: any) => itemOrder?.mainDish?.id === props?.item?.id)
        ?.forEach(async (rating: any) => {
            num += rating?.mainDish?.amount;
        });
    const isSetting = false;
    const gotoNew = () => {
        navigate(ORDER_ROUTE.DETAIL_MEAL, {
            id: props?.item?.id,
            isNew: true,
            isDefaultOrder: true,
            order,
            setOrder,
        });
    };
    return (
        <StyledTouchable onPress={num > 0 ? props?.goToDetailModal : gotoNew}>
            <StyledImageBackground
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
            </StyledImageBackground>
        </StyledTouchable>
    );
};
const OrderDefaultMenu = (props: any) => {
    const { screen } = props?.route?.params || {};
    const checkHomeScreen = screen === HOME_ROUTE.HOME || screen === SETTING_ROUTE.ORDER_DEFAULT_SETTING;
    const dispatch = useDispatch();
    const {
        order: { defaultOrder, defaultOrderLocal },
        resource,
    } = useSelector((state: RootState) => state);
    const [orderDefault, setOrderDefault] = useState(defaultOrder);
    const { dishes } = orderDefault || [];
    const numOrder = sumTotalAmount(orderDefault);
    const { categories, menu } = resource?.data || {};
    const listEnableCategory = categories?.filter((item: any) => item?.status === MenuType.ENABLE);
    const modalize = ModalizeManager();
    const [menuList, setMenu] = useState(menu);
    const [category, setCategory] = useState<any>(listEnableCategory?.[0]?.id);
    const [listSubCategory, setListSubCategory] = useState<any>(
        listEnableCategory?.[0]?.subCategories?.filter((item: any) => item?.status === MenuType.ENABLE),
    );
    const [recommendSelected, setRecommendSelected] = useState(listSubCategory?.[0]?.id);

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
            <ModalDetailMenu
                isDefaultOrder={true}
                dishes={dishes}
                id={id}
                closeModal={() => modalize.dismiss(MODAL_ID.DETAIL_MENU)}
                order={orderDefault}
                orderType={OrderTypeMenu.DEFAULT_ORDER}
                setOrder={setOrderDefault}
            />,
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
        reset(APP_ROUTE.MAIN_TAB);
    };
    const gotoCart = () => {
        navigate(ORDER_ROUTE.CART, {
            isDefaultOrder: true,
            setOrder: setOrderDefault,
            order: orderDefault,
            screen,
            orderType: OrderTypeMenu.DEFAULT_ORDER,
        });
    };
    const saveDefaultOrder = () => {
        dispatch(updateDefaultOrder(orderDefault));
        if (!checkHasDataOrder(defaultOrderLocal) || checkSameData(defaultOrder, defaultOrderLocal)) {
            dispatch(updateDefaultOrderLocal(orderDefault));
        }
        dispatch(updateGlobalData({ skipOrderDefault: true }));
        if (!screen) {
            reset(APP_ROUTE.MAIN_TAB);
        } else {
            navigate(ORDER_ROUTE.ORDER_QR_CODE, { orderType: OrderTypeMenu.DEFAULT_ORDER, saveOrder: true });
        }
    };
    const handleBack = () => {
        return !checkHomeScreen;
    };
    const showModal = () => {
        modalize.show(
            MODAL_ID.ORDER_GUIDE,
            <ModalGuideMenu />,
            {
                modalHeight: isIos ? scale(425) + Metrics.safeBottomPadding : scale(465) + Metrics.safeBottomPadding,
                scrollViewProps: {
                    contentContainerStyle: { flexGrow: 1 },
                },
            },
            { title: 'order.orderGuide' },
        );
    };
    useBackHandler(handleBack);

    return (
        <>
            {checkHomeScreen ? (
                <StyledHeader
                    onPressRight={showModal}
                    title={'setting.orderDefaultTitle'}
                    iconRight={Images.icons.question}
                    largeTitleHeader
                />
            ) : (
                <StyledHeader
                    onPressRight={skipOrderDefault}
                    title={'setting.orderDefaultTitle'}
                    textRight={'authen.register.skipOrderDefault'}
                    hasBack={false}
                    largeTitleHeader
                />
            )}
            <View style={styles.container}>
                <StyledKeyboardAware customStyle={styles.contentContainer}>
                    {!checkHomeScreen ? (
                        <View style={styles.rowContent}>
                            <StyledIcon customStyle={styles.icQuestion} source={Images.icons.question} size={20} />
                            <StyledText
                                i18nText={'authen.register.contentOrderDefault'}
                                customStyle={styles.contentName}
                            />
                        </View>
                    ) : (
                        <View style={styles.grayView} />
                    )}
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
                        <StyledList
                            numColumns={2}
                            data={menuFilter}
                            keyExtractor={(item: any) => item.id}
                            renderItem={({ item }: any) => (
                                <ItemMenu
                                    goToDetailModal={() => showModalDetail(item?.id)}
                                    key={item.id}
                                    item={item}
                                    order={orderDefault}
                                    setOrder={setOrderDefault}
                                />
                            )}
                            customStyle={styles.contentContainer}
                            noDataText={'common.menuNoData'}
                        />
                    </View>
                </StyledKeyboardAware>
                {numOrder > staticValue.MAX_ORDER && (
                    <View style={styles.quantityErrView}>
                        <StyledText i18nText={'order.errorMaxOrder'} customStyle={styles.quantityErr} />
                    </View>
                )}
                {numOrder > 0 && (
                    <ButtonCart goToSaveOrder={gotoCart} amountValue={numOrder} numOrder={numOrder} isMenu />
                )}
                <View style={styles.buttonSave}>
                    <StyledButton
                        disabled={numOrder > staticValue.MAX_ORDER || numOrder === 0}
                        title={'common.save'}
                        onPress={saveDefaultOrder}
                    />
                </View>
            </View>
        </>
    );
};

export default OrderDefaultMenu;

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: Themes.COLORS.white,
    },
    categoryContainer: {
        paddingVertical: '15@vs',
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
        paddingVertical: '10@vs',
        paddingBottom: verticalScale(20) + Metrics.safeBottomPadding,
        backgroundColor: Themes.COLORS.white,
        alignItems: 'center',
        marginTop: '-10@vs',
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
        color: Themes.COLORS.textSecondary,
        width: '90%',
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
    rowContent: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: '20@s',
        paddingVertical: '15@vs',
        backgroundColor: Themes.COLORS.lightGray,
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
    icQuestion: {
        tintColor: Themes.COLORS.silver,
    },
    grayView: {
        backgroundColor: Themes.COLORS.lightGray,
        height: '10@vs',
    },
    contentContainer: {
        flexGrow: 1,
    },
});
