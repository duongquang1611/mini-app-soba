import Images from 'assets/images';
import Metrics from 'assets/metrics';
import { Themes } from 'assets/themes';
import { StyledIcon, StyledText } from 'components/base';
import LinearView from 'components/common/LinearView';
import React from 'react';
import { Text, View } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ScaledSheet } from 'react-native-size-matters';
import { statusUser } from 'utilities/staticData';

const UserStatusItem = (item: any) => {
    const { name, colors, background, crownColor, content1, content2 } = item?.item;
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
                <StyledText originValue={content1} isBlack />
                <StyledText originValue={content2} isBlack />
            </View>
        </LinearView>
    );
};
const UserStatus = () => {
    const fillNumber = 60;
    return (
        <KeyboardAwareScrollView
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled"
            enableOnAndroid={true}
            showsVerticalScrollIndicator={false}
            enableResetScrollToCoords={false}
        >
            <View>
                <View style={styles.closeView}>
                    <TouchableOpacity>
                        <StyledIcon size={15} source={Images.icons.cancel} />
                    </TouchableOpacity>
                </View>
                <View style={styles.headerView}>
                    <AnimatedCircularProgress
                        size={200}
                        width={25}
                        fill={fillNumber}
                        rotation={0}
                        tintColor={Themes.COLORS.viking}
                        onAnimationComplete={() => console.log('onAnimationComplete')}
                        backgroundColor={Themes.COLORS.silver}
                    >
                        {() => (
                            <>
                                <StyledText i18nText={'￥80,000'} customStyle={styles.titleAchieveRate} isBlack />
                                <LinearView style={styles.linearChart} colors={['#F8D156', '#FEECD2']}>
                                    <StyledText originValue={'ゴールド'} isBlack />
                                    <StyledIcon source={Images.icons.gold} size={15} />
                                </LinearView>
                            </>
                        )}
                    </AnimatedCircularProgress>
                    <Text style={styles.money}>
                        {'￥5000'}
                        <Text style={styles.content}>{'  を支払うと、ダイヤモンドメンバー に昇格します'}</Text>
                    </Text>
                </View>
            </View>
            <View style={styles.body}>
                <StyledText
                    i18nText={
                        '＊注意：ニヲタ問8地携ドじなれ速改ょクり型載えで果情ムネ樹権オ更虫検意リクニ張本ス皆説との刑世九憂えんど。試じどそ読顔シトニ千限くトょイ減3勝'
                    }
                    isBlack
                />
                {statusUser.map((item: any, index: number) => (
                    <UserStatusItem key={index} item={item} />
                ))}
            </View>
        </KeyboardAwareScrollView>
    );
};

export default UserStatus;

const styles = ScaledSheet.create({
    headerView: {
        backgroundColor: Themes.COLORS.headerBackground,
        paddingVertical: '60@vs',
        paddingBottom: '20@vs',
        alignItems: 'center',
        justifyContent: 'center',
        width: Metrics.screenWidth,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
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
    },
    content: {
        fontSize: '14@ms0.3',
        fontWeight: 'normal',
        color: Themes.COLORS.mineShaft,
    },
    body: {
        width: '100%',
        padding: '20@s',
    },
    linear: {
        width: '100%',
        paddingHorizontal: '10@s',
        paddingVertical: '10@vs',
        borderRadius: 10,
        marginTop: '10@vs',
        height: '75@s',
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
    },
    closeView: {
        position: 'absolute',
        zIndex: 99,
        top: '10@vs',
        right: '10@vs',
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
        width: '88@s',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: '5@vs',
    },
});
