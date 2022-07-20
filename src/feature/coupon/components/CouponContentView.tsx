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
import { CouponDishType } from 'utilities/enumData';
import { formatDate } from 'utilities/format';
import { DateType, DiscountType } from 'utilities/staticData';

interface IProps {
    canUse?: boolean;
    customStyle?: StyleProp<ViewStyle>;
    isModal?: boolean;
    data: any;
    initDetailNavigate?: any;
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

const CouponContentView = (props: IProps) => {
    const { customStyle, isModal = false, data = {}, canUse, initDetailNavigate } = props || {};
    const { coupon = {}, usedDate } = data;
    const {
        title,
        image,
        startDate,
        endDate,
        description,
        dateType,
        couponDish,
        discountType,
        discount,
        stringId = '',
    } = coupon || {};
    const isBlock = Boolean(coupon?.isBlock);

    return (
        <WrapComponent customStyle={[styles.container, customStyle]} isModal={isModal}>
            <View style={styles.grayView} />
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
                            i18nParams={{ id: stringId }}
                            customStyle={styles.textId}
                        />
                    )}
                    <View
                        style={[
                            styles.wrapTitle,
                            initDetailNavigate?.stampAmount && { paddingBottom: verticalScale(10) },
                        ]}
                    >
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
                    </View>
                    <View style={styles.wrapTextCoupon}>
                        {discountType === DiscountType.ALL_ORDER ? (
                            <StyledText
                                i18nText={'coupon.detail.discountAllOrder'}
                                i18nParams={{ discount }}
                                customStyle={styles.discountText}
                            />
                        ) : (
                            isArray(couponDish) &&
                            couponDish.length > 0 &&
                            orderBy(couponDish, ['id'], ['asc']).map((item: any, index: number) => (
                                <CouponDishItem item={item} key={index.toString()} />
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
});

export default CouponContentView;
