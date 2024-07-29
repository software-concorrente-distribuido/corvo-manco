import * as S from './styles';
import Input from '../../atoms/Input';
import Button from '../../atoms/Button';
import { useState } from 'react';
import { useAuth } from '../../../context/useAuth';

export function LoginForm({
  openRegisterForm,
}: {
  openRegisterForm: () => void;
}) {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const { loginUser } = useAuth();

  const handleLogin = async () => {
    await loginUser(login, senha);
  };

  return (
    <>
      <Input
        placeholder="Usuário"
        onChange={(e) => setLogin(e.target.value)}
        type="text"
      />
      <Input
        placeholder="Senha"
        onChange={(e) => setSenha(e.target.value)}
        type="password"
      />
      <S.ButtonWrapper>
        <Button fullwidth onClick={handleLogin}>
          Entrar
        </Button>
        <Button fullwidth onClick={openRegisterForm} hierarchy="secondary">
          Cadastrar
        </Button>
      </S.ButtonWrapper>
    </>
  );
}

export default LoginForm;
