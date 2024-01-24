import { configureStore } from "@reduxjs/toolkit";
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist';
  import storage from 'redux-persist/lib/storage';
  import { combineReducers } from 'redux';
  import userReducer from './userSlice';
  import postReducer from './postSlice';
  import commentsReducer from './commentsSlice';

  const allReducers = combineReducers({
    user: userReducer ,
    posts: postReducer,
    comments: commentsReducer
  });

  const persitConfig = {key:"root",storage, version:1};
  const persistedReducer = persistReducer(persitConfig,allReducers);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
});

export type RootState = ReturnType<typeof store.getState>;   