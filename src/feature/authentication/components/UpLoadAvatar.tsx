import Images from 'assets/images';
import { Themes } from 'assets/themes';
import { StyledIcon, StyledImage } from 'components/base';
import React, { memo, useState } from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import ImagePicker from 'utilities/upload/ImagePicker';

interface UpLoadAvatarProps {
    avatar?: string;
    setValue?: any;
}

const UpLoadAvatar = (props: UpLoadAvatarProps) => {
    const [image, setImage] = useState(props?.avatar || null);
    const changeImage = (img: string) => {
        setImage(img);
        props.setValue('avatar', img);
    };
    return (
        <View style={styles.container}>
            <ImagePicker image={image} setImage={changeImage}>
                <StyledImage customStyle={styles.avatar} source={image ? { uri: image } : Images.photo.avatarDefault} />
                <View style={styles.camera}>
                    <View style={styles.cameraContent}>
                        <StyledIcon source={Images.icons.camera} size={23} />
                    </View>
                </View>
            </ImagePicker>
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '90@s',
        height: '90@s',
    },
    avatar: {
        width: '90@s',
        height: '90@s',
        borderRadius: 90,
        borderWidth: 1,
        borderColor: Themes.COLORS.white,
    },
    camera: {
        position: 'absolute',
        bottom: 0,
        zIndex: 2,
        alignSelf: 'center',
        width: '88@s',
        height: '90@s',
        borderRadius: 90,
        overflow: 'hidden',
        justifyContent: 'flex-end',
    },
    cameraContent: {
        width: '90@s',
        height: '35@s',
        backgroundColor: 'rgba(34, 34, 34, 0.3)',
        borderBottomRightRadius: 190,
        borderBottomLeftRadius: 190,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default memo(UpLoadAvatar);
