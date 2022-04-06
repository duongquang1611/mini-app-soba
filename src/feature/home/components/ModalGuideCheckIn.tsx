import Images from 'assets/images';
import { Themes } from 'assets/themes';
import { StyledImage, StyledText } from 'components/base';
import React from 'react';
import { Text, View } from 'react-native';
import { scale, ScaledSheet } from 'react-native-size-matters';
import { isIos } from 'utilities/helper';
import { orderGuide } from 'utilities/staticData';

const StepItem = (item: any) => (
    <View style={styles.rowStep}>
        <View style={styles.numberView}>
            <StyledText originValue={item?.item?.index} customStyle={styles.numberValue} />
        </View>
        <StyledImage source={item?.item?.icon} customStyle={styles.icStep} />
        <View style={styles.containView}>
            <View style={styles.containView}>
                <Text style={styles.textGuide}>
                    {item?.item?.content}
                    <Text onPress={() => item?.goToStamp()} style={styles.textLink}>
                        {item?.item?.textLink}
                    </Text>
                </Text>
            </View>
        </View>
    </View>
);
const ModalGuideCheckIn = (props: any) => {
    return (
        <View>
            <StyledText originValue={orderGuide?.content} isBlack customStyle={styles.contentGuide} />
            <StyledText originValue={orderGuide?.header} isBlack customStyle={styles.headerStep} />
            <View>
                <StyledImage source={Images.photo.line} customStyle={styles.line1} />
                <StyledImage source={Images.photo.line} customStyle={styles.line2} />
                <View>
                    {orderGuide?.steps?.map((item, index) => (
                        <StepItem
                            goToStamp={props?.goToStamp}
                            key={index}
                            item={item}
                            largeView={isIos && index === 2}
                        />
                    ))}
                </View>
            </View>
        </View>
    );
};

export default ModalGuideCheckIn;

const styles = ScaledSheet.create({
    icStep: {
        width: '80@s',
        height: '80@s',
    },
    numberView: {
        width: '24@s',
        height: '24@s',
        backgroundColor: Themes.COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 24,
    },
    numberValue: {
        color: Themes.COLORS.white,
    },
    rowStep: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: '20@s',
        height: '80@s',
        justifyContent: 'space-between',
        marginVertical: '5@s',
    },
    line1: {
        position: 'absolute',
        width: 2,
        height: '50@s',
        left: '32@s',
        top: '63@s',
    },
    line2: {
        position: 'absolute',
        width: 2,
        height: '50@s',
        left: '32@s',
        top: '155@s',
    },
    containView: {
        width: '220@s',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    textGuide: {
        lineHeight: scale(24),
    },
    contentGuide: {
        paddingHorizontal: '20@s',
        paddingVertical: '30@s',
        lineHeight: scale(24),
    },
    headerStep: {
        paddingHorizontal: '20@s',
        marginBottom: '10@s',
    },
    textLink: {
        lineHeight: scale(24),
        color: Themes.COLORS.primary,
        fontWeight: 'bold',
        fontSize: '14@ms0.3',
        textDecorationLine: 'underline',
    },
});
