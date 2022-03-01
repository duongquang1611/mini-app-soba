import Images from 'assets/images';
import Metrics from 'assets/metrics';
import { Themes } from 'assets/themes';
import { StyledIcon, StyledImage, StyledText, StyledTouchable } from 'components/base';
import ModalizeManager from 'components/base/modal/ModalizeManager';
import LinearView from 'components/common/LinearView';
import { TAB_NAVIGATION_ROOT } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React from 'react';
import { ImageBackground, View } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Picker from 'react-native-picker';
import { scale, ScaledSheet } from 'react-native-size-matters';
import AuthenticateService from 'utilities/authenticate/AuthenticateService';
import { INFORMATION, listButton } from 'utilities/staticData';
import UserStatus from './components/UserStatus';

const InfoItem = (data: any) => {
    return (
        <View style={styles.infoContainer}>
            <View style={styles.infoView}>
                <StyledText customStyle={styles.titleInfo} i18nText={data?.data?.title} />
                <View style={styles.infoRow}>
                    <StyledIcon source={data?.data?.icon} size={20} />
                    <StyledText customStyle={styles.valueInfo} i18nText={data?.data?.value} isBlack />
                </View>
            </View>
            <View style={styles.dot} />
        </View>
    );
};
const SettingScreen = () => {
    const modalize = ModalizeManager();
    const handleCancel = () => {
        modalize.dismiss('modalPickerBackdrop');
    };

    const handleShowPicker = () => {
        modalize.show(
            'modalPickerBackdrop',
            <StyledTouchable
                onPress={() => {
                    Picker.hide();
                    modalize.dismiss('modalPickerBackdrop');
                }}
                customStyle={{ height: Metrics.screenHeight }}
            >
                <UserStatus />
            </StyledTouchable>,
            {
                modalStyle: {
                    backgroundColor: 'transparent',
                    minHeight: '100%',
                },
                adjustToContentHeight: true,
                disableScrollIfPossible: false,
            },
        );
        Picker.show();
    };
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
            <KeyboardAwareScrollView enableOnAndroid={true} showsVerticalScrollIndicator={false}>
                <View style={styles.headerContainer}>
                    <View style={styles.row}>
                        <StyledText customStyle={styles.title} i18nText={'Setting'} />
                        <TouchableOpacity onPress={goToMyPage} style={styles.editButton}>
                            <StyledIcon source={Images.icons.edit} size={20} />
                        </TouchableOpacity>
                    </View>

                    <ImageBackground
                        resizeMode={'stretch'}
                        source={Images.photo.backgroundMyPage}
                        style={styles.background}
                    >
                        <View style={styles.background}>
                            <View style={styles.profileRow}>
                                <StyledImage source={Images.photo.avatarDefault} customStyle={styles.avatar} />
                                <View>
                                    <StyledText originValue={'田中　英雄'} customStyle={styles.name} />
                                    <TouchableOpacity onPress={handleShowPicker}>
                                        <LinearView style={styles.linear} colors={['#F8D156', '#FEECD2']}>
                                            <StyledText originValue={'ゴールドメンバー'} isBlack />
                                            <StyledIcon source={Images.icons.gold} size={15} />
                                        </LinearView>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <StyledText originValue={'￥80,000'} customStyle={styles.price} />
                            <View style={styles.ratioContain}>
                                <View style={styles.ratioAll} />
                                <View style={[styles.ratio, { width: scale(200) }]} />
                            </View>
                            <View style={styles.desView}>
                                <StyledText
                                    originValue={'￥5000を支払うと、ダイヤモンドメンバー に昇格します'}
                                    customStyle={styles.desText}
                                />
                            </View>
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
                                <StyledText originValue={item?.name} customStyle={styles.nameButton} isBlack />
                            </TouchableOpacity>
                        )}
                    />
                </View>
                <View style={styles.infoContainerView}>
                    {INFORMATION.map((item, index) => (
                        <InfoItem key={index} data={item} />
                    ))}
                </View>
            </KeyboardAwareScrollView>
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: Themes.COLORS.lightGray,
    },
    body: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: '20@s',
        marginBottom: '10@vs',
        backgroundColor: Themes.COLORS.white,
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
        marginBottom: '10@vs',
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
        paddingBottom: 0,
    },
    background: {
        width: '100%',
        height: '170@vs',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        justifyContent: 'space-between',
        paddingBottom: '20@s',
    },
    linear: {
        paddingHorizontal: '10@s',
        paddingVertical: '5@vs',
        justifyContent: 'space-between',
        borderRadius: 5,
        marginTop: '10@vs',
        width: '160@s',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: '5@vs',
    },
    price: {
        marginLeft: '200@s',
        color: Themes.COLORS.white,
    },
    ratioContain: {
        paddingHorizontal: '20@s',
        width: '100%',
    },
    ratioAll: {
        width: '100%',
        height: '10@vs',
        backgroundColor: Themes.COLORS.white,
        marginTop: '10@vs',
        borderRadius: 1,
    },
    ratio: {
        top: '10@vs',
        height: '10@vs',
        backgroundColor: Themes.COLORS.viking,
        position: 'absolute',
        zIndex: 99,
        marginLeft: '20@s',
        borderRadius: 1,
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
        textAlign: 'center',
    },
    name: {
        color: Themes.COLORS.white,
        fontWeight: 'bold',
        fontSize: '16@ms0.3',
    },
    editButton: {
        width: '40@s',
        height: '40@s',
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(34, 34, 34, 0.2)',
    },
    desText: {
        color: Themes.COLORS.white,
    },
    dot: {
        width: '100%',
        borderWidth: 0.5,
        borderStyle: 'dashed',
        borderColor: Themes.COLORS.silver,
    },
    infoRow: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        marginVertical: '10@vs',
    },
    infoContainer: {
        width: '100%',
    },
    infoView: {
        paddingHorizontal: '20@vs',
        width: '100%',
    },
    titleInfo: {
        color: Themes.COLORS.silver,
        marginTop: '10@vs',
    },
    valueInfo: {
        marginLeft: '10@s',
    },
    infoContainerView: {
        backgroundColor: Themes.COLORS.white,
    },
});

export default SettingScreen;
