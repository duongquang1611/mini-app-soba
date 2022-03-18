import ModalizeManager from 'components/base/modal/ModalizeManager';
import PopupConfirm from 'components/common/PopupConfirm';
import React from 'react';
import { verticalScale } from 'react-native-size-matters';
import { ERRORS, MODAL_ID, POPUP_TYPE } from 'utilities/staticData';

const modalize = ModalizeManager();

interface IProps {
    id?: number;
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

const AlertMessage = (message: any, popupProps?: IProps, checkNetworkError = true) => {
    if (!(checkNetworkError && (message || popupProps?.content) === ERRORS.network)) {
        const {
            id = MODAL_ID.EXCHANGE_COUPON_ERROR,
            type = POPUP_TYPE.ERROR,
            content,
            onOk,
            onCancel,
            dismissModalOnOk = true,
            dismissModalOnCancel = true,
            onClosedModalize,
            ...otherPopupProps
        } = popupProps || {};

        const handleOk = () => {
            dismissModalOnOk && dismissModal(id);
            onOk?.();
        };

        const handleCancel = () => {
            dismissModalOnCancel && dismissModal(id);
            onCancel?.();
        };

        modalize.show(
            id,
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
