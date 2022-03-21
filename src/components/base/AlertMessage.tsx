import ModalizeManager from 'components/base/modal/ModalizeManager';
import PopupConfirm from 'components/common/PopupConfirm';
import React from 'react';
import { verticalScale } from 'react-native-size-matters';
import { ERRORS, MODAL_ID, POPUP_TYPE } from 'utilities/staticData';

const modalize = ModalizeManager();

interface IProps {
    type?: POPUP_TYPE;
    onOk?: any;
    onCancel?: any;
    title?: string;
    content?: string;
    textButtonCancel?: string;
    textButtonOk?: string;
    dismissModalOnOk?: boolean;
    dismissModalOnCancel?: boolean;
    onClosedModalize?: any;
}

export const dismissModal = (id: any) => {
    modalize.dismiss(id);
};

export const MODAL_POPUP_ID = [MODAL_ID.CONFIRM, MODAL_ID.SUCCESS, MODAL_ID.ERROR];

const AlertMessage = (message: any, popupProps?: IProps, checkNetworkError = true) => {
    if (!(checkNetworkError && (message || popupProps?.content) === ERRORS.network)) {
        const {
            type = POPUP_TYPE.ERROR,
            content,
            onOk,
            onCancel,
            dismissModalOnOk = true,
            dismissModalOnCancel = true,
            onClosedModalize,
            ...otherPopupProps
        } = popupProps || {};

        const modalIdByType = MODAL_POPUP_ID[type];

        const handleOk = () => {
            dismissModalOnOk && dismissModal(modalIdByType);
            onOk?.();
        };

        const handleCancel = () => {
            dismissModalOnCancel && dismissModal(modalIdByType);
            onCancel?.();
        };

        modalize.show(
            modalIdByType,
            <PopupConfirm
                onOk={handleOk}
                type={type}
                onCancel={handleCancel}
                nonPaddingVertical={type === POPUP_TYPE.SUCCESS}
                content={message || content}
                {...otherPopupProps}
            />,
            {
                scrollViewProps: {
                    scrollEnabled: false,
                },
                modalHeight: verticalScale(470),
                onClosed: onClosedModalize,
            },
        );
    }
};
export default AlertMessage;
