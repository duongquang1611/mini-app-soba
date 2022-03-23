import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import { generatePersistConfig } from 'utilities/helper';

interface IOrderState {
    orderDefault: any;
    cartOrder: any;
    saveOrder: any;
}

const initialState: IOrderState = {
    orderDefault: {},
    cartOrder: { dishes: [], coupon: [] },
    saveOrder: { dishes: [], coupon: [] },
};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        updateSaveOrder: (state, action: PayloadAction<any>) => {
            state = { ...state, saveOrder: action.payload };
            return state;
        },
        updateCartOrder: (state, action: PayloadAction<any>) => {
            state = { ...state, cartOrder: action.payload };
            return state;
        },
        clearCartOrder: (state) => {
            state = { ...state, cartOrder: {} };
            return state;
        },
        clearSaveOrder: (state) => {
            state = { ...state, saveOrder: {} };
            return state;
        },
    },
});

const persistConfig = generatePersistConfig('order', ['saveOrder']);

export const { updateSaveOrder, clearSaveOrder, updateCartOrder } = orderSlice.actions;
export default persistReducer<IOrderState>(persistConfig, orderSlice.reducer);
