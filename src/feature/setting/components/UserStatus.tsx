import Images from 'assets/images';
import Metrics from 'assets/metrics';
import { Themes } from 'assets/themes';
import { StyledIcon, StyledText, StyledTouchable } from 'components/base';
import LinearView from 'components/common/LinearView';
import React from 'react';
import { ImageBackground, Text, View } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { scale, ScaledSheet } from 'react-native-size-matters';
import { statusUser } from 'utilities/staticData';

const UserStatusItem = (item: any) => {
    const { name, colors, background, crownColor, content } = item?.item;
    return (
        <LinearView style={styles.linear} colors={colors}>
            <StyledIcon
                size={50}
                source={Images.icons.rectangle}
                customStyle={[styles.background, { tintColor: background }]}
            />
            <StyledIcon
                source={Images.icons.gold}
                size={22}
                customStyle={[styles.icStatus, { tintColor: crownColor }]}
            />
            <View style={styles.infoStatus}>
                <StyledText originValue={name} isBlack customStyle={styles.title} />
                <StyledText originValue={content} isBlack customStyle={styles.normalText} />
            </View>
        </LinearView>
    );
};
const UserStatus = (props: any) => {
    const { closeModal } = props;
    const fillNumber = 60;
    return (
        <View>
            <ImageBackground source={Images.photo.rankBackGround} style={styles.headerView}>
                <StyledTouchable customStyle={styles.closeView} onPress={closeModal}>
                    <StyledIcon size={25} source={Images.icons.cancel} />
                </StyledTouchable>
                <AnimatedCircularProgress
                    size={scale(170)}
                    width={15}
                    fill={fillNumber}
                    rotation={0}
                    tintColor={Themes.COLORS.viking}
                    onAnimationComplete={() => console.log('onAnimationComplete')}
                    backgroundColor={Themes.COLORS.white}
                    style={styles.chartView}
                >
                    {() => (
                        <>
                            <StyledText i18nText={'￥80,000'} customStyle={styles.titleAchieveRate} isBlack />
                            <LinearView style={styles.linearChart} colors={statusUser[2].colors}>
                                <StyledText originValue={'ゴールド'} isBlack customStyle={styles.smallText} />
                                <StyledIcon source={Images.icons.gold} size={15} />
                            </LinearView>
                        </>
                    )}
                </AnimatedCircularProgress>
                <Text style={styles.money}>
                    {'￥5000'}
                    <Text style={styles.content}>{'を支払うと、ダイヤモンドメンバー に昇格します'}</Text>
                </Text>
            </ImageBackground>
            <View style={styles.body}>
                <StyledText
                    i18nText={
                        '＊注意：ニヲタ問8地携ドじなれ速改ょクり型載えで果情ムネ樹権オ更虫検意リクニ張本ス皆説との刑世九憂えんど。試じどそ読顔シトニ千限くトょイ減3勝'
                    }
                    isBlack
                    customStyle={styles.content}
                />
                {statusUser.map((item: any, index: number) => (
                    <UserStatusItem key={index} item={item} />
                ))}
            </View>
        </View>
    );
};

export default UserStatus;

const styles = ScaledSheet.create({
    headerView: {
        paddingBottom: '20@vs',
        width: Metrics.screenWidth,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
    },
    chart: {
        width: '164@s',
        height: '164@s',
        backgroundColor: Themes.COLORS.red,
    },
    money: {
        fontSize: '16@ms0.3',
        fontWeight: 'bold',
        color: Themes.COLORS.secondary,
        marginTop: '10@vs',
        paddingHorizontal: '20@s',
        textAlign: 'center',
    },
    content: {
        fontSize: '12@ms0.3',
        fontWeight: 'normal',
        color: Themes.COLORS.mineShaft,
        lineHeight: '20@vs',
    },
    body: {
        width: '100%',
        paddingHorizontal: '20@s',
        paddingVertical: '20@vs',
    },
    linear: {
        width: '100%',
        paddingHorizontal: '10@s',
        paddingVertical: '10@vs',
        borderRadius: 10,
        marginTop: '10@vs',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
    },
    background: {
        position: 'absolute',
        top: 0,
        left: -1,
    },
    icStatus: {
        position: 'absolute',
        top: '10@vs',
        left: '10@s',
    },
    infoStatus: {
        width: '85%',
    },
    title: {
        fontSize: '16@ms0.3',
        fontWeight: 'bold',
        marginBottom: '8@vs',
    },
    closeView: {
        width: '40@s',
        height: '40@s',
        marginBottom: '10@vs',
        alignSelf: 'flex-end',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
    },
    titleAchieveRate: {
        fontWeight: 'bold',
        fontSize: '24@ms0.3',
    },
    linearChart: {
        padding: '5@vs',
        justifyContent: 'space-between',
        borderRadius: 5,
        marginTop: '10@vs',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: '5@vs',
        paddingHorizontal: '10@s',
    },
    smallText: {
        fontSize: '12@ms0.3',
        marginRight: '5@s',
    },
    chartView: {
        alignSelf: 'center',
    },
    normalText: {
        lineHeight: '18@vs',
    },
});
