import styled from 'styled-components';

export const Footer = styled.footer`
  background-color: var(--white);
  color: #000;
  padding: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4rem;

  h1 {
    font-weight: 400;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;

    img {
      max-width: 100%;

      h1 {
        font-size: 1.5rem;
      }

      p {
        font-size: 1rem;
      }
    }
  }
`;
