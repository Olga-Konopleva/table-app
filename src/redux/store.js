import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';

import myReducer from './reducers';

const persistConfig = {
  key: 'table',
  storage,
  stateReconciler: hardSet,
  whitelist: ['table', 'floorAmounts'],
};

const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
];

const store = configureStore({
  reducer: persistReducer(persistConfig, myReducer),
  middleware,
  devTools: process.env.NODE_ENV === "development",
})

const persistor = persistStore(store);

const persistedStore = { store, persistor };

export default persistedStore;
