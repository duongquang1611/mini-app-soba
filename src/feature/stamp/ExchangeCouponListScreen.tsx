import { getDetailMemberStamp, postExchangeCoupon } from 'api/modules/api-app/stamp';
import { updateGlobalData } from 'app-redux/slices/globalDataSlice';
import Images from 'assets/images';
import * as languageText from 'assets/locates/jp';
import { Themes } from 'assets/themes';
import { StyledIcon, StyledList, StyledText } from 'components/base';
import AlertMessage from 'components/base/AlertMessage';
import CouponItem from 'components/common/CouponItem';
import DashView from 'components/common/DashView';
import StyledHeader from 'components/common/StyledHeader';
import { orderBy } from 'lodash';
import { COUPON_ROUTE } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { useDispatch } from 'react-redux';
import { getRandomRange } from 'utilities/helper';
import { POPUP_TYPE } from 'utilities/staticData';
import StampItem from './components/StampItem';

const SeparatorView = () => <View style={s.separator} />;

const ExchangeCouponListScreen = (props: any) => {
    const { t } = useTranslation();
    const [stampDetail, setStampDetail] = useState(props?.route?.params?.stampDetail || {});
    const { stamp = {}, leftAmount = 0 } = stampDetail;
    const { couponsExchange = [] } = stamp;
    const dispatch = useDispatch();

    const goToDetail = (item: any, newStampDetail?: any) => {
        navigate(COUPON_ROUTE.DETAIL_COUPON, {
            item,
            canUse: true,
            stampDetail: newStampDetail || stampDetail,
            titleButton: 'exchangeCoupon.btnExchange',
            handleExchangeCoupon,
        });
    };

    const handleExchangeCoupon = (item: any, cbSuccess?: any, cbError?: any, currentStampDetail) => {
        const { stampAmount = 0 } = item || {};
        const currentLeftAmount = (currentStampDetail ? currentStampDetail?.leftAmount || 0 : leftAmount) || 0;
        if (stampAmount > currentLeftAmount) {
            AlertMessage('', {
                ...languageText?.default?.exchangeCoupon?.error,
                type: POPUP_TYPE.ERROR,
            });
        } else
            AlertMessage('', {
                ...languageText?.default?.exchangeCoupon?.confirm,
                content: t('exchangeCoupon.confirm.content', { amount: currentLeftAmount - stampAmount }),
                type: POPUP_TYPE.CONFIRM,
                onOk: () => {
                    exchangeCoupon(item, cbSuccess, cbError);
                },
            });
    };

    const exchangeCoupon = async (item: any, cbSuccess?: any, cbError?: any) => {
        try {
            await postExchangeCoupon({
                stampId: stamp?.id,
                couponId: item?.coupon?.id,
            });
            const resStampDetail = await getDetailMemberStamp(stampDetail?.id);
            setStampDetail(resStampDetail?.data);
            dispatch(updateGlobalData({ triggerReloadStamp: getRandomRange() }));
            cbSuccess?.();
            AlertMessage('', {
                ...languageText?.default?.exchangeCoupon?.success,
                onOk: () => {
                    goToDetail(item, resStampDetail?.data);
                },
                type: POPUP_TYPE.SUCCESS,
                nonPaddingVertical: true,
            });
        } catch (error) {
            cbError?.();
            AlertMessage(error);
        }
    };

    const renderCouponItem = ({ item }: any) => {
        return (
            <CouponItem
                canUse={true}
                item={item}
                goToDetail={goToDetail}
                handleUseCoupon={() => handleExchangeCoupon(item)}
                isExchangeCoupon={true}
            />
        );
    };

    return (
        <View style={s.container}>
            <StyledHeader title={'exchangeCoupon.title'} />
            <SeparatorView />
            <StampItem item={stampDetail} animation customStyle={s.customStyleItemStamp} />

            <SeparatorView />
            <View style={s.wrapTextCanExchange}>
                <StyledIcon size={24} source={Images.icons.couponBlue} />
                <StyledText i18nText={'exchangeCoupon.listCanExchange'} customStyle={s.textCanExchange} />
            </View>
            <StyledList
                data={orderBy(couponsExchange, ['id'], ['asc'])}
                renderItem={renderCouponItem}
                ItemSeparatorComponent={DashView}
                noDataText={'coupon.noData'}
                canRefresh={false}
            />
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
