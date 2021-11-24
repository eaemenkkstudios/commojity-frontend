import React from 'react';
import ReactDOM from 'react-dom';

import { ThemeSwitchProvider } from 'hooks/useThemeSwitch';
import { DatasetsProvider } from 'hooks/useDatasets';

import Routes from 'routes';

ReactDOM.render(
  <React.StrictMode>
    <ThemeSwitchProvider>
      <DatasetsProvider>
        <Routes />
      </DatasetsProvider>
    </ThemeSwitchProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
