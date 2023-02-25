import React from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

import App from './App';
import reportWebVitals from './reportWebVitals';
import theme from './utils/theme';

import SongsAPI from './apis/SongsAPI';
import { APIContext } from './apis/useAPI';

import { SongsContextProvider } from './pages/Songs/SongsContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const apis = {
  SongsAPI: SongsAPI,
};

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <APIContext.Provider value={{ apis }}>
        <SongsContextProvider>
          <CssBaseline />
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </SongsContextProvider>
      </APIContext.Provider>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
