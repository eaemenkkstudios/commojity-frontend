import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { useThemeSwitch } from 'hooks/useThemeSwitch';

import darkTheme from 'styles/themes/dark';
import lightTheme from 'styles/themes/light';

import GlobalStyle from 'styles/globalStyle';

import Home from 'pages/Home';

const Routes: React.FC = () => {
  const { isDarkTheme } = useThemeSwitch();

  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <GlobalStyle />
      <BrowserRouter>
        <Route component={Home} />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default Routes;
