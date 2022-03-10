import { useNavigation } from '@react-navigation/native';
import { getNewsList } from 'api/modules/api-app/home';
import Images from 'assets/images';
import { Themes } from 'assets/themes';
import { StyledIcon, StyledImage, StyledText } from 'components/base';
import DashView from 'components/common/DashView';
import StyledHeaderImage from 'components/common/StyledHeaderImage';
import StyledTabTopView from 'components/common/StyledTabTopView';
import { TAB_NAVIGATION_ROOT } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { ImageBackground, View } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ScaledSheet } from 'react-native-size-matters';
import { SceneMap } from 'react-native-tab-view';
import { useOnesignal } from 'utilities/notification';
import { imagesList, netWorkList } from 'utilities/staticData';
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
            return '#7B68EE';
        default:
            return Themes.COLORS.secondary;
    }
};
export const ListNewsItem = (data: any) => {
    return (
        <View>
            <TouchableOpacity
                style={styles.listNewsView}
                onPress={() =>
                    data?.navigation.navigate(TAB_NAVIGATION_ROOT.HOME_ROUTE.NEW_DETAIL, { id: data?.data?.id })
                }
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
const dataOder = {
    button: '注文詳細',
    background: Themes.COLORS.secondary,
    qrColor: Themes.COLORS.headerBackground,
    qrCode: Images.photo.qrCode,
    content1: '”いつもの！注文”がまだ設定されていません。',
    content2: ' ※設定すると、ホーム画面を開いただけで よく食べる商品の注文が簡単にできるようになります。',
};
const preOder = {
    button: '注文詳細',
    background: Themes.COLORS.primary,
    qrColor: Themes.COLORS.headerBackground,
    content1: '事前注文"がまだありません。',
    content2: 'お店に入る前に商品を選んでおくと、 スマホをかざすだけで簡単に注文ができるようになります。',
};
const visitQr = {
    button: '来店QRコードについて',
    background: '#7B68EE',
    qrColor: Themes.COLORS.headerBackground,
    qrCode: Images.photo.qrCode,
};
const HomeScreen: FunctionComponent = () => {
    useOnesignal();
    const navigation = useNavigation();
    const [indexTab, setIndexTab] = useState(1);
    const [listNews, setListNews] = useState([]);

    useEffect(() => {
        getNotification();
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
        navigate(TAB_NAVIGATION_ROOT.HOME_ROUTE.CHECK_IN);
    };

    const goToNotiScreen = () => {
        navigate(TAB_NAVIGATION_ROOT.HOME_ROUTE.NOTIFICATION);
    };

    const routes = [
        { key: 'qr1', title: 'いつもの！注文' },
        { key: 'qr2', title: '事前注文' },
        { key: 'qr3', title: '来店QRコード' },
    ];

    const renderScene = SceneMap({
        qr1: () => (
            <ShowQrTab
                data={dataOder}
                onClick={() => navigation.navigate(TAB_NAVIGATION_ROOT.HOME_ROUTE.ORDER_DEFAULT_HOME)}
            />
        ),
        qr2: () => (
            <ShowQrTab
                data={preOder}
                onClick={() => navigation.navigate(TAB_NAVIGATION_ROOT.HOME_ROUTE.MOBILE_ORDER)}
            />
        ),
        qr3: () => (
            <ShowQrTab data={visitQr} onClick={() => navigation.navigate(TAB_NAVIGATION_ROOT.HOME_ROUTE.CHECK_IN)} />
        ),
    });

    return (
        <View style={styles.container}>
            <StyledHeaderImage
                iconQr={Images.icons.tab.notification}
                iconNoti={Images.icons.tab.notification}
                onPressQr={goToQrScreen}
                onPressNoti={goToNotiScreen}
                isBack={false}
                images={imagesList}
                logo
            />
            <KeyboardAwareScrollView enableOnAndroid={true} showsVerticalScrollIndicator={false}>
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
                            onPress={() => navigation.navigate(TAB_NAVIGATION_ROOT.HOME_ROUTE.NEW_LIST, { listNews })}
                        >
                            <StyledText i18nText={'全て見る'} customStyle={styles.textNews} />
                        </TouchableOpacity>
                    </ImageBackground>
                    {listNews.map((news, index) => (
                        <ListNewsItem key={index} data={news} navigation={navigation} />
                    ))}
                </View>
            </KeyboardAwareScrollView>
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
        height: '230@s',
    },
});

export default HomeScreen;
