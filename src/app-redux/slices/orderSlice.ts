import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import { generatePersistConfig } from 'utilities/helper';

interface IOrderState {
    orderDefault: any;
    cart: any;
    saveOrder: any;
}

const initialState: IOrderState = {
    orderDefault: {},
    cart: {},
    saveOrder: {},
};

const orderSlice = createSlice({
    name: 'order',
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

const persistConfig = generatePersistConfig('order', ['saveOrder']);

export const { updateSaveOrder, clearSaveOrder } = orderSlice.actions;
export default persistReducer<IOrderState>(persistConfig, orderSlice.reducer);
