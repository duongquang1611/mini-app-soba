import { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';

const useKeyboardStatus = () => {
    const [isOpenKeyboard, setIsOpenKeyboard] = useState(false);

    useEffect(() => {
        const keyboardShowListener = Keyboard.addListener('keyboardDidShow', () => setIsOpenKeyboard(true));
        const keyboardHideListener = Keyboard.addListener('keyboardDidHide', () => setIsOpenKeyboard(false));
        return () => {
            keyboardShowListener.remove();
            keyboardHideListener.remove();
        };
    });

    return { isOpenKeyboard };
};

export default useKeyboardStatus;
