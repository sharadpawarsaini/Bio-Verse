import axios from 'axios';
import type { InternalAxiosRequestConfig } from 'axios';

const API_URL = 'http://localhost:5000/api';

interface AuthResponse {
  message: string;
  token?: string;
  userId?: string;
}

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const authService = {
  async register(email: string, password: string) {
    try {
      console.log('Attempting registration for:', email);
      const response = await api.post<AuthResponse>('/register', { email, password });
      console.log('Registration response:', response.data);
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.userId || '');
      }
      return response.data;
    } catch (error: any) {
      console.error('Registration error:', error.response?.data || error.message);
      throw error;
    }
  },

  async login(email: string, password: string) {
    try {
      console.log('Attempting login for:', email);
      const response = await api.post<AuthResponse>('/login', { email, password });
      console.log('Login response:', response.data);
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.userId || '');
      }
      return response.data;
    } catch (error: any) {
      console.error('Login error:', error.response?.data || error.message);
      throw error;
    }
  },

  logout() {
    console.log('Logging out user');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  },

  async getUserProfile(userId: string) {
    try {
      const response = await api.get(`/user/${userId}`);
      return response.data;
    } catch (error: any) {
      console.error('Get user profile error:', error.response?.data || error.message);
      throw error;
    }
  },

  getCurrentUser() {
    return localStorage.getItem('userId');
  },

  isAuthenticated() {
    const token = localStorage.getItem('token');
    return !!token;
  }
};

export default api; 