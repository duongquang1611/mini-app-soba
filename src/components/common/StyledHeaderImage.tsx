import Images from 'assets/images';
import Metrics from 'assets/metrics';
import { Themes } from 'assets/themes';
import { StyledIcon, StyledImage, StyledText, StyledTouchable } from 'components/base';
import { goBack } from 'navigation/NavigationService';
import React, { useState } from 'react';
import { StyleProp, View, ViewProps, ViewStyle } from 'react-native';
import { scale, ScaledSheet } from 'react-native-size-matters';
import { logger } from 'utilities/helper';
import Carousel, { Pagination } from 'react-native-snap-carousel';

interface HeaderProps extends ViewProps {
    isBack?: boolean;
    title?: string;
    iconAction?: any;
    iconQr?: any;
    onPressNoti?(): void;
    onPressQr?(): void;
    iconNoti?: any;
    customStyle?: StyleProp<ViewStyle>;
    onPressAction?(): void;
    isShadow?: boolean;
    customHandleBackPress?(): void;
    img?(): string;
    images?: any;
}

const StyledHeaderImage = (props: HeaderProps) => {
    const {
        isBack = true,
        title,
        iconAction,
        iconQr,
        iconNoti,
        customStyle,
        onPressQr,
        onPressNoti,
        onPressAction,
        isShadow = true,
        customHandleBackPress,
        style,
        img,
        images,
    } = props;
    const [index, setIndex] = useState(0);

    const onBack = () => {
        if (customHandleBackPress) {
            customHandleBackPress();
            return;
        }
        goBack();
    };

    if (style) {
        logger('You should use customStyle to implement this component to avoid conflict', true);
    }
    const renderItem = (data: any) => {
        return (
            <View>
                <StyledImage source={{ uri: data?.item?.img }} customStyle={styles.img} />
            </View>
        );
    };

    return (
        <View style={[styles.container, customStyle, isShadow && styles.shadow]}>
            {/* <ImageBackground
                source={img || Images.photo.defaultImage}
                resizeMode="cover"
                style={[styles.container, customStyle, isShadow && styles.shadow]}
            > */}
            <View style={styles.slide}>
                <Carousel
                    data={images}
                    renderItem={renderItem}
                    onSnapToItem={setIndex}
                    sliderWidth={Metrics.screenWidth}
                    itemWidth={Metrics.screenWidth}
                    // ref={carouselRef}
                    loop={true}
                    loopClonesPerSide={images.length}
                    removeClippedSubviews={false}
                    inactiveSlideOpacity={1}
                    inactiveSlideScale={1}
                />
                <Pagination
                    dotsLength={images.length}
                    activeDotIndex={index}
                    dotStyle={[
                        styles.wrapDot,
                        {
                            width:
                                images.length <= 6
                                    ? scale(40)
                                    : ((Metrics.screenWidth - scale(30)) / images.length) * 0.5,
                        },
                    ]}
                    inactiveDotOpacity={0.2}
                    inactiveDotScale={1}
                    containerStyle={styles.containerDot}
                    dotContainerStyle={{
                        marginHorizontal:
                            images.length <= 6 ? scale(8) : ((Metrics.screenWidth - scale(30)) / images.length) * 0.2,
                    }}
                />
            </View>
            <View style={styles.viewHeader}>
                {isBack ? (
                    <StyledTouchable onPress={onBack} customStyle={styles.buttonBack}>
                        <StyledIcon source={Images.icons.back} size={30} />
                    </StyledTouchable>
                ) : (
                    <View style={styles.buttonBack} />
                )}
                <StyledText i18nText={title || ' '} customStyle={styles.title} numberOfLines={1} />
                {(iconQr || iconNoti) && (
                    <View style={styles.iconView}>
                        <StyledTouchable onPress={onPressQr} customStyle={styles.buttonAction}>
                            <StyledIcon source={iconQr} size={15} customStyle={styles.iconAction} />
                        </StyledTouchable>
                        <StyledTouchable onPress={onPressNoti} customStyle={styles.buttonAction}>
                            <StyledIcon source={iconNoti} size={15} customStyle={styles.iconAction} />
                        </StyledTouchable>
                    </View>
                )}
                {iconAction && (
                    <StyledTouchable onPress={onPressAction} customStyle={styles.buttonAction}>
                        <StyledIcon source={iconQr} size={15} customStyle={styles.iconAction} />
                    </StyledTouchable>
                )}
                {!iconQr && !iconNoti && !iconAction && <View style={styles.buttonAction} />}
            </View>
            {/* </ImageBackground> */}
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        backgroundColor: Themes.COLORS.white,
    },
    viewHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: '14@vs',
        paddingHorizontal: '20@s',
        position: 'absolute',
        top: '40@vs',
    },
    buttonBack: {
        width: '25@vs',
        height: '25@vs',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: '20@ms',
        fontWeight: 'bold',
        maxWidth: '80%',
        color: Themes.COLORS.black,
    },
    buttonAction: {
        width: '25@vs',
        height: '25@vs',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconView: {
        flexDirection: 'row',
    },
    iconAction: {},
    shadow: {
        // shadowColor: Themes.COLORS.black,
        // shadowOffset: {
        //     width: 0,
        //     height: 2,
        // },
        // shadowOpacity: 0.17,
        // shadowRadius: 5.49,
        // elevation: 5,
    },
    img: {
        width: '100%',
        height: '250@vs',
    },
    containerDot: {
        backgroundColor: Themes.COLORS.transparent,
        bottom: '-10@vs',
        alignSelf: 'center',
        position: 'absolute',
    },
    wrapDot: {
        width: '40@s',
        height: '4@vs',
        borderRadius: 2,
    },
    slide: {
        width: '100%',
        height: '250@vs',
        marginBottom: '15@vs',
    },
});

export default React.memo(StyledHeaderImage);
