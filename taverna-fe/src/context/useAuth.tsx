import { createContext, useEffect, useState } from 'react';
import { UserProfile } from '../models/User';
import { useNavigate } from 'react-router-dom';
import { loginAPI, registerAPI } from '../services/auth';
import { toast } from 'react-toastify';
import axios from 'axios';
import React from 'react';

type UserContextType = {
  user: UserProfile | null;
  token: string | null;
  registerUser: (email: string, login: string, senha: string) => void;
  loginUser: (login: string, senha: string) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
};

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (user && token) {
      setUser(JSON.parse(user));
      setToken(token);
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    }
    setIsReady(true);
  }, []);

  const registerUser = async (email: string, login: string, senha: string) => {
    await registerAPI(email, login, senha)
      .then((res) => {
        if (res) {
          localStorage.setItem('token', res?.data.token);
          const userObj = {
            login: res?.data.login,
            email: res?.data.email,
            id: res?.data.id,
          };
          localStorage.setItem('user', JSON.stringify(userObj));
          setToken(res?.data.token!);
          setUser(userObj!);
          toast.success('Login Success!');
          navigate('/booking');
        }
      })
      .catch((e) => toast.warning('Server error occured'));
  };

  const loginUser = async (login: string, senha: string) => {
    await loginAPI(login, senha)
      .then((res) => {
        if (res) {
          localStorage.setItem('token', res?.data.token);
          const userObj = {
            login: res?.data.login,
            email: res?.data.email,
            id: res?.data.id,
          };
          localStorage.setItem('user', JSON.stringify(userObj));
          setToken(res?.data.token!);
          setUser(userObj!);
          toast.success('Login Success!');
          navigate('/booking');
        }
      })
      .catch((e) => toast.warning('Server error occured'));
  };

  const isLoggedIn = () => {
    return !!user;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setToken('');
    navigate('/');
  };

  return (
    <UserContext.Provider
      value={{ loginUser, user, token, logout, isLoggedIn, registerUser }}
    >
      {isReady ? children : null}
    </UserContext.Provider>
  );
};

export const useAuth = () => React.useContext(UserContext);
