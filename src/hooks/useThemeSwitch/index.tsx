import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from 'react';

// Context
export interface IThemeSwitchContextData {
  isDarkTheme: boolean;

  switchTheme: () => void;
}

// Context
export const ThemeSwitchContext = createContext<IThemeSwitchContextData>(
  {} as IThemeSwitchContextData,
);

// Provider
export const ThemeSwitchProvider: React.FC = ({ children }) => {
  // Context states
  const [isDarkTheme, setIsDarkTheme] = useState(
    localStorage.getItem('theme') === 'dark',
  );

  const switchTheme = useCallback(() => setIsDarkTheme(theme => !theme), []);

  useEffect(() => {
    localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
  }, [isDarkTheme]);

  return (
    <ThemeSwitchContext.Provider
      value={{
        isDarkTheme,
        switchTheme,
      }}
    >
      {children}
    </ThemeSwitchContext.Provider>
  );
};

// Hook
export function useThemeSwitch(): IThemeSwitchContextData {
  // Get data from context
  const context = useContext(ThemeSwitchContext);

  // If user is not using context provider (DEV purposes only)
  if (!context)
    throw new Error('useThemeSwitch must be used within a ThemeSwitchProvider');

  return context;
}
