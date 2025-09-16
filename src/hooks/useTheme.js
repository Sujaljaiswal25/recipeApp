import { useSelector } from 'react-redux';
import { selectIsDark } from '../features/theme/themeSlice';
import { getTextClass, getBgClass, getBorderClass } from '../theme';

export const useTheme = () => {
  const isDark = useSelector(selectIsDark);
  
  return {
    isDark,
    text: (variant = 'primary') => getTextClass(isDark, variant),
    bg: (variant = 'primary') => getBgClass(isDark, variant),
    border: (variant = 'primary') => getBorderClass(isDark, variant),
    classes: {
      text: (variant = 'primary') => getTextClass(isDark, variant),
      bg: (variant = 'primary') => getBgClass(isDark, variant),
      border: (variant = 'primary') => getBorderClass(isDark, variant),
    },
  };
};
