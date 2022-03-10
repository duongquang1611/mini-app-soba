import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import StyledHeader from 'components/common/StyledHeader';
import { Themes } from 'assets/themes';
import { StyledImage, StyledText } from 'components/base';
import Images from 'assets/images';
import { getCheckIn } from 'api/modules/api-app/home';
import AlertMessage from 'components/base/AlertMessage';
import { logger } from 'utilities/helper';

const CheckInScreen = () => {
    const [data, setData] = useState<any>();
    useEffect(() => {
        getData();
    }, []);
    const getData = async () => {
        try {
            const res = await getCheckIn();
            setData(res?.data);
        } catch (error) {
            logger(error);
            AlertMessage(error);
        }
    };
    return (
        <View style={styles.container}>
            <StyledHeader title={'check in'} />
            <View style={styles.body}>
                <View style={styles.qrView}>
                    <StyledText originValue={data?.nameQr} customStyle={styles.titleText} />
                    <StyledImage source={data?.image || Images.photo.qrCode} customStyle={styles.img} />
                </View>
                <View style={styles.contentView}>
                    <StyledText originValue={'content'} customStyle={styles.contentText} />
                </View>
            </View>
        </View>
    );
};

export default CheckInScreen;

const styles = ScaledSheet.create({
    container: {
        flex: 1,
    },
    body: {
        flex: 1,
        backgroundColor: Themes.COLORS.lightGray,
        paddingTop: '5@vs',
    },
    qrView: {
        alignItems: 'center',
        width: '100%',
        backgroundColor: Themes.COLORS.white,
    },
    titleText: {
        color: Themes.COLORS.secondary,
        fontSize: '20@ms0.3',
    },
    img: {
        width: '180@vs',
        height: '180@vs',
    },
    buttonSave: {},
    contentView: {
        width: '100%',
        paddingHorizontal: '20@s',
        marginVertical: '15@vs',
    },
    contentText: {},
});
