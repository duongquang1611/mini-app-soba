import Images from 'assets/images';
import Metrics from 'assets/metrics';
import { Themes } from 'assets/themes';
import { StyledButton, StyledIcon, StyledImage, StyledText } from 'components/base';
import LinearView from 'components/common/LinearView';
import { TAB_NAVIGATION_ROOT } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React from 'react';
import { ImageBackground, View } from 'react-native';
import { scale, ScaledSheet } from 'react-native-size-matters';

const MyPageScreen = () => {
    const editProfile = () => {
        navigate(TAB_NAVIGATION_ROOT.SETTING_ROUTE.EDIT_PROFILE);
    };
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.row}>
                    <StyledText customStyle={styles.title} i18nText={'Edit Profile'} />
                    <StyledIcon source={Images.icons.eyeOff} size={40} />
                </View>
                <ImageBackground source={Images.photo.defaultImage} style={styles.background}>
                    <View style={styles.profileRow}>
                        <StyledImage source={Images.photo.avatarDefault} customStyle={styles.avatar} />
                        <View>
                            <StyledText originValue={'田中　英雄'} />
                            <LinearView style={styles.linear} colors={['#FEECD2', '#F8D156']}>
                                <StyledText originValue={'ゴールドメンバー'} />
                                <StyledIcon source={Images.icons.eyeOff} size={20} />
                            </LinearView>
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
                <StyledButton title={'editProfile'} onPress={editProfile} customStyle={styles.buttonSave} />
            </View>
        </View>
    );
};

export default MyPageScreen;

const styles = ScaledSheet.create({
    container: {
        flex: 1,
    },
    body: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        marginHorizontal: '20@s',
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
});
