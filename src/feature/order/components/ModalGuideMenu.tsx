import { Themes } from 'assets/themes';
import { StyledImage, StyledText } from 'components/base';
import TextUnderline from 'components/common/TextUnderline';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import Dash from 'react-native-dash';
import { ScaledSheet } from 'react-native-size-matters';
import { getConfig, openURL } from 'utilities/helper';
import { CONFIG_KEYS, stepGuide } from 'utilities/staticData';

const StepItem = ({ item, showTrickTop, showTrickBottom }: any) => {
    const [layoutItem, setLayoutItem] = useState({ width: 0, height: 130 });

    const onLayout = ({ nativeEvent: { layout } }: any) => {
        setLayoutItem(layout);
    };

    return (
        <View style={styles.rowStep} onLayout={onLayout}>
            {!!showTrickTop && <View style={[styles.trickViewItem, { height: layoutItem.height / 2, top: 0 }]} />}
            {!!showTrickBottom && (
                <View style={[styles.trickViewItem, { height: (layoutItem.height + 20) / 2, bottom: -10 }]} />
            )}
            <View style={styles.wrapNumberStep}>
                <View style={styles.numberView}>
                    <StyledText originValue={item?.index} customStyle={styles.numberValue} />
                </View>
            </View>
            <View style={styles.wrapIcon}>
                <StyledImage source={item?.icon} customStyle={styles.icStep} />
            </View>
            <View style={styles.containView}>
                <Text style={[styles.title, styles.textGuide]}>
                    {item?.name}
                    <Text style={[styles.contentName, styles.textGuide]}>{item?.contentName}</Text>
                </Text>
                <StyledText originValue={item?.content} isBlack customStyle={styles.textGuide} />
                <View>
                    <TextUnderline
                        onPress={() => openURL(item?.storeUrl)}
                        title={item?.textLink}
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
        <View style={styles.container}>
            <Dash
                style={styles.dashTotal}
                dashGap={3}
                dashLength={2}
                dashThickness={2}
                dashColor={Themes.COLORS.textPrimary}
            />
            {stepGuide.map((item, index) => (
                <StepItem
                    key={item.name}
                    item={item}
                    storeUrl={storeUrl}
                    showTrickTop={index === 0}
                    showTrickBottom={index === stepGuide.length - 1}
                />
            ))}
        </View>
    );
};

export default ModalGuideMenu;

const styles = ScaledSheet.create({
    container: {
        paddingTop: '20@vs',
        backgroundColor: Themes.COLORS.white,
        paddingBottom: '20@vs',
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
        // width: '230@s',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        paddingLeft: '15@s',
        paddingRight: '5@s',
        flexShrink: 1,
    },
    icStep: {
        width: '100%',
        height: '100%',
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
        justifyContent: 'space-between',
    },
    textLink: {
        backgroundColor: Themes.COLORS.primary,
    },
    textGuide: {
        lineHeight: '24@s',
    },
    dash: {
        flexDirection: 'column',
        marginTop: '10@vs',
        height: '100%',
        position: 'absolute',
        top: '24@s',
    },
    dashTotal: {
        flexDirection: 'column',
        height: '100%',
        position: 'absolute',
        zIndex: -2,
        left: '31@s',
        top: '20@vs',
    },
    wrapNumberStep: {
        alignItems: 'center',
        paddingVertical: '10@s',
        backgroundColor: Themes.COLORS.white,
    },
    trickView: {
        width: '10@s',
        position: 'absolute',
        backgroundColor: Themes.COLORS.white,
        height: '100%',
        zIndex: -1,
        left: '27@s',
    },
    trickViewItem: {
        width: '10@s',
        position: 'absolute',
        backgroundColor: Themes.COLORS.white,
        zIndex: -1,
        left: '27@s',
    },
    wrapIcon: {
        marginLeft: '10@s',
        width: '80@s',
        height: '80@s',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
