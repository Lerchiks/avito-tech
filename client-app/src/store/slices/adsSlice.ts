import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Item } from '../../types/types';

interface AdsState {
	items: Item[];
	loading: boolean;
}

const initialState: AdsState = {
	items: [],
	loading: false,
};

const adsSlice = createSlice({
	name: 'ads',
	initialState,
	reducers: {
		// Action: установить список объявлений
		setAds: (state, action: PayloadAction<Item[]>) => {
		state.items = action.payload;
		},
		// Action: добавить одно объявление
		addAd: (state, action: PayloadAction<Item>) => {
		state.items.push(action.payload); // В RTK так можно!
		},
	},
});

export const { setAds, addAd } = adsSlice.actions;
export default adsSlice.reducer;