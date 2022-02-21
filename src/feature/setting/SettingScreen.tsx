import React from 'react';
import { ImageBackground, View } from 'react-native';
import { StyledButton, StyledIcon, StyledImage, StyledText } from 'components/base';
import AuthenticateService from 'utilities/authenticate/AuthenticateService';
import { scale, ScaledSheet } from 'react-native-size-matters';
import StyledHeader from 'components/common/StyledHeader';
import { navigate } from 'navigation/NavigationService';
import { TAB_NAVIGATION_ROOT } from 'navigation/config/routes';
import LinearGradient from 'react-native-linear-gradient';
import Images from 'assets/images';
import Metrics from 'assets/metrics';
import { Themes } from 'assets/themes';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { listButton } from 'utilities/staticData';

const SettingScreen = () => {
    const goToMyPage = () => {
        navigate(TAB_NAVIGATION_ROOT.SETTING_ROUTE.EDIT_PROFILE);
    };
    const goToHistory = () => {
        navigate(TAB_NAVIGATION_ROOT.SETTING_ROUTE.ORDER_HISTORY);
    };
    const goToOrderDefault = () => {
        navigate(TAB_NAVIGATION_ROOT.SETTING_ROUTE.ORDER_DEFAULT);
    };
    const goToNotification = () => {
        navigate(TAB_NAVIGATION_ROOT.SETTING_ROUTE.SETTING_NOTIFICATION);
    };
    const goToContact = () => {
        navigate(TAB_NAVIGATION_ROOT.SETTING_ROUTE.CONTACT);
    };
    const logout = () => {
        AuthenticateService.logOut();
    };
    const goToDetail = (key: string) => {
        switch (key) {
            case 'myPage':
                goToMyPage();
                break;
            case 'history':
                goToHistory();
                break;
            case 'orderDefault':
                goToOrderDefault();
                break;
            case 'notification':
                goToNotification();
                break;
            case 'contact':
                goToContact();
                break;
            case 'logOut':
                logout();
                break;
            default:
        }
    };
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.row}>
                    <StyledText customStyle={styles.title} i18nText={'Setting'} />
                    <TouchableOpacity onPress={goToMyPage}>
                        <StyledIcon source={Images.icons.eyeOff} size={40} />
                    </TouchableOpacity>
                </View>
                <ImageBackground source={Images.photo.defaultImage} style={styles.background}>
                    <View style={styles.profileRow}>
                        <StyledImage source={Images.photo.avatarDefault} customStyle={styles.avatar} />
                        <View>
                            <StyledText originValue={'田中　英雄'} />
                            <LinearGradient style={styles.linear} colors={['#FEECD2', '#F8D156']}>
                                <StyledText originValue={'ゴールドメンバー'} />
                                <StyledIcon source={Images.icons.eyeOff} size={20} />
                            </LinearGradient>
                        </View>
                    </View>
                    <StyledText originValue={'￥80,000'} customStyle={styles.price} />
                    <View style={styles.ratioContain}>
                        <View style={styles.ratioAll} />
                        <View style={[styles.ratio, { width: scale(200) }]} />
                    </View>
                    <View style={styles.desView}>
                        <StyledText originValue={'￥5000を支払うと、ダイヤモンドメンバー に昇格します'} />
                    </View>
                </ImageBackground>
            </View>
            <View style={styles.body}>
                <FlatList
                    scrollEnabled={false}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    numColumns={3}
                    data={listButton}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            key={item.id}
                            style={styles.buttonDetail}
                            onPress={() => goToDetail(item?.key)}
                        >
                            <StyledIcon source={item.img} size={20} />
                            <StyledText originValue={item?.name} customStyle={styles.nameButton} />
                        </TouchableOpacity>
                    )}
                />
                {/* <StyledButton onPress={goToMyPage} title={'My page'} />
                <StyledButton onPress={goToHistory} title={'Order History'} />
                <StyledButton onPress={goToOrderDefault} title={'Order Default'} />
                <StyledButton onPress={goToNotification} title={'setting noti'} />
                <StyledButton onPress={goToContact} title={'contact'} />
                <StyledButton onPress={AuthenticateService.logOut} title={'Log out'} /> */}
            </View>
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        flex: 1,
    },
    body: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: '20@s',
    },
    buttonSave: {},
    headerContainer: {
        width: '100%',
        backgroundColor: Themes.COLORS.headerBackground,
        padding: '20@s',
        paddingTop: Metrics.safeTopPadding,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        fontWeight: 'bold',
        fontSize: '24@ms0.3',
        color: Themes.COLORS.secondary,
    },
    avatar: {
        width: '56@s',
        height: '56@s',
        marginRight: '20@s',
    },
    profileRow: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: '20@s',
    },
    background: {
        width: '100%',
        height: '200@vs',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        justifyContent: 'space-between',
        paddingBottom: '20@s',
    },
    linear: {
        paddingHorizontal: '10@s',
        paddingVertical: '10@vs',
        justifyContent: 'space-between',
        borderRadius: 10,
        marginTop: '10@vs',
        width: '160@s',
        alignItems: 'center',
        flexDirection: 'row',
    },
    price: {
        marginLeft: '200@s',
    },
    ratioContain: {
        paddingHorizontal: '20@s',
        width: '100%',
    },
    ratioAll: {
        width: '100%',
        height: '10@vs',
        borderWidth: 1,
        marginTop: '10@vs',
    },
    ratio: {
        top: '11@vs',
        height: '8@vs',
        left: 1,
        backgroundColor: Themes.COLORS.viking,
        position: 'absolute',
        zIndex: 99,
        marginLeft: '20@s',
    },
    desView: {
        paddingHorizontal: '20@s',
        marginTop: '10@vs',
    },
    buttonDetail: {
        width: (Metrics.screenWidth - scale(60)) / 3,
        marginRight: '10@s',
        alignItems: 'center',
        padding: '10@s',
        marginBottom: '10@vs',
    },
    nameButton: {
        marginTop: '10@s',
    },
});

export default SettingScreen;
