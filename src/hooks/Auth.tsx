import React, { createContext, useCallback, useState, useContext } from 'react';
import { decode } from 'jsonwebtoken';
import api from '../services/api';

interface Admin {
  id: string;
  name: string;
  email: string;
  phone: string;
  whatsapp: string;
}

interface Credential {
  email: string;
  password: string;
}

interface AuthContextData {
  admin: Admin;
  signIn(credentials: Credential): Promise<void>;
  signOut(): void;
  updateAdmin(admin: Admin): void;
}

interface AuthState {
  token: string;
  admin: Admin;
}

interface IToken {
  payload: {
    exp: number;
  };
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@MagiaPatinacao:token');
    const admin = localStorage.getItem('@MagiaPatinacao:admin');

    if (token && admin) {
      const currentDate = new Date().getTime();
      const decodedToken = decode(token, { complete: true });

      const { payload } = decodedToken as IToken;

      const exp = `${payload.exp}000`;

      if (Number(exp) > currentDate) {
        api.defaults.headers.authorization = `Bearer ${token}`;

        return { token, admin: JSON.parse(admin) };
      }
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions/admin', {
      email,
      password,
    });

    const { token, admin } = response.data;

    localStorage.setItem('@MagiaPatinacao:token', token);
    localStorage.setItem('@MagiaPatinacao:admin', JSON.stringify(admin));

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, admin });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@MagiaPatinacao:token');
    localStorage.removeItem('@MagiaPatinacao:admin');

    setData({} as AuthState);
  }, []);

  const updateAdmin = useCallback(
    (admin: Admin) => {
      localStorage.setItem('@MagiaPatinacao:admin', JSON.stringify(admin));

      setData({
        token: data.token,
        admin,
      });
    },
    [setData, data.token],
  );

  return (
    <AuthContext.Provider
      value={{ admin: data.admin, signIn, signOut, updateAdmin }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
