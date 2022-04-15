import { getNotificationCoupon, readNotification } from 'api/modules/api-app/notification';
import { updateNotificationUnRead } from 'app-redux/slices/globalDataSlice';
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
import { Linking, RefreshControl, View } from 'react-native';
import { scale, ScaledSheet, verticalScale } from 'react-native-size-matters';
import { useDispatch } from 'react-redux';
import { StampCardType, StampSettingDuration } from 'utilities/enumData';
import { formatDate } from 'utilities/format';
import { DateType } from 'utilities/staticData';

const CouponItemNotification = (props: any) => {
    const { item, dash, goToDetailCoupon } = props || {};
    const { coupon } = item;
    return (
        <StyledTouchable onPress={() => goToDetailCoupon(item)}>
            <View style={styles.couponItemNotification}>
                <StyledImage source={{ uri: coupon?.image }} customStyle={styles.couponImage} />
                <View style={styles.couponName}>
                    <StyledText originValue={coupon?.title} customStyle={styles.title} numberOfLines={1} />

                    {coupon?.dateType === DateType.EXPIRED_DATE ? (
                        <StyledText
                            i18nParams={{
                                start: formatDate(coupon?.startDate),
                                end: formatDate(coupon?.endDate),
                            }}
                            i18nText={'notification.rangeDate'}
                            customStyle={styles.timeItem}
                        />
                    ) : (
                        <StyledText i18nText={'stamp.noExpiredDate'} customStyle={styles.timeItem} />
                    )}
                </View>
            </View>
            {dash && <DashView customStyle={styles.dash} />}
        </StyledTouchable>
    );
};
const StampItemNotification = (props: any) => {
    const { item, dash, goToDetailStamp } = props || {};
    const { stamp } = item || {};
    const { cardType, settingDuration } = stamp;
    const isExchange = useMemo(() => cardType === StampCardType.EXCHANGE, [cardType]);
    return (
        <StyledTouchable onPress={() => goToDetailStamp(item)}>
            <View style={styles.couponItemNotification}>
                <StyledImage source={{ uri: stamp?.image }} customStyle={styles.couponImage} />
                <View style={styles.stampName}>
                    <StyledText originValue={stamp?.title} customStyle={styles.title} numberOfLines={1} />
                    <StyledText
                        i18nText={
                            settingDuration === StampSettingDuration.NO_EXPIRED_DATE
                                ? 'stamp.noExpiredDate'
                                : 'stamp.rangeDate'
                        }
                        i18nParams={{ start: formatDate(stamp?.startDate), end: formatDate(stamp?.endDate) }}
                        customStyle={styles.timeItem}
                    />
                </View>
                <StampTypeView isExchange={isExchange} />
            </View>
            {dash && <DashView customStyle={styles.dashStamp} />}
        </StyledTouchable>
    );
};

const NotificationDetailScreen = (props: any) => {
    const { id } = props.route?.params || {};
    const [coupon, setCoupon] = useState<any>({});
    const { title, content, receivedDate, notification } = coupon;
    const { images = [], memberStamps, memberCoupons, link } = notification || {};
    const [refreshing, setRefreshing] = useState(false);
    const dispatch = useDispatch();
    const handleRefresh = async () => {
        try {
            setRefreshing(true);
            await getNotification();
        } catch (error) {
            console.log(error);
        } finally {
            setRefreshing(false);
        }
    };
    useEffect(() => {
        getNotification();
    }, []);
    const getNotification = async () => {
        try {
            const res = await getNotificationCoupon(id);
            const readRes = await readNotification(id);
            dispatch(updateNotificationUnRead(readRes?.data || 0));
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
        navigate(COUPON_ROUTE.DETAIL_COUPON, { item, canUse: true });
    };

    return (
        <View style={styles.container}>
            <StyledHeader title={'notification.detailNotificationTitle'} />
            <StyledKeyboardAware
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        colors={[Themes.COLORS.primary]}
                        tintColor={Themes.COLORS.primary}
                        onRefresh={handleRefresh}
                    />
                }
            >
                <View style={styles.body}>
                    <View style={styles.grayView} />
                    <View style={styles.contentContainer}>
                        <StyledText originValue={formatDate(receivedDate)} customStyle={styles.time} />
                        <StyledText originValue={title} customStyle={styles.title} />
                        {listImage?.length > 0 && (
                            <StyledHeaderImage
                                isBack={false}
                                images={listImage}
                                heightImage={verticalScale(335)}
                                customStyle={styles.sliceImage}
                                sliderWidth={Metrics.screenWidth - scale(40)}
                            />
                        )}
                        <StyledText originValue={content} isBlack customStyle={styles.normalText} />
                        {link && (
                            <StyledText
                                onPress={() => Linking.openURL(link)}
                                originValue={link}
                                isBlack
                                customStyle={styles.linkText}
                            />
                        )}
                    </View>

                    {memberCoupons?.length > 0 && (
                        <>
                            <View style={styles.grayView} />
                            <View style={styles.contentContainer}>
                                <View style={styles.titleCoupon}>
                                    <StyledIcon
                                        source={Images.icons.coupon}
                                        size={25}
                                        customStyle={styles.iconCoupon}
                                    />
                                    <StyledText i18nText={'notification.couponList'} customStyle={styles.title} />
                                </View>
                                {memberCoupons?.map((item: any, index: number) => (
                                    <CouponItemNotification
                                        key={index}
                                        item={item}
                                        dash={index < memberCoupons.length - 1}
                                        goToDetailCoupon={goToDetailCoupon}
                                    />
                                ))}
                            </View>
                        </>
                    )}
                    {memberStamps?.length > 0 && (
                        <>
                            <View style={styles.grayView} />
                            <View style={styles.contentStampContainer}>
                                <View style={styles.titleCoupon}>
                                    <StyledIcon
                                        source={Images.icons.stamp_card}
                                        size={25}
                                        customStyle={styles.iconCoupon}
                                    />
                                    <StyledText i18nText={'notification.stampList'} customStyle={styles.title} />
                                </View>
                                {memberStamps?.map((item: any, index: number) => (
                                    <StampItemNotification
                                        key={index}
                                        item={item}
                                        dash={index < memberStamps.length - 1}
                                        goToDetailStamp={goToDetailStamp}
                                    />
                                ))}
                            </View>
                        </>
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
        backgroundColor: Themes.COLORS.white,
    },
    grayView: {
        height: '10@vs',
        backgroundColor: Themes.COLORS.lightGray,
        marginBottom: '15@vs',
    },
    contentContainer: {
        width: '100%',
        backgroundColor: Themes.COLORS.white,
        paddingHorizontal: '20@s',
        paddingBottom: '10@vs',
    },
    contentStampContainer: {
        width: '100%',
        backgroundColor: Themes.COLORS.white,
        paddingLeft: '20@s',
        paddingBottom: '10@vs',
    },
    body: {
        flex: 1,
    },
    time: {
        fontSize: '12@ms0.3',
        color: Themes.COLORS.silver,
        marginBottom: '10@vs',
        marginTop: '5@vs',
    },
    timeItem: {
        fontSize: '12@ms0.3',
        color: Themes.COLORS.silver,
        marginTop: '10@vs',
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
        alignItems: 'center',
        marginBottom: '20@vs',
    },
    iconCoupon: {
        marginRight: '15@s',
        tintColor: Themes.COLORS.secondary,
        alignItems: 'center',
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
        paddingBottom: '10@vs',
    },
    stampName: {
        flexShrink: 1,
        marginRight: '65@s',
        justifyContent: 'space-between',
        paddingBottom: '10@vs',
    },
    normalText: {
        lineHeight: '27@vs',
    },
    sliceImage: {
        marginVertical: '20@vs',
        borderRadius: 10,
        overflow: 'hidden',
    },
    linkText: {
        textDecorationLine: 'underline',
        color: Themes.COLORS.linkDefault,
        marginBottom: '10@vs',
    },
    dash: {
        width: Metrics.screenWidth,
        alignSelf: 'center',
        marginLeft: '-20@s',
    },
    dashStamp: {
        width: Metrics.screenWidth,
        alignSelf: 'center',
        marginLeft: '-20@s',
    },
});
