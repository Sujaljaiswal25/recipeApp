# Recipe Idea - Project Documentation

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [State Management](#state-management)
- [Project Structure](#project-structure)
- [API Integration](#api-integration)
- [Theming](#theming)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)

## Project Overview
Recipe Idea is a modern web application that helps users discover recipes based on ingredients they have. The application features a clean, responsive UI with dark/light theme support, recipe search functionality, favorites management, and search history.

## Features

### 1. Recipe Search
- Search for recipes by ingredient
- View search results in a responsive grid layout
- See recipe details including ingredients and instructions
- Loading states and error handling

### 2. Favorites Management
- Add/remove recipes to/from favorites
- Persist favorites across page refreshes
- View all favorite recipes in one place

### 3. Search History
- Track previous searches
- Quickly repeat previous searches
- Clear search history when needed

### 4. Theme Support
- Toggle between light and dark themes
- System preference detection
- Smooth theme transitions

### 5. Responsive Design
- Works on desktop and mobile devices
- Adaptive layout for different screen sizes
- Touch-friendly interface

## Tech Stack

### Frontend
- **React** - JavaScript library for building user interfaces
- **React Router** - For client-side routing
- **Redux Toolkit** - State management
- **Redux Persist** - Persist Redux state to localStorage
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Hot Toast** - Toast notifications

### Build Tools
- **Vite** - Next Generation Frontend Tooling
- **npm** - Package manager

## State Management

### Redux Store Structure
```javascript
{
  recipes: {
    searchResults: [],    // Array of recipe search results
    currentRecipe: null,  // Currently selected recipe details
    loading: boolean,     // Loading state for search
    detailsLoading: boolean, // Loading state for recipe details
    error: string | null, // Error message if any
    searchTerm: string   // Current search term
  },
  favorites: {
    items: []            // Array of favorited recipes
  },
  theme: {
    mode: 'light' | 'dark' // Current theme mode
  },
  searchHistory: {
    items: []            // Array of previous search terms
  }
}
```

### Key Redux Slices
1. **recipesSlice**
   - Handles recipe search and details
   - Manages loading and error states
   - Stores search results and current recipe

2. **favoritesSlice**
   - Manages favorite recipes
   - Provides actions to add/remove favorites
   - Persists favorites to localStorage

3. **themeSlice**
   - Manages application theme
   - Handles theme toggling
   - Persists theme preference

4. **searchHistorySlice**
   - Tracks search history
   - Provides actions to manage history items
   - Persists search history

## Project Structure

```
src/
├── app/
│   └── store.js          # Redux store configuration
├── components/           # Reusable UI components
│   ├── ErrorState.jsx
│   ├── LoadingSkeleton.jsx
│   ├── Navbar.jsx
│   ├── RecipeCard.jsx
│   ├── SearchBar.jsx
│   ├── SearchHistory.jsx
│   └── ThemeToggle.jsx
├── features/
│   ├── favorites/        # Favorites feature
│   │   └── favoritesSlice.js
│   ├── recipes/          # Recipes feature
│   │   └── recipesSlice.js
│   ├── searchHistory/    # Search history feature
│   │   └── searchHistorySlice.js
│   └── theme/            # Theme feature
│       └── themeSlice.js
├── hooks/
│   └── useTheme.js       # Custom hook for theme management
├── pages/                # Page components
│   ├── Favorites.jsx
│   ├── Home.jsx
│   └── RecipeDetails.jsx
├── services/
│   └── api.service.js    # API service layer
├── theme/
│   └── index.js          # Theme configuration
├── App.jsx               # Main application component
└── main.jsx              # Application entry point
```

## API Integration

The application integrates with [TheMealDB API](https://www.themealdb.com/api.php) to fetch recipe data.

### Key API Endpoints
- Search recipes by ingredient: `https://www.themealdb.com/api/json/v1/1/filter.php?i={ingredient}`
- Get recipe details: `https://www.themealdb.com/api/json/v1/1/lookup.php?i={idMeal}`

### API Service Layer
All API calls are abstracted in `api.service.js` with proper error handling and response transformation.

## Theming

The application supports both light and dark themes with the following features:
- Toggle between light and dark modes
- System preference detection
- Smooth transitions between themes
- Theme persistence using Redux Persist

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory (if needed for API keys)
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

## Available Scripts

In the project directory, you can run:

### `npm run dev`
Runs the app in development mode.

### `npm run build`
Builds the app for production to the `dist` folder.

### `npm run preview`
Serves the production build locally for testing.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
