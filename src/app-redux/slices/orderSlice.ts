import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import { generatePersistConfig } from 'utilities/helper';

interface IOrderState {
    defaultOrder: any;
    cartOrder: any;
    mobileOrder: any;
    defaultOrderLocal: any;
}

const initialState: IOrderState = {
    defaultOrder: { dishes: [], coupons: [] },
    cartOrder: { dishes: [], coupons: [] },
    mobileOrder: { dishes: [], coupons: [] },
    defaultOrderLocal: { dishes: [], coupons: [] },
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
        updateDishesAllOrder: (state, action: PayloadAction<any>) => {
            state = {
                ...state,
                defaultOrder: { ...state.defaultOrder, dishes: action.payload?.defaultOrder || [] },
                cartOrder: { ...state.cartOrder, dishes: action.payload?.cartOrder || [] },
                mobileOrder: { ...state.mobileOrder, dishes: action.payload?.mobileOrder || [] },
                defaultOrderLocal: { ...state.defaultOrderLocal, dishes: action.payload?.defaultOrderLocal || [] },
            };
            return state;
        },
        updateAllOrder: (state, action: PayloadAction<any>) => {
            state = {
                ...state,
                ...action.payload,
            };
            return state;
        },
        updateDishesCartOrder: (state, action: PayloadAction<any>) => {
            state = {
                ...state,
                cartOrder: {
                    ...state.cartOrder,
                    dishes: action.payload,
                },
            };
            return state;
        },
        updateDefaultOrderLocal: (state) => {
            // state = { ...state, defaultOrderLocal: action.payload };
            return state;
        },
        updateCouponMobileOrder: (state, action: PayloadAction<any>) => {
            const oldCoupons = state.mobileOrder?.coupons || [];
            state = {
                ...state,
                mobileOrder: {
                    ...state.mobileOrder,
                    coupons: [...action.payload, ...oldCoupons],
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
                    coupons: [...action.payload, ...oldCoupons],
                },
            };
            return state;
        },
        updateCouponDefaultOrder: (state, action: PayloadAction<any>) => {
            state = {
                ...state,
                defaultOrder: {
                    ...state.defaultOrder,
                    coupons: action.payload,
                },
            };
            return state;
        },

        updateCouponDefaultOrderLocal: (state, action: PayloadAction<any>) => {
            state = {
                ...state,
                defaultOrderLocal: {
                    ...state.defaultOrderLocal,
                    coupons: action.payload,
                },
            };
            return state;
        },
        clearMobileOrder: (state) => {
            state = { ...state, mobileOrder: initialState.mobileOrder };
            return state;
        },
        clearCartOrder: (state) => {
            state = { ...state, cartOrder: initialState.cartOrder };
            return state;
        },
        clearDefaultOrder: (state) => {
            state = { ...state, defaultOrder: initialState.defaultOrder };
            return state;
        },
        clearDefaultOrderLocal: (state) => {
            state = { ...state, defaultOrderLocal: initialState.defaultOrderLocal };
            return state;
        },
        clearOrder: () => {
            return initialState;
        },
    },
});

const persistConfig = generatePersistConfig('order', ['cartOrder', 'mobileOrder', 'defaultOrder', 'defaultOrderLocal']);

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
    updateDishesCartOrder,
    clearDefaultOrderLocal,
    updateDefaultOrderLocal,
    updateDishesAllOrder,
    updateAllOrder,
    updateCouponDefaultOrder,
    updateCouponDefaultOrderLocal,
} = orderSlice.actions;

export default persistReducer<IOrderState>(persistConfig, orderSlice.reducer);
