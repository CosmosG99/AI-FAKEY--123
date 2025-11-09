import React, { createContext, useState, useEffect, ReactNode } from 'react';
import api from '../services/api';
import { AUTH_TOKEN_KEY, USER_DATA_KEY } from '../utils/constants';

export interface User {
  _id: string;
  username: string;
  email: string;
  createdAt?: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user data from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem(AUTH_TOKEN_KEY);
    const storedUser = localStorage.getItem(USER_DATA_KEY);

    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem(AUTH_TOKEN_KEY);
        localStorage.removeItem(USER_DATA_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { data } = response.data;
      
      if (!data || !data.token) {
        throw new Error('Invalid response from server');
      }

      const userData = {
        _id: data._id,
        username: data.name || data.username,
        email: data.email,
        createdAt: new Date().toISOString(),
      };

      localStorage.setItem(AUTH_TOKEN_KEY, data.token);
      localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));

      setToken(data.token);
      setUser(userData);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  };

  const register = async (username: string, email: string, password: string) => {
    try {
      const response = await api.post('/auth/register', { name: username, email, password });
      const { data } = response.data;
      
      if (!data || !data.token) {
        throw new Error('Invalid response from server');
      }

      const userData = {
        _id: data._id,
        username: data.name || data.username,
        email: data.email,
        createdAt: new Date().toISOString(),
      };

      localStorage.setItem(AUTH_TOKEN_KEY, data.token);
      localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));

      setToken(data.token);
      setUser(userData);
    } catch (error: any) {
      // Handle validation errors
      if (error.response?.data?.errors && Array.isArray(error.response.data.errors)) {
        const errorMessages = error.response.data.errors
          .map((err: any) => err.msg || err.message)
          .join(', ');
        throw new Error(errorMessages);
      }
      // Handle other errors
      throw new Error(error.response?.data?.message || error.message || 'Registration failed');
    }
  };

  const logout = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(USER_DATA_KEY);
    setToken(null);
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    login,
    register,
    logout,
    isAuthenticated: !!user && !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
