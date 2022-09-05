import React from "react";

import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#001963",
      light: "#505CA9",
    },
    secondary: {
      main: "#E45858",
    },
    error: {
      main: "#F03E51",
    },
    text: {
      primary: "#2B2C34",
    },
    // neutral: {
    //   main: "#D1D1E9",
    // },
  },
});

export const ThemeContextProvider = (props) => {
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
};
