import styled from 'styled-components';

export const Home = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const Main = styled.main`
  display: flex;
  flex: 1;
`;

export const Content = styled.div`
  display: flex;
  color: #fff;
  max-width: 80%;
  gap: 40px;
  flex: 1;
  padding: 20px;
  margin: 36px auto;
  justify-content: space-between;

  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 20px;
    padding: 0;
  }
`;

// export const Main = styled.main`
//   background-color: var(--background);
//   color: #fff;
//   padding: 1rem 0;
// `;

// export const Container = styled.div`
//   position: relative;
//   width: 100%; /* Ajuste a largura conforme necessário */
//   height: 100vh; /* ou a altura que você deseja que o vídeo cubra */
//   overflow: hidden;
// `;

// export const MediaContainer = styled.video`
//   position: fixed;
//   right: 0;
//   bottom: 0;
//   min-width: 100%;
//   min-height: 100%;
// `;

// export const Content = styled.div`
//   position: fixed;
//   bottom: 0;
//   background: rgba(0, 0, 0, 0.5);
//   color: #f1f1f1;
//   width: 100%;
//   padding: 20px;
// `;

export const Footer = styled.footer`
  background-color: var(--white);
  color: #000;
  padding: 1rem 0;
  margin-top: auto;
`;
