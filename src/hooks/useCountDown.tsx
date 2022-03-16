import { useEffect, useMemo, useState } from 'react';

const useCountdown = (initValue: number) => {
    const [reset, setReset] = useState(true);
    const [countdown, setCountdown] = useState(initValue - 1);

    const timeEnd = useMemo(() => {
        setCountdown(initValue - 1);
        return new Date().getTime() + initValue * 1000 - 1000;
    }, [reset]);

    const resetCountdown = () => setReset(!reset);

    const clearCountdown = () => setCountdown(-1);

    useEffect(() => {
        let x: any;
        const diff = Math.floor((timeEnd - new Date().getTime()) / 1000);
        if (countdown >= 0) {
            x = setTimeout(() => setCountdown(diff), 1000);
        }
        return () => clearTimeout(x);
    }, [countdown, timeEnd]);

    return { countdown, resetCountdown, clearCountdown };
};

export default useCountdown;
