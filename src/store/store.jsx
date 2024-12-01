import { configureStore } from '@reduxjs/toolkit';
import authReducer from './AuthSlice';
import urlReducer from './UrlSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    urls: urlReducer,
  },
});
