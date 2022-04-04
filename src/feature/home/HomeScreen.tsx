import { getCouponList } from 'api/modules/api-app/coupon';
import { getResources } from 'api/modules/api-app/general';
import { getNewsList } from 'api/modules/api-app/home';
import { RootState } from 'app-redux/hooks';
import { updateCoupon } from 'app-redux/slices/couponSlice';
import { resourceActions } from 'app-redux/slices/resourceSlice';
import { store } from 'app-redux/store';
import Images from 'assets/images';
import { Themes } from 'assets/themes';
import { StyledIcon, StyledImage, StyledText } from 'components/base';
import StyledKeyboardAware from 'components/base/StyledKeyboardAware';
import DashView from 'components/common/DashView';
import StyledHeaderImage from 'components/common/StyledHeaderImage';
import StyledTabTopView from 'components/common/StyledTabTopView';
import { SIZE_LIMIT } from 'hooks/usePaging';
import { isEqual } from 'lodash';
import { HOME_ROUTE } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React, { FunctionComponent, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ImageBackground, View } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { scale, ScaledSheet, verticalScale } from 'react-native-size-matters';
import { SceneMap } from 'react-native-tab-view';
import { useSelector } from 'react-redux';
import { QR_TAB_TYPE } from 'utilities/enumData';
import { filterResources, generateCheckInQR, generateOrderQR } from 'utilities/helper';
import { useOnesignal } from 'utilities/notification';
import {
    CouponStoreKeyByStatus,
    imagesList,
    netWorkList,
    OrderType,
    staticValue,
    TabCouponStatus,
} from 'utilities/staticData';
import ShowQrTab from './components/ShowQrTab';

const netWorkItem = (data: any) => {
    return (
        <TouchableOpacity style={styles.netWorkView}>
            <StyledIcon source={data?.item?.img} size={30} customStyle={styles.iconNetwork} />
            <StyledText originValue={data?.item?.name} isBlack />
        </TouchableOpacity>
    );
};
const getColorTab = (key: number) => {
    switch (key) {
        case 0:
            return Themes.COLORS.secondary;
        case 1:
            return Themes.COLORS.primary;
        case 2:
            return Themes.COLORS.qrCheckIn;
        default:
            return Themes.COLORS.secondary;
    }
};
export const ListNewsItem = (data: any) => {
    return (
        <View>
            <TouchableOpacity
                style={styles.listNewsView}
                onPress={() => navigate(HOME_ROUTE.NEW_DETAIL, { id: data?.data?.id })}
            >
                <StyledIcon source={{ uri: data?.data?.img }} size={70} />
                <View style={styles.newsTextView}>
                    <StyledText originValue={data?.data?.name} customStyle={styles.titleNew} />
                    <StyledText originValue={data?.data?.content} isBlack />
                    <StyledText originValue={data?.data?.time} customStyle={styles.time} />
                </View>
            </TouchableOpacity>
            <DashView />
        </View>
    );
};

export const getCouponData = async (status?: TabCouponStatus) => {
    try {
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
                    couponsCanUse: res[0].data,
                    couponsUsed: res[1].data,
                }),
            );
        }
    } catch (error) {
        console.log('getCouponData -> error', error);
    }
};

export const getResourcesData = async () => {
    try {
        const response = await getResources();
        const newResources = filterResources(response?.data);
        store.dispatch(resourceActions.getResourceSuccess(newResources));
    } catch (error) {
        console.log('getCouponData -> error', error);
    }
};

const HomeScreen: FunctionComponent = () => {
    useOnesignal();
    const { t } = useTranslation();
    const { order, userInfo } = useSelector((state: RootState) => state);
    const { user } = userInfo;
    const { mobileOrder, defaultOrderLocal } = order;
    const mobileOrderQR = useMemo(() => generateOrderQR(mobileOrder, user), [mobileOrder, user]);
    const defaultOrderQR = useMemo(
        () => generateOrderQR(defaultOrderLocal, user, OrderType.DEFAULT),
        [defaultOrderLocal, user],
    );
    const checkInQR = useMemo(() => generateCheckInQR(user), [user]);
    const [indexTab, setIndexTab] = useState(1);
    const [listNews, setListNews] = useState([]);

    useEffect(() => {
        getNotification();
        getCouponData();
    }, []);

    const getNotification = async () => {
        try {
            const res = await getNewsList();
            setListNews(res?.data);
        } catch (error) {
            console.log('file: HomeScreen.tsx -> line 100 -> getNotification -> error', error);
            // AlertMessage(error);
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

    const showGuideCheckIn = () => {
        console.log('showGuideCheckIn');
    };
    const renderScene = SceneMap({
        qrDefault: () => <ShowQrTab type={QR_TAB_TYPE.ORDER_DEFAULT} qrValue={defaultOrderQR} />,
        qrMobile: () => <ShowQrTab type={QR_TAB_TYPE.MOBILE_ORDER} qrValue={mobileOrderQR} />,
        qrCheckIn: () => <ShowQrTab type={QR_TAB_TYPE.CHECK_IN} qrValue={checkInQR} onPress={showGuideCheckIn} />,
    });
    return (
        <View style={styles.container}>
            <StyledKeyboardAware>
                <StyledHeaderImage
                    iconQr={Images.icons.tab.notification}
                    iconNoti={Images.icons.tab.notification}
                    onPressQr={goToQrScreen}
                    onPressNoti={goToNotifyScreen}
                    isBack={false}
                    images={imagesList}
                    logo
                />
                <View style={styles.contScreen}>
                    <View style={styles.qrView}>
                        <View style={styles.logoView}>
                            <StyledIcon source={Images.icons.rectangle} size={70} customStyle={styles.icRectangle} />
                            <StyledImage source={Images.photo.logo} customStyle={styles.logoIcon} />
                            <TouchableOpacity style={styles.buttonMobile}>
                                <StyledText i18nText={'店舗検索'} customStyle={styles.textPrimary} />
                                <StyledIcon source={Images.icons.arrow_left} size={20} />
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            horizontal
                            data={netWorkList}
                            showsHorizontalScrollIndicator={false}
                            renderItem={netWorkItem}
                            onEndReachedThreshold={0.1}
                            keyExtractor={(item) => `${item.id}`}
                        />
                    </View>
                    <StyledTabTopView
                        setIndexTab={setIndexTab}
                        containerStyle={styles.tabContainerStyle}
                        routes={routes}
                        renderScene={renderScene}
                        customIndicatorStyle={{ backgroundColor: getColorTab(indexTab) }}
                    />
                    <ImageBackground source={Images.photo.news} resizeMode="cover" style={styles.newsView}>
                        <View style={styles.buttonMobile}>
                            <StyledIcon source={Images.icons.document} customStyle={styles.iconLeft} size={20} />
                            <StyledText i18nText={'ニュース'} customStyle={styles.titleNew} />
                        </View>
                        <TouchableOpacity
                            style={styles.buttonMobile}
                            onPress={() => navigate(HOME_ROUTE.NEW_LIST, { listNews })}
                        >
                            <StyledText i18nText={'全て見る'} customStyle={styles.textNews} />
                        </TouchableOpacity>
                    </ImageBackground>
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
        // paddingHorizontal: '20@s',
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
        backgroundColor: Themes.COLORS.lightGray,
        borderRadius: 50,
        marginRight: '15@s',
    },
    iconNetwork: {
        // backgroundColor: Themes.COLORS.red,
        marginRight: '15@s',
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
    },
    newsView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: '20@s',
        paddingVertical: '10@vs',
        marginVertical: '10@vs',
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
    listNewsView: {
        width: '100%',
        paddingVertical: '10@vs',
        paddingHorizontal: '20@s',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: Themes.COLORS.white,
    },
    newsTextView: {
        width: '75%',
        justifyContent: 'space-between',
    },
    titleNew: {
        fontSize: '16@ms0.3',
        fontWeight: 'bold',
        marginBottom: '5@vs',
    },
    imageNews: {
        width: '70@s',
        height: '70@s',
    },
    time: {
        color: Themes.COLORS.silver,
        fontSize: '12@ms0.3',
    },
    iconLeft: {
        marginRight: '5@s',
    },
    qrView: {
        backgroundColor: Themes.COLORS.headerBackground,
        paddingVertical: '10@vs',
        paddingHorizontal: '20@s',
    },
    logoIcon: {
        width: '137@s',
        height: '50@vs',
        marginLeft: '-17@s',
    },
    textPrimary: {
        color: Themes.COLORS.primary,
        fontSize: '16@ms0.3',
        fontWeight: 'bold',
        marginRight: '5@s',
    },
    icRectangle: {
        position: 'absolute',
        top: '-10@vs',
        left: '-20@s',
        tintColor: '#FBE3C0',
    },
    tabContainerStyle: {
        height: verticalScale(138) + scale(staticValue.QR_SIZE_HOME),
    },
});

export default HomeScreen;
