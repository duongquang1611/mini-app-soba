import Images from 'assets/images';
import { Themes } from 'assets/themes';
import { StyledIcon, StyledText } from 'components/base';
import { StyledImageBackground } from 'components/base/StyledImage';
import StyledKeyboardAware from 'components/base/StyledKeyboardAware';
import DashView from 'components/common/DashView';
import { isArray, orderBy } from 'lodash';
import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { scale, ScaledSheet } from 'react-native-size-matters';
import { CouponDishType } from 'utilities/enumData';
import { formatDate, formatRestaurantsCouponShow } from 'utilities/format';
import { getRangeCoupon } from 'utilities/helper';
import { DateType, DiscountType } from 'utilities/staticData';

interface IProps {
    canUse?: boolean;
    customStyle?: StyleProp<ViewStyle>;
    isOpen?: boolean;
    datas: any[];
}
const CouponDishItem = ({ item }: any) => {
    const { type, dish, discount } = item;
    const { title = '' } = dish || {};
    return (
        <StyledText
            i18nText={type === CouponDishType.SETTING_DISCOUNT ? 'coupon.detail.discount' : 'coupon.detail.free'}
            i18nParams={{ discount, title }}
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

const CouponContentItem = ({ item }: any) => {
    const { coupon = {}, usedDate } = item;
    const {
        title,
        image,
        startDate,
        endDate,
        description,
        dateType,
        couponDishes,
        discountType,
        discount,
        stringId = '',
        expiryDayType,
        expiryDay,
        restaurants,
        isDiscountAllRestaurants,
    } = coupon;

    return (
        <>
            <StyledText i18nText={'coupon.detail.id'} i18nParams={{ id: stringId }} customStyle={styles.textId} />
            <StyledText
                i18nParams={{
                    restaurants: formatRestaurantsCouponShow(restaurants, isDiscountAllRestaurants, false),
                    title,
                }}
                i18nText={'coupon.titleItemCoupon'}
                customStyle={styles.title}
            />
            <StyledImageBackground style={styles.img} source={{ uri: image }} />
            <View style={styles.rowView}>
                <StyledIcon source={Images.icons.calendar} size={20} customStyle={styles.iconDate} />

                <>
                    {dateType === DateType.EXPIRED_FROM_RECEIVED ? (
                        <StyledText
                            i18nText={getRangeCoupon(expiryDayType)}
                            i18nParams={{
                                value: expiryDay,
                            }}
                            customStyle={styles.textDate}
                        />
                    ) : (
                        <StyledText
                            i18nText={
                                usedDate
                                    ? 'coupon.usedDate'
                                    : dateType === DateType.EXPIRED_DATE
                                    ? 'coupon.expiredDate'
                                    : 'coupon.noExpiredDate'
                            }
                            i18nParams={{
                                start: formatDate(startDate),
                                end: formatDate(endDate),
                                date: formatDate(usedDate),
                            }}
                            customStyle={styles.textDate}
                        />
                    )}
                </>
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
                        <CouponDishItem item={item} key={index.toString()} />
                    ))
                )}
            </View>
            <StyledText originValue={description} isBlack customStyle={styles.textDescription} />
            <DashView customStyle={{ alignSelf: 'center' }} />
        </>
    );
};

const CouponContentStampView = (props: IProps) => {
    const { customStyle, datas = [], isOpen } = props;

    return (
        <WrapComponent customStyle={[styles.container, customStyle]} isModal={true}>
            <View style={styles.body}>
                <View style={styles.contentContainer}>
                    <View style={styles.wrapTextGetCoupon}>
                        <StyledIcon
                            size={24}
                            source={isOpen ? Images.icons.giftOpenSmall : Images.icons.giftClose}
                            customStyle={!isOpen && { marginTop: -scale(4) }}
                        />
                        <StyledText
                            i18nText={'coupon.detail.getCoupon'}
                            i18nParams={{ count: datas.length }}
                            customStyle={styles.textGetCoupon}
                        />
                    </View>

                    {datas.map((item: any, index: number) => {
                        return <CouponContentItem item={item} key={index} />;
                    })}
                </View>
            </View>
        </WrapComponent>
    );
};

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: Themes.COLORS.backgroundPrimary,
    },
    contentContainer: {
        width: '100%',
        backgroundColor: Themes.COLORS.white,
        marginBottom: '10@vs',
        paddingHorizontal: '20@s',
        paddingBottom: '15@vs',
        marginVertical: '10@vs',
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
    discountText: {
        fontSize: '16@ms0.3',
        fontWeight: 'bold',
        color: Themes.COLORS.primary,
        marginBottom: '5@vs',
    },
    img: {
        width: '100%',
        height: '335@vs',
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
        marginBottom: '20@vs',
    },
});

export default CouponContentStampView;
