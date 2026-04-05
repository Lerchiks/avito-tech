import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Item } from '../../types/types';
import api from '../../api/axiosInstance';
import axios from 'axios';


const savedFilters = JSON.parse(localStorage.getItem('ads_filters') || '{}');

const saveFiltersToStorage = (state: AdsState) => {
    localStorage.setItem('ads_filters', JSON.stringify({
        selectedQuery: state.selectedQuery,
        sortColumn: state.sortColumn,
        sortDirection: state.sortDirection,
        selectedCategories: state.selectedCategories,
        needsRevision: state.needsRevision,
		viewMode: state.viewMode,
    }));
};

interface AdsState {
    items: Item[];
    currentItem: Item | null;
    total: number;
    loading: boolean;
	isUpdating: boolean;
    error: string | null;
    selectedQuery: string;
    sortColumn: string;
    sortDirection: 'asc' | 'desc';
    selectedCategories: string[];
    needsRevision: boolean;
	viewMode: 'grid' | 'virtual';
}

const initialState: AdsState = {
    items: [],
    currentItem: null,
    total: 0,
    loading: false,
	isUpdating: false,
    error: null,
    selectedQuery: savedFilters.selectedQuery || '',
    sortColumn: savedFilters.sortColumn || 'createdAt',
    sortDirection: savedFilters.sortDirection || 'desc',
    selectedCategories: savedFilters.selectedCategories || [],
    needsRevision: savedFilters.needsRevision || false,
	viewMode: savedFilters.viewMode || 'grid'
};

export const fetchAdById = createAsyncThunk(
    'ads/fetchAdById',
    async (id: string) => {
        const response = await api.get<Item>(`/items/${id}`);
        return response.data;
    }
);

export const updateAd = createAsyncThunk<
    Partial<Item>,
    { id: number; data: Partial<Item> },
    { rejectValue: string }
>(
    'ads/updateAd',
    async ({ id, data }, { rejectWithValue }) => {
        try {
            await api.put(`/items/${id}`, data);
            return { id, ...data }; 
        } catch (err) {
            if (axios.isAxiosError(err)) {
                return rejectWithValue(err.response?.data?.error || 'Ошибка при обновлении');
            }
            return rejectWithValue('Неизвестная ошибка');
        }
    }
);

export const fetchAds = createAsyncThunk(
    'ads/fetchAds',
    async (params: {
        limit: number; 
        skip: number; 
        sortColumn?: string; 
        sortDirection?: string;
        categories?: string[];
        q?: string;
        needsRevision?: boolean; 
    }) => {
        const { limit, skip, sortColumn, sortDirection, categories, q, needsRevision } = params;

        const response = await api.get<{ items: Item[]; total: number }>('/items', {
            params: {
                limit, 
                skip,
                sortColumn,
                sortDirection,
                categories: categories?.length ? categories.join(',') : undefined,
                q,
                needsRevision: needsRevision || undefined,
            },
        });
        return response.data;
    }
);

const adsSlice = createSlice({
    name: 'ads',
    initialState,
    reducers: {
		setViewMode: (state, action: PayloadAction<'grid' | 'virtual'>) => {
            state.viewMode = action.payload;
            saveFiltersToStorage(state);
        },
        clearCurrentItem: (state) => {
            state.currentItem = null;
        },
        toggleCategory: (state, action: PayloadAction<string>) => {
            const category = action.payload;
            if (state.selectedCategories.includes(category)) {
                state.selectedCategories = state.selectedCategories.filter(c => c !== category);
            } else {
                state.selectedCategories.push(category);
            }
            saveFiltersToStorage(state);
        },
        resetCategory: (state) => {
            state.selectedCategories = [];
            state.needsRevision = false;
            state.selectedQuery = '';
            state.sortColumn = 'createdAt';
            state.sortDirection = 'desc';
            localStorage.removeItem('ads_filters');
        },
        setSort: (state, action: PayloadAction<{ column: string; direction: 'asc' | 'desc' }>) => {
            state.sortColumn = action.payload.column;
            state.sortDirection = action.payload.direction;
            saveFiltersToStorage(state);
        },
        setNeedsRevision: (state, action: PayloadAction<boolean>) => {
            state.needsRevision = action.payload;
            saveFiltersToStorage(state);
        },
        setSelectedQuery: (state, action: PayloadAction<string>) => {
            state.selectedQuery = action.payload;
            saveFiltersToStorage(state);
        },
        setAds: (state, action: PayloadAction<Item[]>) => {
            state.items = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAdById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAdById.fulfilled, (state, action) => {
                state.loading = false;
                state.currentItem = action.payload;
            })
            .addCase(fetchAdById.rejected, (state, action) => {
                state.loading = false;
                state.error = (action.payload as string) || action.error.message || 'Error'; 
            })
            // Обновление объявления
            .addCase(updateAd.pending, (state) => {
                state.isUpdating = true;
                state.error = null;
            })
            .addCase(updateAd.fulfilled, (state, action) => {
				state.isUpdating = false;

				if (state.currentItem && state.currentItem.id === action.payload.id) {
					state.currentItem = { ...state.currentItem, ...action.payload } as Item;
				}
				
				const index = state.items.findIndex(i => i.id === action.payload.id);
				if (index !== -1) {
					state.items[index] = { ...state.items[index], ...action.payload } as Item;
				}
			})
            .addCase(updateAd.rejected, (state, action) => {
                state.isUpdating = false;
                state.error = action.payload || 'Ошибка при обновлении';
            })
            // Загрузка всех
            .addCase(fetchAds.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAds.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.items;
                state.total = action.payload.total;
            })
            .addCase(fetchAds.rejected, (state, action) => {
                state.loading = false;
                state.error = (action.payload as string) || action.error.message || 'ошибка';
            });
    }
});

export const { 
    setAds, setSort, toggleCategory, resetCategory, 
    setNeedsRevision, setSelectedQuery, clearCurrentItem,
	setViewMode,
} = adsSlice.actions;
export default adsSlice.reducer;