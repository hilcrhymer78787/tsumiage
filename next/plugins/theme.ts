import { blue, red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiToolbar: {
      styleOverrides: {
        root: {
          minHeight: '56px !important',
        },
      },
    },
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          padding: 'calc(env(safe-area-inset-bottom)) 0 calc(env(safe-area-inset-bottom) * 1.5)'
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          background: `linear-gradient(${blue[300]},${blue[600]})`,
          color: 'white',
        },
        title: {
          fontSize: '20px !important',
        },
        subheader: {
          color: 'white !important',
          fontSize: '13px !important'
        },
      },
    },
    MuiCardActions: {
      styleOverrides: {
        root: {
          borderTop: '1px solid #e0e0e0 !important',
          justifyContent: 'space-between',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          background: `linear-gradient(${blue[300]},${blue[600]})`
        },
        containedError: {
          background: `linear-gradient(${red[200]},${red[600]})`
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid #e0e0e0',
          "&:last-child": {
            borderBottom: 'none',
          }
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          width: '100%'
        },
      },
    },
  },
  palette: {
    primary: {
      main: blue[500],
    },
  },
});

export default theme;