import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { cloneDeep } from 'lodash';
import { persistReducer } from 'redux-persist';
import { generatePersistConfig } from 'utilities/helper';

interface IGlobalDataState {
    isPushDisabled: boolean;
    skipOrderDefault: boolean;
    viewedOrderDefault: boolean;
    chooseTickStampIds: any;
}

const initialState: IGlobalDataState = {
    isPushDisabled: false,
    skipOrderDefault: false,
    viewedOrderDefault: false,
    chooseTickStampIds: {},
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
        clearGlobalData: () => {
            return initialState;
        },
    },
});

const persistConfig = generatePersistConfig('globalData', Object.keys(initialState));

export const { updateGlobalData, clearGlobalData, updateChooseTickStampIds } = globalDataSlice.actions;
export default persistReducer<IGlobalDataState>(persistConfig, globalDataSlice.reducer);
