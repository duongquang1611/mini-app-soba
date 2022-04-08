import { configureStore } from '@reduxjs/toolkit';
import { persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/rootSaga';

import resourceReducer from './slices/resourceSlice';
import userInfoReducer from './slices/userInfoSlice';
import languageReducer from './slices/languageSlice';
import globalDataReducer from './slices/globalDataSlice';
import orderReducer from './slices/orderSlice';
import couponReducer from './slices/couponSlice';

const rootReducer = {
    resource: resourceReducer,
    userInfo: userInfoReducer,
    globalData: globalDataReducer,
    languageKey: languageReducer,
    order: orderReducer,
    coupon: couponReducer,
};

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        })
            .concat(logger)
            .prepend(sagaMiddleware),
    devTools: __DEV__,
});

sagaMiddleware.run(rootSaga);

const persistor = persistStore(store);

export { store, persistor };
