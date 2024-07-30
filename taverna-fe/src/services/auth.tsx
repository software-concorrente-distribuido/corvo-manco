import { api } from './api';
import { UserProfileToken } from "../models/user";


export const loginAPI = async (username: string, password: string) => {
  try {
    const data = await api.post<UserProfileToken>("/login", {
      login: username,
      senha: password,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const registerAPI = async (
  email: string,
  username: string,
  password: string
) => {
  try {
    const data = await api.post<UserProfileToken>("/register", { //ainda n tem no backend
      email: email,
      username: username,
      password: password,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
