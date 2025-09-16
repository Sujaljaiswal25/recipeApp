import axios from 'axios';

const API_BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const searchRecipesByIngredient = (ingredient) => {
  return api.get(`/filter.php?i=${encodeURIComponent(ingredient)}`);
};

export const getRecipeDetails = (id) => {
  return api.get(`/lookup.php?i=${id}`);
};

export default api;