/* eslint-disable @typescript-eslint/no-unused-vars */
import { couponUse, getCouponDetail } from 'api/modules/api-app/coupon';
import { RootState } from 'app-redux/hooks';
import { updateSaveOrder } from 'app-redux/slices/orderSlice';
import Metrics from 'assets/metrics';
import { Themes } from 'assets/themes';
import { StyledButton } from 'components/base';
import AlertMessage from 'components/base/AlertMessage';
import StyledHeader from 'components/common/StyledHeader';
import StampItem from 'feature/stamp/components/StampItem';
import { AUTHENTICATE_ROUTE, TAB_NAVIGATION_ROOT } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { useSelector, useDispatch } from 'react-redux';
import { checkCanUse, logger } from 'utilities/helper';
import { detailCouponFake } from 'utilities/staticData';
import CouponContentView from './components/CouponContentView';

const SeparatorView = () => <View style={styles.separator} />;

const DetailCouponScreen = (props: any) => {
    const { saveOrder } = useSelector((state: RootState) => state.order);
    const [data, setData] = useState<any>();
    const dispatch = useDispatch();
    const {
        canUse,
        itemStamp,
        titleButton,
        exchangeCoupon,
        disabled: disabledProps = false,
        id,
    } = props?.route?.params;
    const [disabled, setDisabled] = useState(disabledProps);
    const [coupon, setCoupon] = useState(detailCouponFake);
    const { endDate } = coupon;

    useEffect(() => {
        getCoupon();
    }, []);
    const getCoupon = async () => {
        try {
            const res = await getCouponDetail(itemStamp?.id || id);
            setCoupon(res?.data);
        } catch (error) {
            logger(error);
            AlertMessage(error);
        }
    };
    const handleUseCoupon = async () => {
        if (exchangeCoupon) {
            exchangeCoupon?.({}, () => {
                setDisabled(true);
            });
        } else {
            try {
                const res = await couponUse(itemStamp?.id, itemStamp?.orderType);
                setCoupon(res?.data);
                const newCoupons = saveOrder?.coupons?.filter((item: any) => item?.id !== id);
                dispatch(
                    updateSaveOrder({
                        ...saveOrder,
                        coupons: [
                            ...newCoupons,
                            {
                                id: coupon.id,
                                title: coupon.title,
                            },
                        ],
                    }),
                );
                navigate(TAB_NAVIGATION_ROOT.ORDER_ROUTE.CART);
            } catch (error) {
                logger(error);
                AlertMessage(error);
            }
        }
    };
    return (
        <View style={styles.container}>
            <StyledHeader title={checkCanUse(endDate) ? 'coupon.canUse' : 'coupon.canNotUse'} />
            {!!itemStamp && (
                <>
                    <SeparatorView />
                    <StampItem item={itemStamp} animation />
                    <SeparatorView />
                </>
            )}
            <CouponContentView canUse={canUse} data={coupon} />
            {checkCanUse(endDate) && (
                <View style={styles.buttonView}>
                    <StyledButton
                        title={titleButton || 'coupon.useCoupon'}
                        onPress={handleUseCoupon}
                        disabled={disabled}
                    />
                </View>
            )}
        </View>
    );
};

export default DetailCouponScreen;

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: Themes.COLORS.lightGray,
    },
    title: {
        fontSize: '16@ms0.3',
        fontWeight: 'bold',
        color: Themes.COLORS.secondary,
    },
    buttonView: {
        backgroundColor: Themes.COLORS.white,
        paddingVertical: '10@vs',
        alignItems: 'center',
        paddingBottom: Metrics.safeBottomPadding,
    },
    separator: {
        height: '10@vs',
        width: '100%',
        backgroundColor: Themes.COLORS.backgroundPrimary,
    },
});
