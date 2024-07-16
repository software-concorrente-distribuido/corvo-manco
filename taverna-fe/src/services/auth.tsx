import axios from "axios";
import { UserProfileToken } from "../models/User";

const api = "http://localhost:8080/";

export const loginAPI = async (login: string, senha: string) => {
  try {
    const data = await axios.post<UserProfileToken>(api + "login", {
      login: login,
      senha: senha,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const registerAPI = async (
  email: string,
  login: string,
  senha: string
) => {
  try {
    const data = await axios.post<UserProfileToken>(api + "account/register", {
      email: email,
      login: login,
      senha: senha,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
