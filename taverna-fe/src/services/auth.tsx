import axios from 'axios';
import { UserProfileToken } from '../models/User';

const api = 'http://localhost:8080/';

export const loginAPI = async (login: string, senha: string) => {
  const data = await axios.post<UserProfileToken>(api + 'login', {
    login: login,
    senha: senha,
  });
  return data;
};

export const registerAPI = async (userData: unknown) => {
  const data = await axios.post<UserProfileToken>(
    api + 'account/register',
    userData
  );
  return data;
};
