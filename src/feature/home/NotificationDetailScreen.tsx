import { getNotificationCoupon } from 'api/modules/api-app/notification';
import Images from 'assets/images';
import Metrics from 'assets/metrics';
import { Themes } from 'assets/themes';
import { StyledIcon, StyledImage, StyledText, StyledTouchable } from 'components/base';
import AlertMessage from 'components/base/AlertMessage';
import StyledKeyboardAware from 'components/base/StyledKeyboardAware';
import DashView from 'components/common/DashView';
import StyledHeader from 'components/common/StyledHeader';
import StyledHeaderImage from 'components/common/StyledHeaderImage';
import StampTypeView from 'feature/stamp/components/StampTypeView';
import { COUPON_ROUTE, STAMP_ROUTE } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React, { useEffect, useMemo, useState } from 'react';
import { View } from 'react-native';
import { scale, ScaledSheet, verticalScale } from 'react-native-size-matters';
import { StampCardType } from 'utilities/enumData';
import { formatDate } from 'utilities/format';

const CouponItemNotification = (props: any) => {
    const { item, dash, goToDetailCoupon } = props || {};
    return (
        <StyledTouchable onPress={() => goToDetailCoupon(item)}>
            <View style={styles.couponItemNotification}>
                <StyledImage source={{ uri: item?.image }} customStyle={styles.couponImage} />
                <View style={styles.couponName}>
                    <StyledText originValue={item?.title} customStyle={styles.title} />
                    <StyledText
                        i18nParams={{
                            start: formatDate(item?.startDate || new Date(), 'YYYY/MM/DD'),
                            end: formatDate(item?.endDate || new Date(), 'YYYY/MM/DD'),
                        }}
                        i18nText={'notification.rangeDate'}
                        customStyle={styles.timeItem}
                    />
                </View>
            </View>
            {dash && <DashView />}
        </StyledTouchable>
    );
};
const StampItemNotification = (props: any) => {
    const { item, dash, goToDetailStamp } = props || {};
    const { cardType } = item;
    const isExchange = useMemo(() => cardType === StampCardType.EXCHANGE, [cardType]);
    return (
        <StyledTouchable onPress={() => goToDetailStamp(item)}>
            <View style={styles.couponItemNotification}>
                <StyledImage source={{ uri: item?.image }} customStyle={styles.couponImage} />
                <View style={styles.stampName}>
                    <StyledText originValue={item?.title} customStyle={styles.title} />
                    <StyledText
                        i18nParams={{
                            start: formatDate(item?.startDate || new Date(), 'YYYY/MM/DD'),
                            end: formatDate(item?.endDate || new Date(), 'YYYY/MM/DD'),
                        }}
                        i18nText={'notification.rangeDate'}
                        customStyle={styles.timeItem}
                    />
                </View>
                <StampTypeView isExchange={isExchange} />
            </View>
            {dash && <DashView />}
        </StyledTouchable>
    );
};

const NotificationDetailScreen = (props: any) => {
    const { id } = props.route?.params || {};
    const [coupon, setCoupon] = useState<any>({});
    const { title, content, receivedDate, notification } = coupon;
    const { images = [], coupons, stamps } = notification || {};
    useEffect(() => {
        getNotification();
    }, []);
    const getNotification = async () => {
        try {
            const res = await getNotificationCoupon(id);
            setCoupon(res?.data);
        } catch (error) {
            console.log('getNotification -> error', error);
            AlertMessage(error);
        }
    };
    const listImage = images?.map((item: any) => item?.image) || [];
    const goToDetailStamp = (item: any) => {
        navigate(STAMP_ROUTE.STAMP_CARD_DETAIL, { item });
    };
    const goToDetailCoupon = (item: any) => {
        navigate(COUPON_ROUTE.DETAIL_COUPON, { item });
    };

    return (
        <View style={styles.container}>
            <StyledHeader title={'notification.detailNotificationTitle'} />
            <StyledKeyboardAware>
                <View style={styles.body}>
                    <View style={styles.contentContainer}>
                        <StyledText originValue={receivedDate} customStyle={styles.time} />
                        <StyledText originValue={title} customStyle={styles.title} />
                        <StyledHeaderImage
                            isBack={false}
                            images={listImage}
                            heightImage={verticalScale(335)}
                            customStyle={styles.sliceImage}
                            sliderWidth={Metrics.screenWidth - scale(40)}
                        />
                        <StyledText originValue={content} isBlack customStyle={styles.normalText} />
                    </View>
                    {coupons && (
                        <View style={styles.contentContainer}>
                            <View style={styles.titleCoupon}>
                                <StyledIcon source={Images.icons.coupon} size={20} customStyle={styles.iconCoupon} />
                                <StyledText i18nText={'notification.couponList'} customStyle={styles.title} />
                            </View>
                            {coupons?.map((item: any, index: number) => (
                                <CouponItemNotification
                                    key={index}
                                    item={item}
                                    dash={index < coupons.length - 1}
                                    goToDetailCoupon={goToDetailCoupon}
                                    handleUseCoupon={handleUseCoupon}
                                />
                            ))}
                        </View>
                    )}
                    {stamps && (
                        <View style={styles.contentContainer}>
                            <View style={styles.titleCoupon}>
                                <StyledIcon
                                    source={Images.icons.stamp_card}
                                    size={20}
                                    customStyle={styles.iconCoupon}
                                />
                                <StyledText i18nText={'notification.stampList'} customStyle={styles.title} />
                            </View>
                            {stamps?.map((item: any, index: number) => (
                                <StampItemNotification
                                    key={index}
                                    item={item}
                                    dash={index < stamps.length - 1}
                                    goToDetailStamp={goToDetailStamp}
                                />
                            ))}
                        </View>
                    )}
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
        marginTop: '10@vs',
    },
    time: {
        fontSize: '12@ms0.3',
        color: Themes.COLORS.silver,
        marginBottom: '10@vs',
    },
    timeItem: {
        fontSize: '12@ms0.3',
        color: Themes.COLORS.silver,
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
        flex: 1,
        paddingVertical: '10@vs',
        overflow: 'hidden',
    },
    couponImage: {
        width: '60@s',
        height: '60@s',
        marginRight: '10@vs',
    },
    couponName: {
        flexShrink: 1,
        marginRight: '40@s',
        justifyContent: 'space-between',
    },
    stampName: {
        flexShrink: 1,
        marginRight: '60@s',
        justifyContent: 'space-between',
    },
    normalText: {
        lineHeight: '27@vs',
        marginBottom: '10@vs',
    },
    sliceImage: {
        marginVertical: '20@vs',
    },
});
