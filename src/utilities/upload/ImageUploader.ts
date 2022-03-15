import { uploadImage } from 'api/modules/api-app/general';
import Config from 'react-native-config';
import ImagePicker from 'react-native-image-crop-picker';
import i18next from 'utilities/i18next';
import { checkCamera, checkPhoto } from 'utilities/permissions';
import { staticValue } from 'utilities/staticData';

const MAX_WIDTH = 800;
const MAX_HEIGHT = 800;

const ImageUploaded = {
    pickImage: async (index: number) => {
        try {
            let localPath: any = '';
            if (index === 1) {
                const check = await checkPhoto();
                if (check) localPath = await ImageUploaded.chooseImageFromGallery();
            } else if (index === 2) {
                const check = await checkCamera();
                if (check) localPath = await ImageUploaded.chooseImageFromCamera();
            }
            const uri = (localPath && (await ImageUploaded.uploader(localPath))) || null;
            return uri;
        } catch (err) {
            console.log('pickImage: -> err', err);
            return null;
        }
    },

    chooseImageFromCamera: () =>
        ImagePicker.openCamera({
            width: MAX_WIDTH,
            height: MAX_HEIGHT,
            compressImageMaxWidth: MAX_WIDTH,
            compressImageMaxHeight: MAX_HEIGHT,
            waitAnimationEnd: true,
            // includeBase64: true,
            // forceJpg: true,
            cropping: true,
            cropperChooseText: i18next.t('common.chooseCamera'),
            cropperCancelText: i18next.t('common.cancelCamera'),
        }),
    chooseImageFromGallery: () =>
        ImagePicker.openPicker({
            width: MAX_WIDTH,
            height: MAX_HEIGHT,
            compressImageMaxWidth: MAX_WIDTH,
            compressImageMaxHeight: MAX_HEIGHT,
            // compressImageQuality: 100,
            waitAnimationEnd: true,
            // includeBase64: true,
            // forceJpg: true,
            cropping: true,
            cropperChooseText: i18next.t('common.chooseCamera'),
            cropperCancelText: i18next.t('common.cancelCamera'),
        }),

    uploader: async (localPath: any) => {
        const timeStamp = new Date().getTime();
        const formatImage: any = {
            uri: localPath.path,
            name: `${timeStamp}.${'image/jpeg'}`,
            type: 'image/jpeg',
        };
        const formData = new FormData();
        formData.append('files', formatImage);
        const uri = await uploadImage(formData);
        if (uri?.data?.length > 0) {
            return `${Config.AWS_DOMAIN || staticValue.AWS_DOMAIN}${uri.data[0]}`;
        }
        return null;
    },
};
export default ImageUploaded;
