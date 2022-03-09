import Images from 'assets/images';
import { Themes } from 'assets/themes';
import { StyledIcon, StyledImage, StyledText, StyledTouchable } from 'components/base';
import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { ScaledSheet } from 'react-native-size-matters';
import { formatDate } from 'utilities/format';
import { staticValue } from 'utilities/staticData';
import StampTypeView from './StampTypeView';

interface IProps {
    item: any;
    onPress?: any;
    customStyle?: StyleProp<ViewStyle>;
    containerStyle?: StyleProp<ViewStyle>;
    caseType?: number;
    animation?: boolean;
}

const StampItem = (props: IProps) => {
    const { onPress, item, customStyle, caseType, containerStyle, animation = false } = props;
    const { image, title, startDate, endDate, used, status, amount, usedAmount } = item;

    return (
        <Animatable.View style={containerStyle} animation={animation ? staticValue.ANIMATION_ITEM : ''} useNativeDriver>
            <StyledTouchable customStyle={[styles.container, customStyle]} onPress={onPress} disabled={!onPress}>
                <StyledImage source={{ uri: image }} customStyle={styles.imgStamp} />
                <View style={styles.content}>
                    <StyledText originValue={title} customStyle={styles.nameStamp} numberOfLines={2} />
                    <StyledText
                        i18nText={caseType === 1 ? 'stampDetail.expired' : 'stamp.rangeDate'}
                        i18nParams={{ start: formatDate(startDate), end: formatDate(endDate) }}
                        customStyle={styles.textRangeDate}
                    />

                    <View style={styles.wrapCount}>
                        {used ? (
                            <StyledText i18nText={''} customStyle={styles.textCount} />
                        ) : (
                            <>
                                <StyledText
                                    i18nText={caseType === 1 ? 'stampDetail.numberOfRemain' : 'stamp.titleCount'}
                                    customStyle={styles.textTitleCount}
                                />
                                <StyledText
                                    i18nText={'stamp.count'}
                                    i18nParams={{ count: amount - usedAmount }}
                                    customStyle={styles.textCount}
                                />
                            </>
                        )}
                    </View>
                </View>
                <StampTypeView status={status} />
                {!!used && <StyledIcon source={Images.icons.stampUsed} size={90} customStyle={styles.stampUsed} />}
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
    },
    nameStamp: {
        fontSize: '16@ms0.3',
        fontWeight: 'bold',
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
    },
    stampUsed: {
        position: 'absolute',
        top: '-2@s',
    },
});

export default StampItem;
