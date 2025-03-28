// src/redux/api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ 
    baseUrl: '/api/',
    prepareHeaders: (headers, { getState }) => {
      // You can include auth tokens here if needed
      return headers;
    },
  }),
  tagTypes: ['User', 'Dashboard', 'Performance', 'Retention', 'Risks'],
  endpoints: (builder) => ({
    // Auth endpoints
    login: builder.mutation({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: 'auth/logout',
        method: 'POST',
      }),
    }),
    
    // Dashboard endpoints
    getGlynacScore: builder.query({
      query: () => 'dashboard/glynac-score',
      providesTags: ['Dashboard'],
    }),
    getRiskAlerts: builder.query({
      query: () => 'dashboard/risk-alerts',
      providesTags: ['Dashboard', 'Risks'],
    }),
    getSentimentAnalysis: builder.query({
      query: () => 'dashboard/sentiment-analysis',
      providesTags: ['Dashboard'],
    }),
    getWorkloadAnalysis: builder.query({
      query: () => 'dashboard/workload-analysis',
      providesTags: ['Dashboard'],
    }),
    getFileActivity: builder.query({
      query: () => 'dashboard/file-activity',
      providesTags: ['Dashboard'],
    }),
    getEmployeeInsights: builder.query({
      query: () => 'dashboard/employee-insights',
      providesTags: ['Dashboard'],
    }),
    
    // Employee details
    getEmployeeDetails: builder.query({
      query: (id) => `employees/${id}`,
      providesTags: (result, error, id) => [{ type: 'User', id }],
    }),
    
    // Alert details
    getAlertDetails: builder.query({
      query: (id) => `alerts/${id}`,
      providesTags: (result, error, id) => [{ type: 'Risks', id }],
    }),
    
    // Performance endpoints
    getPerformanceDrags: builder.query({
      query: () => 'performance/drags',
      providesTags: ['Performance'],
    }),
    getEfficiencyScore: builder.query({
      query: () => 'performance/efficiency',
      providesTags: ['Performance'],
    }),
    getResponseTimes: builder.query({
      query: () => 'performance/response-times',
      providesTags: ['Performance'],
    }),
    getNegativeCommunication: builder.query({
      query: () => 'performance/negative-communication',
      providesTags: ['Performance'],
    }),
    getOverdueTasks: builder.query({
      query: () => 'performance/overdue-tasks',
      providesTags: ['Performance'],
    }),
    
    // Retention endpoints
    getRetentionRate: builder.query({
      query: () => 'retention/rate',
      providesTags: ['Retention'],
    }),
    getFlightRiskEmployees: builder.query({
      query: () => 'retention/flight-risk',
      providesTags: ['Retention'],
    }),
    getCommunicationVolume: builder.query({
      query: () => 'retention/communication',
      providesTags: ['Retention'],
    }),
    getRetentionSentiment: builder.query({
      query: () => 'retention/sentiment',
      providesTags: ['Retention'],
    }),
    getMeetingLoad: builder.query({
      query: () => 'retention/meetings',
      providesTags: ['Retention'],
    }),
    
    // Risk endpoints
    getSecurityRisks: builder.query({
      query: () => 'risks/security',
      providesTags: ['Risks'],
    }),
    getHarassmentMessages: builder.query({
      query: () => 'risks/harassment',
      providesTags: ['Risks'],
    }),
    getComplaintTrends: builder.query({
      query: () => 'risks/complaints',
      providesTags: ['Risks'],
    }),
  }),
});

export const {
  // Auth exports
  useLoginMutation,
  useLogoutMutation,
  
  // Dashboard exports
  useGetGlynacScoreQuery,
  useGetRiskAlertsQuery,
  useGetSentimentAnalysisQuery,
  useGetWorkloadAnalysisQuery,
  useGetFileActivityQuery,
  useGetEmployeeInsightsQuery,
  
  // Employee details exports
  useGetEmployeeDetailsQuery,
  
  // Alert details exports
  useGetAlertDetailsQuery,
  
  // Performance exports
  useGetPerformanceDragsQuery,
  useGetEfficiencyScoreQuery,
  useGetResponseTimesQuery,
  useGetNegativeCommunicationQuery,
  useGetOverdueTasksQuery,
  
  // Retention exports
  useGetRetentionRateQuery,
  useGetFlightRiskEmployeesQuery,
  useGetCommunicationVolumeQuery,
  useGetRetentionSentimentQuery,
  useGetMeetingLoadQuery,
  
  // Risk exports
  useGetSecurityRisksQuery,
  useGetHarassmentMessagesQuery,
  useGetComplaintTrendsQuery,
} = api;