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

const listOrder = [{}, {}];
const OrderItem = (item: any) => {
    return (
        <View style={styles.containerItem}>
            <View style={styles.itemRow}>
                <StyledImage source={Images.photo.defaultImage} customStyle={styles.img} />
                <View>
                    <View style={styles.itemRow}>
                        <View style={styles.infoItem}>
                            <StyledText originValue={'name'} />
                            <StyledText originValue={'name'} />
                            <StyledText originValue={'name'} />
                        </View>
                        <TouchableOpacity>
                            <StyledIcon source={Images.icons.close} size={15} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.addRow}>
                        <StyledText originValue={'name'} />
                        <View style={styles.numberOrderView}>
                            <TouchableOpacity>
                                <StyledIcon source={Images.icons.close} size={15} />
                            </TouchableOpacity>
                            <StyledText originValue={'1'} />
                            <TouchableOpacity>
                                <StyledIcon source={Images.icons.close} size={15} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};

const RegisterStep3 = () => {
    const { t } = useTranslation();

    const confirm = async () => {
        try {
            // if (code?.length < 5) {
            //     AlertMessage(t('alert.invalidOTP'));
            //     return;
            // }
            // if (route?.params?.register) {
            //     const response = await register({ email, password, verifiedCode: code });
            //     const data = {
            //         ...response,
            //         user: { email, isSave: true },
            //     };
            //     AuthenticateService.handlerLogin(data);
            // } else {
            //     const verifyCode = await checkVerifyCode(email, code);
            //     if (verifyCode?.data?.isValid) {
            //         navigate(AUTHENTICATE_ROUTE.CHANGE_PASS, { email, code });
            //     } else {
            //         AlertMessage(t('alert.invalidOTP'));
            //     }
            // }
            // AuthenticateService.handlerLogin(data);
            // navigate(HOME_ROUTE.ROOT);
        } catch (error) {
            logger(error);
            AlertMessage(error);
        }
    };
    return (
        <View style={styles.container}>
            <StyledHeader title={'register'} />
            <View style={styles.body}>
                {listOrder.map((item, index) => (
                    <OrderItem key={index} item={item} />
                ))}
                <StyledButton title={'confirm'} onPress={confirm} customStyle={styles.buttonSave} />
            </View>
        </View>
    );
};

export default RegisterStep3;

const styles = ScaledSheet.create({
    container: {
        flex: 1,
    },
    body: {
        // justifyContent: 'center',
        // alignItems: 'center',
        flex: 1,
        marginHorizontal: '20@s',
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
});
