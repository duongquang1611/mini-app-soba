import Images from 'assets/images';
import { Themes } from 'assets/themes';
import { StyledIcon, StyledImage, StyledText, StyledTouchable } from 'components/base';
import React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { formatDate } from 'utilities/format';

const StampItem = ({ item, onPress }: any) => {
    const { url, name, start, end, used, status, count } = item;

    return (
        <StyledTouchable customStyle={styles.container} onPress={onPress}>
            <StyledImage source={{ uri: url }} customStyle={styles.imgStamp} />
            <View style={styles.content}>
                <StyledText originValue={name} customStyle={styles.nameStamp} />
                <StyledText
                    i18nText={'stamp.rangeDate'}
                    i18nParams={{ start: formatDate(start), end: formatDate(end) }}
                    customStyle={styles.textRangeDate}
                />

                <View style={styles.wrapCount}>
                    {used ? (
                        <StyledText i18nText={''} customStyle={styles.textCount} />
                    ) : (
                        <>
                            <StyledText i18nText={'stamp.titleCount'} customStyle={styles.textTitleCount} />
                            <StyledText
                                i18nText={'stamp.count'}
                                i18nParams={{ count }}
                                customStyle={styles.textCount}
                            />
                        </>
                    )}
                </View>
            </View>
            <View style={[styles.statusView, status && { backgroundColor: Themes.COLORS.stampOther }]}>
                <StyledText
                    i18nText={status ? 'stamp.cumulativeStamp' : 'stamp.exchangeStamp'}
                    customStyle={styles.textStatus}
                />
            </View>
            {!!used && <StyledIcon source={Images.icons.stampUsed} size={90} customStyle={styles.stampUsed} />}
        </StyledTouchable>
    );
};

const styles = ScaledSheet.create({
    container: {
        flexDirection: 'row',
        paddingHorizontal: '20@s',
        paddingVertical: '20@vs',
        alignItems: 'center',
        overflow: 'hidden',
    },
    imgStamp: {
        width: '76@s',
        height: '76@s',
    },
    content: {
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
    textStatus: {
        textAlign: 'center',
        fontSize: '12@ms0.3',
        marginTop: '15@s',
        marginRight: '5@s',
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
    statusView: {
        backgroundColor: Themes.COLORS.stampExchange,
        width: '79@s',
        height: '79@s',
        borderRadius: 100,
        position: 'absolute',
        top: '-25@s',
        right: '-17@s',
        alignItems: 'center',
        justifyContent: 'center',
    },
    stampUsed: {
        position: 'absolute',
        top: '-2@s',
    },
});

export default StampItem;
