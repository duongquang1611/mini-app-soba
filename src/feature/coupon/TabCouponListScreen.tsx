import { updateCouponCartOrder } from 'app-redux/slices/orderSlice';
import { Themes } from 'assets/themes';
import ModalizeManager from 'components/base/modal/ModalizeManager';
import StyledHeader from 'components/common/StyledHeader';
import StyledTabTopView from 'components/common/StyledTabTopView';
import ModalCoupon from 'feature/order/components/ModalCoupon';
import { ORDER_ROUTE } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { ScaledSheet, verticalScale } from 'react-native-size-matters';
import { SceneMap } from 'react-native-tab-view';
import { useDispatch } from 'react-redux';
import { DiscountType, MODAL_ID, staticValue, TabCouponStatus } from 'utilities/staticData';
import CouponTab from './components/CouponTab';

const TabCouponListScreen = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const modalize = ModalizeManager();

    const routes = [
        { key: 'stampCanUse', title: t('coupon.topTab.canUse') },
        { key: 'stampUsed', title: t('coupon.topTab.used') },
    ];

    const goToCart = () => {
        modalize.dismiss(MODAL_ID.APPLY_COUPON);
        navigate(ORDER_ROUTE.CART);
    };

    const handleUseCoupon = (item: any) => {
        if (item?.coupon?.discountType === DiscountType.EACH_DISH) {
            // show popup choose dish to use coupon
            showApplyCoupon([item]);
        } else {
            // coupon apply all order
            dispatch(updateCouponCartOrder([item]));
            goToCart();
        }
    };

    const applyChooseDish = (data?: any) => {
        console.log({ data });
        dispatch(updateCouponCartOrder(data));
        goToCart();
    };

    const showApplyCoupon = (listCouponsModal: any) => {
        modalize.show(
            MODAL_ID.APPLY_COUPON,
            <ModalCoupon listCouponsModal={listCouponsModal} applyChooseDish={applyChooseDish} />,
            {
                modalHeight: verticalScale(staticValue.NUMBER_ITEM_LIST_COUPON_MODAL * 60 + 250),
                scrollViewProps: {
                    contentContainerStyle: { flexGrow: 1 },
                },
            },
            { title: 'order.applyCoupon' },
        );
    };

    const renderScene = SceneMap({
        stampCanUse: () => <CouponTab isTabCoupon canUse={TabCouponStatus.CAN_USE} handleUseCoupon={handleUseCoupon} />,
        stampUsed: () => <CouponTab isTabCoupon canUse={TabCouponStatus.USED} handleUseCoupon={handleUseCoupon} />,
    });

    return (
        <View style={styles.container}>
            <StyledHeader title={'coupon.title'} hasBack={false} largeTitleHeader />
            <StyledTabTopView routes={routes} renderScene={renderScene} />
        </View>
    );
};

export default TabCouponListScreen;

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: Themes.COLORS.backgroundPrimary,
    },
    body: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        marginHorizontal: '20@s',
    },
    buttonSave: {},
    contentContainerTabBar: {
        alignItems: 'center',
    },
    tabStyle: {},
    tabBar: {
        backgroundColor: Themes.COLORS.white,
        borderColor: Themes.COLORS.white,
    },
    indicatorTabBar: {
        height: '100%',
        backgroundColor: Themes.COLORS.primary,
        borderWidth: 1,
        // borderRadius: 10,
        borderColor: Themes.COLORS.white,
    },
    label: {
        fontSize: 13,
        fontWeight: 'bold',
        textAlign: 'center',
        color: Themes.COLORS.silver,
    },
});
