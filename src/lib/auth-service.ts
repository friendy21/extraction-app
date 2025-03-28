// src/lib/auth-service.ts
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

// Create axios instance with defaults
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptor to include auth token in requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If error is 401 and we haven't tried refreshing yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Attempt to refresh the token
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
          // No refresh token, redirect to login
          window.location.href = '/login';
          return Promise.reject(error);
        }
        
        const response = await axios.post(`${API_BASE_URL}/auth/refresh-token`, {
          refreshToken,
        });
        
        const { accessToken } = response.data;
        localStorage.setItem('accessToken', accessToken);
        
        // Update original request authorization header
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        // Refresh token is invalid or expired
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

// Auth methods
export const authService = {
  // Login user
  async login(email: string, password: string) {
    try {
      const response = await api.post('/auth/login', {
        email,
        password,
      });
      
      const { accessToken, refreshToken, user } = response.data;
      
      // Store tokens in localStorage
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      
      return { user };
    } catch (error) {
      throw error;
    }
  },
  
  // Logout user
  async logout() {
    try {
      await api.post('/auth/logout');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    } catch (error) {
      // Still clear tokens even if API fails
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      throw error;
    }
  },
  
  // Check if user is authenticated
  isAuthenticated() {
    const token = localStorage.getItem('accessToken');
    return !!token;
  },
  
  // Refresh token
  async refreshToken() {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }
    
    try {
      const response = await api.post('/auth/refresh-token', {
        refreshToken,
      });
      
      const { accessToken } = response.data;
      localStorage.setItem('accessToken', accessToken);
      
      return { accessToken };
    } catch (error) {
      throw error;
    }
  },
  
  // Get current session
  async getSession() {
    try {
      const response = await api.get('/auth/sessions');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Get user profile
  async getUserProfile() {
    try {
      const response = await api.get('/auth/users/me');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Update user profile
  async updateUserProfile(userData: any) {
    try {
      const response = await api.put('/auth/users/me', userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

// API methods for data fetching
export const apiService = {
  // Generic get method
  async get(endpoint: string) {
    try {
      const response = await api.get(endpoint);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Generic post method
  async post(endpoint: string, data: any) {
    try {
      const response = await api.post(endpoint, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Generic put method
  async put(endpoint: string, data: any) {
    try {
      const response = await api.put(endpoint, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Generic delete method
  async delete(endpoint: string) {
    try {
      const response = await api.delete(endpoint);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default api;