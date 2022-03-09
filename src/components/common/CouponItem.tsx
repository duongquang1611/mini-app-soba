import Images from 'assets/images';
import { Themes } from 'assets/themes';
import { StyledIcon, StyledImage, StyledText, StyledTouchable } from 'components/base';
import React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

export const CouponItem = (props: any) => {
    const { item, canUse, goToDetail, handleUseCoupon } = props;

    return (
        <StyledTouchable customStyle={styles.couponItem} onPress={goToDetail}>
            <StyledImage source={{ uri: item?.img }} customStyle={styles.couponImage} />
            <View style={styles.couponName}>
                <StyledText originValue={item.name} customStyle={styles.title} />
                <View style={styles.row}>
                    <StyledText originValue={item.time} customStyle={styles.time} />
                    {!canUse && item?.expired && <StyledText originValue={'有効期限切れ'} customStyle={styles.time} />}
                    {canUse && (
                        <StyledTouchable customStyle={styles.row} onPress={handleUseCoupon}>
                            <StyledText originValue={'クーポン使用'} customStyle={styles.useText} />
                            <StyledIcon source={Images.icons.next} size={20} />
                        </StyledTouchable>
                    )}
                </View>
                {!canUse && !item?.expired && (
                    <StyledIcon source={Images.icons.couponUsed} size={70} customStyle={styles.stampUsed} />
                )}
            </View>
        </StyledTouchable>
    );
};

export default CouponItem;

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: Themes.COLORS.lightGray,
    },
    couponItem: {
        width: '100%',
        marginVertical: '2@vs',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: '10@vs',
        marginBottom: '3@vs',
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
        fontSize: '12@ms0.3',
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
    stampUsed: {
        position: 'absolute',
        top: '-12@s',
        right: '-20@s',
    },
});
