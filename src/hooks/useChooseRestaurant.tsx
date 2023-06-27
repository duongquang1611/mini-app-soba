import { editProfile, getProfile } from 'api/modules/api-app/authenticate';
import { useAppSelector } from 'app-redux/hooks';
import { userInfoActions } from 'app-redux/slices/userInfoSlice';
import AlertMessage from 'components/base/AlertMessage';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useChooseRestaurant = () => {
    const dispatch = useDispatch();
    const firstRender = useRef(true);
    const { user = {} } = useSelector((state: any) => state.userInfo);
    const { listRestaurants } = useAppSelector((state) => state.globalData);
    const [chooseBranch, setChooseBranch] = useState<any>(
        listRestaurants?.find((item: { id?: number }) => item?.id === user?.member?.frequentlyUsedRestaurantId) || {},
    );

    const handleUpdateProfile = async () => {
        try {
            await editProfile({ frequentlyUsedRestaurantId: chooseBranch?.id });
            const resProfile = await getProfile();
            dispatch(userInfoActions.getUserInfoSuccess(resProfile?.data));
        } catch (error) {
            AlertMessage(error);
        }
    };

    useEffect(() => {
        if (firstRender?.current) {
            firstRender.current = false;
            return;
        }
        handleUpdateProfile();
    }, [chooseBranch?.id]);

    return { chooseBranch, setChooseBranch };
};

export default useChooseRestaurant;
