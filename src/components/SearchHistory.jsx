import { useSelector, useDispatch } from 'react-redux';
import { Clock, X } from 'lucide-react';
import { selectSearchHistory, clearSearchHistory } from '../features/searchHistory/searchHistorySlice';
import { fetchRecipesByIngredient, setSearchTerm } from '../features/recipes/recipesSlice';

const SearchHistory = ({ onSearchSelect, isVisible }) => {
  const dispatch = useDispatch();
  const searchHistory = useSelector(selectSearchHistory);

  const handleSearchSelect = (searchTerm) => {
    dispatch(setSearchTerm(searchTerm));
    dispatch(fetchRecipesByIngredient(searchTerm));
    onSearchSelect(searchTerm);
  };

  const handleClearHistory = () => {
    dispatch(clearSearchHistory());
  };

  if (!isVisible || searchHistory.length === 0) return null;

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10">
      <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
          <Clock className="h-4 w-4 mr-2" />
          Recent Searches
        </span>
        <button
          onClick={handleClearHistory}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="py-2">
        {searchHistory.map((search, index) => (
          <button
            key={index}
            onClick={() => handleSearchSelect(search)}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors capitalize"
          >
            {search}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchHistory;