import * as S from './styles';
import Input from '../../atoms/Input';
import Button from '../../atoms/Button';

export function RegisterForm({ openLoginForm }: { openLoginForm: () => void }) {
  return (
    <>
      <Input placeholder="Nome" onChange={console.log} type="text" />
      <Input placeholder="Sobrenome" onChange={console.log} type="text" />
      <Input placeholder="Email" onChange={console.log} type="email" />
      <Input placeholder="Senha" onChange={console.log} type="password" />
      <S.ButtonWrapper>
        <Button fullwidth onClick={console.log}>
          Cadastrar
        </Button>
        <Button fullwidth onClick={openLoginForm} hierarchy="secondary">
          Cancelar
        </Button>
      </S.ButtonWrapper>
    </>
  );
}

export default RegisterForm;
