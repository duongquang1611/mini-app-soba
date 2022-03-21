import { postExchangeCoupon } from 'api/modules/api-app/stamp';
import Images from 'assets/images';
import * as languageText from 'assets/locates/jp';
import { Themes } from 'assets/themes';
import { StyledIcon, StyledList, StyledText } from 'components/base';
import ModalizeManager from 'components/base/modal/ModalizeManager';
import CouponItem from 'components/common/CouponItem';
import DashView from 'components/common/DashView';
import PopupConfirm from 'components/common/PopupConfirm';
import StyledHeader from 'components/common/StyledHeader';
import { COUPON_ROUTE } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React from 'react';
import { View } from 'react-native';
import { ScaledSheet, verticalScale } from 'react-native-size-matters';
import { createStampItem, listCouponFake, MODAL_ID, POPUP_TYPE } from 'utilities/staticData';
import StampItem from './components/StampItem';

const SeparatorView = () => <View style={s.separator} />;
const itemStamp = createStampItem();

const ExchangeCouponListScreen = () => {
    const modalize = ModalizeManager();

    const goToDetail = (item: any, disabled = false) => {
        navigate(COUPON_ROUTE.DETAIL_COUPON, {
            item,
            canUse: true,
            itemStamp,
            titleButton: 'exchangeCoupon.btnExchange',
            exchangeCoupon,
            disabled,
        });
    };

    const dismissModal = (id: any) => {
        modalize.dismiss(id);
    };

    const showPopUpConfirm = (id: number, type = POPUP_TYPE.CONFIRM, dataText = {}, onOk?: any, onCancel?: any) => {
        modalize.show(
            id,
            <PopupConfirm
                onOk={onOk}
                type={type}
                onCancel={() => {
                    dismissModal(id);
                    onCancel?.();
                }}
                nonPaddingVertical={type === POPUP_TYPE.SUCCESS}
                {...dataText}
            />,
            {
                scrollViewProps: {
                    scrollEnabled: false,
                },
                modalHeight: verticalScale(470),
            },
        );
    };

    const exchangeCoupon = (item: any, cb?: () => any) => {
        console.log(item);
        showPopUpConfirm(MODAL_ID.CONFIRM, POPUP_TYPE.CONFIRM, languageText?.default?.exchangeCoupon?.confirm, () =>
            onConfirmOk(cb),
        );
    };

    const onConfirmOk = async (cb?: () => any) => {
        try {
            const res = await postExchangeCoupon({
                amount: 5,
                couponId: 1,
            });
            console.log('file: ExchangeCouponListScreen.tsx -> line 75 -> onConfirmOk -> res', res);
            cb?.();
        } catch (error) {
            cb?.();
            console.log('file: ExchangeCouponListScreen.tsx -> line 77 -> onConfirmOk -> error', error);
        }
        modalize.dismiss(MODAL_ID.CONFIRM, () => {
            if (Math.round(Math.random())) {
                showPopUpConfirm(
                    MODAL_ID.SUCCESS,
                    POPUP_TYPE.SUCCESS,
                    languageText?.default?.exchangeCoupon?.success,
                    () => {
                        dismissModal(MODAL_ID.SUCCESS);
                        if (typeof cb !== 'function') {
                            goToDetail({}, true);
                        }
                    },
                );
            } else
                showPopUpConfirm(MODAL_ID.ERROR, POPUP_TYPE.ERROR, languageText?.default?.exchangeCoupon?.error, () =>
                    dismissModal(MODAL_ID.ERROR),
                );
        });
    };

    const renderItem = ({ item }: any) => {
        return <CouponItem canUse={true} item={item} goToDetail={goToDetail} handleUseCoupon={exchangeCoupon} />;
    };

    return (
        <View style={s.container}>
            <StyledHeader title={'exchangeCoupon.title'} />
            <SeparatorView />
            <StampItem item={itemStamp} customStyle={s.customStyleItemStamp} animation />
            <SeparatorView />
            <View style={s.wrapTextCanExchange}>
                <StyledIcon size={24} source={Images.icons.couponBlue} />
                <StyledText i18nText={'exchangeCoupon.listCanExchange'} customStyle={s.textCanExchange} />
            </View>
            <StyledList data={listCouponFake} renderItem={renderItem} ItemSeparatorComponent={DashView} />
        </View>
    );
};

const s = ScaledSheet.create({
    container: {
        flex: 1,
    },
    customStyleItemStamp: {},
    separator: {
        height: '10@vs',
        width: '100%',
        backgroundColor: Themes.COLORS.backgroundPrimary,
    },
    wrapTextCanExchange: {
        flexDirection: 'row',
        paddingTop: '10@vs',
        paddingBottom: '20@vs',
        paddingHorizontal: '20@s',
        alignItems: 'center',
    },
    textCanExchange: {
        fontSize: '16@ms0.3',
        fontWeight: 'bold',
        marginLeft: '10@s',
    },
});

export default ExchangeCouponListScreen;
