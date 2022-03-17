import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import { generatePersistConfig } from 'utilities/helper';

interface IGlobalDataState {
    isPushDisabled: boolean;
    skipOrderDefault: boolean;
    viewedOrderDefault: boolean;
}

const initialState: IGlobalDataState = {
    isPushDisabled: false,
    skipOrderDefault: false,
    viewedOrderDefault: false,
};

const globalDataSlice = createSlice({
    name: 'globalData',
    initialState,
    reducers: {
        updateGlobalData: (state, action: PayloadAction<any>) => {
            state = { ...state, ...action.payload };
            return state;
        },
        clearGlobalData: () => {
            return initialState;
        },
    },
});

const persistConfig = generatePersistConfig('globalData', ['isPushDisabled', 'viewedOrderDefault', 'skipOrderDefault']);

export const { updateGlobalData, clearGlobalData } = globalDataSlice.actions;
export default persistReducer<IGlobalDataState>(persistConfig, globalDataSlice.reducer);
