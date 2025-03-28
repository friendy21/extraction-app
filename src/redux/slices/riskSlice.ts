// src/redux/slices/risksSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define types for risks data
interface SecurityRisk {
  id: string;
  employeeId: string;
  employeeName: string;
  riskLevel: 'high' | 'medium' | 'low';
  riskScore: number;
  activityDescription: string;
  timestamp: string;
}

interface HarassmentMessage {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  severity: 'high' | 'medium' | 'low';
}

interface ComplaintTrend {
  period: string;
  count: number;
}

interface UnwantedBehavior {
  type: string;
  count: number;
  examples: string[];
}

interface RiskDistribution {
  name: string;
  value: number;
}

interface RisksState {
  securityRisks: SecurityRisk[];
  harassmentMessages: HarassmentMessage[];
  complaintTrends: ComplaintTrend[];
  unwantedBehaviors: UnwantedBehavior[];
  riskDistribution: RiskDistribution[];
  loading: {
    securityRisks: boolean;
    harassmentMessages: boolean;
    complaintTrends: boolean;
    unwantedBehaviors: boolean;
    riskDistribution: boolean;
  };
  error: {
    securityRisks: string | null;
    harassmentMessages: string | null;
    complaintTrends: string | null;
    unwantedBehaviors: string | null;
    riskDistribution: string | null;
  };
}

const initialState: RisksState = {
  securityRisks: [],
  harassmentMessages: [],
  complaintTrends: [],
  unwantedBehaviors: [],
  riskDistribution: [],
  loading: {
    securityRisks: false,
    harassmentMessages: false,
    complaintTrends: false,
    unwantedBehaviors: false,
    riskDistribution: false,
  },
  error: {
    securityRisks: null,
    harassmentMessages: null,
    complaintTrends: null,
    unwantedBehaviors: null,
    riskDistribution: null,
  },
};

const risksSlice = createSlice({
  name: 'risks',
  initialState,
  reducers: {
    // Security Risks reducers
    fetchSecurityRisksStart: (state) => {
      state.loading.securityRisks = true;
      state.error.securityRisks = null;
    },
    fetchSecurityRisksSuccess: (state, action: PayloadAction<SecurityRisk[]>) => {
      state.securityRisks = action.payload;
      state.loading.securityRisks = false;
    },
    fetchSecurityRisksFailure: (state, action: PayloadAction<string>) => {
      state.error.securityRisks = action.payload;
      state.loading.securityRisks = false;
    },

    // Harassment Messages reducers
    fetchHarassmentMessagesStart: (state) => {
      state.loading.harassmentMessages = true;
      state.error.harassmentMessages = null;
    },
    fetchHarassmentMessagesSuccess: (state, action: PayloadAction<HarassmentMessage[]>) => {
      state.harassmentMessages = action.payload;
      state.loading.harassmentMessages = false;
    },
    fetchHarassmentMessagesFailure: (state, action: PayloadAction<string>) => {
      state.error.harassmentMessages = action.payload;
      state.loading.harassmentMessages = false;
    },

    // Complaint Trends reducers
    fetchComplaintTrendsStart: (state) => {
      state.loading.complaintTrends = true;
      state.error.complaintTrends = null;
    },
    fetchComplaintTrendsSuccess: (state, action: PayloadAction<ComplaintTrend[]>) => {
      state.complaintTrends = action.payload;
      state.loading.complaintTrends = false;
    },
    fetchComplaintTrendsFailure: (state, action: PayloadAction<string>) => {
      state.error.complaintTrends = action.payload;
      state.loading.complaintTrends = false;
    },

    // Unwanted Behaviors reducers
    fetchUnwantedBehaviorsStart: (state) => {
      state.loading.unwantedBehaviors = true;
      state.error.unwantedBehaviors = null;
    },
    fetchUnwantedBehaviorsSuccess: (state, action: PayloadAction<UnwantedBehavior[]>) => {
      state.unwantedBehaviors = action.payload;
      state.loading.unwantedBehaviors = false;
    },
    fetchUnwantedBehaviorsFailure: (state, action: PayloadAction<string>) => {
      state.error.unwantedBehaviors = action.payload;
      state.loading.unwantedBehaviors = false;
    },

    // Risk Distribution reducers
    fetchRiskDistributionStart: (state) => {
      state.loading.riskDistribution = true;
      state.error.riskDistribution = null;
    },
    fetchRiskDistributionSuccess: (state, action: PayloadAction<RiskDistribution[]>) => {
      state.riskDistribution = action.payload;
      state.loading.riskDistribution = false;
    },
    fetchRiskDistributionFailure: (state, action: PayloadAction<string>) => {
      state.error.riskDistribution = action.payload;
      state.loading.riskDistribution = false;
    },
  },
});

export const {
  fetchSecurityRisksStart,
  fetchSecurityRisksSuccess,
  fetchSecurityRisksFailure,
  fetchHarassmentMessagesStart,
  fetchHarassmentMessagesSuccess,
  fetchHarassmentMessagesFailure,
  fetchComplaintTrendsStart,
  fetchComplaintTrendsSuccess,
  fetchComplaintTrendsFailure,
  fetchUnwantedBehaviorsStart,
  fetchUnwantedBehaviorsSuccess,
  fetchUnwantedBehaviorsFailure,
  fetchRiskDistributionStart,
  fetchRiskDistributionSuccess,
  fetchRiskDistributionFailure,
} = risksSlice.actions;

export default risksSlice.reducer;