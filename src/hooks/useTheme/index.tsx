import { useContext } from 'react';
import { ThemeContext, DefaultTheme } from 'styled-components';

const useTheme = (): DefaultTheme => {
  // Get data from context
  const context = useContext(ThemeContext);

  // If user is not using context provider (DEV purposes only)
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');

  return context;
};

export { useTheme };
