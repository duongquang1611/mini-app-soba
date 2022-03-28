import { createStackNavigator } from '@react-navigation/stack';
import { Themes } from 'assets/themes';
import ChangePassword from 'feature/authentication/ChangePassword';
import ForgotPasswordScreen from 'feature/authentication/ForgotPwdScreen';
import Information from 'feature/authentication/Information';
import LoginScreen from 'feature/authentication/LoginScreen';
import RegisterScreen from 'feature/authentication/RegisterScreen';
import ResetPasswordScreen from 'feature/authentication/ResetPasswordScreen';
import SendOTP from 'feature/authentication/SendOtp';
import SendOtpForgotPass from 'feature/authentication/SendOtpForgotPass';
import navigationConfigs from 'navigation/config/options';
import { AUTHENTICATE_ROUTE } from 'navigation/config/routes';
import React from 'react';
import { StatusBar } from 'react-native';
import { isIos } from 'utilities/helper';

const MainStack = createStackNavigator();

const AuthStack = () => (
    <>
        <StatusBar backgroundColor={Themes.COLORS.headerBackground} barStyle={'dark-content'} />
        <MainStack.Navigator
            headerMode={'none'}
            screenOptions={navigationConfigs}
            keyboardHandlingEnabled={isIos}
            initialRouteName={AUTHENTICATE_ROUTE.RESET_PASSWORD}
            // initialRouteName={AUTHENTICATE_ROUTE.LOGIN}
        >
            <MainStack.Screen name={AUTHENTICATE_ROUTE.LOGIN} component={LoginScreen} />
            <MainStack.Screen name={AUTHENTICATE_ROUTE.REGISTER} component={RegisterScreen} />
            <MainStack.Screen name={AUTHENTICATE_ROUTE.FORGOT_PASS} component={ForgotPasswordScreen} />
            <MainStack.Screen name={AUTHENTICATE_ROUTE.SEND_OTP} component={SendOTP} />
            <MainStack.Screen name={AUTHENTICATE_ROUTE.CHANGE_PASS} component={ChangePassword} />
            <MainStack.Screen name={AUTHENTICATE_ROUTE.INFORMATION} component={Information} />
            <MainStack.Screen name={AUTHENTICATE_ROUTE.SEND_OTP_FORGOT_PASS} component={SendOtpForgotPass} />
            <MainStack.Screen name={AUTHENTICATE_ROUTE.RESET_PASSWORD} component={ResetPasswordScreen} />
        </MainStack.Navigator>
    </>
);

export default AuthStack;
