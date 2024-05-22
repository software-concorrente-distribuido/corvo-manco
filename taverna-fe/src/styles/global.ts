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

  .react-modal-overlay{
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    top:0;
    bottom:0;
    right:0;
    left:0;
    display:flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
  }

  .react-modal-content{
    width: 100%;
    max-width: 550px;
    background: white;
    padding: 1rem 1.5rem;
    position: relative;
    border: 1px solid rgba(0, 0, 0, 0.5);
    border-radius: 0.65rem;
    color: var(--text-secondary-gray-2);

    .close-button {
      cursor: pointer;
      position: absolute;
      right: 20px;

      @media (min-width: 768px) {
        display: flex;
      }
    }

    @media (max-width: 768px) {
      width: 100%;
      height: 100%;
      max-width: unset;
      border: 0;
      border-radius: 0;
      overflow-y: scroll;

      &::-webkit-scrollbar {
        display: none;
      }
    }
  }

  [disabled]{
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
