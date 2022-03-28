import React, { FunctionComponent, memo, useEffect } from 'react';
import { StyleSheet, View, Modal, Keyboard, ViewProps } from 'react-native';
import { Themes } from 'assets/themes';
import LottieView from 'lottie-react-native';
import Images from 'assets/images';

interface Props extends ViewProps {
    visible: boolean;
    textContent?: boolean;
    onRequestClose?(): void;
    children?: FunctionComponent;
}

const StyledOverlayLoading = (props: Props) => {
    useEffect(() => {
        Keyboard.dismiss();
    }, [props.visible]);

    if (!props.visible) {
        return null;
    }

    const DotIndicator = () => {
        if (props.children) {
            return <View style={[styles.container]}>{props.children}</View>;
        }
        return (
            <View style={[styles.container]}>
                <View style={styles.background}>
                    <LottieView source={Images.lottie.loadingRamen} style={styles.lottie} autoPlay={true} />
                </View>
            </View>
        );
    };

    return (
        <Modal
            onRequestClose={props.onRequestClose}
            supportedOrientations={['portrait']}
            transparent
            visible={props.visible}
        >
            <DotIndicator />
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Themes.COLORS.transparent,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    background: {
        position: 'absolute',
        backgroundColor: Themes.COLORS.overlayLoading,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        flex: 1,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
    },
    textContent: {
        top: 80,
        height: 50,
        fontSize: 20,
    },
    lottie: {
        height: 200,
        width: 300,
    },
});

export default memo(StyledOverlayLoading);
