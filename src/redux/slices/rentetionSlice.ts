// src/redux/slices/retentionSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define types for retention data
interface RetentionRate {
  rate: number;
  industryAverage: number;
  trend: number;
}

interface FlightRiskEmployee {
  id: string;
  name: string;
  risk: number;
  department: string;
  tenure: string;
  factors: string[];
}

interface CommunicationData {
  total: number;
  engagementRate: number;
  trend: number;
  volumeByMonth: {
    month: string;
    volume: number;
  }[];
}

interface SentimentDistribution {
  name: string;
  value: number;
}

interface SentimentData {
  distribution: SentimentDistribution[];
  historicalData: {
    month: string;
    positive: number;
    neutral: number;
    negative: number;
  }[];
  trend: number;
}

interface MeetingData {
  averageMeetings: number;
  averageFocusTime: number;
  optimalBalance: number;
  employeeData: {
    employee: string;
    meetings: number;
    focusTime: number;
  }[];
}

interface RetentionState {
  retentionRate: RetentionRate | null;
  flightRiskEmployees: FlightRiskEmployee[];
  communicationVolume: CommunicationData | null;
  sentimentData: SentimentData | null;
  meetingData: MeetingData | null;
  loading: {
    retentionRate: boolean;
    flightRiskEmployees: boolean;
    communicationVolume: boolean;
    sentimentData: boolean;
    meetingData: boolean;
  };
  error: {
    retentionRate: string | null;
    flightRiskEmployees: string | null;
    communicationVolume: string | null;
    sentimentData: string | null;
    meetingData: string | null;
  };
}

const initialState: RetentionState = {
  retentionRate: null,
  flightRiskEmployees: [],
  communicationVolume: null,
  sentimentData: null,
  meetingData: null,
  loading: {
    retentionRate: false,
    flightRiskEmployees: false,
    communicationVolume: false,
    sentimentData: false,
    meetingData: false,
  },
  error: {
    retentionRate: null,
    flightRiskEmployees: null,
    communicationVolume: null,
    sentimentData: null,
    meetingData: null,
  },
};

const retentionSlice = createSlice({
  name: 'retention',
  initialState,
  reducers: {
    // Retention Rate reducers
    fetchRetentionRateStart: (state) => {
      state.loading.retentionRate = true;
      state.error.retentionRate = null;
    },
    fetchRetentionRateSuccess: (state, action: PayloadAction<RetentionRate>) => {
      state.retentionRate = action.payload;
      state.loading.retentionRate = false;
    },
    fetchRetentionRateFailure: (state, action: PayloadAction<string>) => {
      state.error.retentionRate = action.payload;
      state.loading.retentionRate = false;
    },

    // Flight Risk Employees reducers
    fetchFlightRiskEmployeesStart: (state) => {
      state.loading.flightRiskEmployees = true;
      state.error.flightRiskEmployees = null;
    },
    fetchFlightRiskEmployeesSuccess: (state, action: PayloadAction<FlightRiskEmployee[]>) => {
      state.flightRiskEmployees = action.payload;
      state.loading.flightRiskEmployees = false;
    },
    fetchFlightRiskEmployeesFailure: (state, action: PayloadAction<string>) => {
      state.error.flightRiskEmployees = action.payload;
      state.loading.flightRiskEmployees = false;
    },

    // Communication Volume reducers
    fetchCommunicationVolumeStart: (state) => {
      state.loading.communicationVolume = true;
      state.error.communicationVolume = null;
    },
    fetchCommunicationVolumeSuccess: (state, action: PayloadAction<CommunicationData>) => {
      state.communicationVolume = action.payload;
      state.loading.communicationVolume = false;
    },
    fetchCommunicationVolumeFailure: (state, action: PayloadAction<string>) => {
      state.error.communicationVolume = action.payload;
      state.loading.communicationVolume = false;
    },

    // Sentiment Data reducers
    fetchSentimentDataStart: (state) => {
      state.loading.sentimentData = true;
      state.error.sentimentData = null;
    },
    fetchSentimentDataSuccess: (state, action: PayloadAction<SentimentData>) => {
      state.sentimentData = action.payload;
      state.loading.sentimentData = false;
    },
    fetchSentimentDataFailure: (state, action: PayloadAction<string>) => {
      state.error.sentimentData = action.payload;
      state.loading.sentimentData = false;
    },

    // Meeting Data reducers
    fetchMeetingDataStart: (state) => {
      state.loading.meetingData = true;
      state.error.meetingData = null;
    },
    fetchMeetingDataSuccess: (state, action: PayloadAction<MeetingData>) => {
      state.meetingData = action.payload;
      state.loading.meetingData = false;
    },
    fetchMeetingDataFailure: (state, action: PayloadAction<string>) => {
      state.error.meetingData = action.payload;
      state.loading.meetingData = false;
    },
  },
});

export const {
  fetchRetentionRateStart,
  fetchRetentionRateSuccess,
  fetchRetentionRateFailure,
  fetchFlightRiskEmployeesStart,
  fetchFlightRiskEmployeesSuccess,
  fetchFlightRiskEmployeesFailure,
  fetchCommunicationVolumeStart,
  fetchCommunicationVolumeSuccess,
  fetchCommunicationVolumeFailure,
  fetchSentimentDataStart,
  fetchSentimentDataSuccess,
  fetchSentimentDataFailure,
  fetchMeetingDataStart,
  fetchMeetingDataSuccess,
  fetchMeetingDataFailure,
} = retentionSlice.actions;

export default retentionSlice.reducer;