import { StyledButton, StyledIcon, StyledText, StyledTouchable } from 'components/base';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { Themes } from 'assets/themes';
import { TAB_NAVIGATION_ROOT } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import DashView from 'components/common/DashView';
import Images from 'assets/images';

const OrderItemCart = (props: any) => {
    const { mainDish, subDishes } = props?.data;
    const { goDetailMenu } = props;

    return (
        <StyledTouchable onPress={goDetailMenu}>
            <View style={styles.orderItemView}>
                <TouchableOpacity onPress={props.goDetailMenu}>
                    <StyledIcon source={{ uri: mainDish?.image }} size={70} />
                </TouchableOpacity>
                <View style={styles.orderTextView}>
                    <View style={styles.rowDetail}>
                        <StyledText numberOfLines={1} originValue={mainDish?.name} customStyle={styles.titleOrder} />
                        <View style={styles.detailIconView}>
                            <StyledText i18nText={'order.goToEdit'} customStyle={styles.nextOrder} />
                            <StyledIcon size={20} source={Images.icons.arrowLeftPrimary} />
                        </View>
                    </View>
                    {subDishes?.map((item: any, index: number) => (
                        <View key={index} style={styles.rowSub}>
                            <StyledText originValue={`+ ${item?.title}`} isBlack customStyle={styles.addValue} />
                            {item?.value > 1 && (
                                <View style={styles.numView}>
                                    <StyledText
                                        originValue={`x ${item?.value}`}
                                        isBlack
                                        customStyle={styles.addValueText}
                                    />
                                </View>
                            )}
                        </View>
                    ))}
                </View>
            </View>
        </StyledTouchable>
    );
};
const ModalDetailMenu = (props: any) => {
    const { id, dishes } = props;
    const getListFromDishes = dishes?.filter((item: any) => item?.mainDish?.id === id) || [];
    const goDetailNew = () => {
        props?.closeModal();
        navigate(TAB_NAVIGATION_ROOT.ORDER_ROUTE.DETAIL_MEAL, { id, isNew: true });
    };
    const goDetailEdit = (createDate: string) => {
        props?.closeModal();
        navigate(TAB_NAVIGATION_ROOT.ORDER_ROUTE.DETAIL_MEAL, { id, createDate });
    };
    return (
        <View style={styles.container}>
            <View style={styles.paddingView}>
                <StyledButton onPress={goDetailNew} title={'order.addNew'} customContentStyle={styles.buttonNew} />
                <DashView />
                <StyledText i18nText={'order.editMenu'} customStyle={styles.edit} />
            </View>
            {getListFromDishes?.map((item: any, index: number) => (
                <OrderItemCart key={index} data={item} goDetailMenu={() => goDetailEdit(item?.createDate)} />
            ))}
        </View>
    );
};

export default ModalDetailMenu;

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        paddingVertical: '20@vs',
    },
    paddingView: {
        paddingHorizontal: '20@s',
    },
    addNew: {
        fontSize: '16@ms0.3',
        fontWeight: '700',
    },
    edit: {
        fontSize: '16@ms0.3',
        fontWeight: '700',
        color: Themes.COLORS.primary,
        marginVertical: '10@vs',
    },
    orderItemView: {
        width: '100%',
        paddingVertical: '10@vs',
        paddingHorizontal: '20@s',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: Themes.COLORS.white,
    },
    orderTextView: {
        width: '75%',
    },
    titleOrder: {
        fontWeight: 'bold',
        marginBottom: '5@vs',
        width: '150@s',
    },
    nextOrder: {
        color: Themes.COLORS.primary,
        marginRight: '10@s',
        fontSize: '12@ms0.3',
    },
    numView: {
        backgroundColor: Themes.COLORS.headerBackground,
        borderRadius: 5,
        paddingHorizontal: '5@s',
        paddingVertical: '2@vs',
        marginLeft: '5@s',
    },
    addValueText: {
        color: Themes.COLORS.primary,
        fontSize: '12@ms0.3',
    },
    buttonNew: {
        marginBottom: '10@vs',
    },
    rowSub: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    addValue: {
        marginVertical: '3@vs',
        fontSize: '12@ms0.3',
    },
    rowDetail: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    detailIconView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});
