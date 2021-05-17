import React, { useState } from "react";
import GlobalStyle from "./global/GlobalStyle";
import { Switch, Route } from "react-router-dom";
import { SearchProvider } from "./components/InputSearchContext";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./global/Theme";
import Main from "./pages/Main";
import SearchPage from "./pages/SearchPage";

function App() {
  const [theme, setTheme] = useState("light");

  const handleTheme = () => {
    theme === "dark" ? setTheme("light") : setTheme("dark");
  };

  return (
    <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
      <GlobalStyle />
      <SearchProvider>
        <Switch>
          <Route path="/" exact>
            <Main />
          </Route>
          <Route path="/search">
            <SearchPage />
          </Route>
        </Switch>
      </SearchProvider>
    </ThemeProvider>
  );
}

export default App;
