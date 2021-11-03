import React from 'react';
import ReactDOM from 'react-dom';

import { ThemeSwitchProvider } from 'hooks/useThemeSwitch';

import Routes from 'routes';

import GlobalStyle from 'styles/globalStyle';

ReactDOM.render(
  <React.StrictMode>
    <ThemeSwitchProvider>
      <GlobalStyle />
      <Routes />
    </ThemeSwitchProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
