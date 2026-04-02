import { configureStore } from '@reduxjs/toolkit';
import adsReducer from './slices/adsSlice';

export const store = configureStore({
	reducer: {
		ads: adsReducer,
		// здесь будут другие слайсы, например auth: authReducer
	},
});

// Типы для хуков (чтобы TS знал, что лежит в сторе)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;