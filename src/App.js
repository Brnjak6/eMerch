import React, { useState } from "react";
import GlobalStyle from "./global/GlobalStyle";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./global/Theme";
import Main from "./pages/Main";

function App() {
  const [theme, setTheme] = useState("light");

  const handleTheme = () => {
    theme === "dark" ? setTheme("light") : setTheme("dark");
  };

  return (
    <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Main />
    </ThemeProvider>
  );
}

export default App;
