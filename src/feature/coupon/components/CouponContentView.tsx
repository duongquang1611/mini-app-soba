import Images from 'assets/images';
import { Themes } from 'assets/themes';
import { StyledIcon, StyledImage, StyledText } from 'components/base';
import StyledKeyboardAware from 'components/base/StyledKeyboardAware';
import { isArray } from 'lodash';
import React from 'react';
import { ImageBackground, StyleProp, View, ViewStyle } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { formatDate } from 'utilities/format';
import { CouponDishType, DateType, DiscountType } from 'utilities/staticData';

interface IProps {
    canUse?: boolean;
    customStyle?: StyleProp<ViewStyle>;
    isModal?: boolean;
    data: any;
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
    const { customStyle, isModal = false, data = {}, canUse } = props;
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
    } = coupon;

    return (
        <WrapComponent customStyle={[styles.container, customStyle]} isModal={isModal}>
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
                    <StyledText originValue={title} customStyle={styles.title} />
                    <ImageBackground style={styles.img} source={{ uri: image }}>
                        {!canUse && (
                            <View style={styles.transparent}>
                                {usedDate ? (
                                    <StyledImage source={Images.photo.used} customStyle={styles.labelImage} />
                                ) : (
                                    <View style={styles.wrapTextImgExpired}>
                                        <StyledText
                                            i18nText={'coupon.detail.expired'}
                                            customStyle={styles.textImgExpired}
                                        />
                                    </View>
                                )}
                            </View>
                        )}
                    </ImageBackground>
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
                    <View>
                        {discountType === DiscountType.ALL_ORDER ? (
                            <StyledText
                                i18nText={'coupon.detail.discountAllOrder'}
                                i18nParams={{ discount }}
                                customStyle={styles.discountText}
                            />
                        ) : (
                            isArray(couponDish) &&
                            couponDish.length > 0 &&
                            couponDish.map((item: any, index: number) => (
                                <CouponDishItem item={item} key={index.toString()} />
                            ))
                        )}
                    </View>
                    <StyledText originValue={description} isBlack />
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
        marginVertical: '15@vs',
    },
    img: {
        width: '100%',
        height: '335@vs',
        marginVertical: '10@vs',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        overflow: 'hidden',
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
        marginRight: '10@s',
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
});

export default CouponContentView;
