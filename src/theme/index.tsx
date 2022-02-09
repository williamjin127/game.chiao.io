import { createTheme, ThemeProvider } from "@mui/material/styles";
import { PropsWithChildren } from "react";
import fonts from "./fonts";

const theme = createTheme({
  palette: {
    primary: {
      main: "#eaeaea",
    },
    secondary: {
      main: "#273a4c",
    },
  },
  typography: {
    fontFamily: "Signika, Changa",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "@font-face": fonts
      }
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: "#337ab7",
        },
      },
    },
  },
});

export default function Palette({ children }: PropsWithChildren<{}>) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
