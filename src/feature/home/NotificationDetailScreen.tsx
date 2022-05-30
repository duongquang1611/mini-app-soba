import { getNotificationCoupon, readNotification } from 'api/modules/api-app/notification';
import { updateNotificationUnRead } from 'app-redux/slices/globalDataSlice';
import { updateCouponCartOrder } from 'app-redux/slices/orderSlice';
import { store } from 'app-redux/store';
import Images from 'assets/images';
import Metrics from 'assets/metrics';
import { Themes } from 'assets/themes';
import { StyledIcon, StyledImage, StyledText, StyledTouchable } from 'components/base';
import AlertMessage from 'components/base/AlertMessage';
import ModalizeManager from 'components/base/modal/ModalizeManager';
import CouponItem from 'components/common/CouponItem';
import DashView from 'components/common/DashView';
import StyledHeader from 'components/common/StyledHeader';
import StyledHeaderImage from 'components/common/StyledHeaderImage';
import ModalCoupon from 'feature/order/components/ModalCoupon';
import StampTypeView from 'feature/stamp/components/StampTypeView';
import { APP_ROUTE, COUPON_ROUTE, ORDER_ROUTE, STAMP_ROUTE } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { RefreshControl, ScrollView, View } from 'react-native';
import { scale, ScaledSheet, verticalScale } from 'react-native-size-matters';
import { useDispatch } from 'react-redux';
import { StampCardType, StampSettingDuration } from 'utilities/enumData';
import { formatDate } from 'utilities/format';
import { isTimePast, openURL } from 'utilities/helper';
import {
    DateType,
    DiscountType,
    MODAL_ID,
    OrderTypeMenu,
    staticValue,
    statusReadNotification,
    TabCouponStatus,
} from 'utilities/staticData';

const StampItemNotification = (props: any) => {
    const { item, dash, goToDetailStamp } = props || {};
    const { stamp } = item || {};
    const { cardType, settingDuration } = stamp;
    const isExchange = useMemo(() => cardType === StampCardType.EXCHANGE, [cardType]);

    return (
        <>
            <DashView customStyle={styles.dash} />
            <StyledTouchable onPress={() => goToDetailStamp(item)} customStyle={styles.btnStamp}>
                <View style={styles.stampContentNotification}>
                    <StyledImage source={{ uri: stamp?.image }} customStyle={styles.stampImage} />
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
                </View>
                <StampTypeView isExchange={isExchange} />
            </StyledTouchable>
            {dash && <DashView customStyle={styles.dash} />}
        </>
    );
};

const NotificationDetailScreen = (props: any) => {
    const dispatch = useDispatch();
    const modalize = ModalizeManager();
    const { item = {} } = props.route?.params || {};
    const { id } = item;
    const [coupon, setCoupon] = useState<any>({});
    const { title, content, receivedDate, notification, notificationSpecial } = coupon;
    const { images = [], memberStamps, memberCoupons, link } = notificationSpecial || notification || {};
    const [refreshing, setRefreshing] = useState(false);

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
            if (res?.data?.isRead === statusReadNotification.UN_READ) {
                const readData = await readNotification(id);
                store.dispatch(updateNotificationUnRead(readData?.data || 0));
            }
            setCoupon(res?.data);
        } catch (error) {
            console.log('getNotification -> error', error);
            AlertMessage(error);
        }
    };

    const listImage = images?.map((item: any) => item?.image) || [];

    const checkCanUse = (itemMemberCoupon: any) => {
        const { coupon, usedDate } = itemMemberCoupon;
        if (usedDate || coupon?.isBlock) return TabCouponStatus.USED;
        const { dateType, endDate } = coupon || {};
        if (dateType === DateType.NO_EXPIRED_DATE) return TabCouponStatus.CAN_USE;
        return endDate && !isTimePast(endDate) ? TabCouponStatus.CAN_USE : TabCouponStatus.USED;
    };

    const goToDetailStamp = useCallback((item: any) => {
        navigate(STAMP_ROUTE.STAMP_CARD_DETAIL, { item, fromNotify: true });
    }, []);

    const goToDetailCoupon = (item: any) => {
        navigate(COUPON_ROUTE.DETAIL_COUPON, { item, canUse: checkCanUse(item), handleUseCoupon });
    };

    const handleUseCoupon = (item: any) => {
        if (item?.coupon?.discountType === DiscountType.EACH_DISH) {
            // show popup choose dish to use coupon
            showApplyCoupon([item]);
        } else {
            // coupon apply all order
            dispatch(updateCouponCartOrder([item]));
            goToCart();
        }
    };

    const applyChooseDish = (data?: any) => {
        dispatch(updateCouponCartOrder(data));
        goToCart();
    };

    const showApplyCoupon = (listCouponsModal: any) => {
        modalize.show(
            MODAL_ID.APPLY_COUPON,
            <ModalCoupon listCouponsModal={listCouponsModal} applyChooseDish={applyChooseDish} />,
            {
                modalHeight: verticalScale(staticValue.NUMBER_ITEM_LIST_COUPON_MODAL * 60 + 250),
                scrollViewProps: {
                    contentContainerStyle: { flexGrow: 1 },
                },
            },
            { title: 'order.applyCoupon' },
        );
    };

    const goToCart = () => {
        modalize.dismiss(MODAL_ID.APPLY_COUPON);
        navigate(APP_ROUTE.MAIN_TAB, { screen: COUPON_ROUTE.ROOT });
        navigate(ORDER_ROUTE.CART, { orderType: OrderTypeMenu.CART_ORDER, isTabCoupon: true });
    };

    return (
        <View style={styles.container}>
            <StyledHeader title={'notification.detailNotificationTitle'} />
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        colors={[Themes.COLORS.primary]}
                        tintColor={Themes.COLORS.primary}
                        onRefresh={handleRefresh}
                    />
                }
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollView}
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
                                heightImage={Metrics.screenWidth - scale(40)}
                                customStyle={styles.sliceImage}
                                sliderWidth={Metrics.screenWidth - scale(40)}
                            />
                        )}
                        <StyledText originValue={content} isBlack customStyle={styles.normalText} />
                        {link && (
                            <StyledText
                                onPress={() => openURL(link)}
                                originValue={link}
                                isBlack
                                customStyle={styles.linkText}
                            />
                        )}
                    </View>

                    {memberCoupons?.length > 0 && (
                        <>
                            <View style={styles.grayView} />
                            <View style={styles.contentContainerCoupon}>
                                <View style={styles.titleCoupon}>
                                    <StyledIcon
                                        source={Images.icons.coupon}
                                        size={25}
                                        customStyle={styles.iconCoupon}
                                    />
                                    <StyledText i18nText={'notification.couponList'} customStyle={styles.title} />
                                </View>
                                {memberCoupons?.map((item: any, index: number) => (
                                    <CouponItem
                                        isTabCoupon={true}
                                        item={item}
                                        goToDetail={goToDetailCoupon}
                                        handleUseCoupon={() => handleUseCoupon(item)}
                                        key={index}
                                        customDashStyle={styles.dash}
                                        customStyle={{ paddingLeft: 0 }}
                                        showDashTop
                                        showDashBottom={index === memberCoupons.length - 1}
                                        canUse={checkCanUse(item)}
                                    />
                                ))}
                            </View>
                        </>
                    )}
                    {memberStamps?.length > 0 && (
                        <>
                            <View style={styles.grayView} />
                            <View style={styles.contentStampContainer}>
                                <View style={styles.titleStamp}>
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
                                        dash={index === memberStamps.length - 1}
                                        goToDetailStamp={goToDetailStamp}
                                    />
                                ))}
                            </View>
                        </>
                    )}
                </View>
            </ScrollView>
        </View>
    );
};

export default NotificationDetailScreen;

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: Themes.COLORS.white,
    },
    scrollView: {
        paddingBottom: '30@vs',
    },
    grayView: {
        height: '10@vs',
        backgroundColor: Themes.COLORS.lightGray,
        marginBottom: '15@vs',
    },
    contentContainer: {
        backgroundColor: Themes.COLORS.white,
        paddingHorizontal: '20@s',
        paddingBottom: '10@vs',
        flexGrow: 1,
    },
    contentContainerCoupon: {
        backgroundColor: Themes.COLORS.white,
        paddingLeft: '20@s',
        paddingBottom: '10@vs',
        flexGrow: 1,
    },
    contentStampContainer: {
        width: '100%',
        backgroundColor: Themes.COLORS.white,
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
    titleStamp: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: '20@vs',
        paddingHorizontal: '20@s',
    },
    iconCoupon: {
        marginRight: '15@s',
        tintColor: Themes.COLORS.secondary,
        alignItems: 'center',
    },
    couponItemNotification: {
        backgroundColor: Themes.COLORS.white,
        marginVertical: '2@vs',
        flexDirection: 'row',
        paddingVertical: '10@vs',
    },
    stampContentNotification: {
        backgroundColor: Themes.COLORS.white,
        marginVertical: '2@vs',
        flexDirection: 'row',
        paddingVertical: '10@vs',
    },
    couponImage: {
        width: '60@s',
        height: '60@s',
        marginRight: '10@vs',
    },
    stampImage: {
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
        alignSelf: 'center',
    },
    dashStamp: {
        width: Metrics.screenWidth,
        alignSelf: 'center',
        marginLeft: '-20@s',
    },
    btnStamp: {
        paddingLeft: '20@s',
        overflow: 'hidden',
    },
});
