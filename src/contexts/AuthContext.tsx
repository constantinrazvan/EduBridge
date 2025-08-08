'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthContextType, AuthService, RBACManager } from '@/lib/auth';
import { BaseUser } from '@/types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<BaseUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on mount
    const checkSession = async () => {
      setIsLoading(true);
      try {
        // Check localStorage for saved user session
        const savedUser = localStorage.getItem('edubridge_user');
        if (savedUser) {
          const userData = JSON.parse(savedUser);
          setUser(userData);
          // Update AuthService with the saved user
          AuthService.setCurrentUser(userData);
        }
      } catch (error) {
        console.error('Error checking session:', error);
        // Clear invalid session data
        localStorage.removeItem('edubridge_user');
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const user = await AuthService.login(email, password);
      if (user) {
        setUser(user);
        // Save user to localStorage for session persistence
        localStorage.setItem('edubridge_user', JSON.stringify(user));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
    // Clear user from localStorage
    localStorage.removeItem('edubridge_user');
  };

  const hasPermission = (resource: string, action: string): boolean => {
    if (!user) return false;
    return RBACManager.hasPermission(user, resource, action);
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    hasPermission,
    isLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
