import { PayloadAction } from '@reduxjs/toolkit';
import { getProfile } from 'api/modules/api-app/authenticate';
import { userInfoActions } from 'app-redux/slices/userInfoSlice';
import { AxiosResponse } from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import { pushTagMember } from 'utilities/notification';

function* handleGetUserInfoRequest({ payload }: PayloadAction<string>) {
    try {
        const response: AxiosResponse<any> = yield call(getProfile, payload);
        pushTagMember(response?.data?.member?.id as number);

        yield put(userInfoActions.getUserInfoSuccess(response.data));
    } catch (error) {
        yield put(userInfoActions.getUserInfoFailed(error));
    }
}

export default function* userInfoSaga() {
    yield takeLatest(userInfoActions.getUserInfoRequest.type, handleGetUserInfoRequest);
}
