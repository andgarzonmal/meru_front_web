"use client"

import { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import axios from 'axios';

interface AuthContextType {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Restaurar el token desde localStorage cuando la aplicación se monta
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const login = (jwtToken: string) => {
    setToken(jwtToken);
    localStorage.setItem('token', jwtToken);
  };

  const logout = async () => {
    if (token) {
      try {
        await axios.delete('https://meru-back-api.fly.dev/logout', {
          headers: {
            Authorization: `${token}`,
          },
        });
      } catch (error) {
        console.error('Error during logout:', error);
      }
    }
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser utilizado dentro de un AuthProvider');
  }
  return context;
};
