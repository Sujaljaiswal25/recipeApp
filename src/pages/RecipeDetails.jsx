import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ArrowLeft, Heart, ExternalLink, Clock, Users } from 'lucide-react';
import { fetchRecipeDetails } from '../features/recipes/recipesSlice';
import { addToFavorites, removeFromFavorites, selectIsFavorite } from '../features/favorites/favoritesSlice';

const RecipeDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentRecipe, detailsLoading, error } = useSelector(state => state.recipes);
  const isFavorite = useSelector(state => selectIsFavorite(state, id));
  const isDark = useSelector(state => state.theme.isDark);

  useEffect(() => {
    if (id) {
      dispatch(fetchRecipeDetails(id));
    }
  }, [dispatch, id]);

  const handleFavoriteToggle = () => {
    if (currentRecipe) {
      if (isFavorite) {
        dispatch(removeFromFavorites(currentRecipe.idMeal));
      } else {
        dispatch(addToFavorites(currentRecipe));
      }
    }
  };

  const getIngredients = (recipe) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        ingredients.push({
          ingredient: ingredient.trim(),
          measure: measure ? measure.trim() : ''
        });
      }
    }
    return ingredients;
  };

  if (detailsLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        isDark ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        isDark ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <div className="text-center">
          <p className="text-red-600 text-xl mb-4">{error}</p>
          <Link to="/" className="text-emerald-600 hover:text-emerald-700">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  if (!currentRecipe) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        isDark ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <div className="text-center">
          <p className={`text-xl mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Recipe not found</p>
          <Link to="/" className="text-emerald-600 hover:text-emerald-700">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const ingredients = getIngredients(currentRecipe);

  return (
    <div className={`min-h-screen ${
      isDark ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      {/* Header */}
      <div className={`shadow-sm ${
        isDark ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link 
            to="/" 
            className={`inline-flex items-center transition-colors ${
              isDark ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-600 hover:text-emerald-700'
            }`}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Recipes
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className={`rounded-xl shadow-lg overflow-hidden ${
          isDark ? 'bg-gray-800' : 'bg-white'
        }`}>
          {/* Recipe Image and Title */}
          <div className="relative">
            <img
              src={currentRecipe.strMealThumb}
              alt={currentRecipe.strMeal}
              className="w-full h-64 md:h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <h1 className="text-2xl md:text-4xl font-bold text-white mb-2">
                {currentRecipe.strMeal}
              </h1>
              <div className="flex items-center space-x-4">
                {currentRecipe.strArea && (
                  <span className="bg-emerald-600 text-white px-3 py-1 rounded-full text-sm">
                    {currentRecipe.strArea}
                  </span>
                )}
                {currentRecipe.strCategory && (
                  <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm">
                    {currentRecipe.strCategory}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="p-6">
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mb-6">
              <button
                onClick={handleFavoriteToggle}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  isFavorite
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : 'bg-gray-200 text-gray-700 hover:bg-red-50 hover:text-red-500'
                }`}
              >
                <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
                <span>{isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}</span>
              </button>

              {currentRecipe.strYoutube && (
                <a
                  href={currentRecipe.strYoutube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>Watch on YouTube</span>
                </a>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Ingredients */}
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Users className="h-5 w-5 mr-2 text-emerald-600" />
                  Ingredients
                </h2>
                <div className="space-y-2">
                  {ingredients.map((item, index) => (
                    <div key={index} className={`flex justify-between items-center p-3 rounded-lg ${
                      isDark ? 'bg-gray-700' : 'bg-gray-50'
                    }`}>
                      <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.ingredient}</span>
                      <span className="text-emerald-600 font-medium">{item.measure}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Instructions */}
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-emerald-600" />
                  Instructions
                </h2>
                <div className="prose prose-gray max-w-none">
                  {currentRecipe.strInstructions.split('\r\n').map((step, index) => {
                    const trimmedStep = step.trim();
                    if (!trimmedStep) return null;
                    
                    return (
                      <div key={index} className={`mb-4 p-4 rounded-lg ${
                        isDark ? 'bg-gray-700' : 'bg-gray-50'
                      }`}>
                        <p className={`leading-relaxed ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{trimmedStep}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Additional Info */}
            {currentRecipe.strSource && (
              <div className={`mt-8 pt-6 border-t ${
                isDark ? 'border-gray-700' : 'border-gray-200'
              }`}>
                <a
                  href={currentRecipe.strSource}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center transition-colors ${
                    isDark ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-600 hover:text-emerald-700'
                  }`}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Original Source
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;