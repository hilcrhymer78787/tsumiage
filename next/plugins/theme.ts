import { blue, red } from "@mui/material/colors";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          padding: "calc(env(safe-area-inset-bottom)) 0 calc(env(safe-area-inset-bottom) * 1.5)"
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: "1px solid rgba(255, 255, 255, 0.23)",
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          color: blue[300],
          borderBottom: "1px solid rgba(255, 255, 255, 0.23)",
        },
        title: {
          fontSize: "20px",
        },
      },
    },
    MuiCardActions: {
      styleOverrides: {
        root: {
          borderTop: "1px solid rgba(255, 255, 255, 0.23)",
          justifyContent: "space-between",
        },
      },
    },
    MuiDialog: {
      defaultProps: {
        fullWidth: true,
        maxWidth: "sm",
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          justifyContent: "space-between",
        },
      },
    },
    MuiDialogContent: {
      defaultProps: {
        dividers: true,
      },
    },
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          background: blue[400]
        },
        containedError: {
          background: red[400]
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          borderBottom: "1px solid rgba(255, 255, 255, 0.23)",
          "&:last-child": {
            borderBottom: "none",
          }
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          width: "100%"
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: 0
        },
      },
    },
  },
  palette: {
    mode: "dark",
    primary: {
      main: blue[300],
    },
  },
});

export default theme;