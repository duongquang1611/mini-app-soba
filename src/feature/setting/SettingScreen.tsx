import React from 'react';
import { View } from 'react-native';
import { StyledButton } from 'components/base';
import AuthenticateService from 'utilities/authenticate/AuthenticateService';
import { ScaledSheet } from 'react-native-size-matters';
import StyledHeader from 'components/common/StyledHeader';
import { navigate } from 'navigation/NavigationService';
import { TAB_NAVIGATION_ROOT } from 'navigation/config/routes';

const SettingScreen = () => {
    const goToMyPage = () => {
        navigate(TAB_NAVIGATION_ROOT.SETTING_ROUTE.MY_PAGE);
    };
    const goToHistory = () => {
        navigate(TAB_NAVIGATION_ROOT.SETTING_ROUTE.ORDER_HISTORY);
    };
    const goToOrderDefault = () => {
        navigate(TAB_NAVIGATION_ROOT.SETTING_ROUTE.ORDER_DEFAULT);
    };
    const goToNotification = () => {
        navigate(TAB_NAVIGATION_ROOT.SETTING_ROUTE.SETTING_NOTIFICATION);
    };
    const goToContact = () => {
        navigate(TAB_NAVIGATION_ROOT.SETTING_ROUTE.CONTACT);
    };
    return (
        <View style={styles.container}>
            <StyledHeader title="Setting" />
            <View style={styles.body}>
                <StyledButton onPress={goToMyPage} title={'My page'} />
                <StyledButton onPress={goToHistory} title={'Order History'} />
                <StyledButton onPress={goToOrderDefault} title={'Order Default'} />
                <StyledButton onPress={goToNotification} title={'setting noti'} />
                <StyledButton onPress={goToContact} title={'contact'} />
                <StyledButton onPress={AuthenticateService.logOut} title={'Log out'} />
            </View>
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        flex: 1,
    },
    body: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: '20@s',
    },
});

export default SettingScreen;
