import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    items: [],
  },
  reducers: {
    addToFavorites: (state, action) => {
      const recipe = action.payload;
      const exists = state.items.find(item => item.idMeal === recipe.idMeal);
      if (!exists) {
        state.items.push(recipe);
      }
    },
    removeFromFavorites: (state, action) => {
      const recipeId = action.payload;
      state.items = state.items.filter(item => item.idMeal !== recipeId);
    },
    clearFavorites: (state) => {
      state.items = [];
    },
  },
});

export const { addToFavorites, removeFromFavorites, clearFavorites } = favoritesSlice.actions;

// Selectors
export const selectFavorites = (state) => state.favorites.items;
export const selectIsFavorite = (state, recipeId) => 
  state.favorites.items.some(item => item.idMeal === recipeId);

export default favoritesSlice.reducer;