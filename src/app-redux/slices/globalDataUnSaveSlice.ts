import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import { generatePersistConfig } from 'utilities/helper';

interface IGlobalDataUnSaveState {
    withoutAccount: boolean;
}

const initialState: IGlobalDataUnSaveState = {
    withoutAccount: false,
};

const globalDataUnSaveSlice = createSlice({
    name: 'globalDataUnSave',
    initialState,
    reducers: {
        updateGlobalDataUnSave: (state, action: PayloadAction<any>) => {
            state = { ...state, ...action.payload };
            return state;
        },
        clearGlobalDataUnSave: () => {
            return initialState;
        },
    },
});

const persistConfig = generatePersistConfig('globalDataUnSave', []);

export const { updateGlobalDataUnSave, clearGlobalDataUnSave } = globalDataUnSaveSlice.actions;
export default persistReducer<IGlobalDataUnSaveState>(persistConfig, globalDataUnSaveSlice.reducer);
