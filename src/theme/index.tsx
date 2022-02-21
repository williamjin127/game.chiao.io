import { createTheme, ThemeProvider } from "@mui/material/styles";
import { PropsWithChildren } from "react";
import { Signika } from "./fonts";

const theme = createTheme({
  palette: {
    primary: {
      main: "#eaeaea",
    },
    secondary: {
      main: "#FEAC00",
    },
  },
  typography: {
    fontFamily: "Signika, Changa",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        ${Signika}
      `
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: "#337ab7",
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        list: {
          backgroundColor: "rgb(57, 24, 68)",
          color: "#FBF3F3",
        }
      }
    }
  },
});

export default function Palette({ children }: PropsWithChildren<{}>) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
