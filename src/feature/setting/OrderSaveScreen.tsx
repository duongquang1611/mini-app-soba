/* eslint-disable @typescript-eslint/no-unused-vars */
import { StyledButton, StyledIcon, StyledImage, StyledText } from 'components/base';
import { navigate } from 'navigation/NavigationService';
import React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import StyledHeader from 'components/common/StyledHeader';
import AlertMessage from 'components/base/AlertMessage';
import { logger } from 'utilities/logger';
import { useTranslation } from 'react-i18next';
import Images from 'assets/images';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Themes } from 'assets/themes';
import { OrderItem } from 'feature/home/EditOrderScreen';
import { listOrderDefault } from 'utilities/staticData';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const OrderSave = () => {
    const { t } = useTranslation();

    const confirm = async () => {
        try {
            console.log('confirm');
        } catch (error) {
            logger(error);
            AlertMessage(error);
        }
    };
    return (
        <View style={styles.container}>
            <StyledHeader title={'setting.orderSaveTitle'} textRight={'キャンセル'} />
            <KeyboardAwareScrollView enableOnAndroid={true} showsVerticalScrollIndicator={false}>
                <View style={styles.body}>
                    {listOrderDefault.map((item, index) => (
                        <OrderItem key={index} data={item} />
                    ))}
                </View>
            </KeyboardAwareScrollView>
            <View style={styles.viewSave}>
                <View style={styles.numOrderView}>
                    <View style={styles.row}>
                        <StyledIcon source={Images.icons.bag} size={17} customStyle={styles.icBag} />
                        <StyledText originValue={'content'} customStyle={styles.contentText} />
                    </View>
                    <View style={styles.row}>
                        <StyledText originValue={'4'} customStyle={styles.contentText} />
                        <StyledText i18nText={'点'} customStyle={styles.contentText} />
                    </View>
                </View>
                <StyledButton title={'common.save'} onPress={confirm} customStyle={styles.buttonSave} />
            </View>
        </View>
    );
};

export default OrderSave;

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: Themes.COLORS.lightGray,
    },
    body: {
        flex: 1,
    },
    buttonSave: {},
    img: {
        width: '60@s',
        height: '60@s',
    },
    itemRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    containerItem: {
        width: '100%',
        marginVertical: '10@vs',
    },
    infoItem: {
        width: '70%',
    },
    addRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: Themes.COLORS.lightGray,
        borderRadius: 5,
        padding: '10@s',
        paddingHorizontal: '25@s',
    },
    numberOrderView: {
        flexDirection: 'row',
        width: '70@s',
        justifyContent: 'space-between',
    },
    viewSave: {
        backgroundColor: Themes.COLORS.white,
        marginVertical: '10@vs',
        alignItems: 'center',
        justifyContent: 'center',
    },
    numOrderView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: Themes.COLORS.white,
        paddingVertical: '10@vs',
        paddingHorizontal: '20@s',
        marginBottom: '10@vs',
        width: '100%',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    contentText: {
        marginLeft: '5@s',
        fontSize: '18@ms0.3',
        fontWeight: 'bold',
    },
    icBag: {
        tintColor: Themes.COLORS.secondary,
    },
});
