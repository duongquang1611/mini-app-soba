import { CommonActions, StackActions } from '@react-navigation/native';
import React, { RefObject } from 'react';
import { logger } from 'utilities/helper';
import { APP_ROUTE } from './config/routes';

export const navigationRef: RefObject<any> = React.createRef();

export function navigate(name: string, params = {}): void {
    logger(`${`navigate to ${name}`}`, false, params);
    navigationRef.current.navigate(name, params);
}

export function goBack(): void {
    navigationRef.current.goBack();
}

export function navigateReplace(name: string, params = {}): void {
    logger(`${`navigate replace  ${name}`}`, false, params);
    navigationRef.current.dispatch(StackActions.replace(name, params));
}

export function reset(name?: string) {
    navigationRef.current.dispatch({
        ...CommonActions.reset({
            index: 1,
            routes: [{ name: name || APP_ROUTE.MAIN_TAB }],
        }),
    });
}
