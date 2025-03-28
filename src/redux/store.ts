// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { api } from './api';
import authReducer from './slices/authSlice';
import dashboardReducer from './slices/dashboardSlice';
import performanceReducer from './slices/performanceSlice';
import retentionReducer from './slices/retentionSlice';
import risksReducer from './slices/risksSlice';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
    dashboard: dashboardReducer,
    performance: performanceReducer,
    retention: retentionReducer,
    risks: risksReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;