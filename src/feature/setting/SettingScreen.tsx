import { RootState } from 'app-redux/hooks';
import Images from 'assets/images';
import Metrics from 'assets/metrics';
import { Themes } from 'assets/themes';
import { StyledIcon, StyledImage, StyledText, StyledTouchable } from 'components/base';
import ModalizeManager from 'components/base/modal/ModalizeManager';
import { StyledImageBackground } from 'components/base/StyledImage';
import StyledKeyboardAware from 'components/base/StyledKeyboardAware';
import DashView from 'components/common/DashView';
import LinearView from 'components/common/LinearView';
import StyledHeader from 'components/common/StyledHeader';
import { getDataProfile } from 'hooks/useNetwork';
import { AUTHENTICATE_ROUTE, ORDER_ROUTE, SETTING_ROUTE } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React, { useMemo } from 'react';
import { RefreshControl, View } from 'react-native';
import { scale, ScaledSheet } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import AuthenticateService from 'utilities/authenticate/AuthenticateService';
import { generateOrderQR, getInformationSetting } from 'utilities/helper';
import { listButton, OrderTypeMenu } from 'utilities/staticData';
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
            <DashView />
        </View>
    );
};
const SettingScreen = () => {
    const modalize = ModalizeManager();
    const { order, userInfo } = useSelector((state: RootState) => state);
    const { user } = userInfo;
    const { defaultOrder } = order;
    const defaultOrderQR = useMemo(() => generateOrderQR(defaultOrder, user), [defaultOrder, user]);
    const handleShowPicker = () => {
        modalize.show(
            'modalPickerBackdrop',
            <StyledTouchable
                onPress={() => {
                    modalize.dismiss('modalPickerBackdrop');
                }}
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
                scrollViewProps: {
                    contentContainerStyle: { flexGrow: 1 },
                    showsVerticalScrollIndicator: false,
                },
                childrenStyle: {
                    borderTopRightRadius: 10,
                    borderTopLeftRadius: 10,
                    overflow: 'hidden',
                },
            },
        );
    };
    const goToMyPage = () => {
        navigate(SETTING_ROUTE.EDIT_PROFILE);
    };
    const goToHistory = () => {
        navigate(SETTING_ROUTE.ORDER_HISTORY);
    };
    const goToOrderDefault = () => {
        if (defaultOrderQR) {
            navigate(ORDER_ROUTE.ORDER_QR_CODE, { orderType: OrderTypeMenu.DEFAULT_ORDER, saveOrder: false });
        } else {
            navigate(AUTHENTICATE_ROUTE.ORDER_DEFAULT_MENU, { screen: SETTING_ROUTE.ORDER_DEFAULT_SETTING });
        }
    };
    const goToNotification = () => {
        navigate(SETTING_ROUTE.SETTING_NOTIFICATION);
    };
    const goToContact = () => {
        navigate(SETTING_ROUTE.CONTACT);
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
            case 'policy':
                alert('open link policy');
                break;
            case 'logOut':
                logout();
                break;
            default:
        }
    };
    const information = getInformationSetting(user?.member || {});

    const renderItemSetting = (item: any) => (
        <View key={item.id} style={styles.wrapBtnOptionSetting}>
            <StyledTouchable onPress={() => goToDetail(item?.key)} customStyle={{ alignItems: 'center' }}>
                <StyledIcon
                    source={item.img}
                    size={20}
                    customStyle={{ backgroundColor: item?.background || Themes.COLORS.white, borderRadius: 30 }}
                />
                <StyledText originValue={item?.name} customStyle={styles.nameButton} isBlack />
            </StyledTouchable>
        </View>
    );

    const handleRefresh = () => {
        getDataProfile();
    };

    return (
        <View style={styles.container}>
            <View>
                <StyledHeader
                    title={'tab.setting'}
                    onPressRight={goToMyPage}
                    hasBack={false}
                    iconRight={Images.icons.edit}
                    largeTitleHeader
                />
                <View style={styles.headerContainer}>
                    <StyledImageBackground source={Images.photo.backgroundMyPage} style={styles.backgroundImage}>
                        <StyledIcon source={Images.icons.rectangle} size={63} customStyle={styles.rectangle} />
                        <View style={styles.background}>
                            <View style={styles.profileRow}>
                                <StyledImage
                                    source={
                                        user?.member?.avatar
                                            ? { uri: user?.member?.avatar || '' }
                                            : Images.photo.avatarDefault
                                    }
                                    customStyle={styles.avatar}
                                    resizeMode={'cover'}
                                />
                                <View>
                                    <StyledText originValue={'田中　英雄'} customStyle={styles.name} />
                                    <LinearView style={styles.linear} colors={['#F8D156', '#FEECD2']}>
                                        <StyledText originValue={'ゴールドメンバー'} isBlack />
                                        <StyledIcon source={Images.icons.gold} size={15} />
                                    </LinearView>
                                </View>
                                <StyledTouchable onPress={handleShowPicker} customStyle={styles.question}>
                                    <StyledIcon source={Images.icons.questionGray} size={24} />
                                </StyledTouchable>
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
                    </StyledImageBackground>
                </View>
            </View>
            <StyledKeyboardAware
                refreshControl={
                    <RefreshControl
                        refreshing={false}
                        colors={[Themes.COLORS.primary]}
                        tintColor={Themes.COLORS.primary}
                        onRefresh={handleRefresh}
                    />
                }
            >
                <View style={styles.wrapListOptionSetting}>{listButton.map(renderItemSetting)}</View>
                <View style={styles.infoContainerView}>
                    {information.map((item, index) => (
                        <InfoItem key={index} data={item} />
                    ))}
                </View>
            </StyledKeyboardAware>
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: Themes.COLORS.lightGray,
    },

    buttonSave: {},
    headerContainer: {
        // width: '100%',
        backgroundColor: Themes.COLORS.headerBackground,
        paddingHorizontal: '20@s',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden',
        // paddingTop: Metrics.safeTopPadding,
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
        borderRadius: 100,
    },
    profileRow: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: '10@s',
        paddingBottom: 0,
        width: '100%',
    },
    background: {
        width: Metrics.screenWidth - scale(40),
        height: '172@s',
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
        fontSize: '12@ms0.3',
        color: Themes.COLORS.headerBackground,
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
    wrapListOptionSetting: {
        marginBottom: '10@vs',
        backgroundColor: Themes.COLORS.white,
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingVertical: '5@vs',
    },
    wrapBtnOptionSetting: {
        width: Metrics.screenWidth / 3,
        alignItems: 'center',
        paddingTop: '18@vs',
        height: '80@vs',
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
        // width: '40@s',
        // height: '40@s',
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'rgba(34, 34, 34, 0.2)',
    },
    desText: {
        color: Themes.COLORS.white,
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
    question: {
        position: 'absolute',
        top: '12@vs',
        right: '20@s',
    },
    rectangle: {
        position: 'absolute',
    },
    backgroundImage: {
        overflow: 'hidden',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
});

export default SettingScreen;
