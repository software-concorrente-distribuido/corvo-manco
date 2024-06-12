import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import * as S from './styles';
import { InputProps } from './types';

export function Input({ onChange, placeholder, type }: InputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <S.InputContainer>
      <S.InputField
        onChange={onChange}
        placeholder={placeholder}
        type={type === 'password' && isPasswordVisible ? 'text' : type}
      />
      {type === 'password' && (
        <S.PasswordVisibilityButton
          onClick={() => setIsPasswordVisible(!isPasswordVisible)}
        >
          {isPasswordVisible ? (
            <FaEyeSlash color="white" size={24} />
          ) : (
            <FaEye color="white" size={24} />
          )}
        </S.PasswordVisibilityButton>
      )}
    </S.InputContainer>
  );
}

export default Input;
