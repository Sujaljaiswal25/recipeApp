import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { searchRecipesByIngredient, getRecipeDetails } from '../../services/api.service';

// Async thunks
export const fetchRecipesByIngredient = createAsyncThunk(
  'recipes/fetchByIngredient',
  async (ingredient, { rejectWithValue }) => {
    try {
      const response = await searchRecipesByIngredient(ingredient);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch recipes');
    }
  }
);

export const fetchRecipeDetails = createAsyncThunk(
  'recipes/fetchDetails',
  async (id, { rejectWithValue }) => {
    try {
      const response = await getRecipeDetails(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch recipe details');
    }
  }
);

const recipesSlice = createSlice({
  name: 'recipes',
  initialState: {
    searchResults: [],
    currentRecipe: null,
    loading: false,
    detailsLoading: false,
    error: null,
    searchTerm: '',
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
      state.searchTerm = '';
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch recipes by ingredient
      .addCase(fetchRecipesByIngredient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecipesByIngredient.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload.meals || [];
      })
      .addCase(fetchRecipesByIngredient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.searchResults = [];
      })
      // Fetch recipe details
      .addCase(fetchRecipeDetails.pending, (state) => {
        state.detailsLoading = true;
        state.error = null;
      })
      .addCase(fetchRecipeDetails.fulfilled, (state, action) => {
        state.detailsLoading = false;
        state.currentRecipe = action.payload.meals?.[0] || null;
      })
      .addCase(fetchRecipeDetails.rejected, (state, action) => {
        state.detailsLoading = false;
        state.error = action.payload;
        state.currentRecipe = null;
      });
  },
});

export const { clearError, clearSearchResults, setSearchTerm } = recipesSlice.actions;
export default recipesSlice.reducer;