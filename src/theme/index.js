export const theme = {
  light: {
    text: {
      primary: 'text-gray-900',
      secondary: 'text-gray-600',
      muted: 'text-gray-500',
      inverted: 'text-white',
      success: 'text-emerald-600',
      error: 'text-red-600',
      warning: 'text-amber-600',
      info: 'text-blue-600',
    },
    bg: {
      primary: 'bg-white',
      secondary: 'bg-gray-50',
      muted: 'bg-gray-100',
      overlay: 'bg-black/50',
    },
    border: {
      primary: 'border-gray-200',
      secondary: 'border-gray-100',
      accent: 'border-emerald-200',
    },
  },
  dark: {
    text: {
      primary: 'text-gray-50',
      secondary: 'text-gray-300',
      muted: 'text-gray-400',
      inverted: 'text-gray-900',
      success: 'text-emerald-400',
      error: 'text-red-400',
      warning: 'text-amber-400',
      info: 'text-blue-400',
    },
    bg: {
      primary: 'bg-gray-900',
      secondary: 'bg-gray-800',
      muted: 'bg-gray-700/50',
      overlay: 'bg-black/70',
    },
    border: {
      primary: 'border-gray-700',
      secondary: 'border-gray-800',
      accent: 'border-emerald-700',
    },
  },
};

export const getThemeClasses = (isDark, type, variant = 'primary') => {
  const mode = isDark ? 'dark' : 'light';
  return theme[mode][type]?.[variant] || '';
};

export const getTextClass = (isDark, variant = 'primary') => 
  getThemeClasses(isDark, 'text', variant);

export const getBgClass = (isDark, variant = 'primary') => 
  getThemeClasses(isDark, 'bg', variant);

export const getBorderClass = (isDark, variant = 'primary') => 
  getThemeClasses(isDark, 'border', variant);
