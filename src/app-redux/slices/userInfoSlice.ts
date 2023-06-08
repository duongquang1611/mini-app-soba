import { Action, AnyAction, CaseReducer, PayloadAction, createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import { generatePersistConfig } from 'utilities/helper';
import { CommonStatus } from './types';

interface IMember {
    id?: number;
    email?: string;
    fullName?: string;
    gender?: number;
    birthday?: string;
    canUpdateBirthday?: number;
    avatar?: number;
    levelRank?: any;
    money?: number;
    isPaid?: number;
    frequentlyUsedRestaurantId?: number;
    /* eslint-disable camelcase */
    avatar_50?: string;
    avatar_150?: string;
}
interface IUser {
    id: number;
    username: string;
    member?: IMember;
    moneyToNextRank?: number;
    nextRank?: string;
    // ...
}

interface IUserInfoState {
    token?: string;
    refreshToken?: string;
    user?: IUser;
    status: CommonStatus;
    error?: any;
}

type Reducer<A extends Action<any> = AnyAction> = CaseReducer<IUserInfoState, A>;

const initialState: IUserInfoState = {
    status: CommonStatus.IDLE,
};

const getUserInfoRequest: Reducer<PayloadAction<string>> = (state) => {
    state.status = CommonStatus.LOADING;
    delete state.error;
};

const getUserInfoSuccess: Reducer<PayloadAction<IUser>> = (state, { payload }) => {
    state.status = CommonStatus.SUCCESS;
    state.user = payload;
};

const getUserInfoFailed: Reducer<PayloadAction<any>> = (state, { payload }) => {
    state.status = CommonStatus.ERROR;
    state.error = payload;
};

const updateToken: Reducer<PayloadAction<Pick<IUserInfoState, 'token' | 'refreshToken'>>> = (state, { payload }) => {
    state = { ...state, token: payload.token, refreshToken: payload.refreshToken };
    return state;
};

const logOut: Reducer = () => {
    return initialState;
};

const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {
        getUserInfoRequest,
        getUserInfoSuccess,
        getUserInfoFailed,
        updateToken,
        logOut,
    },
});

const persistConfig = generatePersistConfig('userInfo', ['token', 'refreshToken', 'user']);

export const userInfoActions = userInfoSlice.actions;
export default persistReducer<IUserInfoState>(persistConfig, userInfoSlice.reducer);
