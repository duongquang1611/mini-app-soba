import { useAppSelector } from 'app-redux/hooks';
import { IRestaurants } from 'app-redux/slices/globalDataSlice';
import Images from 'assets/images';
import { Themes } from 'assets/themes';
import { StyledButton, StyledIcon, StyledText, StyledTouchable } from 'components/base';
import ModalizeManager from 'components/base/modal/ModalizeManager';
import RadioCheckView from 'components/common/RadioCheckView';
import React, { useMemo, useState } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { ScaledSheet, verticalScale } from 'react-native-size-matters';

const modalize = ModalizeManager();

interface IProps {
    onOk?: any;
    onCancel?: any;
    title?: string;
    content?: string;
    textButtonCancel?: string;
    textButtonOk?: string;
    dismissModalOnOk?: boolean;
    dismissModalOnCancel?: boolean;
    showClose?: boolean;
    customModalId?: number;
    customStyle?: StyleProp<ViewStyle>;
    setChooseBranch: (value: any) => void;
    chooseBranch: IRestaurants;
}

export const dismissModal = (id: any) => {
    modalize.dismiss(id);
};

const ModalChooseRestaurants = (props: IProps) => {
    const {
        title = 'authen.register.selectBranchStore.titleModal',
        customModalId,
        onOk,
        dismissModalOnOk = true,
        dismissModalOnCancel = true,
        onCancel,
        customStyle,
        setChooseBranch,
        chooseBranch,
    } = props;

    const modalIdByType = +1 || customModalId;

    const PopupConfirm = () => {
        const { listRestaurants } = useAppSelector((state) => state.globalData);
        const [selectBox, setSelectBox] = useState<any>(chooseBranch);

        const handleChooseBranch = (itemBranch: { id?: number; name: string }) => {
            setSelectBox(itemBranch);
        };

        const renderSelectRestaurants = useMemo(() => {
            return listRestaurants.map((item: { id?: number; name: string }) => {
                return (
                    <StyledTouchable
                        customStyle={styles.viewSelect}
                        key={item?.id}
                        onPress={() => handleChooseBranch(item)}
                    >
                        <RadioCheckView check={selectBox?.id === item.id} />
                        <StyledText i18nText={item?.name} customStyle={styles.cssTxtName} />
                    </StyledTouchable>
                );
            });
        }, [listRestaurants, selectBox]);

        const handleOk = () => {
            setChooseBranch(selectBox);
            onOk?.();
            dismissModalOnOk && dismissModal(modalIdByType);
        };

        const handlePressIconClose = () => {
            dismissModalOnCancel && dismissModal(modalIdByType);
            onCancel?.();
        };

        return (
            <View style={[styles.container, customStyle]}>
                <View style={styles.header}>
                    <StyledText i18nText={title} customStyle={styles.title} />
                    <StyledTouchable customStyle={[styles.icClose]} onPress={handlePressIconClose}>
                        <StyledIcon source={Images.icons.closeCircle} size={20} />
                    </StyledTouchable>
                </View>
                <View style={styles.viewContainerSelect}>{renderSelectRestaurants}</View>
                <View style={styles.wrapButton}>
                    <StyledButton
                        title={'common.save'}
                        customStyle={styles.okBtn}
                        onPress={handleOk}
                        customStyleText={styles.okBtnText}
                    />
                </View>
            </View>
        );
    };

    modalize.show(
        modalIdByType,
        <PopupConfirm />,
        {
            scrollViewProps: {
                scrollEnabled: false,
            },
            modalHeight: verticalScale(350),
        },
        undefined,
    );
};

const styles = ScaledSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingVertical: '17@vs',
        backgroundColor: Themes.COLORS.lightGray,
    },
    wrapImg: {
        height: '180@vs',
        backgroundColor: Themes.COLORS.headerBackground,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    wrapButton: {
        flexDirection: 'row',
        paddingHorizontal: '20@vs',
        marginTop: '27@vs',
    },
    viewContainerSelect: {
        paddingTop: '20@vs',
        paddingBottom: '5@vs',
        marginHorizontal: '20@s',
    },
    viewSelect: {
        flexDirection: 'row',
        marginBottom: '15@vs',
        alignItems: 'center',
    },
    cssTxtName: {
        marginLeft: '10@s',
        fontSize: '16@ms0.3',
        lineHeight: '23@vs',
    },
    cancelBtn: {
        width: 'auto',
        borderColor: Themes.COLORS.primary,
        borderWidth: 1,
        flex: 1,
    },
    okBtn: {
        width: 'auto',
        flex: 1,
    },
    nonPaddingVer: {
        paddingVertical: '2@vs',
    },
    lineHeightText: {
        lineHeight: '25@vs',
    },
    cancelBtnText: {
        color: Themes.COLORS.textPrimary,
        fontSize: '16@ms0.3',
        textAlign: 'center',
    },
    okBtnText: {
        fontSize: '16@ms0.3',
        textAlign: 'center',
        fontWeight: 'bold',
        lineHeight: '23@vs',
    },
    separator: {
        width: '10@s',
    },
    title: {
        fontWeight: 'bold',
        fontSize: '18@ms0.3',
        textAlign: 'center',
    },
    content: {
        paddingHorizontal: '20@s',
        textAlign: 'center',
        color: Themes.COLORS.textSecondary,
        marginBottom: '50@vs',
    },
    icClose: {
        position: 'absolute',
        top: '17@vs',
        right: '12@vs',
        zIndex: 1,
    },
});

export default ModalChooseRestaurants;
