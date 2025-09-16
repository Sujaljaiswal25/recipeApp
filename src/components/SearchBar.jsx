import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Search, X } from 'lucide-react';
import { fetchRecipesByIngredient, clearSearchResults, setSearchTerm } from '../features/recipes/recipesSlice';
import { addSearch } from '../features/searchHistory/searchHistorySlice';
import SearchHistory from './SearchHistory';

const SearchBar = () => {
  const dispatch = useDispatch();
  const { loading, searchTerm } = useSelector(state => state.recipes);
  const isDark = useSelector(state => state.theme.isDark);
  const [inputValue, setInputValue] = useState(searchTerm);
  const [showHistory, setShowHistory] = useState(false);
  const searchRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedValue = inputValue.trim();
    if (trimmedValue) {
      dispatch(setSearchTerm(trimmedValue));
      dispatch(fetchRecipesByIngredient(trimmedValue));
      dispatch(addSearch(trimmedValue));
      setShowHistory(false);
    }
  };

  const handleClear = () => {
    setInputValue('');
    dispatch(clearSearchResults());
    setShowHistory(false);
  };

  const handleSearchSelect = (searchTerm) => {
    setInputValue(searchTerm);
    setShowHistory(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowHistory(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto" ref={searchRef}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className={`h-5 w-5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
        </div>
        
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => setShowHistory(true)}
          placeholder="Search recipes by ingredient (e.g., chicken, tomato, pasta...)"
          className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors ${
            isDark 
              ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' 
              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
          }`}
        />
        
        {inputValue && (
          <button
            type="button"
            onClick={handleClear}
            className={`absolute inset-y-0 right-0 pr-3 flex items-center transition-colors ${
              isDark 
                ? 'text-gray-500 hover:text-gray-300' 
                : 'text-gray-400 hover:text-gray-700'
            }`}
          >
            <X className="h-5 w-5 text-gray-400" />
          </button>
        )}
        
        <SearchHistory 
          isVisible={showHistory} 
          onSearchSelect={handleSearchSelect}
        />
      </div>
      
      <button
        type="submit"
        disabled={loading || !inputValue.trim()}
        className="w-full mt-4 bg-emerald-600 text-white py-3 px-6 rounded-lg hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
      >
        {loading ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            <span>Searching...</span>
          </div>
        ) : (
          'Search Recipes'
        )}
      </button>
    </form>
  );
};

export default SearchBar;