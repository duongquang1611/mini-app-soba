import React, { FunctionComponent } from 'react';
import { ImageBackground, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TAB_NAVIGATION_ROOT } from 'navigation/config/routes';
import { StyledButton, StyledIcon, StyledImage, StyledText } from 'components/base';
import Images from 'assets/images';
import { navigate } from 'navigation/NavigationService';
import StyledHeaderImage from 'components/common/StyledHeaderImage';
import { ScaledSheet } from 'react-native-size-matters';
import { imagesList, listNews, netWorkList } from 'utilities/staticData';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { Themes } from 'assets/themes';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const netWorkItem = (data: any) => {
    return (
        <TouchableOpacity style={styles.netWorkView}>
            <StyledIcon source={data?.item?.img} size={30} customStyle={styles.iconNetwork} />
            <StyledText originValue={data?.item?.name} />
        </TouchableOpacity>
    );
};
export const ListNewsItem = (data: any) => {
    return (
        <View>
            <TouchableOpacity
                style={styles.listNewsView}
                onPress={() => data?.navigation.navigate(TAB_NAVIGATION_ROOT.HOME_ROUTE.NEW_DETAIL)}
            >
                <StyledIcon source={{ uri: data?.data?.img }} size={70} />
                <View style={styles.newsTextView}>
                    <StyledText originValue={data?.data?.name} customStyle={styles.titleNew} />
                    <StyledText originValue={data?.data?.content} />
                    <StyledText originValue={data?.data?.time} customStyle={styles.time} />
                </View>
            </TouchableOpacity>
            <View style={styles.dot} />
        </View>
    );
};
const HomeScreen: FunctionComponent = () => {
    const navigation = useNavigation();

    const goToQrScreen = () => {
        navigate(TAB_NAVIGATION_ROOT.HOME_ROUTE.CHECK_IN);
    };
    const goToNotiScreen = () => {
        navigate(TAB_NAVIGATION_ROOT.HOME_ROUTE.NOTIFICATION);
    };

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView enableOnAndroid={true} showsVerticalScrollIndicator={false}>
                <StyledHeaderImage
                    iconQr={Images.icons.tab.notification}
                    iconNoti={Images.icons.tab.notification}
                    onPressQr={goToQrScreen}
                    onPressNoti={goToNotiScreen}
                    isBack={false}
                    images={imagesList}
                />
                <View style={styles.contScreen}>
                    <FlatList
                        horizontal
                        data={netWorkList}
                        showsHorizontalScrollIndicator={false}
                        renderItem={netWorkItem}
                        onEndReachedThreshold={0.1}
                        keyExtractor={(item) => item.category}
                    />
                    <ImageBackground source={Images.photo.defaultImage} resizeMode="cover" style={styles.rowView}>
                        <StyledImage source={Images.photo.defaultImage} customStyle={styles.logo} />
                        <TouchableOpacity style={styles.buttonMobile}>
                            <StyledText i18nText={'店舗検索'} customStyle={styles.textMobile} />
                            <StyledIcon source={Images.icons.eyeOff} size={20} />
                        </TouchableOpacity>
                    </ImageBackground>
                    <ImageBackground source={Images.photo.defaultImage} resizeMode="cover" style={styles.rowView}>
                        <TouchableOpacity
                            style={styles.buttonMobile}
                            onPress={() => navigation.navigate(TAB_NAVIGATION_ROOT.HOME_ROUTE.ORDER_DEFAULT)}
                        >
                            <StyledText i18nText={'デフォルト注文'} customStyle={styles.textMobile} />
                        </TouchableOpacity>
                        <StyledImage source={Images.photo.defaultImage} customStyle={styles.logo} />
                    </ImageBackground>
                    <ImageBackground source={Images.photo.defaultImage} resizeMode="cover" style={styles.rowView}>
                        <StyledText i18nText={'事前注文'} customStyle={styles.textMobile} />

                        <TouchableOpacity
                            style={styles.buttonMobile}
                            onPress={() => navigation.navigate(TAB_NAVIGATION_ROOT.HOME_ROUTE.MOBILE_ORDER)}
                        >
                            <StyledImage source={Images.photo.defaultImage} customStyle={styles.logo} />
                            <StyledIcon source={Images.icons.eyeOff} size={20} />
                        </TouchableOpacity>
                    </ImageBackground>
                    <ImageBackground source={Images.photo.defaultImage} resizeMode="cover" style={styles.rowView}>
                        <StyledText i18nText={'ニュース'} customStyle={styles.textMobile} />

                        <TouchableOpacity
                            style={styles.buttonMobile}
                            onPress={() => navigation.navigate(TAB_NAVIGATION_ROOT.HOME_ROUTE.NEW_LIST)}
                        >
                            <StyledText i18nText={'注文あり'} customStyle={styles.textMobile} />
                            <StyledIcon source={Images.icons.eyeOff} size={20} />
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
        paddingHorizontal: '20@s',
    },
    contModalContent: {
        backgroundColor: 'white',
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
    listNewsView: {
        width: '100%',
        paddingVertical: '10@vs',
        paddingHorizontal: '20@s',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: Themes.COLORS.white,
    },
    dot: {
        width: '100%',
        borderWidth: 0.5,
        borderStyle: 'dashed',
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
});

export default HomeScreen;
