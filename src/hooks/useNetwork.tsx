import NetInfo from '@react-native-community/netinfo';
import { getCouponData } from 'feature/home/HomeScreen';
import { useEffect, useRef } from 'react';

const useNetwork = () => {
    const isFirstRun = useRef<any>(true);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener((state) => {
            console.log({ state });
            if (state.isConnected && isFirstRun?.current) {
                isFirstRun.current = false;
            }
            if (state.isConnected && state.isInternetReachable && !isFirstRun.current) {
                getCouponData();
            }
        });
        return () => {
            unsubscribe();
        };
    }, []);
};

export default useNetwork;
