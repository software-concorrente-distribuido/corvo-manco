import styled from 'styled-components';

interface ButtonProps {
  hierarchy?: 'primary' | 'secondary';
  fullwidth?: boolean;
}

export const Button = styled.button`
  margin-top: 20px;
  background-color: ${(props: ButtonProps) =>
    props.hierarchy === 'primary' ? '#fff' : 'rgba(255, 255, 255, 0.38)'};
  color: ${(props: ButtonProps) =>
    props.hierarchy === 'primary' ? '#000' : '#fff'};
  padding: 10px 20px;
  border: none;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  width: ${(props: ButtonProps) => (props.fullwidth ? '100%' : 'fit-content')};
`;
