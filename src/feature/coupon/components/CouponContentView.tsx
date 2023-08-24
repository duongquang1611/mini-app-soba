import Images from 'assets/images';
import { Themes } from 'assets/themes';
import { StyledIcon, StyledImage, StyledText } from 'components/base';
import { StyledImageBackground } from 'components/base/StyledImage';
import StyledKeyboardAware from 'components/base/StyledKeyboardAware';
import PointExchangeView from 'components/common/PointExchangeView';
import { isArray, orderBy } from 'lodash';
import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { scale, ScaledSheet, verticalScale } from 'react-native-size-matters';
import { CheckCouponDishSpecify, CouponDishType } from 'utilities/enumData';
import {
    formatCouponStringId,
    formatDate,
    formatRestaurantsCouponShow,
    formatRestaurantsDishesShow,
    getCouponDishSpecify,
} from 'utilities/format';
import { getRangeCoupon } from 'utilities/helper';
import { DateType, DiscountType } from 'utilities/staticData';

interface IProps {
    canUse?: boolean;
    customStyle?: StyleProp<ViewStyle>;
    isModal?: boolean;
    data: any;
    initDetailNavigate?: any;
    hasSeparatorView?: boolean;
    item?: any;
    isExchange?: boolean;
}
const CouponDishItem = ({ item, discountType }: any) => {
    const { type, dish, discount, restaurants, isSpecifyRestaurants } = item;
    const { title = '' } = dish || {};
    return (
        <StyledText
            i18nText={type === CouponDishType.SETTING_DISCOUNT ? 'coupon.detail.discount' : 'coupon.detail.free'}
            i18nParams={{
                discount,
                title,
                restaurants: formatRestaurantsDishesShow(restaurants, discountType, isSpecifyRestaurants),
            }}
            customStyle={styles.discountText}
        />
    );
};

const WrapComponent = ({ children, isModal, customStyle }: any) => {
    return isModal ? (
        <View style={customStyle}>{children}</View>
    ) : (
        <StyledKeyboardAware style={customStyle}>{children}</StyledKeyboardAware>
    );
};

const CouponContentView = (props: IProps) => {
    const {
        customStyle,
        isModal = false,
        data = {},
        canUse,
        initDetailNavigate,
        hasSeparatorView = true,
        item,
        isExchange,
    } = props || {};
    const { coupon = {}, usedDate, expiryDate, receivedDate, exchangeTime } = data || {};
    const { exchangeLimit } = item || {};
    const {
        title,
        image,
        description,
        couponDishes,
        discountType,
        discount,
        stringId = '',
        startDate,
        endDate,
        dateType,
        expiryDay,
        expiryDayType,
        isDiscountAllRestaurants,
        restaurants,
    } = coupon || {};

    const isBlock = Boolean(coupon?.isBlock);
    const hasExpired = dateType === DateType.EXPIRED_DATE;

    const showTextStoreDescription =
        discountType === DiscountType.EACH_DISH && getCouponDishSpecify(couponDishes) !== CheckCouponDishSpecify.FULL_0;

    return (
        <WrapComponent customStyle={[styles.container, customStyle]} isModal={isModal}>
            {hasSeparatorView && <View style={styles.grayView} />}
            <View style={styles.body}>
                <View style={styles.contentContainer}>
                    {isModal ? (
                        <View style={styles.wrapTextGetCoupon}>
                            <StyledIcon size={24} source={Images.icons.giftOpenSmall} />
                            <StyledText i18nText={'coupon.detail.getCoupon'} customStyle={styles.textGetCoupon} />
                        </View>
                    ) : (
                        <StyledText
                            i18nText={'coupon.detail.id'}
                            i18nParams={{ id: formatCouponStringId(stringId, exchangeTime) }}
                            customStyle={styles.textId}
                        />
                    )}
                    <View
                        style={[
                            styles.wrapTitle,
                            initDetailNavigate?.stampAmount && { paddingBottom: verticalScale(10) },
                        ]}>
                        <StyledText
                            originValue={title}
                            customStyle={[styles.title, initDetailNavigate?.stampAmount && { marginRight: scale(32) }]}
                        />

                        <PointExchangeView
                            stampAmount={initDetailNavigate?.stampAmount}
                            bigSize
                            customStyle={styles.pointExchangeView}
                        />
                    </View>
                    <View style={styles.applyBranch}>
                        <StyledText
                            i18nText={'coupon.restaurantsTitle'}
                            customStyle={[styles.title, styles.restaurantHeight]}
                        />

                        <StyledText
                            originValue={formatRestaurantsCouponShow(
                                restaurants,
                                isDiscountAllRestaurants,
                                discountType,
                                couponDishes,
                            )}
                            customStyle={[styles.restaurant, styles.restaurantHeight]}
                        />
                    </View>
                    {showTextStoreDescription && (
                        <StyledText i18nText={'coupon.allStoreContent'} customStyle={styles.allStore} />
                    )}
                    {isExchange && (
                        <StyledText
                            customStyle={styles.exchangeLimit}
                            i18nParams={{ time: exchangeLimit }}
                            i18nText={exchangeLimit ? 'coupon.exchangeLimitRange' : 'coupon.exchangeLimit'}
                        />
                    )}
                    <StyledImageBackground style={styles.img} source={{ uri: image }}>
                        {(isBlock || !canUse) && (
                            <View style={styles.transparent}>
                                {!usedDate || isBlock ? (
                                    <View style={styles.wrapTextImgExpired}>
                                        <StyledText
                                            i18nText={isBlock ? 'coupon.btnBlock' : 'coupon.detail.expired'}
                                            customStyle={styles.textImgExpired}
                                        />
                                    </View>
                                ) : (
                                    <StyledImage source={Images.photo.used} customStyle={styles.labelImage} />
                                )}
                            </View>
                        )}
                    </StyledImageBackground>
                    <View style={styles.rowView}>
                        <StyledIcon source={Images.icons.calendar} size={20} customStyle={styles.iconDate} />
                        {isExchange ? (
                            <>
                                {dateType === DateType.EXPIRED_FROM_RECEIVED ? (
                                    <StyledText
                                        i18nText={usedDate ? 'coupon.usedDate' : getRangeCoupon(expiryDayType)}
                                        i18nParams={{
                                            start: formatDate(startDate),
                                            end: formatDate(endDate),
                                            date: formatDate(usedDate),
                                            expiryDate: formatDate(expiryDate),
                                            value: expiryDay,
                                        }}
                                        customStyle={styles.textDate}
                                    />
                                ) : (
                                    <StyledText
                                        i18nText={
                                            usedDate
                                                ? 'coupon.usedDate'
                                                : hasExpired
                                                ? 'coupon.expiredDate'
                                                : 'coupon.noExpiredDate'
                                        }
                                        i18nParams={{
                                            start: formatDate(startDate),
                                            end: formatDate(endDate),
                                            date: formatDate(usedDate),
                                            expiryDate: formatDate(expiryDate),
                                        }}
                                        customStyle={styles.textDate}
                                    />
                                )}
                            </>
                        ) : (
                            <>
                                {dateType === DateType.NO_EXPIRED_DATE ? (
                                    <StyledText i18nText={'coupon.noExpiredDate'} customStyle={styles.textDate} />
                                ) : (
                                    <StyledText
                                        i18nText={'coupon.rangeDateDetail'}
                                        i18nParams={
                                            dateType === DateType.EXPIRED_DATE
                                                ? {
                                                      start: formatDate(startDate),
                                                      end: formatDate(endDate),
                                                  }
                                                : dateType === DateType.EXPIRED_FROM_RECEIVED
                                                ? {
                                                      start: formatDate(receivedDate),
                                                      end: formatDate(expiryDate),
                                                  }
                                                : {}
                                        }
                                        customStyle={styles.textDate}
                                    />
                                )}
                            </>
                        )}
                    </View>

                    <View style={styles.wrapTextCoupon}>
                        {discountType === DiscountType.ALL_ORDER ? (
                            <StyledText
                                i18nText={'coupon.detail.discountAllOrder'}
                                i18nParams={{ discount }}
                                customStyle={styles.discountText}
                            />
                        ) : (
                            isArray(couponDishes) &&
                            couponDishes.length > 0 &&
                            orderBy(couponDishes, ['id'], ['asc']).map((item: any, index: number) => (
                                <CouponDishItem item={item} key={index.toString()} discountType={discountType} />
                            ))
                        )}
                    </View>
                    <StyledText originValue={description} isBlack customStyle={styles.textDescription} />
                </View>
            </View>
        </WrapComponent>
    );
};

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: Themes.COLORS.white,
    },
    contentContainer: {
        width: '100%',
        backgroundColor: Themes.COLORS.white,
        marginBottom: '10@vs',
        paddingHorizontal: '20@s',
        paddingBottom: '15@vs',
    },
    body: {
        flex: 1,
        alignItems: 'center',
    },
    textId: {
        fontSize: '12@ms0.3',
        color: Themes.COLORS.silver,
        marginBottom: '10@vs',
        marginTop: '15@vs',
    },
    textDate: {
        fontWeight: 'bold',
    },
    title: {
        fontSize: '16@ms0.3',
        fontWeight: 'bold',
        color: Themes.COLORS.secondary,
    },
    restaurantHeight: {
        lineHeight: '24@vs',
    },
    discountText: {
        fontSize: '16@ms0.3',
        fontWeight: 'bold',
        color: Themes.COLORS.primary,
        marginBottom: '5@vs',
    },
    img: {
        width: '335@s',
        height: '335@s',
        marginTop: '20@vs',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: '28@vs',
    },
    transparent: {
        width: '100%',
        height: '335@vs',
        marginVertical: '10@vs',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Themes.COLORS.labelCouponUsed,
    },
    labelImage: {
        width: '208@s',
        height: '208@s',
        alignSelf: 'center',
        marginBottom: '20@vs',
        marginTop: '10@vs',
    },
    rowView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconDate: {
        marginRight: '8@s',
    },
    textGetCoupon: {
        fontSize: '16@ms0.3',
        marginLeft: '10@s',
        fontWeight: 'bold',
        color: Themes.COLORS.primary,
    },
    wrapTextGetCoupon: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: '30@vs',
        marginTop: '15@vs',
    },
    textImgExpired: {
        color: Themes.COLORS.mineShaft,
        fontSize: '16@ms0.3',
        fontWeight: 'bold',
    },
    wrapTextImgExpired: {
        backgroundColor: Themes.COLORS.mischka,
        borderRadius: 10,
        padding: '10@s',
    },
    wrapTextCoupon: {
        marginTop: '10@vs',
        marginBottom: '15@vs',
    },
    textDescription: {
        lineHeight: '21@vs',
    },
    wrapTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    applyBranch: {
        flexDirection: 'row',
        // alignItems: 'center',
        marginTop: '10@s',
    },
    grayView: {
        height: '10@vs',
        backgroundColor: Themes.COLORS.lightGray,
        marginBottom: '15@vs',
    },
    pointExchangeView: {
        position: 'absolute',
        top: '3@vs',
        right: 0,
    },
    exchangeLimit: {},
    restaurant: {
        flexShrink: 1,
        marginLeft: '5@s',
    },
    allStore: {
        color: Themes.COLORS.primary,
    },
});

export default CouponContentView;
