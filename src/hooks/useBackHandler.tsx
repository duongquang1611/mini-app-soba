import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { BackHandler } from 'react-native';

const useBackHandler = (backAction: any = () => true) => {
    useFocusEffect(
        useCallback(() => {
            BackHandler.addEventListener('hardwareBackPress', backAction);
            return () => {
                BackHandler.removeEventListener('hardwareBackPress', backAction);
            };
        }, []),
    );
};
export default useBackHandler;
