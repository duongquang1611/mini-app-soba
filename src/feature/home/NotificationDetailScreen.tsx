import { getNotificationCoupon } from 'api/modules/api-app/notification';
import Images from 'assets/images';
import { Themes } from 'assets/themes';
import { StyledIcon, StyledImage, StyledText } from 'components/base';
import AlertMessage from 'components/base/AlertMessage';
import StyledKeyboardAware from 'components/base/StyledKeyboardAware';
import DashView from 'components/common/DashView';
import StyledHeader from 'components/common/StyledHeader';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { logger } from 'utilities/helper';

const CouponItemNotification = (item: any) => {
    return (
        <View>
            <View style={styles.couponItemNotification}>
                <StyledImage source={{ uri: item.item?.img }} customStyle={styles.couponImage} />
                <View style={styles.couponName}>
                    <StyledText originValue={item.item.name} customStyle={styles.title} />
                    <StyledText originValue={item.item.time} customStyle={styles.time} />
                </View>
            </View>
            <DashView />
        </View>
    );
};

const NotificationDetailScreen = (props: any) => {
    const { id } = props.route?.params || {};
    const [coupon, setCoupon] = useState<any>({});
    const { title, content, receivedDate, listCoupon = [], listStamp = [] } = coupon;
    useEffect(() => {
        getNotification();
    }, []);
    const getNotification = async () => {
        try {
            const res = await getNotificationCoupon(id);
            setCoupon(res?.data);
        } catch (error) {
            logger(error);
            AlertMessage(error);
        }
    };
    return (
        <View style={styles.container}>
            <StyledHeader title={'notification.detailNotificationTitle'} />
            <StyledKeyboardAware>
                <View style={styles.body}>
                    <View style={styles.contentContainer}>
                        <StyledText originValue={receivedDate} customStyle={styles.time} />
                        <StyledText originValue={title} customStyle={styles.title} />
                        <StyledImage customStyle={styles.img} source={Images.photo.defaultImage} />
                        <StyledText originValue={content} isBlack customStyle={styles.normalText} />
                    </View>
                    <View style={styles.contentContainer}>
                        <View style={styles.titleCoupon}>
                            <StyledIcon source={Images.icons.coupon} size={20} customStyle={styles.iconCoupon} />
                            <StyledText i18nText={'notification.couponList'} customStyle={styles.title} />
                        </View>
                        {listCoupon?.map((item: any, index: number) => (
                            <CouponItemNotification key={index} item={item} />
                        ))}
                    </View>
                </View>
            </StyledKeyboardAware>
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
        marginVertical: '20@vs',
        borderRadius: 10,
    },
    titleCoupon: {
        flexDirection: 'row',
    },
    iconCoupon: {
        marginRight: '15@s',
        tintColor: Themes.COLORS.secondary,
        alignItems: 'center',
        marginBottom: '10@vs',
    },
    couponItemNotification: {
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
    normalText: {
        lineHeight: '27@vs',
    },
});
