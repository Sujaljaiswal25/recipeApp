import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit';
import recipesReducer from '../features/recipes/recipesSlice';
import favoritesReducer from '../features/favorites/favoritesSlice';
import themeReducer from '../features/theme/themeSlice';
import searchHistoryReducer from '../features/searchHistory/searchHistorySlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['favorites', 'theme', 'searchHistory'] // Persist favorites, theme, and search history
};

const rootReducer = combineReducers({
  recipes: recipesReducer,
  favorites: favoritesReducer,
  theme: themeReducer,
  searchHistory: searchHistoryReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export const persistor = persistStore(store);