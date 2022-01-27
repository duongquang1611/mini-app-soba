import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import navigationConfigs from 'navigation/config/options';
import { isIos } from 'utilities/helper';
import { AUTHENTICATE_ROUTE } from 'navigation/config/routes';
import LoginScreen from 'feature/authentication/LoginScreen';
import RegisterScreen from 'feature/authentication/RegisterScreen';
import ForgotPasswordScreen from 'feature/authentication/ForgotPwdScreen';
import SendOTP from 'feature/authentication/SendOtp';
import ChangePassword from 'feature/authentication/ChangePassword';
import Information from 'feature/authentication/Information';
import RegisterStep1 from 'feature/authentication/RegisterStep1';
import RegisterStep2 from 'feature/authentication/RegisterStep2';
import RegisterStep3 from 'feature/authentication/RegisterStep3';

const MainStack = createStackNavigator();

const AuthStack = () => (
    <MainStack.Navigator headerMode={'none'} screenOptions={navigationConfigs} keyboardHandlingEnabled={isIos}>
        <MainStack.Screen name={AUTHENTICATE_ROUTE.LOGIN} component={LoginScreen} />
        <MainStack.Screen name={AUTHENTICATE_ROUTE.REGISTER} component={RegisterScreen} />
        <MainStack.Screen name={AUTHENTICATE_ROUTE.FORGOT_PASS} component={ForgotPasswordScreen} />
        <MainStack.Screen name={AUTHENTICATE_ROUTE.SEND_OTP} component={SendOTP} />
        <MainStack.Screen name={AUTHENTICATE_ROUTE.CHANGE_PASS} component={ChangePassword} />
        <MainStack.Screen name={AUTHENTICATE_ROUTE.INFORMATION} component={Information} />
        <MainStack.Screen name={AUTHENTICATE_ROUTE.REGISTER_STEP_1} component={RegisterStep1} />
        <MainStack.Screen name={AUTHENTICATE_ROUTE.REGISTER_STEP_2} component={RegisterStep2} />
        <MainStack.Screen name={AUTHENTICATE_ROUTE.REGISTER_STEP_3} component={RegisterStep3} />
    </MainStack.Navigator>
);

export default AuthStack;
