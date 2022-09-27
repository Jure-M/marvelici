import { createGlobalStyle } from 'styled-components'
import { normalize } from 'styled-normalize'

const GlobalStyle = createGlobalStyle`
  ${normalize};
    html{
      font-size: 62.5%;
    }

    body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background: teal;
    font-family: 'Ubuntu', sans-serif;

    &.no-scroll {
      overflow: hidden;
    }
  }
`

export default GlobalStyle
