/* eslint-disable camelcase */
import Images from 'assets/images';
import { Themes } from 'assets/themes';
import { StyledIcon, StyledText, StyledTouchable } from 'components/base';
import { StyledImageBackground } from 'components/base/StyledImage';
import React, { useMemo } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { ScaledSheet } from 'react-native-size-matters';
import { StampCardType, StampSettingDuration } from 'utilities/enumData';
import { formatDate } from 'utilities/format';
import { checkExpired } from 'utilities/helper';
import { staticValue } from 'utilities/staticData';
import StampTypeView from './StampTypeView';

interface IProps {
    item: any;
    onPress?: any;
    customStyle?: StyleProp<ViewStyle>;
    containerStyle?: StyleProp<ViewStyle>;
    animation?: boolean;
    isBottomTab?: boolean;
}

const StampItem = (props: IProps) => {
    const {
        onPress,
        item: itemMemberStamp,
        customStyle,
        containerStyle,
        animation = false,
        isBottomTab = false,
    } = props;
    const { stamp = {}, leftAmount = 0, totalAmount = 0 } = itemMemberStamp;
    const { image_150, title, startDate, cardType, settingDuration, endDate } = stamp;
    const titleProps = useMemo(() => (isBottomTab ? { numberOfLines: 1 } : {}), [isBottomTab]);
    // cardType: StampCardType
    const isExchange = useMemo(() => cardType === StampCardType.EXCHANGE, [cardType]);
    const isNoExpired = useMemo(() => settingDuration === StampSettingDuration.NO_EXPIRED_DATE, [settingDuration]);
    const isExpired = useMemo(() => {
        return isNoExpired ? false : checkExpired(endDate);
    }, [endDate, isNoExpired]);
    const isBlock = Boolean(stamp?.isBlock);

    return (
        <Animatable.View style={containerStyle} animation={animation ? staticValue.ANIMATION_ITEM : ''} useNativeDriver>
            <StyledTouchable customStyle={[styles.container, customStyle]} onPress={onPress} disabled={!onPress}>
                <StyledImageBackground source={{ uri: image_150 }} style={styles.imgStamp} resizeMode={'cover'}>
                    {!!isExpired &&
                        !isBottomTab &&
                        (isBlock ? null : (
                            <View style={styles.expiredImage}>
                                <StyledIcon size={60} source={Images.icons.stampUsedDetail} />
                            </View>
                        ))}
                </StyledImageBackground>
                <View style={styles.content}>
                    <StyledText originValue={title} customStyle={styles.nameStamp} {...titleProps} />
                    <StyledText
                        i18nText={
                            settingDuration === StampSettingDuration.NO_EXPIRED_DATE
                                ? 'stamp.noExpiredDate'
                                : 'stamp.rangeDate'
                        }
                        i18nParams={{ start: formatDate(startDate), end: formatDate(endDate) }}
                        customStyle={styles.textRangeDate}
                    />

                    <View style={styles.wrapCount}>
                        <View style={{ flexDirection: 'row' }}>
                            <StyledText
                                i18nText={isExchange ? 'stamp.remain' : 'stamp.titleCount'}
                                customStyle={styles.textTitleCount}
                            />
                            <StyledText
                                i18nText={'stamp.count'}
                                i18nParams={{ count: (isExchange ? leftAmount : totalAmount) || 0 }}
                                customStyle={styles.textCount}
                            />
                        </View>
                        {isBlock && <StyledText i18nText={'stamp.textBlock'} customStyle={styles.textBlock} disabled />}
                    </View>
                </View>
                <StampTypeView isExchange={isExchange} />
                {!!isExpired &&
                    isBottomTab &&
                    (isBlock ? null : (
                        <StyledIcon source={Images.icons.stampUsed} size={90} customStyle={styles.stampUsed} />
                    ))}
            </StyledTouchable>
        </Animatable.View>
    );
};

const styles = ScaledSheet.create({
    container: {
        flexDirection: 'row',
        paddingHorizontal: '20@s',
        paddingVertical: '20@vs',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: Themes.COLORS.white,
    },
    imgStamp: {
        width: '76@s',
        height: '76@s',
        borderRadius: 1,
    },
    content: {
        flexShrink: 1,
        marginLeft: '10@s',
        width: '100%',
    },
    nameStamp: {
        fontSize: '16@ms0.3',
        fontWeight: 'bold',
        marginRight: '60@s',
    },
    textCount: {
        fontSize: '16@ms0.3',
        fontWeight: 'bold',
        color: Themes.COLORS.primary,
    },
    textTitleCount: {
        color: Themes.COLORS.mineShaft,
        marginRight: '15@s',
        textAlign: 'center',
    },
    textRangeDate: {
        fontSize: '12@ms0.3',
        color: Themes.COLORS.silver,
        marginTop: '5@vs',
    },
    wrapCount: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: '6@vs',
        justifyContent: 'space-between',
    },
    stampUsed: {
        position: 'absolute',
        top: '-2@s',
    },
    expiredImage: {
        width: '100%',
        height: '100%',
        backgroundColor: Themes.COLORS.overlayExpired,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textBlock: {
        fontSize: '14@ms0.3',
        fontWeight: 'bold',
        position: 'absolute',
        right: 0,
    },
});

export default StampItem;
