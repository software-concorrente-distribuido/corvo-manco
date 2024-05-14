import styled from 'styled-components';

export const Home = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const Main = styled.main`
  background-color: var(--background);
  color: #fff;
  padding: 1rem 0;
`;

export const Container = styled.div`
  position: relative;
  width: 100%; /* Ajuste a largura conforme necessário */
  height: 100vh; /* ou a altura que você deseja que o vídeo cubra */
  overflow: hidden;
`;

export const MediaContainer = styled.video`
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
`;

export const Content = styled.div`
  position: fixed;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  color: #f1f1f1;
  width: 100%;
  padding: 20px;
`;

export const Footer = styled.footer`
  background-color: var(--white);
  color: #000;
  padding: 1rem 0;
  margin-top: auto;
`;
