import { StyledButton, StyledIcon, StyledImage, StyledText } from 'components/base';
import { AUTHENTICATE_ROUTE } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import StyledHeader from 'components/common/StyledHeader';
import Images from 'assets/images';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Themes } from 'assets/themes';
import { dataFakeOderDefault } from 'utilities/staticData';

const OrderItem = (data: any) => {
    return (
        <View style={styles.containerItem}>
            {data.data.dishes?.map((item: any) => (
                <View key={item.id} style={styles.containerItem}>
                    <View style={styles.itemRow}>
                        <View style={styles.itemRow}>
                            <StyledImage source={Images.photo.defaultImage} customStyle={styles.imgItem} />
                            <StyledText originValue={item.name} />
                        </View>
                        <TouchableOpacity style={styles.choose}>
                            <StyledIcon source={Images.icons.close} size={15} />
                        </TouchableOpacity>
                    </View>
                </View>
            ))}
        </View>
    );
};
const RegisterStep2 = () => {
    const goToRegis = () => {
        navigate(AUTHENTICATE_ROUTE.REGISTER_STEP_3);
    };
    return (
        <View style={styles.container}>
            <StyledHeader title={'register'} />
            <TouchableOpacity style={styles.iconBack}>
                <StyledIcon source={Images.icons.back} size={15} />
            </TouchableOpacity>
            <StyledImage source={Images.photo.defaultImage} customStyle={styles.img} />
            <View style={styles.content}>
                <StyledText originValue={'text'} />
            </View>

            <View style={styles.body}>
                {dataFakeOderDefault.map((item) => (
                    <OrderItem key={item.id} data={item} />
                ))}
                <StyledButton title={'confirm'} onPress={goToRegis} customStyle={styles.buttonSave} />
            </View>
        </View>
    );
};

export default RegisterStep2;

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: Themes.COLORS.lightGray,
    },
    body: {
        alignItems: 'center',
        flex: 1,

        backgroundColor: Themes.COLORS.white,
    },
    buttonSave: {},
    img: {
        width: '100%',
        height: '150@vs',
        zIndex: 1,
    },
    iconBack: {
        position: 'absolute',
        zIndex: 99,
        top: '30@vs',
        left: '20@s',
        backgroundColor: Themes.COLORS.red,
    },
    content: {
        width: '100%',
        padding: '20@s',
        backgroundColor: Themes.COLORS.lightGray,
    },
    imgItem: {
        width: '60@s',
        height: '60@s',
        marginRight: '20@s',
    },
    itemRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    containerItem: {
        width: '100%',
        marginVertical: '10@vs',
        backgroundColor: Themes.COLORS.white,
        paddingHorizontal: '20@s',
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
    choose: {
        width: '15@s',
        height: '15@s',
        borderRadius: 15,
        borderWidth: 1,
        borderColor: Themes.COLORS.primary,
    },
});
