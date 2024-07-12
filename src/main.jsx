import React from 'react';
import ReactDOM from 'react-dom/client';
import { store } from './store/store.js';
import App from './App.jsx';
import './index.css';
import { ThemeProvider } from '@mui/material';
import theme from './utils/constants/themes.js';
import { SnackBar } from './components/main/SnackBar.jsx';
import { Provider } from 'react-redux';
ReactDOM.createRoot(document.getElementById('root')).render(
   <React.StrictMode>
      <Provider store={store}>
         <ThemeProvider theme={theme}>
            <SnackBar />
            <App />
         </ThemeProvider>
      </Provider>
   </React.StrictMode>,
);
