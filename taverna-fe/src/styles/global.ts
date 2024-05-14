import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root{
    --background: #161616;
    --red: #f2295b;
    --purple: #532d8c;
    --purpleh1: #633e94;
    --white: #F3F3F3;
  }

  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html{
    height: 100%;

    @media (max-width: 1080px){
      font-size: 93.75%;
    }

    @media (max-width: 720px){
      font-size: 87.5%;
    }
  }

  body{
    background: var(--background);
    -webkit-font-smoothing: antialiased;
  }

  body, input, textarea, button{
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
  }

  h1, h2, h3, h4 , h5, h6 , strong{
    font-weight: 600;
  }

  button{
    cursor: pointer;
    transition: filter 0.2s;
        
    &:hover{
        filter: brightness(0.92);
    }
  }

  [disabled]{
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
