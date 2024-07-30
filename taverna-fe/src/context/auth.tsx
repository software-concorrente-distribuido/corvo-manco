import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { AuthContextType, AuthProviderProps } from "./types";
import { api } from "../services/api"
import { Navigate } from "react-router-dom";

export const AuthContext = createContext<AuthContextType>({
}as AuthContextType
);

interface User {
  login: string;
  senha: string;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const loadingStoreData = () => {
      const storageToken = localStorage.getItem("@Auth:token");
    };
    loadingStoreData();
  }, []);

  const signIn = async ({ login , senha }: User) => {
    try {
      const response = await api.post("/login", { login, senha });
      if (response.data.error) {
        alert(response.data.error);
      } else {
        setUser(response.data);
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;

        localStorage.setItem("@Auth:user", JSON.stringify(response.data.user));
        localStorage.setItem("@Auth:token", response.data.token);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const singOut = () => {
    localStorage.clear();
    setUser(null);
    return <Navigate to="/" />;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        singOut,
        signed: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;

