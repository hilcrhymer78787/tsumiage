import { blue, red } from "@mui/material/colors";

import { createTheme, PaletteColorOptions } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    myBgColor: Palette["primary"];
  }
  interface PaletteOptions {
    myBgColor?: PaletteOptions["primary"];
  }
}

export const BOTTOM_NAV_HEIGHT = 60;
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: blue[300],
    },
    myBgColor: { main: "#121212" },
  },
  components: {
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
        color: "primary",
      },
    },
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          height: `calc(${BOTTOM_NAV_HEIGHT}px + env(safe-area-inset-bottom))`,
        },
      },
    },
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          paddingBottom: "env(safe-area-inset-bottom)",
          height: `calc(${BOTTOM_NAV_HEIGHT}px + env(safe-area-inset-bottom))`,
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
        // scroll: "paper",
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
          background: blue[400],
        },
        containedError: {
          background: red[400],
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          borderBottom: "1px solid rgba(255, 255, 255, 0.23)",
          "&:last-child": {
            borderBottom: "none",
          },
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          width: "100%",
        },
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          borderTop: "1px solid rgba(255, 255, 255, 0.23)",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: 0,
          borderRight: "1px solid rgba(255, 255, 255, 0.23)",
        },
      },
    },
  },
});

export default theme;
