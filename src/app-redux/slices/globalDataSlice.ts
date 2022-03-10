import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import { generatePersistConfig } from 'utilities/helper';

interface IGlobalDataState {
    isPushDisabled: boolean;
}

const initialState: IGlobalDataState = {
    isPushDisabled: false,
};

const globalDataSlice = createSlice({
    name: 'init',
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

const persistConfig = generatePersistConfig('globalData', ['isPushDisabled']);

export const { updateGlobalData, clearGlobalData } = globalDataSlice.actions;
export default persistReducer<IGlobalDataState>(persistConfig, globalDataSlice.reducer);
