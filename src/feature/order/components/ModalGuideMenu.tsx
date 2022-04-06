import Images from 'assets/images';
import { Themes } from 'assets/themes';
import { StyledText, StyledImage } from 'components/base';
import TextUnderline from 'components/common/TextUnderline';
import React from 'react';
import { Linking, Text, View } from 'react-native';
import { scale, ScaledSheet } from 'react-native-size-matters';
import { isIos } from 'utilities/helper';
import { stepGuide } from 'utilities/staticData';

const StepItem = (item: any) => (
    <View style={item?.largeView ? [styles.rowStep, { height: scale(140) }] : styles.rowStep}>
        <View style={styles.numberView}>
            <StyledText originValue={item?.item?.index} customStyle={styles.numberValue} />
        </View>
        <StyledImage source={item?.item?.icon} customStyle={styles.icStep} />
        <View style={styles.containView}>
            <Text style={[styles.title, styles.textGuide]}>
                {item?.item?.name}
                <Text style={[styles.contentName, styles.textGuide]}>{item?.item?.contentName}</Text>
            </Text>
            <StyledText originValue={item?.item?.content} isBlack customStyle={styles.textGuide} />
            <View>
                <TextUnderline
                    onPress={() => Linking.openURL(item?.item?.link)}
                    title={item?.item?.textLink}
                    color={Themes.COLORS.primary}
                />
            </View>
        </View>
    </View>
);
const ModalGuideMenu = () => {
    return (
        <View>
            <StyledImage source={Images.photo.line} customStyle={styles.line1} />
            <StyledImage source={Images.photo.line} customStyle={styles.line2} />
            <View>
                {stepGuide.map((item, index) => (
                    <StepItem key={item.name} item={item} largeView={isIos && index === 2} />
                ))}
            </View>
        </View>
    );
};

export default ModalGuideMenu;

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: Themes.COLORS.lightGray,
    },
    title: {
        color: Themes.COLORS.secondary,
        fontWeight: 'bold',
        fontSize: '16@ms0.3',
    },
    contentName: {
        fontWeight: 'normal',
        color: Themes.COLORS.textSecondary,
        fontSize: '14@ms0.3',
    },
    containView: {
        width: '230@s',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    icStep: {
        width: '80@vs',
        height: '80@vs',
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
    rowStep: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: '20@s',
        height: isIos ? '120@s' : '140@s',
        justifyContent: 'space-between',
    },
    line1: {
        position: 'absolute',
        width: 2,
        height: isIos ? '70@s' : '90@s',
        left: '32@s',
        top: isIos ? '85@s' : '95@s',
    },
    line2: {
        position: 'absolute',
        width: 2,
        height: isIos ? '80@s' : '90@s',
        left: '32@s',
        top: isIos ? '205@s' : '235@s',
    },
    textLink: {
        backgroundColor: Themes.COLORS.primary,
    },
    textGuide: {
        lineHeight: scale(24),
    },
});
