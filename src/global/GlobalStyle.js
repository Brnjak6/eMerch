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
    font-family: 'Poppins', sans-serif;
    overflow-x: hidden;

    ::-webkit-scrollbar {
  width: 10px;

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

}`;

export default GlobalStyle;
