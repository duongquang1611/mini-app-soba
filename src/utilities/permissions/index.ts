import AlertMessage from 'components/base/AlertMessage';
import { check, openSettings, Permission, PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import { POPUP_TYPE } from 'utilities/staticData';
import { logger, isIos } from '../helper';

export const PERMISSION_APP = {
    camera: 'camera',
    audio: 'audio',
    photo: 'photo',
};

const requestCasePermission = async (
    checkPermission: string,
    type: string,
    permission: Permission,
    openSettingWhenBlock = true,
) => {
    try {
        let result = '';
        switch (checkPermission) {
            case RESULTS.DENIED:
                result = await request(permission);
                return result === RESULTS.GRANTED;
            case RESULTS.LIMITED:
                return true;
            case RESULTS.GRANTED:
                return true;
            case RESULTS.BLOCKED:
                openSettingWhenBlock && showRequestPermission(type);

                return false;
            default:
                return false;
        }
    } catch (err) {
        logger('requestCasePermission', false, err);
        return false;
    }
};

export const checkCamera = async () => {
    try {
        const permissionRequest = isIos ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA;
        const checkPermission = await check(permissionRequest);
        const result = await requestCasePermission(checkPermission, PERMISSION_APP.camera, permissionRequest);
        return result;
    } catch (err) {
        logger('checkCamera', false, err);
        return false;
    }
};

export const checkPhoto = async () => {
    try {
        const permissionRequest = isIos ? PERMISSIONS.IOS.PHOTO_LIBRARY : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
        const checkPermission = await check(permissionRequest);
        const result = await requestCasePermission(checkPermission, PERMISSION_APP.photo, permissionRequest);
        return result;
    } catch (err) {
        logger('checkPhoto', false, err);
        return false;
    }
};

export const checkAudio = async () => {
    try {
        const permissionRequest = isIos ? PERMISSIONS.IOS.MICROPHONE : PERMISSIONS.ANDROID.RECORD_AUDIO;
        const checkPermission = await check(permissionRequest);
        const result = await requestCasePermission(checkPermission, PERMISSION_APP.audio, permissionRequest);
        return result;
    } catch (err) {
        logger('checkAudio', false, err);
        return false;
    }
};

const messages: any = {
    camera: 'permissions.camera',
    photo: 'permissions.photo',
    audio: 'permissions.audio',
};

const showRequestPermission = (type: string) => {
    AlertMessage(messages[type], {
        onOk: () => openSettings().catch(() => logger('cannot open settings', true)),
        type: POPUP_TYPE.ERROR,
    });
};
