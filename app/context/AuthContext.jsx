import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import apiClient from '../services/apiClient';
import { useRouter } from 'expo-router';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const router = useRouter();

  const [user, setUser] = useState(null);
  const [authTokens, setAuthTokens] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTokens = async () => {
      try {
        const tokens = await AsyncStorage.getItem('authTokens');
        if (tokens) {
          const parsedTokens = JSON.parse(tokens);
          setAuthTokens(parsedTokens);
          setUser(jwtDecode(parsedTokens.access));
        }
      } catch (error) {
        console.error('Failed to load tokens', error);
      } finally {
        setLoading(false);
      }
    };

    loadTokens();
  }, []);

  const loginUser = async (username, password) => {
    try {
      const response = await apiClient.post('api/token/', {
        username,
        password,
      });
      console.log(response.data)
      const data = response.data;
      if (data) {
        await AsyncStorage.setItem('authTokens', JSON.stringify(data));
        setAuthTokens(data);
        setUser(jwtDecode(data.access));
        router.push('/home');
      } else {
        alert('Login failed!');
      }
    } catch (error) {
      alert('Login failed!');
    }
  };

  const logoutUser = async () => {
    await AsyncStorage.removeItem('authTokens');
    setAuthTokens(null);
    setUser(null);
  };

  const updateToken = async () => {
    if (authTokens) {
      try {
        const response = await apiClient.post('api/token/refresh/', {
          refresh: authTokens.refresh,
        });
        if (response.status === 200) {
          const data = response.data;
          await AsyncStorage.setItem('authTokens', JSON.stringify(data));
          setAuthTokens(data);
          setUser(jwtDecode(data.access));
        } else {
          logoutUser();
        }
      } catch (error) {
        logoutUser();
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      updateToken();
    }, 1000 * 60 * 4); // Every 4 minutes

    return () => clearInterval(interval);
  }, [authTokens]);

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};

export default AuthContext;