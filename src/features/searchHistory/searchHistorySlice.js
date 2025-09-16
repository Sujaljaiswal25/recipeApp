import { createSlice } from '@reduxjs/toolkit';

const searchHistorySlice = createSlice({
  name: 'searchHistory',
  initialState: {
    searches: [],
  },
  reducers: {
    addSearch: (state, action) => {
      const searchTerm = action.payload.trim().toLowerCase();
      // Remove if already exists
      state.searches = state.searches.filter(search => search !== searchTerm);
      // Add to beginning
      state.searches.unshift(searchTerm);
      // Keep only last 5
      state.searches = state.searches.slice(0, 5);
    },
    clearSearchHistory: (state) => {
      state.searches = [];
    },
  },
});

export const { addSearch, clearSearchHistory } = searchHistorySlice.actions;
export const selectSearchHistory = (state) => state.searchHistory.searches;
export default searchHistorySlice.reducer;