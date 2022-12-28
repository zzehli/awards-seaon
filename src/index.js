import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
    palette: {
        background: {
            default: '#F6F6F7',
        }
    },
    typography: {
      button: {
        textTransform: 'none',
        fontWeight: 700
      },
    },
  });
  

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <React.Fragment>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <App/>
            </ThemeProvider>
        </React.Fragment>  
    </React.StrictMode>

);