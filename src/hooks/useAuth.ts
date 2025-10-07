import { useState, useEffect } from 'react';
import { AuthService, UserData } from '../services/authService';

export const useAuth = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = AuthService.validateTokenFromShell();
    
    if (userData) {
      setUser(userData);
      console.log('✅ SSO Login successful:', userData);
    } else {
      const storedUser = AuthService.getUserData();
      if (storedUser) {
        setUser(storedUser);
      }
    }
    
    setLoading(false);
  }, []);

  const logout = () => {
    AuthService.logout();
    setUser(null);
  };

  return {
    user,
    loading,
    isAuthenticated: !!user,
    logout
  };
};
