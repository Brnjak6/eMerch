import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
}

body {
    min-height: 100vh;
   font-family: "Rhodium Libre", serif;
    overflow-x: hidden;

    ::-webkit-scrollbar {
  width: 10px;

}

button {
  padding: .3rem .3rem;
  color: ${(props) => props.theme.colors.secondary};
  background: transparent !important;
  outline: none;
  border: 5px double ${(props) => props.theme.colors.secondary};
  font-size: 1.2rem;
  cursor: pointer;
  transition: all .2s;

  &:hover {
    background: #fff !important;
    color: ${(props) => props.theme.colors.main};
  }
}

::-webkit-scrollbar-track {
  background: ${(props) => props.theme.colors.background};

}

::-webkit-scrollbar-thumb {
  background: ${(props) => props.theme.colors.secondary};
}

::-webkit-scrollbar-thumb:hover {
  background: ${(props) => props.theme.colors.main};
}

input[type="search"]::-webkit-search-decoration,
input[type="search"]::-webkit-search-cancel-button,
input[type="search"]::-webkit-search-results-button,
input[type="search"]::-webkit-search-results-decoration { display: none; }

}`;

export default GlobalStyle;