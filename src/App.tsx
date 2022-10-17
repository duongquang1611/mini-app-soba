/* eslint-disable @typescript-eslint/no-unused-vars */
import { NavigationContainer } from '@react-navigation/native';
import { persistor, store } from 'app-redux/store';
import { navigationRef } from 'navigation/NavigationService';
import Navigation from 'navigation/scene/RootScenes';
import React, { FunctionComponent, useEffect } from 'react';
import { ActivityIndicator, LogBox } from 'react-native';
import { RootSiblingParent } from 'react-native-root-siblings';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import APIProvider from 'utilities/context/APIProvider';
import { addMenuClearAsyncStorage, getCodePushInfo, wait } from 'utilities/helper';
import { loadLocaleLanguage } from 'utilities/i18next';
import { staticValue } from 'utilities/staticData';
import SplashScreen from 'react-native-splash-screen';
import { SocketProvider } from 'utilities/SocketProvider';

LogBox.ignoreLogs(['Require cycle:', 'Non-serializable', 'Sending `onAnimatedValueUpdate`']);
addMenuClearAsyncStorage();
let getCodePushSuccess = false;

const App: FunctionComponent = () => {
    const onBeforeLift = () => {
        loadLocaleLanguage();
    };

    const getCodepushSuccess = () => {
        getCodePushSuccess = true;
        SplashScreen.hide();
    };

    useEffect(() => {
        if (__DEV__) {
            SplashScreen.hide();
        } else {
            getCodePushInfo(getCodepushSuccess);
            wait(staticValue.TIMEOUT_CODEPUSH).then(() => {
                !getCodePushSuccess && SplashScreen.hide();
            });
        }
    }, []);

    return (
        <Provider store={store}>
            <PersistGate loading={<ActivityIndicator />} persistor={persistor} onBeforeLift={onBeforeLift}>
                <RootSiblingParent>
                    <NavigationContainer ref={navigationRef}>
                        <SocketProvider>
                            <Navigation />
                        </SocketProvider>
                    </NavigationContainer>
                </RootSiblingParent>
            </PersistGate>
        </Provider>
    );
};

export default App;
