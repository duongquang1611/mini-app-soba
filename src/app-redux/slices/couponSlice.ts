import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import { generatePersistConfig } from 'utilities/helper';

interface ICouponState {
    couponsCanUse: any[];
    couponsUsed: any[];
    test: boolean;
}

const initialState: ICouponState = {
    couponsCanUse: [],
    couponsUsed: [],
    test: false,
};

const couponSlice = createSlice({
    name: 'coupon',
    initialState,
    reducers: {
        updateCoupon: (state, action: PayloadAction<any>) => {
            state = { ...state, ...action.payload };
            return state;
        },
        clearCoupon: () => {
            return initialState;
        },
    },
});

const persistConfig = generatePersistConfig('coupon', Object.keys(initialState));

export const { updateCoupon, clearCoupon } = couponSlice.actions;
export default persistReducer<ICouponState>(persistConfig, couponSlice.reducer);
