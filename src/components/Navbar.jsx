import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChefHat, Heart, Home, Menu, X } from 'lucide-react';
import { useSelector } from 'react-redux';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../hooks/useTheme';

const Navbar = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const favoritesCount = useSelector(state => state.favorites.items.length);
  const { isDark, text, bg, border } = useTheme();

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/', icon: <Home className="h-5 w-5" /> },
    { 
      name: 'Favorites', 
      path: '/favorites', 
      icon: <Heart className="h-5 w-5" />,
      badge: favoritesCount > 0 ? favoritesCount : null
    },
  ];

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? `${bg('primary', isScrolled ? 'scrolled' : 'primary')} backdrop-blur-sm border-b ${border('primary')}`
          : `${bg('primary')} border-b ${border('primary')}`
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-shrink-0"
          >
            <Link 
              to="/" 
              className={`flex items-center space-x-2 transition-colors ${text('accent')} hover:opacity-80`}
            >
              <motion.div 
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity, 
                  repeatType: 'reverse',
                  ease: 'easeInOut'
                }}
              >
                <ChefHat className="h-8 w-8" />
              </motion.div>
              <span className="text-xl font-bold bg-gradient-to-r bg-clip-text text-transparent from-emerald-500 to-teal-500">
                RecipeIdeas
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`group relative flex items-center space-x-1.5 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive(link.path)
                    ? `${text('accent')} ${bg('accent')}`
                    : `${text('secondary')} hover:${text('accent')} hover:${bg('muted')}`
                }`}
              >
                <span className="relative">
                  {link.icon}
                  {link.badge && (
                    <span className={`absolute -top-2 -right-2 flex items-center justify-center h-5 w-5 rounded-full text-xs font-bold ${
                      isDark ? 'bg-red-500 text-white' : 'bg-red-500 text-white'
                    }`}>
                      {link.badge}
                    </span>
                  )}
                </span>
                <span>{link.name}</span>
                {isActive(link.path) && (
                  <motion.span 
                    layoutId="activeNavLink"
                    className={`absolute inset-0 -z-10 rounded-lg ${
                      isDark ? 'bg-emerald-900/20' : 'bg-emerald-50'
                    }`}
                    transition={{
                      type: 'spring',
                      stiffness: 380,
                      damping: 30
                    }}
                  />
                )}
              </Link>
            ))}
            
            <div className="h-6 w-px mx-2 bg-gray-200 dark:bg-gray-700"></div>
            
            <ThemeToggle />
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-2">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md transition-colors ${
                isDark 
                  ? 'text-gray-300 hover:bg-gray-800 hover:text-white' 
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className={`md:hidden overflow-hidden border-t ${
              isDark ? 'border-gray-800' : 'border-gray-100'
            }`}
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`group flex items-center px-3 py-3 rounded-md text-base font-medium ${
                    isActive(link.path)
                      ? isDark
                        ? 'bg-emerald-900/30 text-emerald-400'
                        : 'bg-emerald-50 text-emerald-600'
                      : isDark
                      ? 'text-gray-300 hover:bg-gray-800 hover:text-emerald-400'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-emerald-600'
                  }`}
                >
                  <span className="flex items-center">
                    <span className="mr-3">{link.icon}</span>
                    {link.name}
                    {link.badge && (
                      <span className={`ml-2 inline-flex items-center justify-center h-5 w-5 rounded-full text-xs font-medium ${
                        isDark ? 'bg-red-500 text-white' : 'bg-red-500 text-white'
                      }`}>
                        {link.badge}
                      </span>
                    )}
                  </span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;