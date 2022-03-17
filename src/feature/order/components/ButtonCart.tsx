import Images from 'assets/images';
import Metrics from 'assets/metrics';
import { Themes } from 'assets/themes';
import { StyledIcon, StyledText } from 'components/base';
import React from 'react';
import { ImageBackground, TouchableOpacity, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { staticValue } from 'utilities/staticData';

const ButtonCart = (props: any) => {
    const { checkDisable, goToSaveOrder, amountValue, numOrder, isMenu } = props;
    return (
        <View
            style={[
                styles.secondaryView,
                { backgroundColor: checkDisable ? Themes.COLORS.silver : Themes.COLORS.secondary },
            ]}
        >
            <ImageBackground
                source={!checkDisable ? Images.icons.rectangle : Images.icons.rectangleDisable}
                style={[styles.rectangle]}
            >
                <StyledIcon
                    source={Images.icons.bag_happy}
                    size={35}
                    customStyle={[
                        styles.icBag,
                        { tintColor: checkDisable ? Themes.COLORS.silver : Themes.COLORS.secondary },
                    ]}
                />
            </ImageBackground>
            <TouchableOpacity style={[styles.rowCart]} onPress={goToSaveOrder} disabled={numOrder > 10}>
                {isMenu ? (
                    <View style={styles.menuCart}>
                        <StyledText i18nText={'setting.viewCart'} customStyle={styles.textCart} />
                        {numOrder > 0 && <StyledText originValue={`( ${numOrder} )`} customStyle={styles.textCart} />}
                    </View>
                ) : (
                    <StyledText
                        i18nText={'order.rangeCart'}
                        i18nParams={{
                            amountValue,
                            numOrder,
                            max: staticValue.MAX_ORDER,
                        }}
                        customStyle={[styles.textCart, styles.smallView]}
                    />
                )}
            </TouchableOpacity>
        </View>
    );
};

export default ButtonCart;

const styles = ScaledSheet.create({
    secondaryView: {
        backgroundColor: Themes.COLORS.secondary,
        alignItems: 'center',
        justifyContent: 'center',
        height: '56@vs',
        marginBottom: Metrics.safeBottomPadding,
    },
    icBag: {
        marginTop: '3@vs',
        marginLeft: '2@s',
    },
    textCart: {
        fontWeight: 'bold',
        color: Themes.COLORS.white,
        fontSize: '18@ms0.3',
        textAlign: 'center',
    },
    menuCart: {
        flexDirection: 'row',
    },
    rowCart: {
        flexDirection: 'row',
    },
    rectangle: {
        width: '45@s',
        height: '45@s',
        position: 'absolute',
        left: 0,
        top: 0,
    },
    smallView: {
        width: '200@s',
    },
});
