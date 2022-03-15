import { createStackNavigator } from '@react-navigation/stack';
import ChangePassword from 'feature/authentication/ChangePassword';
import ForgotPasswordScreen from 'feature/authentication/ForgotPwdScreen';
import Information from 'feature/authentication/Information';
import LoginScreen from 'feature/authentication/LoginScreen';
import RegisterScreen from 'feature/authentication/RegisterScreen';
import SendOTP from 'feature/authentication/SendOtp';
import SendOtpForgotPass from 'feature/authentication/SendOtpForgotPass';
import navigationConfigs from 'navigation/config/options';
import { AUTHENTICATE_ROUTE } from 'navigation/config/routes';
import React from 'react';
import { isIos } from 'utilities/helper';

const MainStack = createStackNavigator();

const AuthStack = () => (
    <MainStack.Navigator headerMode={'none'} screenOptions={navigationConfigs} keyboardHandlingEnabled={isIos}>
        <MainStack.Screen name={AUTHENTICATE_ROUTE.LOGIN} component={LoginScreen} />
        <MainStack.Screen name={AUTHENTICATE_ROUTE.REGISTER} component={RegisterScreen} />
        <MainStack.Screen name={AUTHENTICATE_ROUTE.FORGOT_PASS} component={ForgotPasswordScreen} />
        <MainStack.Screen name={AUTHENTICATE_ROUTE.SEND_OTP} component={SendOTP} />
        <MainStack.Screen name={AUTHENTICATE_ROUTE.CHANGE_PASS} component={ChangePassword} />
        <MainStack.Screen name={AUTHENTICATE_ROUTE.INFORMATION} component={Information} />
        <MainStack.Screen name={AUTHENTICATE_ROUTE.SEND_OTP_FORGOT_PASS} component={SendOtpForgotPass} />
    </MainStack.Navigator>
);

export default AuthStack;
