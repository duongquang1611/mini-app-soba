import { createSlice, PayloadAction, CaseReducer, Action, AnyAction } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import { generatePersistConfig } from 'utilities/helper';
import { CommonStatus } from './types';

interface IResourceState {
    status: CommonStatus;
    error?: any;
    data?: any;
}

type Reducer<A extends Action<any> = AnyAction> = CaseReducer<IResourceState, A>;

const initialState: IResourceState = {
    status: CommonStatus.IDLE,
};

const getResourceRequest: Reducer = (state) => {
    state.status = CommonStatus.LOADING;
    delete state.data;
    delete state.error;
};

const getResourceSuccess: Reducer<PayloadAction<any>> = (state, { payload }) => {
    state.status = CommonStatus.SUCCESS;
    state.data = payload;
};

const getResourceFailed: Reducer<PayloadAction<any>> = (state, { payload }) => {
    state.status = CommonStatus.ERROR;
    state.error = payload;
};

const resourceSlice = createSlice({
    name: 'resource',
    initialState,
    reducers: {
        getResourceRequest,
        getResourceSuccess,
        getResourceFailed,
    },
});

const persistConfig = generatePersistConfig('resource', ['data']);

export const resourceActions = resourceSlice.actions;
export default persistReducer<IResourceState>(persistConfig, resourceSlice.reducer);
