import React, { useState } from "react";
import GlobalStyle from "./global/GlobalStyle";
import { Switch, Route } from "react-router-dom";
import { DataProvider } from "./components/InputDataContext";
import { InputProvider } from "./components/InputContext";
import { ItemsInCartList } from "./components/ItemsInCartContext";
import { SearchPageProvider } from "./components/SearchPageContext";
import { ProductProvider } from "./components/ProductContext";
import { OffsetProvider } from "./components/OffsetContext";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./global/Theme";
import Main from "./pages/Main";
import Navigation from "./global/Navigation";
import Banner from "./components/Banner";
import SearchPage from "./pages/SearchPage";
import Product from "./pages/Product";
import Cart from "./pages/Cart";

function App() {
  const [theme, setTheme] = useState("light");

  const handleTheme = () => {
    theme === "dark" ? setTheme("light") : setTheme("dark");
  };

  return (
    <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
      <GlobalStyle />
      <DataProvider>
        <InputProvider>
          <ItemsInCartList>
            <SearchPageProvider>
              <ProductProvider>
                <OffsetProvider>
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
                    <Route path="/cart">
                      <Cart />
                    </Route>
                  </Switch>
                </OffsetProvider>
              </ProductProvider>
            </SearchPageProvider>
          </ItemsInCartList>
        </InputProvider>
      </DataProvider>
    </ThemeProvider>
  );
}

export default App;
