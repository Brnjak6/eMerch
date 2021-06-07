import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
}

body, html {

    font-family: 'Work Sans', sans-serif;
    font-size: 100%;

   @media only screen and (max-width: 1200px) {
    font-size: 80%;
  }

    ::-webkit-scrollbar {
  width: 10px;

}

button {
  padding: .3rem .3rem;
  color: ${(props) => props.theme.colors.secondary};
  background: transparent !important;
  outline: none;
  border: 5px double ${(props) => props.theme.colors.third} !important;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all .2s;

  &:hover {
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(3px);
  }
}

::-webkit-scrollbar-track {
  background: ${(props) => props.theme.colors.background};

}

::-webkit-scrollbar-thumb {
  background: ${(props) => props.theme.colors.main};
}

::-webkit-scrollbar-thumb:hover {
  background: ${(props) => props.theme.colors.third};
}

input[type="search"]::-webkit-search-decoration,
input[type="search"]::-webkit-search-cancel-button,
input[type="search"]::-webkit-search-results-button,
input[type="search"]::-webkit-search-results-decoration { display: none; }

}`;

export default GlobalStyle;
