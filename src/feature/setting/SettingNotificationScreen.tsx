import { RootState } from 'app-redux/hooks';
import { updateGlobalData } from 'app-redux/slices/globalDataSlice';
import { Themes } from 'assets/themes';
import { StyledText } from 'components/base';
import StyledSwitch from 'components/base/StyledSwitch';
import DashView from 'components/common/DashView';
import StyledHeader from 'components/common/StyledHeader';
import React from 'react';
import { View } from 'react-native';
import OneSignal from 'react-native-onesignal';
import { ScaledSheet } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';

const SettingNotificationScreen = () => {
    // const [enableEmail, setEnableEmail] = useState(true);
    const { isPushDisabled } = useSelector((state: RootState) => state.globalData);
    const dispatch = useDispatch();

    const togglePushNotification = async (value: any) => {
        try {
            dispatch(updateGlobalData({ isPushDisabled: !value }));
            OneSignal.disablePush(!value);
        } catch (error) {
            console.log('file: SettingNotificationScreen.tsx -> line 24 -> togglePushNotification -> error', error);
        }
    };

    return (
        <View style={styles.container}>
            <StyledHeader title={'setting.settingNotificationTitle'} />
            <View style={styles.body}>
                <View style={styles.row}>
                    <StyledText i18nText={'setting.pushNotification'} isBlack />
                    <StyledSwitch enable={!isPushDisabled} setEnable={togglePushNotification} />
                </View>
                <DashView />
                {/* <View style={styles.row}>
                    <StyledText i18nText={'setting.emailNotification'} isBlack />
                    <StyledSwitch enable={enableEmail} setEnable={setEnableEmail} />
                </View> */}
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
