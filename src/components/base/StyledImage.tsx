import Images from 'assets/images';
import React, { memo, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import FastImage, { FastImageProps } from 'react-native-fast-image';

interface StyledImageProps extends FastImageProps {
    customStyle?: any;
    children?: any;
}

interface StyledImageBackgroundProps extends FastImageProps {
    children?: any;
    imageStyle?: any;
    style?: any;
}

const StyledImage = (props: StyledImageProps) => {
    const { customStyle, source } = props;
    const { defaultImage } = Images.photo;
    const [error, setError] = useState(false);

    useEffect(() => {
        if (error) {
            setError(false);
        }
    }, [source]);

    return (
        <FastImage
            resizeMode={'contain'}
            {...props}
            style={customStyle}
            onError={() => setError(true)}
            source={
                typeof source === 'object'
                    ? source?.uri
                        ? error
                            ? defaultImage
                            : source
                        : defaultImage
                    : error
                    ? defaultImage
                    : source
            }
        />
    );
};

export const StyledImageBackground = (props: StyledImageBackgroundProps) => {
    const { source, children, imageStyle, style, ...otherImageProps } = props;
    const { defaultImage } = Images.photo;
    const [error, setError] = useState(false);

    useEffect(() => {
        if (error) {
            setError(false);
        }
    }, [source]);

    return (
        <View style={style}>
            <FastImage
                {...otherImageProps}
                style={[
                    StyleSheet.absoluteFill,
                    {
                        width: style?.width,
                        height: style?.height,
                    },
                    imageStyle,
                ]}
                onError={() => setError(true)}
                source={
                    typeof source === 'object'
                        ? source?.uri
                            ? error
                                ? defaultImage
                                : source
                            : defaultImage
                        : error
                        ? defaultImage
                        : source
                }
            />
            {children}
        </View>
    );
};

export default memo(StyledImage);
