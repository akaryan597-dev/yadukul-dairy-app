
import React, { createContext, useState, useContext, ReactNode, useCallback, useEffect } from 'react';
import { User } from '../types';
import api from '../services/api';

interface AuthContextType {
  user: (User & { token: string }) | null;
  login: (username: string, pass: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<(User & { token: string }) | null>(null);

  useEffect(() => {
    // Check local storage for user session on initial load
    try {
      const storedUser = localStorage.getItem('dairy_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch {
      setUser(null);
    }
  }, []);

  const login = useCallback(async (username: string, pass: string) => {
    const loggedInUserData = await api.login(username, pass);
    if (loggedInUserData && 'token' in loggedInUserData) {
      const userWithToken = loggedInUserData as User & { token: string };
      setUser(userWithToken);
      localStorage.setItem('dairy_user', JSON.stringify(userWithToken));
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('dairy_user');
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
