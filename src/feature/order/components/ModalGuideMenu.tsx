import Images from 'assets/images';
import { Themes } from 'assets/themes';
import { StyledImage, StyledText } from 'components/base';
import TextUnderline from 'components/common/TextUnderline';
import React from 'react';
import { Text, View } from 'react-native';
import { scale, ScaledSheet } from 'react-native-size-matters';
import { getConfig, isIos, openURL } from 'utilities/helper';
import { CONFIG_KEYS, stepGuide } from 'utilities/staticData';

const StepItem = (props: any) => {
    return (
        <View style={props?.largeView ? [styles.rowStep, { height: scale(140) }] : styles.rowStep}>
            <View style={styles.numberView}>
                <StyledText originValue={props?.item?.index} customStyle={styles.numberValue} />
            </View>
            <StyledImage source={props?.item?.icon} customStyle={styles.icStep} />
            <View style={styles.containView}>
                <Text style={[styles.title, styles.textGuide]}>
                    {props?.item?.name}
                    <Text style={[styles.contentName, styles.textGuide]}>{props?.item?.contentName}</Text>
                </Text>
                <StyledText originValue={props?.item?.content} isBlack customStyle={styles.textGuide} />
                <View>
                    <TextUnderline
                        onPress={() => openURL(props?.storeUrl)}
                        title={props?.item?.textLink}
                        color={Themes.COLORS.primary}
                    />
                </View>
            </View>
        </View>
    );
};
const ModalGuideMenu = () => {
    const storeUrl = getConfig(CONFIG_KEYS.WEB_PAGE);
    return (
        <View>
            <StyledImage source={Images.photo.line} customStyle={styles.line1} />
            <StyledImage source={Images.photo.line} customStyle={styles.line2} />
            <View>
                {stepGuide.map((item, index) => (
                    <StepItem key={item.name} item={item} largeView={isIos && index === 2} storeUrl={storeUrl} />
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
        lineHeight: '24@s',
    },
});
