import * as S from './styles';
import Input from '../../atoms/Input';
import Button from '../../atoms/Button';
import { useState } from 'react';
import { registerAPI } from '../../../services/auth';

export function RegisterForm({ openLoginForm }: { openLoginForm: () => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const data = {
        nome: name,
        email,
        telefone: phone,
        login: username,
        senha: password,
      };

      await registerAPI(data);
      openLoginForm();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Input
        placeholder="Nome"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setName(event.target.value)
        }
        type="text"
      />
      <Input
        placeholder="Email"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setEmail(event.target.value)
        }
        type="email"
      />
      <Input
        placeholder="Telefone"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setPhone(event.target.value)
        }
        type="text"
      />
      <Input
        placeholder="Usuário"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setUsername(event.target.value)
        }
        type="text"
      />
      <Input
        placeholder="Senha"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setPassword(event.target.value)
        }
        type="password"
      />
      <S.ButtonWrapper>
        <Button fullwidth onClick={handleRegister}>
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
