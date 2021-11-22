import React from 'react';
import ReactDOM from 'react-dom';

import { ThemeSwitchProvider } from 'hooks/useThemeSwitch';
import { DatasetsProvider } from 'hooks/useDatasets';

import Routes from 'routes';

import GlobalStyle from 'styles/globalStyle';

ReactDOM.render(
  <React.StrictMode>
    <ThemeSwitchProvider>
      <DatasetsProvider>
        <GlobalStyle />
        <Routes />
      </DatasetsProvider>
    </ThemeSwitchProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
