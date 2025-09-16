import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { Heart, Clock, Star, Clock3, Utensils } from 'lucide-react';
import { addToFavorites, removeFromFavorites, selectIsFavorite } from '../features/favorites/favoritesSlice';
import { toast } from 'react-hot-toast';
import { useTheme } from '../hooks/useTheme';

const RecipeCard = ({ recipe, index }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isFavorite = useSelector(state => selectIsFavorite(state, recipe.idMeal));
  const { isDark, text, bg } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const handleFavoriteToggle = (e) => {
    e.stopPropagation();
    if (isFavorite) {
      dispatch(removeFromFavorites(recipe.idMeal));
      toast.success('Removed from favorites');
    } else {
      dispatch(addToFavorites(recipe));
      toast.success('Added to favorites!');
    }
  };

  const handleCardClick = () => {
    navigate(`/recipe/${recipe.idMeal}`);
  };

  // Generate a random number of stars (3-5) for demo purposes
  const rating = Math.floor(Math.random() * 3) + 3;
  const prepTime = Math.floor(Math.random() * 30) + 10; // 10-40 mins

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="h-full"
    >
      <div 
        onClick={handleCardClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`h-full flex flex-col rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer ${
          isDark ? 'bg-gray-800/50 border border-gray-700/50' : 'bg-white border border-gray-100'
        } ${bg('secondary')} ${text('primary')}`}
      >
        <div className="relative pt-[75%] overflow-hidden">
          {/* Image with loading state */}
          <div className="absolute inset-0">
            {!isImageLoaded && (
              <div className={`absolute inset-0 animate-pulse ${
                isDark ? 'bg-gray-700' : 'bg-gray-200'
              }`}></div>
            )}
            <img
              src={recipe.strMealThumb || 'https://via.placeholder.com/400x300?text=No+Image'}
              alt={recipe.strMeal}
              className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ${
                isHovered ? 'scale-110' : 'scale-100'
              }`}
              onLoad={() => setIsImageLoaded(true)}
              loading="lazy"
            />
            
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Recipe info overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
              <div className="flex items-center space-x-2 mb-2">
                <div className="flex items-center text-sm">
                  <Clock3 className="h-4 w-4 mr-1" />
                  <span>{prepTime} min</span>
                </div>
                <div className="flex items-center text-sm">
                  <Utensils className="h-4 w-4 mr-1" />
                  <span>{recipe.strArea || 'Various'}</span>
                </div>
              </div>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-white/30'}`} 
                  />
                ))}
                <span className="ml-2 text-sm">{rating}.0</span>
              </div>
            </div>
            
            {/* Favorite Button */}
            <button
              onClick={handleFavoriteToggle}
              className={`absolute top-3 right-3 p-2 rounded-full shadow-md backdrop-blur-sm transition-all ${
                isFavorite 
                  ? 'bg-red-500 text-white hover:bg-red-600' 
                  : 'bg-white/90 text-gray-600 hover:bg-white hover:text-red-500'
              }`}
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <motion.div
                animate={isFavorite ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
              </motion.div>
            </button>
          </div>
        </div>
        
        <div className="flex-1 p-5 flex flex-col">
          <h3 className={`font-semibold text-lg mb-2 line-clamp-2 leading-tight ${text('primary')}`}>
            {recipe.strMeal}
          </h3>
        
          <div className={`mt-auto pt-4 border-t ${bg('border', 'primary')}`}>
            <div className="flex items-center justify-between">
              <span className={`text-sm font-medium ${text('success')}`}>
                View Recipe
              </span>
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-6 w-6 rounded-full border-2 border-white dark:border-gray-800 bg-gray-200 dark:bg-gray-600"></div>
                ))}
                <div className="h-6 w-6 rounded-full border-2 border-white dark:border-gray-800 bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-xs font-medium">
                  +3
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RecipeCard;