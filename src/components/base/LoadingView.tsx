import React, { FunctionComponent, memo, useEffect } from 'react';
import { StyleSheet, View, Keyboard, ViewProps } from 'react-native';
import { Themes } from 'assets/themes';
import LottieView from 'lottie-react-native';
import Images from 'assets/images';

interface Props extends ViewProps {
    visible: boolean;
    textContent?: boolean;
    onRequestClose?(): void;
    children?: FunctionComponent;
}

const LoadingView = (props: Props) => {
    useEffect(() => {
        Keyboard.dismiss();
    }, [props.visible]);

    if (!props.visible) {
        return null;
    }

    return (
        <View style={styles.container}>
            <LottieView source={Images.lottie.loadingRamen} style={styles.lottie} autoPlay={true} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Themes.COLORS.red,
        alignSelf: 'center',
    },
    lottie: {
        height: 200,
        width: 300,
    },
});

export default memo(LoadingView);
