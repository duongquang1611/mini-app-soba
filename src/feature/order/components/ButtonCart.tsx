/* eslint-disable @typescript-eslint/no-unused-vars */
import Images from 'assets/images';
import { Themes } from 'assets/themes';
import { StyledIcon, StyledText, StyledTouchable } from 'components/base';
import { StyledImageBackground } from 'components/base/StyledImage';
import React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { staticValue } from 'utilities/staticData';

const ButtonCart = (props: any) => {
    const { checkDisable, goToSaveOrder, amountValue, numOrder, isMenu, createDate, customStyle } = props;
    return (
        <StyledTouchable
            disabled={checkDisable}
            customStyle={[
                styles.secondaryView,
                { backgroundColor: checkDisable ? Themes.COLORS.silver : Themes.COLORS.secondary },
                customStyle,
            ]}
            onPress={goToSaveOrder}
        >
            <StyledImageBackground
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
            </StyledImageBackground>
            <View style={[styles.rowCart]}>
                {isMenu ? (
                    <View>
                        <StyledText i18nText={'setting.viewCart'} customStyle={styles.textCart} />
                        <StyledText
                            i18nText={'order.rangeCartMenu'}
                            i18nParams={{
                                numOrder,
                                max: staticValue.MAX_ORDER,
                            }}
                            customStyle={styles.textCart}
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
                        customStyle={styles.textCart}
                    />
                )}
            </View>
        </StyledTouchable>
    );
};

export default ButtonCart;

const styles = ScaledSheet.create({
    secondaryView: {
        backgroundColor: Themes.COLORS.secondary,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: '7@vs',
        marginBottom: '10@vs',
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
});
