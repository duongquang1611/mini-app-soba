import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import { generatePersistConfig } from 'utilities/helper';

interface IOrderState {
    orderDefault: any;
    cartOrder: any;
    mobileOrder: any;
}

const initialState: IOrderState = {
    orderDefault: {},
    cartOrder: { dishes: [], coupons: [] },
    mobileOrder: { dishes: [], coupons: [] },
};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        updateMobileOrder: (state, action: PayloadAction<any>) => {
            state = { ...state, mobileOrder: action.payload };
            return state;
        },
        updateCartOrder: (state, action: PayloadAction<any>) => {
            state = { ...state, cartOrder: action.payload };
            return state;
        },
        updateCouponMobileOrder: (state, action: PayloadAction<any>) => {
            const oldCoupons = state.mobileOrder?.coupons || [];
            state = {
                ...state,
                mobileOrder: {
                    ...state.mobileOrder,
                    coupons: [...oldCoupons, ...action.payload],
                },
            };
            return state;
        },
        updateCouponCartOrder: (state, action: PayloadAction<any>) => {
            const oldCoupons = state.cartOrder?.coupons || [];
            state = {
                ...state,
                cartOrder: {
                    ...state.cartOrder,
                    coupons: [...oldCoupons, ...action.payload],
                },
            };
            return state;
        },
        clearMobileOrder: (state) => {
            state = { ...state, mobileOrder: {} };
            return state;
        },
        clearCartOrder: (state) => {
            state = { ...state, cartOrder: {} };
            return state;
        },
    },
});

const persistConfig = generatePersistConfig('order', ['cartOrder', 'mobileOrder']);

export const {
    updateMobileOrder,
    clearMobileOrder,
    updateCartOrder,
    updateCouponMobileOrder,
    updateCouponCartOrder,
    clearCartOrder,
} = orderSlice.actions;

export default persistReducer<IOrderState>(persistConfig, orderSlice.reducer);
