import React, { FunctionComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import StyledHeader from 'components/common/StyledHeader';
import { TAB_NAVIGATION_ROOT } from 'navigation/config/routes';
import { StyledButton } from 'components/base';
import Images from 'assets/images';
import { navigate } from 'navigation/NavigationService';

const HomeScreen: FunctionComponent = () => {
    const navigation = useNavigation();

    const goToQrScreen = () => {
        navigate(TAB_NAVIGATION_ROOT.HOME_ROUTE.CHECK_IN);
    };
    const goToNotiScreen = () => {
        navigate(TAB_NAVIGATION_ROOT.HOME_ROUTE.NOTIFICATION);
    };

    return (
        <View style={{ flex: 1 }}>
            <StyledHeader
                title={'Home Screen'}
                iconQr={Images.icons.tab.notification}
                iconNoti={Images.icons.tab.notification}
                onPressQr={goToQrScreen}
                onPressNoti={goToNotiScreen}
            />
            <View style={styles.contScreen}>
                <StyledButton
                    title={'Mobile Order Screen'}
                    onPress={() => navigation.navigate(TAB_NAVIGATION_ROOT.HOME_ROUTE.MOBILE_ORDER)}
                />
                <StyledButton
                    title={'Order Default Screen'}
                    onPress={() => navigation.navigate(TAB_NAVIGATION_ROOT.HOME_ROUTE.ORDER_DEFAULT)}
                />
                <StyledButton
                    title={'NewList Screen'}
                    onPress={() => navigation.navigate(TAB_NAVIGATION_ROOT.HOME_ROUTE.NEW_LIST)}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    contScreen: {
        flex: 1,
        alignItems: 'center',
        marginTop: 50,
        paddingHorizontal: 25,
    },
    contModalContent: {
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default HomeScreen;
