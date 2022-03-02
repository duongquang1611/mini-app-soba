import Images from 'assets/images';
import { Themes } from 'assets/themes';
import { StyledIcon, StyledImage, StyledText, StyledTouchable } from 'components/base';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

const CouponItem = (props: any) => {
    const { customStyle, item, canUse, goToDetail } = props;

    const onPressItem = () => {
        goToDetail?.(item);
    };

    return (
        <StyledTouchable customStyle={[styles.couponItem, customStyle]} onPress={onPressItem}>
            <StyledImage source={{ uri: item?.img }} customStyle={styles.couponImage} />
            <View style={styles.couponName}>
                <StyledText originValue={item.name} customStyle={styles.title} />
                <View style={styles.row}>
                    <StyledText originValue={item.time} customStyle={styles.time} />
                    {!canUse && item?.expired && <StyledText originValue={'有効期限切れ'} customStyle={styles.time} />}
                    {canUse && (
                        <TouchableOpacity style={styles.row}>
                            <StyledText originValue={'クーポン使用'} customStyle={styles.useText} />
                            <StyledIcon source={Images.icons.next} size={20} />
                        </TouchableOpacity>
                    )}
                </View>
                {!canUse && !item?.expired && (
                    <StyledIcon source={Images.icons.couponUsed} size={70} customStyle={styles.stampUsed} />
                )}
            </View>
        </StyledTouchable>
    );
};

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: Themes.COLORS.lightGray,
    },
    titleCoupon: {
        flexDirection: 'row',
    },
    iconCoupon: {
        marginRight: '15@s',
    },
    couponItem: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: '10@vs',
        backgroundColor: Themes.COLORS.white,
        paddingHorizontal: '20@s',
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
        alignItems: 'center',
    },
    used: {
        width: '50@s',
        height: '50@s',
        position: 'absolute',
        right: 0,
        top: 0,
    },
    stampUsed: {
        position: 'absolute',
        top: '-12@s',
        right: '-20@s',
    },
});

export default CouponItem;
