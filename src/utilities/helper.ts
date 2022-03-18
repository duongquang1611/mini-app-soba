/* eslint-disable no-console */
import AsyncStorage from '@react-native-community/async-storage';
import AlertMessage from 'components/base/AlertMessage';
import i18next from 'i18next';
import { DevSettings, Linking, Platform } from 'react-native';
import Picker from 'react-native-picker';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import codePush from 'react-native-code-push';
import Config from 'react-native-config';
import { throttle } from 'lodash';
import { staticValue } from './staticData';

export const isAndroid = Platform.OS === 'android';

export const isIos = Platform.OS === 'ios';

export function wait(timeout: number): Promise<any> {
    return new Promise((resolve) => {
        setTimeout(resolve, timeout);
    });
}

export function logger(msg: string, isWarning?: boolean, params?: any): void {
    if (__DEV__ && !isWarning) {
        if (params) console.log(msg, params);
        else console.log(msg);
    }
    if (__DEV__ && isWarning) {
        if (params) console.warn(msg, params);
        else console.warn(msg);
    }
}

export function initPicker(params?: any) {
    Picker.init({
        pickerTextEllipsisLen: 10,
        pickerCancelBtnText: i18next.t('common.cancel'),
        pickerConfirmBtnText: i18next.t('common.confirm'),
        ...params,
    });
}

export const addMenuClearAsyncStorage = () => {
    if (__DEV__) {
        DevSettings.addMenuItem('Clear AsyncStorage', () => {
            AsyncStorage.clear();
            DevSettings.reload();
        });
    }
};

export function generatePersistConfig(key: string, whitelist: string[]) {
    return {
        key,
        whitelist,
        version: 1,
        debug: __DEV__,
        storage: AsyncStorage,
        stateReconciler: autoMergeLevel2,
    };
}

export const renderAlert = (message: string, callback: () => void) => {
    AlertMessage(i18next.t(message), '', callback, undefined, false);
};

export const getCodePushInfo = () => {
    if (!__DEV__) {
        codePush.sync({
            updateDialog: undefined,
            installMode: codePush.InstallMode.IMMEDIATE,
            deploymentKey:
                Platform.OS === 'android'
                    ? Config.CODEPUSH_ANDROID_DEVELOPMENT_KEY
                    : Config.CODEPUSH_IOS_DEVELOPMENT_KEY,
        });
    }
};

export const throttlePress = (callback: any) =>
    throttle(callback, staticValue.THROTTLE_TIME, staticValue.CONFIG_THROTTLE);

export const getYesterday = () => {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    return date;
};

export const openURL = (url: string, cbNotSupport?: any) => {
    Linking.canOpenURL(url).then((supported) => {
        if (supported) {
            Linking.openURL(url);
        } else {
            cbNotSupport?.();
            __DEV__ && console.log(`Don't know how to open URI: ${url}`);
        }
    });
};
export const checkCanUse = (endDate: any) => {
    const d1 = new Date(endDate);
    const d2 = new Date();
    return d1 >= d2;
};
export const sumAmount = (item: any) => {
    let resultAmount = 0;
    const { mainDish, subDishes } = item;
    subDishes?.forEach(async (rating: any) => {
        resultAmount += rating?.amount;
    });
    return (resultAmount + 1) * mainDish.amount;
};
