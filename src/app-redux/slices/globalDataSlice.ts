import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { cloneDeep } from 'lodash';
import { persistReducer } from 'redux-persist';
import { generatePersistConfig } from 'utilities/helper';

export interface IRestaurants {
    id: number;
    name: string;
    address?: string;
    openDate?: any;
    closeDate?: any;
}
interface IGlobalDataState {
    isPushDisabled: boolean;
    skipOrderDefault: boolean;
    viewedOrderDefault: boolean;
    chooseTickStampIds: any;
    notificationUnRead: number;
    triggerReloadStamp: number;
    listRestaurants: IRestaurants[];
    chooseBranch: any;
}

const initialState: IGlobalDataState = {
    isPushDisabled: false,
    skipOrderDefault: false,
    viewedOrderDefault: false,
    chooseTickStampIds: {},
    notificationUnRead: 0,
    triggerReloadStamp: 0,
    listRestaurants: [],
    chooseBranch: {},
};

const globalDataSlice = createSlice({
    name: 'globalData',
    initialState,
    reducers: {
        updateGlobalData: (state, action: PayloadAction<any>) => {
            state = { ...state, ...action.payload };
            return state;
        },
        updateChooseTickStampIds: (state, action: PayloadAction<any>) => {
            const currentChoose = state.chooseTickStampIds;
            const { billId, id } = action.payload;
            const newIds = cloneDeep(currentChoose);
            newIds[billId] = newIds[billId] === id ? '' : id;
            state = { ...state, chooseTickStampIds: newIds };
            return state;
        },
        clearGlobalData: (state) => {
            return { ...initialState, listRestaurants: state.listRestaurants };
        },
        updateNotificationUnRead: (state, action: PayloadAction<any>) => {
            state = { ...state, notificationUnRead: action.payload };
            return state;
        },
        updateChooseBranch: (state, action: PayloadAction<any>) => {
            state = { ...state, chooseBranch: action.payload };
            return state;
        },
    },
});

const persistConfig = generatePersistConfig('globalData', Object.keys(initialState));

export const {
    updateGlobalData,
    clearGlobalData,
    updateChooseTickStampIds,
    updateNotificationUnRead,
    updateChooseBranch,
} = globalDataSlice.actions;
export default persistReducer<IGlobalDataState>(persistConfig, globalDataSlice.reducer);
