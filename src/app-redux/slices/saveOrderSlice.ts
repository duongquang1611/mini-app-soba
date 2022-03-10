import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import { generatePersistConfig } from 'utilities/helper';

interface ISaveOrderState {
    orderDefault: any;
    cart: any;
    saveOrder: any;
}

const initialState: ISaveOrderState = {
    orderDefault: {},
    cart: {},
    saveOrder: {},
};

const saveOrderSlice = createSlice({
    name: 'init',
    initialState,
    reducers: {
        updateSaveOrder: (state, action: PayloadAction<any>) => {
            state = { ...state, saveOrder: action.payload };
            return state;
        },
        clearSaveOrder: (state) => {
            state = { ...state, saveOrder: {} };
            return state;
        },
    },
});

const persistConfig = generatePersistConfig('globalData', ['isPushDisabled']);

export const { updateSaveOrder, clearSaveOrder } = saveOrderSlice.actions;
export default persistReducer<ISaveOrderState>(persistConfig, saveOrderSlice.reducer);
