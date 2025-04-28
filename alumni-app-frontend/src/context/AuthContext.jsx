/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';
import { API_BASE_URL } from '../../config';
import { isTokenExpiringSoon } from '../utils/jwtHelper';
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tokenExpiring, setTokenExpiring] = useState(false);
  const [showExpirationAlert, setShowExpirationAlert] = useState(false);
  
  // Check existing token on load
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(`${API_BASE_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
          credentials: 'include'
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        } else {
          // token invalid or expired
          localStorage.removeItem('accessToken');
          setAccessToken(null);
        }
      } catch (err) {
        console.error('Auth check failed:', err);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  // Set up token expiration monitoring
  useEffect(() => {
    if (!accessToken) {
      setTokenExpiring(false);
      setShowExpirationAlert(false);
      return;
    }

    // Check token expiration every 60 seconds
    const checkInterval = setInterval(() => {
      if (isTokenExpiringSoon(accessToken, 300)) { // 5 minutes warning
        setTokenExpiring(true);
        setShowExpirationAlert(true);
      } else {
        setTokenExpiring(false);
      }
    }, 60000);

    // Initial check
    if (isTokenExpiringSoon(accessToken, 300)) {
      setTokenExpiring(true);
      setShowExpirationAlert(true);
    }

    return () => clearInterval(checkInterval);
  }, [accessToken]);

  // Function to refresh the token
  const refreshToken = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
        method: 'POST',
        credentials: 'include',
      });
      
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('accessToken', data.accessToken);
        setAccessToken(data.accessToken);
        setTokenExpiring(false);
        setShowExpirationAlert(false);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Token refresh failed:', error);
      return false;
    }
  };

  // Function to dismiss the expiration alert
  const dismissExpirationAlert = () => {
    setShowExpirationAlert(false);
  };

  // LOGIN: save token and fetch user
  const login = async (email, password) => {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type':'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) return { success: false, error: data.message };
    
    localStorage.setItem('accessToken', data.accessToken);
    setAccessToken(data.accessToken);

    // now fetch /auth/me with header
    const userRes = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${data.accessToken}` },
      credentials: 'include'
    });
    if (userRes.ok) {
      setUser(await userRes.json());
      return { success: true };
    }
    return { success: false, error: 'Failed to fetch user' };
  };

  // LOGOUT: clear token + user
  const logout = async () => {
    await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST', credentials: 'include'
    });
    localStorage.removeItem('accessToken');
    setAccessToken(null);
    setUser(null);
  };

  // Signup function
  const signup = async (userData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        return { success: false, error: data.message || 'Signup failed' };
      }
      
      return { 
        success: true, 
        message: 'Account created successfully. Please wait for admin approval.' 
      };
      
    } catch (err) {
      console.error('Signup error:', err);
      return { success: false, error: 'Signup request failed' };
    }
  };

  // Update profile function
  const updateProfile = async (profileData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(profileData)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        return { success: false, error: data.message || 'Profile update failed' };
      }
      
      setUser({...user, ...data});
      return { success: true };
      
    } catch (err) {
      console.error('Profile update error:', err);
      return { success: false, error: 'Profile update request failed' };
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      accessToken,
      loading,
      tokenExpiring,
      showExpirationAlert,
      login,
      logout,
      signup,
      updateProfile,
      refreshToken,
      dismissExpirationAlert
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}