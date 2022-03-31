import { Themes } from 'assets/themes';
import { StyledText } from 'components/base';
import React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

const StampTypeView = ({ customStyle, title, isExchange }: any) => {
    return (
        <View style={[styles.statusView, isExchange && { backgroundColor: Themes.COLORS.stampExchange }, customStyle]}>
            <StyledText
                i18nText={title || (isExchange ? 'stamp.exchangeStamp' : 'stamp.cumulativeStamp')}
                customStyle={[styles.textStatus, isExchange && { color: Themes.COLORS.primary }]}
            />
        </View>
    );
};

const styles = ScaledSheet.create({
    statusView: {
        backgroundColor: Themes.COLORS.stampCumulative,
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
