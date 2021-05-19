import React, { useState } from "react";
import GlobalStyle from "./global/GlobalStyle";
import { Switch, Route } from "react-router-dom";
import { SearchProvider } from "./components/InputSearchContext";
import { ProductProvider } from "./components/ProductContext";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./global/Theme";
import Main from "./pages/Main";
import Navigation from "./global/Navigation";
import Banner from "./components/Banner";
import SearchPage from "./pages/SearchPage";
import Product from "./components/Product";

function App() {
  const [theme, setTheme] = useState("light");

  const handleTheme = () => {
    theme === "dark" ? setTheme("light") : setTheme("dark");
  };

  return (
    <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
      <GlobalStyle />
      <SearchProvider>
        <ProductProvider>
          <Banner />
          <Navigation />
          <Switch>
            <Route path="/" exact>
              <Main />
            </Route>
            <Route path="/search">
              <SearchPage />
            </Route>
            <Route path="/product">
              <Product />
            </Route>
          </Switch>
        </ProductProvider>
      </SearchProvider>
    </ThemeProvider>
  );
}

export default App;
