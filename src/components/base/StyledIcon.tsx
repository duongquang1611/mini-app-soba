import { Themes } from 'assets/themes';
import React, { memo } from 'react';
import { StyleProp, Image, ImageStyle, ImageProps } from 'react-native';
import { scale } from 'react-native-size-matters';

interface Props extends ImageProps {
    size: number;
    customStyle?: StyleProp<ImageStyle>;
    disabled?: boolean;
}

const StyledIcon = (props: Props) => {
    const { size, customStyle, disabled, ...otherProps } = props;
    return (
        <Image
            style={[
                customStyle,
                { width: scale(size), height: scale(size) },
                disabled && { tintColor: Themes.COLORS.silver },
            ]}
            resizeMode={'contain'}
            {...otherProps}
        />
    );
};

export default memo(StyledIcon);
