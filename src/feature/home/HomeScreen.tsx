import { getCouponList } from 'api/modules/api-app/coupon';
import { getNewsList } from 'api/modules/api-app/home';
import { getNotificationList } from 'api/modules/api-app/notification';
import { getMenu } from 'api/modules/api-app/order';
import { RootState } from 'app-redux/hooks';
import { updateCoupon } from 'app-redux/slices/couponSlice';
import { updateChooseBranch, updateMenu, updateNotificationUnRead } from 'app-redux/slices/globalDataSlice';
import { updateGlobalDataUnSave } from 'app-redux/slices/globalDataUnSaveSlice';
import { store } from 'app-redux/store';
import Images from 'assets/images';
import Metrics from 'assets/metrics';
import { Themes } from 'assets/themes';
import { StyledIcon, StyledImage, StyledText } from 'components/base';
import AlertMessage from 'components/base/AlertMessage';
import { StyledImageBackground } from 'components/base/StyledImage';
import StyledKeyboardAware from 'components/base/StyledKeyboardAware';
import ModalizeManager from 'components/base/modal/ModalizeManager';
import BtnChooseRestaurants from 'components/common/BtnChooseRestaurants';
import StyledHeaderImage from 'components/common/StyledHeaderImage';
import StyledTabTopView from 'components/common/StyledTabTopView';
import { getResourcesData } from 'hooks/useNetwork';
import { SIZE_LIMIT } from 'hooks/usePaging';
import { navigate } from 'navigation/NavigationService';
import { APP_ROUTE, HOME_ROUTE, STAMP_ROUTE } from 'navigation/config/routes';
import React, { FunctionComponent, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RefreshControl, View } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { ScaledSheet, scale, verticalScale } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import { QR_TAB_TYPE } from 'utilities/enumData';
import {
    generateCheckInQR,
    generateNewOrder,
    generateOrderQR,
    getConfig,
    getIndexTab,
    openURL,
} from 'utilities/helper';
import { useOnesignal } from 'utilities/notification';
import {
    CONFIG_KEYS,
    CouponStoreKeyByStatus,
    MODAL_ID,
    MenuType,
    OrderType,
    POPUP_TYPE,
    TabCouponStatus,
    staticValue,
} from 'utilities/staticData';
import ChooseCouponTab from './components/ChooseCouponTab';
import ListNewsItem from './components/ListNewsItem';
import ModalGuideCheckIn from './components/ModalGuideCheckIn';
import ShowQrTab from './components/ShowQrTab';

const netWorkItem = (data: any) => {
    const { index, item } = data;
    return (
        <TouchableOpacity
            onPress={() => openURL(item?.link)}
            style={[styles.netWorkView, { marginLeft: index === 0 ? scale(20) : 0 }]}
        >
            <StyledIcon resizeMode={'cover'} source={{ uri: item?.image }} size={30} customStyle={styles.iconNetwork} />
            <StyledText originValue={item?.title} isBlack />
        </TouchableOpacity>
    );
};

export const showModalRequireLogin = () => {
    AlertMessage('common.requireLogin', {
        type: POPUP_TYPE.CONFIRM,
        textButtonCancel: 'common.cancel',
        onOk: () => store.dispatch(updateGlobalDataUnSave({ withoutAccount: false })),
    });
};

export const getCouponData = async (status?: TabCouponStatus) => {
    try {
        const { token }: any = store.getState().userInfo;
        if (!token) return;
        if (status) {
            const res = await getCouponList({ params: { take: SIZE_LIMIT, status } });
            store.dispatch(updateCoupon({ [CouponStoreKeyByStatus[status]]: res?.data }));
        } else {
            const res = await Promise.all([
                getCouponList({ params: { take: SIZE_LIMIT, status: TabCouponStatus.CAN_USE } }),
                getCouponList({ params: { take: SIZE_LIMIT, status: TabCouponStatus.USED } }),
            ]);
            store.dispatch(
                updateCoupon({
                    couponsCanUse: res?.[0].data,
                    couponsUsed: res?.[1].data,
                }),
            );
        }
    } catch (error) {
        console.log('getCouponData -> error', error);
    }
};

export const getMenuData = async () => {
    try {
        const {
            globalData: { chooseBranch },
        } = store.getState();
        const { token }: any = store.getState().userInfo;
        if (!token || !chooseBranch?.id) return;
        const res = await getMenu(chooseBranch?.id);
        store.dispatch(updateMenu(res?.data?.filter((item: any) => item?.status === MenuType.ENABLE)));
    } catch (error) {
        console.log('getCouponData -> error', error);
    }
};

const HomeScreen: FunctionComponent = () => {
    useOnesignal();
    const { t } = useTranslation();
    const {
        order,
        userInfo,
        resource,
        globalData: { chooseBranch, listRestaurants },
        globalDataUnSave: { withoutAccount },
    } = useSelector((state: RootState) => state);
    const { banners = [], sns = [] } = resource?.data || {};
    const branchId = chooseBranch?.id;
    // const storeUrl = getConfig(CONFIG_KEYS.WEB_PAGE);
    const newsDisplay = Number(getConfig(CONFIG_KEYS.NEWS_DISPLAY));
    const { user } = userInfo;
    const { frequentlyUsedRestaurantId } = user?.member || {};

    const { mobileOrder, defaultOrderLocal } = order;
    const newOrderMobile = useMemo(() => generateNewOrder(mobileOrder, user), [mobileOrder, user]);
    const newOrderDefault = useMemo(
        () => generateNewOrder(defaultOrderLocal, user, OrderType.DEFAULT_HOME),
        [defaultOrderLocal, user],
    );
    const mobileOrderQR = useMemo(() => generateOrderQR(mobileOrder, user), [mobileOrder, user]);
    const defaultOrderQR = useMemo(
        () => generateOrderQR(defaultOrderLocal, user, OrderType.DEFAULT_HOME),
        [defaultOrderLocal, user],
    );
    const checkInQR = useMemo(() => generateCheckInQR(user), [user]);
    const [listNews, setListNews] = useState([]);
    const modalize = ModalizeManager();
    const [refreshing, setRefreshing] = useState(false);
    const [tab, setTab] = useState(0);

    useEffect(() => {
        getNewsData();
        getMenuData();
        getCouponData();
        getNotification();
        setTab(withoutAccount || !branchId ? 2 : getIndexTab(defaultOrderLocal, mobileOrder));
    }, [withoutAccount, branchId]);

    useEffect(() => {
        getNewsData();
    }, [newsDisplay]);

    // useBackHandler(() => BackHandler.exitApp());
    const getNotification = async () => {
        try {
            const res = await getNotificationList({ params: { take: 1, pageIndex: 1 } });
            const { totalUnread } = res?.data;
            store.dispatch(updateNotificationUnRead(totalUnread));
        } catch (error) {
            console.log('getNotification -> error', error);
        }
    };
    const getNewsData = async () => {
        try {
            const res = await getNewsList({ params: { take: newsDisplay || 5, pageIndex: 1 } });
            setListNews(res?.data);
        } catch (error) {
            console.log('file: HomeScreen.tsx -> line 100 -> getNotification -> error', error);
        }
    };

    const goToQrScreen = () => {
        navigate(HOME_ROUTE.CHECK_IN);
    };

    const goToNotifyScreen = () => {
        navigate(HOME_ROUTE.NOTIFICATION);
    };

    const routes = [
        { key: 'qrDefault', title: t('qrHome.default.title') },
        { key: 'qrMobile', title: t('qrHome.mobile.title') },
        { key: 'qrCheckIn', title: t('qrHome.checkIn.title') },
    ];
    const goToStamp = () => {
        modalize.dismiss(MODAL_ID.CHECK_IN_GUIDE);
        navigate(APP_ROUTE.MAIN_TAB, { screen: STAMP_ROUTE.ROOT });
    };
    const showGuideCheckIn = () => {
        modalize.show(
            MODAL_ID.CHECK_IN_GUIDE,
            <ModalGuideCheckIn goToStamp={goToStamp} />,
            {
                modalHeight: scale(550) + Metrics.safeBottomPadding,
                scrollViewProps: {
                    contentContainerStyle: { flexGrow: 1 },
                },
            },
            { title: 'order.qrGuide' },
        );
    };
    // const renderScene = SceneMap({
    //     qrDefault: () => (
    //         <ShowQrTab type={QR_TAB_TYPE.ORDER_DEFAULT} qrValue={defaultOrderQR} newOrder={newOrderDefault} />
    //     ),
    //     qrMobile: () => <ShowQrTab type={QR_TAB_TYPE.MOBILE_ORDER} qrValue={mobileOrderQR} newOrder={newOrderMobile} />,
    //     qrCheckIn: () => <ShowQrTab type={QR_TAB_TYPE.CHECK_IN} qrValue={checkInQR} onPress={showGuideCheckIn} />,
    // });

    const renderScene = ({ route }: any) => {
        switch (route.key) {
            case 'qrDefault':
                return (
                    <ChooseCouponTab
                        type={QR_TAB_TYPE.ORDER_DEFAULT}
                        qrValue={defaultOrderQR}
                        newOrder={newOrderDefault}
                    />
                );
            case 'qrMobile':
                return <ShowQrTab type={QR_TAB_TYPE.MOBILE_ORDER} qrValue={mobileOrderQR} newOrder={newOrderMobile} />;
            case 'qrCheckIn':
                return <ShowQrTab type={QR_TAB_TYPE.CHECK_IN} qrValue={checkInQR} onPress={showGuideCheckIn} />;
            default:
                return null;
        }
    };

    const handleRefresh = async () => {
        try {
            setRefreshing(true);
            await Promise.all([getNotification(), getResourcesData(), getNewsData()]);
        } catch (error) {
            console.log(error);
        } finally {
            setRefreshing(false);
        }
    };
    useEffect(() => {
        if (listRestaurants) {
            const fullInfoBranch =
                listRestaurants?.find((item: { id?: number }) => item?.id === frequentlyUsedRestaurantId) || {};
            store.dispatch(updateChooseBranch(fullInfoBranch));
        }
    }, [listRestaurants, frequentlyUsedRestaurantId]);

    return (
        <View style={styles.container}>
            <StyledKeyboardAware
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        colors={[Themes.COLORS.primary]}
                        tintColor={Themes.COLORS.primary}
                        onRefresh={handleRefresh}
                    />
                }
            >
                <StyledHeaderImage
                    iconQr={Images.icons.tab.notification}
                    iconNoti={Images.icons.tab.notification}
                    onPressQr={goToQrScreen}
                    onPressNoti={goToNotifyScreen}
                    isBack={false}
                    images={banners}
                />
                <View style={styles.contScreen}>
                    <View style={styles.searchView}>
                        <View style={styles.logoView}>
                            <StyledIcon source={Images.icons.rectangle} size={85} customStyle={styles.icRectangle} />
                            <StyledImage source={Images.photo.logo} customStyle={styles.logoIcon} />
                            {/* <StyledTouchable onPress={() => openURL(storeUrl)} customStyle={styles.buttonMobile}>
                                <StyledText i18nText={'home.storeSearch'} customStyle={styles.textPrimary} />
                                <StyledIcon source={Images.icons.arrow_left} size={20} />
                            </StyledTouchable> */}
                            <BtnChooseRestaurants />
                        </View>
                        <FlatList
                            horizontal
                            data={sns}
                            showsHorizontalScrollIndicator={false}
                            renderItem={netWorkItem}
                            onEndReachedThreshold={0.1}
                            keyExtractor={(item) => `${item.id}`}
                        />
                    </View>
                    <StyledTabTopView
                        containerStyle={styles.tabContainerStyle}
                        routes={routes}
                        customTabStyle={styles.customTabStyle}
                        renderScene={renderScene}
                        isHome={true}
                        defaultIndex={tab}
                        swipeEnable={!!branchId}
                        setIndexTab={setTab}
                    />
                    <StyledImageBackground source={Images.photo.news} resizeMode="cover" style={styles.newsView}>
                        <View style={styles.buttonMobile}>
                            <StyledIcon source={Images.icons.document} customStyle={styles.iconLeft} size={20} />
                            <StyledText i18nText={'home.news'} customStyle={styles.titleNew} />
                        </View>
                        <TouchableOpacity
                            style={styles.buttonMobile}
                            onPress={() => navigate(HOME_ROUTE.NEW_LIST, { listNews })}
                        >
                            <StyledText i18nText={'home.seeAll'} customStyle={styles.textNews} />
                        </TouchableOpacity>
                    </StyledImageBackground>
                    {listNews.map((news, index) => (
                        <ListNewsItem key={index} data={news} />
                    ))}
                </View>
            </StyledKeyboardAware>
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        flex: 1,
    },
    contScreen: {
        paddingBottom: '20@vs',
    },
    contModalContent: {
        backgroundColor: Themes.COLORS.white,
        alignItems: 'center',
        justifyContent: 'center',
    },
    netWorkView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '5@vs',
        paddingHorizontal: '15@s',
        backgroundColor: Themes.COLORS.netWorkItem,
        borderRadius: 50,
        marginRight: '15@s',
    },
    iconNetwork: {
        marginRight: '15@s',
        borderRadius: 30,
    },
    rowView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: '20@s',
        paddingVertical: '10@vs',
        marginVertical: '10@vs',
    },
    logoView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: '20@s',
        flex: 1,
    },
    newsView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: '20@s',
        paddingVertical: '10@vs',
        height: '50@vs',
    },
    logo: {
        width: '124@s',
        height: '26@s',
    },
    buttonMobile: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textMobile: {
        marginRight: '15@s',
    },
    textNews: {
        color: Themes.COLORS.primary,
    },

    titleNew: {
        fontSize: '16@ms0.3',
        fontWeight: 'bold',
    },
    imageNews: {
        width: '70@s',
        height: '70@s',
    },
    iconLeft: {
        marginRight: '5@s',
    },
    searchView: {
        backgroundColor: Themes.COLORS.headerBackground,
        paddingBottom: '10@vs',
    },
    logoIcon: {
        width: '137@s',
        height: '70@vs',
        marginLeft: '-13@s',
    },
    textPrimary: {
        color: Themes.COLORS.primary,
        fontSize: '16@ms0.3',
        fontWeight: 'bold',
        marginRight: '5@s',
    },
    icRectangle: {
        position: 'absolute',
        top: '0@vs',
        left: '-20@s',
        tintColor: Themes.COLORS.astra,
    },
    tabContainerStyle: {
        height: verticalScale(128) + scale(staticValue.QR_SIZE_HOME),
    },
    grayView: {
        backgroundColor: Themes.COLORS.lightGray,
        height: '5@vs',
    },
    customTabStyle: {
        borderLeftWidth: 0.5,
        borderRightWidth: 0.5,
        borderColor: Themes.COLORS.white,
    },
});

export default HomeScreen;
