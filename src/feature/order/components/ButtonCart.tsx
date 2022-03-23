/* eslint-disable @typescript-eslint/no-unused-vars */
import Images from 'assets/images';
import Metrics from 'assets/metrics';
import { Themes } from 'assets/themes';
import { StyledIcon, StyledText, StyledTouchable } from 'components/base';
import React from 'react';
import { ImageBackground, TouchableOpacity, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { staticValue } from 'utilities/staticData';

const ButtonCart = (props: any) => {
    const { checkDisable, goToSaveOrder, amountValue, numOrder, isMenu, createDate } = props;
    return (
        <StyledTouchable
            customStyle={[
                styles.secondaryView,
                // { backgroundColor: checkDisable ? Themes.COLORS.silver : Themes.COLORS.secondary },
            ]}
            onPress={goToSaveOrder}
        >
            <ImageBackground
                // source={!checkDisable ? Images.icons.rectangle : Images.icons.rectangleDisable}
                source={Images.icons.rectangle}
                style={[styles.rectangle]}
            >
                <StyledIcon
                    source={Images.icons.bag_happy}
                    size={35}
                    customStyle={[
                        styles.icBag,
                        // { tintColor: checkDisable ? Themes.COLORS.silver : Themes.COLORS.secondary },
                    ]}
                />
            </ImageBackground>
            <TouchableOpacity style={[styles.rowCart]} onPress={goToSaveOrder} disabled={numOrder > 10}>
                {isMenu ? (
                    <View>
                        <StyledText i18nText={'setting.viewCart'} customStyle={styles.textCart} />
                        <StyledText
                            i18nText={'order.rangeCartMenu'}
                            i18nParams={{
                                numOrder,
                                max: staticValue.MAX_ORDER,
                            }}
                            customStyle={[styles.textCart, styles.smallView]}
                        />
                    </View>
                ) : (
                    <StyledText
                        i18nText={createDate ? 'order.rangeEditCart' : 'order.rangeCart'}
                        i18nParams={{
                            amountValue,
                            numOrder,
                            max: staticValue.MAX_ORDER,
                        }}
                        customStyle={[styles.textCart, styles.smallView]}
                    />
                )}
            </TouchableOpacity>
        </StyledTouchable>
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
    rowCart: {
        width: '100%',
        alignItems: 'center',
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
