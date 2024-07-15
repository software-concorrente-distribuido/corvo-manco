import styled from 'styled-components';

export const InputContainer = styled.div`
  position: relative;
  width: 100%;
`;
export const InputField = styled.input`
  border-radius: 6px;
  outline: none;
  transition: 0.3s;
  font-size: 1.2rem;
  color: white;
  padding: 20px 10px;
  background-color: rgba(255, 255, 255, 0.38);
  width: 100%;
  padding-right: 40px;

  &:focus {
    border-color: var(--primary);
  }

  &::placeholder {
    color: white;
  }
`;

export const PasswordVisibilityButton = styled.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background-color: transparent;
  border: none;
  cursor: pointer;
`;
