import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from '../hooks/useTheme';
import { motion, AnimatePresence } from 'framer-motion';
import SearchBar from '../components/SearchBar';
import RecipeCard from '../components/RecipeCard';
import LoadingSkeleton from '../components/LoadingSkeleton';
import ErrorState from '../components/ErrorState';
import { ChefHat, Search, Clock, Heart, Star, Award } from 'lucide-react';
import { fetchRecipesByIngredient } from '../features/recipes/recipesSlice';

const Home = () => {
  const dispatch = useDispatch();
  const { searchResults, loading, error, searchTerm } = useSelector(state => state.recipes);
  const { isDark, text, bg } = useTheme();

  const handleRetry = () => {
    if (searchTerm) {
      dispatch(fetchRecipesByIngredient(searchTerm));
    }
  };

  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-20 blur-3xl ${
          isDark ? 'bg-emerald-500' : 'bg-emerald-300'
        }`}></div>
        <div className={`absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-20 blur-3xl ${
          isDark ? 'bg-teal-500' : 'bg-teal-300'
        }`}></div>
      </div>

      {/* Hero Section */}
      <div className="relative">
        <div className={`relative overflow-hidden transition-colors duration-300 ${bg('primary')} border-b ${bg('border', 'primary')}`}>
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={isMounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center max-w-4xl mx-auto"
            >
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={isMounted ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 ${
                  isDark ? 'bg-emerald-900/30 text-emerald-400' : 'bg-emerald-100 text-emerald-600'
                }`}
              >
                <ChefHat className="h-10 w-10" />
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 10 }}
                animate={isMounted ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className={`text-4xl md:text-6xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r ${
                  isDark 
                    ? 'from-emerald-400 to-teal-400' 
                    : 'from-emerald-600 to-teal-600'
                }`}
              >
                Discover Amazing Recipes
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={isMounted ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className={`text-xl max-w-2xl mx-auto ${text('secondary')}`}
              >
                Search by ingredients, dietary needs, or cuisine type. Find perfect recipes for any occasion.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={isMounted ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-10 max-w-2xl mx-auto"
              >
                <SearchBar />
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={isMounted ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mt-8 flex flex-wrap justify-center gap-6"
              >
                {['Quick Meals', 'Healthy', 'Desserts', 'Vegetarian', 'Vegan', 'Low Carb'].map((tag, i) => (
                  <span 
                    key={tag}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      isDark 
                        ? 'bg-gray-800 text-gray-200 hover:bg-gray-700' 
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>
            </motion.div>
          </div>
          
          <div className={`absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t ${bg('primary')}`}></div>
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <ErrorState 
            error={error} 
            onRetry={handleRetry}
            className="mb-6"
          />
        )}

        {searchTerm && (
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Recipes with "{searchTerm}"
            </h2>
            <p className={`${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {searchResults.length} recipe{searchResults.length !== 1 ? 's' : ''} found
            </p>
          </div>
        )}

        {loading && (
          <LoadingSkeleton />
        )}

        {!loading && searchResults.length === 0 && searchTerm && !error && (
          <div className="text-center py-12">
            <Search className={`h-16 w-16 mx-auto mb-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
            <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>No recipes found</h3>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Try searching with a different ingredient like "chicken", "beef", or "pasta"
            </p>
          </div>
        )}

        {!loading && searchResults.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {searchResults.map((recipe) => (
              <RecipeCard key={recipe.idMeal} recipe={recipe} />
            ))}
          </div>
        )}

        {!searchTerm && (
          <div className="text-center py-12">
            <ChefHat className={`h-20 w-20 mx-auto mb-6 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
            <h3 className={`text-2xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Ready to cook?</h3>
            <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Search for recipes using ingredients you have at home
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;