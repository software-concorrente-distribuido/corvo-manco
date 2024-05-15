import styled from 'styled-components';

export const Booking = styled.div`
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
    flex-direction: column-reverse;
    gap: 20px;
    padding: 0;
  }
`;

export const LeftContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const RightContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;

  span {
    font-size: 24px;

    @media (max-width: 1024px) {
      display: none;
    }
  }

  img {
    width: 660px;
    height: 400px;
    background-color: #f1f1f1;
    object-fit: center;

    @media (max-width: 1440px) {
      width: 500px;
      height: 300px;
    }

    @media (max-width: 1200px) {
      width: 400px;
      height: 240px;
    }

    @media (max-width: 1024px) {
      width: 500px;
      height: 300px;
    }

    @media (max-width: 650px) {
      width: 100%;
      height: auto;
    }
  }
`;

export const GameSelectorWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const GameInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 40px;
`;
