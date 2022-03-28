import NetInfo from '@react-native-community/netinfo';
import { RootState } from 'app-redux/hooks';
import { getCouponData, getResourcesData } from 'feature/home/HomeScreen';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

const useNetwork = () => {
    const isFirstRun = useRef<any>(true);
    const { token } = useSelector((state: RootState) => state.userInfo);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener((state) => {
            if (state.isConnected && isFirstRun?.current) {
                isFirstRun.current = false;
            }
            if (state.isConnected && state.isInternetReachable && !isFirstRun.current) {
                getCouponData();
                getResourcesData();
            }
        });
        return () => {
            unsubscribe();
        };
    }, [token]);
};

export default useNetwork;
