import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import { generatePersistConfig } from 'utilities/helper';

interface IOrderState {
    defaultOrder: any;
    cartOrder: any;
    mobileOrder: any;
}

const initialState: IOrderState = {
    defaultOrder: { dishes: [], coupons: [] },
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
        updateDefaultOrder: (state, action: PayloadAction<any>) => {
            state = { ...state, defaultOrder: action.payload };
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
        clearDefaultOrder: (state) => {
            state = { ...state, defaultOrder: {} };
            return state;
        },
        clearOrder: () => {
            return initialState;
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
    updateDefaultOrder,
    clearDefaultOrder,
    clearOrder,
} = orderSlice.actions;

export default persistReducer<IOrderState>(persistConfig, orderSlice.reducer);
