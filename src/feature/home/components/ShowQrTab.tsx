import Images from 'assets/images';
import { Themes } from 'assets/themes';
import { StyledButton, StyledIcon, StyledText } from 'components/base';
import React from 'react';
import { Text, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

const ShowQrTab = (data: any) => {
    const { button, background, qrCode, content1, content2 } = data?.data;
    return (
        <View style={[styles.containerQrTab, { backgroundColor: background || Themes.COLORS.primary }]}>
            {qrCode ? (
                <View style={[styles.qrCodeView]}>
                    <StyledIcon source={qrCode} size={90} customStyle={{ tintColor: Themes.COLORS.headerBackground }} />
                    <StyledButton onPress={() => {}} title={button} customStyle={[styles.detailButton]} />
                </View>
            ) : (
                <View style={[styles.noQrCodeView]}>
                    <StyledText originValue={content1} customStyle={styles.content} />
                    <StyledText originValue={content2} customStyle={styles.content} />
                    <StyledButton onPress={() => {}} title={button} customStyle={[styles.detailButton]} />
                </View>
            )}
        </View>
    );
};

export default ShowQrTab;

const styles = ScaledSheet.create({
    containerQrTab: {
        padding: '20@s',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '220@vs',
        paddingBottom: '10@s',
    },
    detailButton: {
        width: '160@s',
        padding: 0,
        marginTop: '10@vs',
    },
    noQrCodeView: {
        height: '140@vs',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    qrCodeView: {
        alignItems: 'center',
    },
    content: {
        textAlign: 'center',
        color: Themes.COLORS.white,
    },
});
