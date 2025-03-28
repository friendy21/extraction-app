// src/hooks/use-dashboard-data.ts
'use client'

import { useQuery } from '@tanstack/react-query'
import { apiService } from '@/lib/api-client'

// Dashboard overview data
export function useGlynacScore() {
  return useQuery({
    queryKey: ['glynac-score'],
    queryFn: async () => {
      const { data } = await apiService.getGlynacScore();
      return data;
    }
  });
}

export function useRiskAlerts() {
  return useQuery({
    queryKey: ['risk-alerts'],
    queryFn: async () => {
      const { data } = await apiService.getRiskAlerts();
      return data;
    }
  });
}

export function useSentimentAnalysis() {
  return useQuery({
    queryKey: ['sentiment-analysis'],
    queryFn: async () => {
      const { data } = await apiService.getSentimentAnalysis();
      return data;
    }
  });
}

export function useWorkloadAnalysis() {
  return useQuery({
    queryKey: ['workload-analysis'],
    queryFn: async () => {
      const { data } = await apiService.getWorkloadAnalysis();
      return data;
    }
  });
}

export function useFileActivity() {
  return useQuery({
    queryKey: ['file-activity'],
    queryFn: async () => {
      const { data } = await apiService.getFileActivity();
      return data;
    }
  });
}

export function useEmployeeInsights() {
  return useQuery({
    queryKey: ['employee-insights'],
    queryFn: async () => {
      const { data } = await apiService.getEmployeeInsights();
      return data;
    }
  });
}

// Detail data
export function useEmployeeDetails(id: string | null) {
  return useQuery({
    queryKey: ['employee-details', id],
    queryFn: async () => {
      if (!id) return null;
      const { data } = await apiService.getEmployeeDetails(id);
      return data;
    },
    enabled: !!id
  });
}

export function useHarassmentDetails(id: string | null) {
  return useQuery({
    queryKey: ['harassment-details', id],
    queryFn: async () => {
      if (!id) return null;
      const { data } = await apiService.getAlertDetails(id);
      return data;
    },
    enabled: !!id
  });
}

// Fetch functions for modals
export const fetchEmployeeDetails = async (id: string) => {
  const { data } = await apiService.getEmployeeDetails(id);
  return data;
};

export const fetchHarassmentDetails = async (id: string) => {
  const { data } = await apiService.getAlertDetails(id);
  return data;
};