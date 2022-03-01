import Images from 'assets/images';
import { Themes } from 'assets/themes';
import * as React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { Modalize, ModalizeProps } from 'react-native-modalize';
import RootSiblings from 'react-native-root-siblings';
import { ScaledSheet } from 'react-native-size-matters';
import { wait } from 'utilities/helper';
import { StyledIcon, StyledText, StyledTouchable } from '..';
import ModalizeCenterComponent from './ModalizeCenterComponent';

let modalControl: any[] = [];

interface CustomModalizeProps extends ModalizeProps {
    isCenter?: boolean;
    containerStyleCenter?: StyleProp<ViewStyle>;
}
interface HeaderProps {
    title?: string;
    customStyle?: StyleProp<ViewStyle>;
    onPress?: any;
}

const HeaderDefault = ({ title = '', customStyle, onPress }: HeaderProps) => {
    return (
        <View style={[styles.headerContainer, customStyle]}>
            <StyledText customStyle={styles.titleText} i18nText={title} numberOfLines={1} />
            <StyledTouchable customStyle={styles.iconClose} onPress={onPress}>
                <StyledIcon source={Images.icons.closeCircle} size={20} />
            </StyledTouchable>
        </View>
    );
};

const ModalizeManager = () => {
    const modalRef = React.createRef<any>();

    const show = (id: any, element: any, props?: CustomModalizeProps, headerProps?: HeaderProps) => {
        if (!modalControl.find((e) => e.id === id)) {
            const sibling = new RootSiblings(
                (
                    <Modalize
                        ref={modalRef}
                        onClosed={() => dismiss(id)}
                        withHandle={false}
                        scrollViewProps={{
                            scrollEnabled: false,
                            keyboardShouldPersistTaps: 'handled',
                        }}
                        overlayStyle={styles.overlayStyle}
                        HeaderComponent={
                            headerProps?.title ? (
                                <HeaderDefault
                                    {...headerProps}
                                    onPress={() => {
                                        headerProps?.onPress?.();
                                        dismiss(id);
                                    }}
                                />
                            ) : undefined
                        }
                        {...props}
                        modalStyle={{
                            minHeight: props?.isCenter ? '100%' : 0,
                            backgroundColor: props?.isCenter ? 'transparent' : Themes.COLORS.white,
                        }}
                    >
                        {props?.isCenter ? (
                            <ModalizeCenterComponent
                                customContainerStyle={props?.containerStyleCenter}
                                handleDismiss={() => dismiss(id)}
                            >
                                {element}
                            </ModalizeCenterComponent>
                        ) : (
                            element
                        )}
                    </Modalize>
                ),
                () => {
                    modalRef?.current?.open();
                    const newRef = { ...modalRef };
                    modalControl.push({
                        id,
                        ref: newRef,
                        element: sibling,
                        props,
                    });
                },
            );
        } else {
            wait(200).then(() => {
                modalRef?.current?.open();
            });
        }
    };

    const dismiss = (id: any) => {
        const item = modalControl.find((e) => e.id === id);
        if (item) {
            const { ref, element } = item;
            ref?.current?.close();
            // destroy id
            const arrFilter = modalControl.filter((e) => e.id !== id);
            modalControl = [...arrFilter];
            wait(200).then(() => {
                element.destroy();
            });
        }
    };

    const update = (id: any, component: any, props: any) => {
        const item = modalControl.find((e) => e.id === id);
        if (item) {
            item.element.update(
                <Modalize ref={modalRef} onClosed={() => dismiss(id)} withHandle={false} {...item.props} {...props}>
                    {component}
                </Modalize>,
            );
        }
    };

    const dismissAll = () => {
        modalControl.forEach((item) => {
            const { element } = item;
            element?.destroy();
        });
    };

    const destroySpecificId = (id: any) => {
        const item = modalControl.find((e) => e.id === id);
        if (item) {
            const { element } = item;
            element?.destroy();
            // destroy id
            const arrFilter = modalControl.filter((e) => e.id !== id);
            modalControl = [...arrFilter];
        }
    };
    return { show, dismissAll, dismiss, update, destroySpecificId };
};

const styles = ScaledSheet.create({
    headerContainer: {
        backgroundColor: Themes.COLORS.lightGray,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: '15@vs',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    titleText: {
        fontSize: '18@ms0.3',
        fontWeight: 'bold',
        paddingHorizontal: '20@s',
    },
    overlayStyle: {
        backgroundColor: Themes.COLORS.overlayModalize,
    },
    iconClose: {
        position: 'absolute',
        top: '12@vs',
        right: '12@s',
    },
});
export default ModalizeManager;
