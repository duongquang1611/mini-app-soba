/* eslint-disable @typescript-eslint/no-unused-vars */
import Images from 'assets/images';
import Metrics from 'assets/metrics';
import { Themes } from 'assets/themes';
import { StyledIcon, StyledImage, StyledText, StyledTouchable } from 'components/base';
import { goBack } from 'navigation/NavigationService';
import React, { useState } from 'react';
import { StyleProp, View, ViewProps, ViewStyle } from 'react-native';
import { scale, ScaledSheet, verticalScale } from 'react-native-size-matters';
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
    content?: string;
    logo?: any;
    heightImage?: any;
    sliderWidth?: any;
    notificationUnRead?: number;
}

const StyledHeaderImage = (props: HeaderProps) => {
    const {
        isBack = true,
        title,
        iconNoti,
        customStyle,
        onPressNoti,
        isShadow = true,
        customHandleBackPress,
        style,
        images,
        content,
        logo,
        heightImage = verticalScale(260),
        sliderWidth,
        notificationUnRead = 0,
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
                <StyledImage
                    resizeMode={'cover'}
                    source={{ uri: data?.item?.image || data?.item }}
                    customStyle={[styles.img, { height: heightImage }]}
                />
            </View>
        );
    };

    return (
        <>
            <View style={[styles.container, customStyle, isShadow && styles.shadow]}>
                <View style={[styles.slide, { height: heightImage }]}>
                    {images?.length ? (
                        <Carousel
                            data={images}
                            renderItem={renderItem}
                            onSnapToItem={setIndex}
                            sliderWidth={sliderWidth || Metrics.screenWidth}
                            itemWidth={Metrics.screenWidth}
                            loop={true}
                            loopClonesPerSide={images.length}
                            removeClippedSubviews={false}
                            inactiveSlideOpacity={1}
                            inactiveSlideScale={1}
                        />
                    ) : (
                        <StyledImage
                            source={Images.photo.defaultImage}
                            customStyle={styles.noDataImages}
                            resizeMode={'cover'}
                        />
                    )}
                    <View
                        pointerEvents={'none'}
                        style={[styles.containerDot, { bottom: content ? verticalScale(20) : verticalScale(-10) }]}
                    >
                        <Pagination
                            containerStyle={styles.containerPagination}
                            dotsLength={images.length}
                            activeDotIndex={index}
                            inactiveDotStyle={{ width: scale(5), borderRadius: 5 }}
                            dotStyle={[
                                styles.wrapDot,
                                {
                                    width:
                                        images.length <= 6
                                            ? scale(40)
                                            : ((Metrics.screenWidth - scale(30)) / images.length) * 0.5,
                                },
                            ]}
                            inactiveDotOpacity={1}
                            inactiveDotScale={1}
                            dotContainerStyle={{
                                marginHorizontal:
                                    images.length <= 6
                                        ? scale(8)
                                        : ((Metrics.screenWidth - scale(30)) / images.length) * 0.2,
                            }}
                        />
                    </View>
                </View>
                <View style={styles.viewHeader}>
                    {logo && <StyledImage source={Images.photo.logoHeader} customStyle={styles.logo} />}
                    {isBack ? (
                        <View>
                            <StyledTouchable onPress={onBack} customStyle={styles.buttonBack}>
                                <StyledIcon source={Images.icons.back} size={20} customStyle={styles.iconBack} />
                            </StyledTouchable>
                        </View>
                    ) : (
                        <View style={styles.buttonBack} />
                    )}
                    <StyledText i18nText={title || ' '} customStyle={styles.title} numberOfLines={1} />
                    {iconNoti ? (
                        <StyledTouchable onPress={onPressNoti} customStyle={styles.buttonActionNoti}>
                            <StyledIcon source={iconNoti} size={25} customStyle={styles.iconAction} />
                            {notificationUnRead > 0 && <View style={styles.newNotification} />}
                        </StyledTouchable>
                    ) : (
                        <View style={styles.buttonAction} />
                    )}
                </View>
            </View>
            <View style={styles.contentView}>
                {content && <StyledText originValue={content} customStyle={styles.contentText} isBlack />}
            </View>
        </>
    );
};

const styles = ScaledSheet.create({
    container: {
        backgroundColor: Themes.COLORS.white,
    },
    viewHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: '14@vs',
        paddingHorizontal: '15@s',
        position: 'absolute',
        top: '40@vs',
    },
    buttonBack: {
        paddingHorizontal: '5@s',
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
    buttonActionNoti: {
        width: '40@s',
        height: '40@s',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        backgroundColor: Themes.COLORS.backgroundButton,
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
        height: '260@vs',
    },
    containerDot: {
        backgroundColor: Themes.COLORS.transparent,
        bottom: '-10@vs',
        position: 'absolute',
    },
    containerPagination: {
        justifyContent: 'flex-start',
        marginLeft: '-5@s',
    },
    wrapDot: {
        width: '40@s',
        height: '5@vs',
        borderRadius: 2,
        backgroundColor: Themes.COLORS.disabled,
    },
    slide: {
        width: '100%',
        height: '260@vs',
    },
    iconBack: {
        // tintColor: Themes.COLORS.black,
    },
    contentView: {
        paddingTop: '15@vs',
        paddingBottom: '5@vs',
        backgroundColor: Themes.COLORS.lightGray,
    },
    contentText: {
        marginLeft: '20@s',
        fontSize: '20@ms0.3',
        fontWeight: 'bold',
    },
    logo: {
        width: '111@s',
        height: '58@s',
        borderRadius: 5,
        marginLeft: '5@s',
    },
    newNotification: {
        width: '10@s',
        height: '10@s',
        backgroundColor: Themes.COLORS.primary,
        borderRadius: 20,
        position: 'absolute',
        top: '8@s',
        right: '8@s',
    },
    noDataImages: {
        width: '100%',
        height: '100%',
    },
});

export default React.memo(StyledHeaderImage);
