import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import tasksReducer from './slices/tasksSlice';
import productsReducer from './slices/productsSlice';
import authReducer from './slices/authSlice';

// Create the root state type from the store itself instead of importing it
export type RootState = ReturnType<typeof store.getState>;

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    products: productsReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['auth/login/fulfilled', 'auth/logout/fulfilled'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        // Ignore these paths in the state
        ignoredPaths: ['auth.user'],
      },
    }),
});

// Infer the `AppDispatch` type from the store itself
export type AppDispatch = typeof store.dispatch;

// Export pre-typed hooks
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; 