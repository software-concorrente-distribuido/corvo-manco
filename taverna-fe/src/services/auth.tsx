import axios from "axios";
import { UserProfileToken } from "../models/User";

const api = "http://localhost:8080/";

export const loginAPI = async (usuario: string, senha: string) => {
  try {
    const data = await axios.post<UserProfileToken>(api + "login", {
      usuario: usuario,
      senha: senha,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const registerAPI = async (
  email: string,
  usuario: string,
  senha: string
) => {
  try {
    const data = await axios.post<UserProfileToken>(api + "account/register", {
      email: email,
      usuario: usuario,
      senha: senha,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
