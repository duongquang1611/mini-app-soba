import { Themes } from 'assets/themes';
import { StyledText } from 'components/base';
import DashView from 'components/common/DashView';
import StyledHeader from 'components/common/StyledHeader';
import React, { useState } from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
// import ToggleSwitch from 'rn-toggle-switch';
import SwitchToggle from 'react-native-switch-toggle';

const SettingNotificationScreen = () => {
    const [onPush, offPush] = useState(true);
    const [onEmail, offEmail] = useState(true);
    return (
        <View style={styles.container}>
            <StyledHeader title={'setting.settingNotificationTitle'} />
            <View style={styles.body}>
                <View style={styles.row}>
                    <StyledText i18nText={'setting.pushNotification'} isBlack />
                    <SwitchToggle
                        switchOn={onPush}
                        onPress={() => offPush(!onPush)}
                        circleColorOff={Themes.COLORS.white}
                        circleColorOn={Themes.COLORS.white}
                        backgroundColorOn={Themes.COLORS.seaGreen}
                        backgroundColorOff={Themes.COLORS.silver}
                        containerStyle={styles.toggle}
                    />
                </View>
                <DashView />
                <View style={styles.row}>
                    <StyledText i18nText={'setting.emailNotification'} isBlack />
                    <SwitchToggle
                        switchOn={onEmail}
                        onPress={() => offEmail(!onEmail)}
                        circleColorOff={Themes.COLORS.white}
                        circleColorOn={Themes.COLORS.white}
                        backgroundColorOn={Themes.COLORS.seaGreen}
                        backgroundColorOff={Themes.COLORS.silver}
                        containerStyle={styles.toggle}
                    />
                </View>
            </View>
        </View>
    );
};

export default SettingNotificationScreen;

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: Themes.COLORS.lightGray,
    },
    body: {
        backgroundColor: Themes.COLORS.white,

        marginVertical: '10@vs',
    },
    buttonSave: {},
    row: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: '10@s',
        paddingHorizontal: '20@s',
    },
    toggle: {
        width: '55@s',
        height: '28@s',
        borderRadius: 20,
    },
});
