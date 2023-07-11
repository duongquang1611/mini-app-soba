import { useAppSelector } from 'app-redux/hooks';
import { IRestaurants } from 'app-redux/slices/globalDataSlice';
import Metrics from 'assets/metrics';
import { Themes } from 'assets/themes';
import { StyledButton, StyledText, StyledTouchable } from 'components/base';
import { HeaderDefault } from 'components/base/modal/ModalizeManager';
import RadioCheckView from 'components/common/RadioCheckView';
import React, { forwardRef, useMemo, useState } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { ScaledSheet, verticalScale } from 'react-native-size-matters';

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
    customStyle?: StyleProp<ViewStyle>;
    selectBranch: (value: any) => void;
    chooseBranch?: IRestaurants;
}

interface IPopupConfirm extends IProps {
    selectBox: any;
    setSelectBox: (value: any) => void;
    handlePressIconClose?: () => void;
    handleOk?: () => void;
}

const ModalChooseRestaurants = (props: IProps, ref: any) => {
    const { title, onOk, onCancel, customStyle, selectBranch, chooseBranch } = props;
    const [selectBox, setSelectBox] = useState<any>(chooseBranch);

    const handleOk = () => {
        selectBranch?.(selectBox);
        onOk?.();
        ref?.current?.close();
    };

    const handlePressIconClose = () => {
        onCancel?.();
        ref?.current?.close();
    };

    return (
        <Modalize
            ref={ref}
            withHandle={false}
            scrollViewProps={{
                keyboardShouldPersistTaps: 'handled',
                contentContainerStyle: styles.contentContainerStyle,
            }}
            FooterComponent={<FooterComponent handleOk={handleOk} selectBox={selectBox} />}
            modalHeight={Metrics.screenHeight * 0.8}
            snapPoint={verticalScale(370)}
            HeaderComponent={
                <HeaderDefault title={'authen.register.selectBranchStore.titleModal'} onPress={handlePressIconClose} />
            }
        >
            <PopupConfirm
                selectBox={selectBox}
                setSelectBox={setSelectBox}
                selectBranch={selectBranch}
                title={title}
                handleOk={handleOk}
                onCancel={onCancel}
                customStyle={customStyle}
                handlePressIconClose={handlePressIconClose}
            />
        </Modalize>
    );
};

const PopupConfirm = (props: IPopupConfirm) => {
    const { selectBox, setSelectBox, customStyle } = props;
    const { listRestaurants } = useAppSelector((state) => state.globalData);

    const handleChooseBranch = (itemBranch: { id?: number; name: string }) => {
        setSelectBox(itemBranch);
    };

    const renderSelectRestaurants = useMemo(() => {
        return listRestaurants?.map((item: { id?: number; name: string }) => {
            return (
                <StyledTouchable
                    customStyle={styles.viewSelect}
                    key={item?.id}
                    onPress={() => handleChooseBranch(item)}
                >
                    <RadioCheckView check={selectBox?.id === item?.id} />
                    <StyledText i18nText={item?.name} customStyle={styles.cssTxtName} />
                </StyledTouchable>
            );
        });
    }, [listRestaurants, selectBox]);

    return <View style={[styles.container, customStyle]}>{renderSelectRestaurants}</View>;
};

const FooterComponent = (props: { handleOk: () => void; selectBox?: any }) => {
    const { handleOk, selectBox } = props;

    return (
        <View style={styles.wrapButton}>
            <StyledButton
                title={'common.save'}
                customStyle={styles.okBtn}
                onPress={handleOk}
                disabled={!selectBox?.name}
                customStyleText={styles.okBtnText}
            />
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        paddingVertical: '20@vs',
        paddingHorizontal: '20@vs',
    },
    contentContainerStyle: {
        flexGrow: 1,
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
        marginBottom: Metrics.safeBottomPadding,
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
        flexShrink: 1,
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

export default forwardRef(ModalChooseRestaurants);
