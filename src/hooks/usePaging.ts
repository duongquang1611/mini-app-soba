import { AxiosRequestConfig } from 'axios';
import { useEffect, useRef, useState } from 'react';

export const SIZE_LIMIT = 10000000;
export const SIZE_LIMIT_PAGING = 20;

const usePaging = (
    requestPaging: (config: AxiosRequestConfig) => Promise<any>,
    initialParams?: any,
    mainKeyData?: string,
) => {
    const [pagingData, setPagingData] = useState<any>({
        refreshing: false,
        loadingMore: false,
        pageIndex: 1,
        list: mainKeyData
            ? {
                  [mainKeyData]: [],
              }
            : [],
        noMore: false,
    });
    const [params, setParams] = useState<any>(initialParams);
    const isFirstRun = useRef<any>(true);
    useEffect(() => {
        runRequest(pagingData.pageIndex, SIZE_LIMIT_PAGING, params);
    }, [pagingData.pageIndex]);

    useEffect(() => {
        if (isFirstRun?.current) {
            isFirstRun.current = false;
            return;
        }
        onRefresh();
    }, [params]);

    const handleOnSuccess = (data: any) => {
        const responseData = data || {};
        const newList: any = responseData.data || (mainKeyData ? {} : []);
        if (pagingData.pageIndex === 1) {
            setPagingData({
                ...pagingData,
                list: newList,
                noMore: pagingData.pageIndex >= responseData?.totalPages,
                refreshing: false,
                loadingMore: false,
            });
        } else if (mainKeyData ? newList?.[mainKeyData]?.length > 0 : newList.length > 0) {
            const newMergedList = mainKeyData
                ? {
                      ...pagingData.list,
                      [mainKeyData]: [...pagingData.list[mainKeyData], ...newList?.[mainKeyData]],
                  }
                : [...pagingData.list, ...newList];
            setPagingData({
                ...pagingData,
                list: newMergedList,
                noMore: pagingData.pageIndex >= responseData?.totalPages,
                refreshing: false,
                loadingMore: false,
            });
        }
    };

    // config request paging
    const runRequest = async (requestPageIndex: number, take?: number, otherParams?: any) => {
        setPagingData({
            ...pagingData,
            noMore: true,
        });
        const res = await requestPaging({
            params: {
                pageIndex: requestPageIndex,
                take: take || SIZE_LIMIT_PAGING,
                ...otherParams,
            },
        });
        handleOnSuccess(res);
    };

    const onRefresh = () => {
        if (pagingData.pageIndex > 1) {
            setPagingData({ ...pagingData, refreshing: true, pageIndex: 1 });
        } else {
            runRequest(1, SIZE_LIMIT_PAGING, params);
        }
    };

    const onLoadMore = () => {
        if (!pagingData.noMore) {
            setPagingData({
                ...pagingData,
                loadingMore: true,
                pageIndex: pagingData.pageIndex + 1,
            });
        }
    };

    return {
        pagingData,
        onRefresh,
        onLoadMore,
        params,
        setParams,
        setPagingData,
        loadingMore: pagingData.loadingMore,
    };
};

export default usePaging;
