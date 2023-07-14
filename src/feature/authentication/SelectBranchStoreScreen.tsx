import { editProfile, getProfile } from 'api/modules/api-app/authenticate';
import { saveOrderOption } from 'api/modules/api-app/order';
import { RootState } from 'app-redux/hooks';
import { updateChooseBranch } from 'app-redux/slices/globalDataSlice';
import { clearDefaultOrder, clearMobileOrder } from 'app-redux/slices/orderSlice';
import { userInfoActions } from 'app-redux/slices/userInfoSlice';
import { Themes } from 'assets/themes';
import { StyledButton, StyledText, StyledTouchable } from 'components/base';
import AlertMessage from 'components/base/AlertMessage';
import StyledInput, { LabelInput } from 'components/base/StyledInput';
import StyledKeyboardAware from 'components/base/StyledKeyboardAware';
import StyledHeader from 'components/common/StyledHeader';
import ModalChooseRestaurants from 'feature/authentication/components/ModalChooseRestaurants';
import { goBack } from 'navigation/NavigationService';
import React, { FunctionComponent, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { ScaledSheet } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import { OrderTypeMenu } from 'utilities/staticData';

const SelectBranchStoreScreen: FunctionComponent = (props: any) => {
    const { setChooseBranch, chooseBranchRegister } = props?.route?.params || {};
    const {
        userInfo,
        globalData: { chooseBranch },
    } = useSelector((state: RootState) => state);

    const { user } = userInfo;
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [restaurant, setRestaurant] = useState<any>(chooseBranchRegister || chooseBranch);
    const { name } = restaurant || {};
    const modalRef = useRef<Modalize>();

    const onClearOrder = async (orderType?: number) => {
        try {
            const saveOrderParams = {
                orderType,
                totalAmount: 0,
                dishes: [],
                coupons: [],
            };
            const res = await saveOrderOption(saveOrderParams);
        } catch (error) {
            console.log(error);
        }
    };

    const onSaveRestaurant = async () => {
        try {
            if (user?.member?.id) {
                await editProfile({ frequentlyUsedRestaurantId: restaurant?.id });
                const resProfile = await getProfile();
                dispatch(userInfoActions.getUserInfoSuccess(resProfile?.data));
                dispatch(updateChooseBranch(restaurant));
                onClearOrder(OrderTypeMenu.DEFAULT_ORDER);
                onClearOrder(OrderTypeMenu.MOBILE_ORDER);
                dispatch(clearDefaultOrder());
                dispatch(clearMobileOrder());
            }
            setChooseBranch?.(restaurant);
            goBack();
        } catch (error) {
            AlertMessage(error);
        }
    };

    return (
        <View style={styles.container}>
            <ModalChooseRestaurants ref={modalRef} chooseBranch={chooseBranch} selectBranch={setRestaurant} />
            <StyledHeader title={'authen.register.selectBranchStore.labelBranch'} />
            {/* <StyledHeader
                title={'authen.register.selectBranchStore.title'}
                renderCenter={renderCenter}
                customContainer={styles.customContainerHeader}
            /> */}
            <StyledKeyboardAware customStyle={styles.scrollView}>
                <View style={styles.containerContent}>
                    <StyledText customStyle={styles.title} i18nText={'authen.register.selectBranchStore.description'} />
                    <LabelInput
                        label={'authen.register.selectBranchStore.labelInput'}
                        customStyle={styles.cssLabel}
                        labelRequire={'*'}
                    />

                    <View style={styles.viewInput}>
                        <StyledInput
                            value={!restaurant?.id && name ? t('authen.register.selectBranchStore.noBranch') : name}
                            containerStyle={styles.restaurant}
                            pointerEvents="none"
                            customPlaceHolder="authen.register.selectBranchStore.placeHolderBranch"
                        />
                        <StyledTouchable customStyle={styles.btnOpenModal} onPress={() => modalRef?.current?.open()}>
                            <StyledText
                                i18nText={'authen.register.selectBranchStore.descriptionInput'}
                                customStyle={styles.cssTxtInput}
                            />
                        </StyledTouchable>
                    </View>
                    <View style={styles.viewCheckSquare}>
                        <StyledText
                            i18nText="authen.register.selectBranchStore.attention.first"
                            customStyle={[styles.textBlack, { marginTop: 0, fontWeight: '700' }]}
                        />
                        <StyledText
                            i18nText="authen.register.selectBranchStore.attention.second"
                            customStyle={styles.textBlack}
                        />
                        <StyledText
                            i18nText="authen.register.selectBranchStore.attention.three"
                            customStyle={styles.textBlack}
                        />
                    </View>
                </View>
            </StyledKeyboardAware>
            <View style={styles.btnView}>
                <StyledButton title={'home.saveBranch'} onPress={onSaveRestaurant} disabled={!restaurant?.name} />
            </View>
            <View style={styles.viewFooter} />
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: Themes.COLORS.lightGray,
    },
    title: {
        fontSize: '18@ms0.3',
        lineHeight: '26@vs',
        color: Themes.COLORS.textSecondary,
        fontWeight: 'bold',
    },
    viewInput: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    textBlack: {
        color: Themes.COLORS.black,
        lineHeight: '20@vs',
        marginTop: '8@vs',
    },
    cssTxtInput: {
        fontSize: '16@vs',
        fontWeight: 'bold',
        color: Themes.COLORS.textSecondary,
    },
    viewCheckSquare: {
        marginTop: '26@vs',
    },
    cssLabel: {
        marginTop: '10@vs',
        fontSize: '16@ms0.3',
    },
    scrollView: {
        flexGrow: 1,
        marginTop: '10@vs',
        marginBottom: '5@vs',
        backgroundColor: Themes.COLORS.white,
    },
    containerContent: {
        paddingHorizontal: '20@s',
        paddingTop: '23@vs',
    },
    viewFooter: {
        backgroundColor: Themes.COLORS.white,
        height: '34@vs',
    },
    describeLabel: {
        color: Themes.COLORS.black,
        lineHeight: '20@vs',
        fontWeight: '400',
    },
    restaurant: {
        width: '235@s',
        paddingVertical: '0@s',
        borderRadius: 10,
        borderColor: Themes.COLORS.silver,
        backgroundColor: Themes.COLORS.backGroundInput,
        paddingHorizontal: 0,
    },
    btnView: {
        backgroundColor: Themes.COLORS.white,
        alignItems: 'center',
    },
    btnOpenModal: {
        borderWidth: 1,
        height: '50@vs',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: '11@s',
        width: '90@s',
        borderRadius: 5,
    },
    logo: {
        width: '125@s',
        height: '65@s',
        alignSelf: 'center',
        flex: 1,
    },
    customContainerHeader: {
        paddingVertical: 0,
    },
});

export default SelectBranchStoreScreen;
