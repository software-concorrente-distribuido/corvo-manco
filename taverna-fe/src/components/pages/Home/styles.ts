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
  max-width: 310px;
  gap: 20px;
  flex: 1;
  padding: 60px 20px;
  flex-direction: column;
  margin: auto;
  box-shadow: 0px 2px 5px 2px rgba(0, 0, 0, 0.2);
  justify-content: space-between;
  z-index: 3;
  left: 5%;
  right: 5%;
  top: 24%;
  position: absolute;

  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 20px;
    padding: 0;
  }
`;

export const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 1;
  display: flex;

  video {
    max-width: 100%;
    max-height: calc(100vh - 204px);
    object-fit: cover;
    margin: auto;
  }
`;

export const VideoOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
