import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    background: { default: '#091727' }
  },
  components: {
    MuiCardContent: {
      styleOverrides: {
        root: {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#091727',
          ':hover': {
            backgroundColor: '#162332'
          }
        }
      }
    }
  },
  typography: {
    body1: {
      fontWeight: 600,
      fontSize: '20px'
    },
    body2: {
      fontWeight: 600,
      fontSize: '18px'
    },
    subtitle1: {
      fontSize: '18px'
    },
    subtitle2: {
      fontSize: '16px'
    },
    caption: {
      color: 'gray',
      fontSize: '14px'
    }
  }
});
