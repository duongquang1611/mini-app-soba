import Images from 'assets/images';
import { Themes } from 'assets/themes';
import { StyledIcon, StyledImage, StyledText } from 'components/base';
import StyledHeader from 'components/common/StyledHeader';
import React from 'react';
import { View } from 'react-native';
import { listCouponFake } from 'utilities/staticData';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ScaledSheet } from 'react-native-size-matters';

const CouponItem = (item: any) => {
    return (
        <View style={styles.couponItem}>
            <StyledImage source={{ uri: item.item?.img }} customStyle={styles.couponImage} />
            <View style={styles.couponName}>
                <StyledText originValue={item.item.name} customStyle={styles.title} />
                <StyledText originValue={item.item.time} customStyle={styles.time} />
            </View>
        </View>
    );
};

const NotificationDetailScreen = () => {
    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView enableOnAndroid={true} showsVerticalScrollIndicator={false}>
                <StyledHeader title={'NotificationDetailScreen'} />
                <View style={styles.body}>
                    <View style={styles.contentContainer}>
                        <StyledText originValue={'2021年11月2日'} customStyle={styles.time} />
                        <StyledText originValue={'公式アプリリリースのお知らせ！'} customStyle={styles.title} />
                        <StyledImage customStyle={styles.img} source={Images.photo.defaultImage} />
                        <StyledText
                            originValue={
                                '2/1に小諸そば公式アプリをリリースしました。 このアプリでは様々なお得な情報をお届けします。 http://～～～'
                            }
                        />
                    </View>
                    <View style={styles.contentContainer}>
                        <View style={styles.titleCoupon}>
                            <StyledIcon source={Images.icons.eyeOff} size={15} customStyle={styles.iconCoupon} />
                            <StyledText i18nText={'クーポンリスト'} customStyle={styles.title} />
                        </View>
                        {listCouponFake.map((item, index) => (
                            <CouponItem key={index} item={item} />
                        ))}
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </View>
    );
};

export default NotificationDetailScreen;

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: Themes.COLORS.lightGray,
    },
    contentContainer: {
        width: '100%',
        backgroundColor: Themes.COLORS.white,
        marginBottom: '10@vs',
        paddingHorizontal: '20@s',
        paddingVertical: '10@vs',
    },
    body: {
        flex: 1,
    },
    time: {
        fontSize: '12@ms0.3',
        color: Themes.COLORS.silver,
        marginBottom: '10@vs',
    },
    title: {
        fontSize: '16@ms0.3',
        fontWeight: 'bold',
        color: Themes.COLORS.secondary,
    },
    img: {
        width: '100%',
        height: '335@vs',
        marginVertical: '10@vs',
    },
    titleCoupon: {
        flexDirection: 'row',
    },
    iconCoupon: {
        marginRight: '15@s',
    },
    couponItem: {
        width: '100%',
        backgroundColor: Themes.COLORS.white,
        marginVertical: '2@vs',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: '10@vs',
    },
    couponImage: {
        width: '60@s',
        height: '60@s',
    },
    couponName: {
        width: '80%',
        justifyContent: 'space-between',
    },
});
