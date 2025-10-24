import { userReducer } from './Feature/UserSlice';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { reportReducer } from './Feature/reportSlice';
import { vitalReducer } from './Feature/VitalSlice';


const rootReducer = combineReducers({
  user: userReducer,
  report: reportReducer,
  vital: vitalReducer
  // add other reducers here if needed
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['menu', 'user', 'report', "vital"], // ✅ only persist 'menu' slice
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
