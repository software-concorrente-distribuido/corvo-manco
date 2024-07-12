import * as S from './styles';
import Input from '../../atoms/Input';
import Button from '../../atoms/Button';
import { useContext, useState } from 'react';
import { AuthContext } from '../../../context/auth';

export function LoginForm({
  openRegisterForm,
}: {
  openRegisterForm: () => void;
}) {

  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const { signIn } = useContext(AuthContext)

  const handleLogin = async () => {
    //e.preventDefault();
    const data = {
      login,
      senha
    };
    await signIn(data);
  }

  return (
    <>
      <Input placeholder="Usuário" onChange={console.log} type="text" />
      <Input placeholder="Senha" onChange={console.log} type="password" />
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
