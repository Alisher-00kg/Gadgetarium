import { createTheme } from '@mui/material';

const theme = createTheme({
   palette: {
      primary: {
         main: '#CB11AB',
         dark: '#1A1A25',
         light: '#F4F4F4',
         contrastText: '#384255',
      },
      secondary: {
         main: '#F10000',
         dark: '#292929',
         light: '#3CDE14',
         contrastText: '#969696',
      },
      error: {
         main: '#f44336',
         dark: '#d32f2f',
         light: '#e57373',
         contrastText: '#969696',
      },
      warning: {
         main: '#ffa726',
         dark: '#f57c00',
         light: '#ffb74d',
         contrastText: '#969696',
      },
      info: {
         main: '#29b6f6',
         dark: '#0288d1',
         light: '#4fc3f7',
         contrastText: '#969696',
      },
      success: {
         main: '#66bb6a',
         dark: '#388e3c',
         light: '#81c784',
         contrastText: '#969696',
      },
   },
   typography: {
      fontFamily: 'Ubuntu',
      mainFontFamily: 'Inter',
   },
});
export default theme;
