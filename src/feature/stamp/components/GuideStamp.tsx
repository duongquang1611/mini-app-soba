import { Themes } from 'assets/themes';
import { StyledText } from 'components/base';
import React from 'react';
import { View } from 'react-native';
import Dash from 'react-native-dash';
import { ScaledSheet, verticalScale } from 'react-native-size-matters';
import { guideStamp, guideStampType } from 'utilities/staticData';

const GuideStep = ({ item }: any) => {
    const { lineSize } = item;
    return (
        <View style={styles.itemContainer}>
            <View style={{ alignItems: 'center' }}>
                <View style={styles.numberView}>
                    <StyledText originValue={item.id} customStyle={styles.numberValue} />
                </View>
                {!!lineSize && (
                    <Dash
                        style={[styles.dash, { height: verticalScale(lineSize) }]}
                        dashGap={3}
                        dashLength={2}
                        dashThickness={2}
                        dashColor={Themes.COLORS.textPrimary}
                    />
                )}
            </View>
            <View style={styles.wrapContent}>
                <StyledText originValue={item.name} customStyle={styles.nameText} />
                <StyledText originValue={item.content} customStyle={styles.contentText} />
                <StyledText originValue={item.subContent} customStyle={styles.subContentText} />
            </View>
        </View>
    );
};

const GuideStamp = ({ customStyle }: any) => {
    const renderGuideStep = (item: any) => {
        return <GuideStep item={item} key={item.id} />;
    };

    return (
        <View style={[styles.container, customStyle]}>
            <StyledText i18nText={'guideStamp.title'} customStyle={[styles.textGuide]} />
            {guideStamp.map(renderGuideStep)}
            <StyledText i18nText={'guideStamp.titleSecond'} customStyle={[styles.textGuideSecond]} />
            <StyledText i18nText={'guideStamp.subTitleSecond'} customStyle={[styles.subTitleSecond]} />
            {guideStampType.map(renderGuideStep)}
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        paddingVertical: '20@vs',
        paddingHorizontal: '20@s',
    },
    textGuide: {
        fontSize: '18@ms0.3',
        fontWeight: 'bold',
        marginBottom: '10@vs',
    },
    numberView: {
        width: '24@s',
        height: '24@s',
        backgroundColor: Themes.COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 24,
    },
    numberValue: {
        color: Themes.COLORS.white,
    },
    dash: {
        flexDirection: 'column',
        marginTop: '10@vs',
    },
    nameText: {
        fontSize: '18@ms0.3',
        fontWeight: 'bold',
    },
    contentText: {
        color: Themes.COLORS.mineShaft,
        lineHeight: '23@vs',
    },
    subContentText: {
        color: 'rgba(166, 31, 23, 1)',
        lineHeight: '23@vs',
    },
    wrapContent: {
        flexGrow: 1,
        flexShrink: 1,
        paddingLeft: '15@s',
    },
    itemContainer: {
        width: '100%',
        flexDirection: 'row',
        marginTop: '10@s',
    },
    textGuideSecond: {
        fontSize: '18@ms0.3',
        fontWeight: 'bold',
        marginBottom: '10@vs',
        marginTop: '30@vs',
    },
    subTitleSecond: {
        color: Themes.COLORS.mineShaft,
        marginTop: '10@vs',
        marginBottom: '10@vs',
    },
});

export default GuideStamp;
