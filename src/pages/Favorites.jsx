import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ChefHat } from 'lucide-react';
import RecipeCard from '../components/RecipeCard';
import { clearFavorites } from '../features/favorites/favoritesSlice';

const Favorites = () => {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites.items);
  const isDark = useSelector(state => state.theme.isDark);

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to remove all favorites?')) {
      dispatch(clearFavorites());
    }
  };

  return (
    <div className={`min-h-screen transition-colors ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 to-gray-800' 
        : 'bg-gradient-to-br from-emerald-50 to-teal-50'
    } pt-16`}>
      {/* Header */}
      <div className={`shadow-sm ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-3xl md:text-4xl font-bold mb-2 flex items-center ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                <Heart className="h-8 w-8 text-red-500 mr-3 fill-current" />
                My Favorites
              </h1>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {favorites.length} saved recipe{favorites.length !== 1 ? 's' : ''}
              </p>
            </div>
            
            {favorites.length > 0 && (
              <button
                onClick={handleClearAll}
                className={`flex items-center space-x-2 px-4 py-2 text-red-600 hover:text-red-700 rounded-lg transition-colors ${
                  isDark ? 'hover:bg-red-900/20' : 'hover:bg-red-50'
                }`}
              >
                <Trash2 className="h-4 w-4" />
                <span>Clear All</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {favorites.length === 0 ? (
          <div className="text-center py-16">
            <ChefHat className={`h-20 w-20 mx-auto mb-6 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
            <h3 className={`text-2xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>No favorites yet</h3>
            <p className={`text-lg mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Start exploring recipes and save your favorites to see them here
            </p>
            <Link
              to="/"
              className="inline-flex items-center bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors font-medium"
            >
              Discover Recipes
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favorites.map((recipe) => (
              <RecipeCard key={recipe.idMeal} recipe={recipe} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;