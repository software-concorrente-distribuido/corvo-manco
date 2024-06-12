import * as S from './styles';
import Input from '../../atoms/Input';
import Button from '../../atoms/Button';

export function LoginForm({
  openRegisterForm,
}: {
  openRegisterForm: () => void;
}) {
  return (
    <>
      <Input placeholder="Usuário" onChange={console.log} type="text" />
      <Input placeholder="Senha" onChange={console.log} type="password" />
      <S.ButtonWrapper>
        <Button fullwidth onClick={console.log}>
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
