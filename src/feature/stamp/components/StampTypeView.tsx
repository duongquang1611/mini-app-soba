import { Themes } from 'assets/themes';
import { StyledText } from 'components/base';
import React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

const StampTypeView = ({ customStyle, title, status }: any) => {
    // status: 1: cumulativeStamp, 0: exchangeStamp
    return (
        <View style={[styles.statusView, status && { backgroundColor: Themes.COLORS.stampOther }, customStyle]}>
            <StyledText
                i18nText={title || (status ? 'stamp.cumulativeStamp' : 'stamp.exchangeStamp')}
                customStyle={styles.textStatus}
            />
        </View>
    );
};

const styles = ScaledSheet.create({
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
    textStatus: {
        textAlign: 'center',
        fontSize: '12@ms0.3',
        marginTop: '15@s',
        marginRight: '5@s',
    },
});

export default StampTypeView;
