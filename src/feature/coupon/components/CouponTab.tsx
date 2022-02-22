import Images from 'assets/images';
import { Themes } from 'assets/themes';
import { StyledImage, StyledText } from 'components/base';
import { TAB_NAVIGATION_ROOT } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ScaledSheet } from 'react-native-size-matters';
import { listCouponFake } from 'utilities/staticData';

interface CouponTabProps {
    canUse?: boolean;
}

const CouponItem = (item: any) => {
    console.log({ item });
    return (
        <TouchableOpacity style={styles.couponItem} onPress={item?.goToDetail}>
            <StyledImage source={{ uri: item.item?.img }} customStyle={styles.couponImage} />
            <View style={styles.couponName}>
                <StyledText originValue={item.item.name} customStyle={styles.title} />
                <View style={styles.row}>
                    <StyledText originValue={item.item.time} customStyle={styles.time} />
                    {!item.canUse && item.item?.expired && (
                        <StyledText originValue={'有効期限切れ'} customStyle={styles.time} />
                    )}
                    {item.canUse && (
                        <TouchableOpacity style={styles.row}>
                            <StyledText originValue={'有効期限切れ'} customStyle={styles.useText} />
                            <StyledText originValue={'->'} customStyle={styles.time} />
                        </TouchableOpacity>
                    )}
                </View>
                {!item.canUse && !item.item?.expired && (
                    <StyledImage source={Images.photo.defaultImage} customStyle={styles.used} />
                )}
            </View>
        </TouchableOpacity>
    );
};

const CouponTab = (props: CouponTabProps) => {
    const { canUse } = props;
    const goToDetail = () => {
        navigate(TAB_NAVIGATION_ROOT.COUPON_ROUTE.DETAIL_COUPON, { canUse });
    };

    return (
        <View style={styles.container}>
            {listCouponFake.map((item, index) => (
                <CouponItem canUse={canUse} key={index} item={item} goToDetail={goToDetail} />
            ))}
        </View>
    );
};
const styles = ScaledSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: '20@s',
        backgroundColor: Themes.COLORS.white,
    },
    titleCoupon: {
        flexDirection: 'row',
    },
    iconCoupon: {
        marginRight: '15@s',
    },
    couponItem: {
        width: '100%',
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
    time: {
        fontSize: '12@ms0.3',
        color: Themes.COLORS.silver,
        marginBottom: '10@vs',
    },
    useText: {
        color: Themes.COLORS.primary,
        fontWeight: 'bold',
        marginRight: '5@s',
    },
    title: {
        fontSize: '16@ms0.3',
        fontWeight: 'bold',
        color: Themes.COLORS.secondary,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    used: {
        width: '50@s',
        height: '50@s',
        position: 'absolute',
        right: 0,
        top: 0,
    },
});
export default CouponTab;
