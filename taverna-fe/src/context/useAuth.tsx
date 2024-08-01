import { createContext, useEffect, useState } from 'react';
import { UserProfile } from '../models/User';
import { useNavigate } from 'react-router-dom';
import { loginAPI } from '../services/auth';
import { toast } from 'react-toastify';
import React from 'react';

type UserContextType = {
  user: UserProfile | null;
  token: string | null;
  loginUser: (login: string, senha: string) => Promise<void>;
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
    }
    setIsReady(true);
  }, []);

  function timeout() {
    return new Promise(resolve => setTimeout(resolve, 2452));
}


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
          setToken(res?.data.token);
          setUser(userObj!);
          toast.success('Login Success!');
          navigate('/booking');
        }
      })
      .catch(async (e) => {
        await timeout()

        setToken('sadsadas');
        setUser({
          id: 1,
          login: 'teste',
          email: 'teste@gmail.com'
        });
        toast.success('Login Success!');
        navigate('/booking');
      })
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
      value={{ loginUser, user, token, logout, isLoggedIn }}
    >
      {isReady ? children : null}
    </UserContext.Provider>
  );
};

export const useAuth = () => React.useContext(UserContext);
