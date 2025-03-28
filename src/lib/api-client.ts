// src/lib/api-client.ts
import axios from 'axios';

// Create a base axios instance with defaults
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
apiClient.interceptors.request.use(
  (config) => {
    // You can add authentication token here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Global error handling
    console.error('API request failed:', error);
    return Promise.reject(error);
  }
);

// API service functions
export const apiService = {
  // Auth
  login: async (credentials: { email: string; password: string }) => {
    return apiClient.post('/auth/login', credentials);
  },

  // Dashboard data
  getGlynacScore: async () => {
    return apiClient.get('/dashboard/glynac-score');
  },
  getRiskAlerts: async () => {
    return apiClient.get('/dashboard/risk-alerts');
  },
  getSentimentAnalysis: async () => {
    return apiClient.get('/dashboard/sentiment-analysis');
  },
  getWorkloadAnalysis: async () => {
    return apiClient.get('/dashboard/workload-analysis');
  },
  getFileActivity: async () => {
    return apiClient.get('/dashboard/file-activity');
  },
  getEmployeeInsights: async () => {
    return apiClient.get('/dashboard/employee-insights');
  },

  // Employee details
  getEmployeeDetails: async (employeeId: string) => {
    return apiClient.get(`/employees/${employeeId}`);
  },

  // Risk management
  getAlertDetails: async (alertId: string) => {
    return apiClient.get(`/alerts/${alertId}`);
  },
  getSecurityRisks: async () => {
    return apiClient.get('/risks/security');
  },
  getHarassmentMessages: async () => {
    return apiClient.get('/risks/harassment');
  },
  getComplaintTrends: async () => {
    return apiClient.get('/risks/complaints');
  },

  // Performance data
  getPerformanceDrags: async () => {
    return apiClient.get('/performance/drags');
  },
  getEfficiencyScore: async () => {
    return apiClient.get('/performance/efficiency');
  },
  getResponseTimes: async () => {
    return apiClient.get('/performance/response-times');
  },
  getNegativeCommunication: async () => {
    return apiClient.get('/performance/negative-communication');
  },
  getOverdueTasks: async () => {
    return apiClient.get('/performance/overdue-tasks');
  },

  // Retention data
  getRetentionRate: async () => {
    return apiClient.get('/retention/rate');
  },
  getFlightRiskEmployees: async () => {
    return apiClient.get('/retention/flight-risk');
  },
  getCommunicationVolume: async () => {
    return apiClient.get('/retention/communication');
  },
  getRetentionSentiment: async () => {
    return apiClient.get('/retention/sentiment');
  },
  getMeetingLoad: async () => {
    return apiClient.get('/retention/meetings');
  },
};

export default apiClient;