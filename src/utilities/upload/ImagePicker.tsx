import { StyledTouchable } from 'components/base';
import ModalizeManager from 'components/base/modal/ModalizeManager';
import OptionSelectView from 'components/common/OptionSelectView';
import React, { memo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, ImageStyle, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import { verticalScale } from 'react-native-size-matters';
import { MODAL_ID } from 'utilities/staticData';
import ImageUploader from './ImageUploader';

interface ImagePickerProp {
    setImage: any;
    image: any;
    children: any;
    customStyleImage?: StyleProp<ImageStyle>;
    customStyle?: StyleProp<ViewStyle>;
    customSelectComponent?: boolean;
}

const ImagePicker = (props: ImagePickerProp) => {
    const { image, setImage, children, customSelectComponent = true } = props;
    const { t } = useTranslation();
    const modalize = ModalizeManager();

    const actionSheet = useRef<any>(null);
    const [loading, setLoading] = useState(false);

    const options = [t('authen.register.cancel'), t('authen.register.photo'), t('authen.register.camera')];

    const showOptionSelect = () => {
        customSelectComponent
            ? modalize.show(
                  MODAL_ID.IMG_PICKER,
                  <OptionSelectView
                      onPress={(index: any) => {
                          modalize.dismiss(MODAL_ID.IMG_PICKER);
                          pickMainImage(index);
                      }}
                  />,
                  {
                      modalHeight: verticalScale(250),
                      scrollViewProps: { contentContainerStyle: { height: '100%' }, scrollEnabled: false },
                  },
                  { title: 'common.chooseImgTitle' },
              )
            : actionSheet?.current?.show?.();
    };

    const pickMainImage = async (index: number) => {
        try {
            setLoading(true);
            const uri = await ImageUploader.pickImage(index);
            if (uri) {
                setImage(uri || image);
            } else {
                setLoading(false);
            }
        } catch (err) {
            console.log('pickMainImage -> err', err);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <StyledTouchable customStyle={props.customStyle} onPress={showOptionSelect}>
                {image && !loading ? (
                    <>{children}</>
                ) : loading ? (
                    <View style={[props.customStyleImage, styles.loading]}>
                        <ActivityIndicator />
                    </View>
                ) : (
                    <>{children}</>
                )}
            </StyledTouchable>
            {!customSelectComponent && (
                <ActionSheet
                    ref={actionSheet}
                    options={options}
                    cancelButtonIndex={0}
                    onPress={(index: any) => {
                        if (index !== 0) {
                            pickMainImage(index);
                        }
                    }}
                />
            )}
        </>
    );
};

const styles = StyleSheet.create({
    loading: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default memo(ImagePicker);
