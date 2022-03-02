import { StyledButton, StyledText } from 'components/base';
import React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { Themes } from 'assets/themes';
import { dataFakeOderDefault } from 'utilities/staticData';
import OrderItem from './OrderItem';

const ModalListCoupon = () => {
    const data = [dataFakeOderDefault[0]];
    return (
        <View style={styles.container}>
            <View style={styles.body}>
                <StyledText originValue={'name'} customStyle={styles.nameText} />
                {data.map((item) => (
                    <OrderItem key={item.id} data={item} />
                ))}
            </View>
            <View style={styles.buttonView}>
                <StyledButton
                    title="保存"
                    onPress={() => {
                        console.log('use');
                    }}
                />
            </View>
        </View>
    );
};

export default ModalListCoupon;

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: Themes.COLORS.lightGray,
    },
    body: {
        alignItems: 'center',
        flex: 1,
    },
    nameText: {
        width: '100%',
        backgroundColor: Themes.COLORS.white,
        fontWeight: 'bold',
        fontSize: '16@ms0.3',
        paddingHorizontal: '20@s',
    },
    buttonView: {
        backgroundColor: Themes.COLORS.white,
        alignItems: 'center',
        paddingVertical: '10@s',
        paddingBottom: '50@s',
    },
});
