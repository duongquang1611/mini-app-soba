/* eslint-disable no-underscore-dangle */

import { useSelector } from 'react-redux';

const useData = (key: any) => {
    const dataResult = useSelector((state: any) => state[key]);
    return { dataResult };
};

export default useData;
