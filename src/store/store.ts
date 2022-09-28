import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import materialMatrixReducer from "./slices/material-matrix.slice";

const createNoopStorage = () => {
  return {
    getItem(_key: any) {
      return Promise.resolve(null);
    },
    setItem(_key: any, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: any) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

// import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import appConfigReducer from "./slices/app-config.slice";

const rootReducer = combineReducers({
  appConfig: appConfigReducer,
  materialMatrix: materialMatrixReducer,
});

// react-persist configs
const persistConfig = {
  key: "root",
  storage,
};

// react-persist configs
const persistedReducer = persistReducer(persistConfig, rootReducer);

export function makeStore() {
  return configureStore({
    reducer: persistedReducer,
    // reducer: rootReducer,
    devTools: true,
    middleware: (
      getDefaultMiddleware // react-persist and redux-toolkit configs
    ) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

// react-persist configs
export const persistor = persistStore(store);

export default store;
