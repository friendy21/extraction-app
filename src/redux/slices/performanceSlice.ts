// src/redux/slices/performanceSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define types for performance data
interface PerformanceDrag {
  employee: string;
  negativity: number;
  responseTime: number;
  size: number;
}

interface EfficiencyScore {
  taskCompletionRate: number;
  avgResponseTime: number;
  meetingOverload: number;
}

interface UntappedTalent {
  employee: string;
  skillScore: number;
  complaints: number;
}

interface ResponseTime {
  employee: string;
  avgResponse: number;
  benchmark: number;
}

interface NegativeCommunication {
  employee: string;
  negativePercentage: number;
}

interface OverdueTasks {
  employee: string;
  count: number;
}

interface RepeatedTopic {
  topic: string;
  count: number;
}

interface PerformanceState {
  performanceDrags: PerformanceDrag[];
  efficiencyScore: EfficiencyScore | null;
  untappedTalent: UntappedTalent[];
  responseTimes: ResponseTime[];
  negativeCommunication: NegativeCommunication[];
  overdueTasks: OverdueTasks[];
  repeatedTopics: RepeatedTopic[];
  loading: {
    performanceDrags: boolean;
    efficiencyScore: boolean;
    untappedTalent: boolean;
    responseTimes: boolean;
    negativeCommunication: boolean;
    overdueTasks: boolean;
    repeatedTopics: boolean;
  };
  error: {
    performanceDrags: string | null;
    efficiencyScore: string | null;
    untappedTalent: string | null;
    responseTimes: string | null;
    negativeCommunication: string | null;
    overdueTasks: string | null;
    repeatedTopics: string | null;
  };
}

const initialState: PerformanceState = {
  performanceDrags: [],
  efficiencyScore: null,
  untappedTalent: [],
  responseTimes: [],
  negativeCommunication: [],
  overdueTasks: [],
  repeatedTopics: [],
  loading: {
    performanceDrags: false,
    efficiencyScore: false,
    untappedTalent: false,
    responseTimes: false,
    negativeCommunication: false,
    overdueTasks: false,
    repeatedTopics: false,
  },
  error: {
    performanceDrags: null,
    efficiencyScore: null,
    untappedTalent: null,
    responseTimes: null,
    negativeCommunication: null,
    overdueTasks: null,
    repeatedTopics: null,
  },
};

const performanceSlice = createSlice({
  name: 'performance',
  initialState,
  reducers: {
    // Performance Drags reducers
    fetchPerformanceDragsStart: (state) => {
      state.loading.performanceDrags = true;
      state.error.performanceDrags = null;
    },
    fetchPerformanceDragsSuccess: (state, action: PayloadAction<PerformanceDrag[]>) => {
      state.performanceDrags = action.payload;
      state.loading.performanceDrags = false;
    },
    fetchPerformanceDragsFailure: (state, action: PayloadAction<string>) => {
      state.error.performanceDrags = action.payload;
      state.loading.performanceDrags = false;
    },

    // Efficiency Score reducers
    fetchEfficiencyScoreStart: (state) => {
      state.loading.efficiencyScore = true;
      state.error.efficiencyScore = null;
    },
    fetchEfficiencyScoreSuccess: (state, action: PayloadAction<EfficiencyScore>) => {
      state.efficiencyScore = action.payload;
      state.loading.efficiencyScore = false;
    },
    fetchEfficiencyScoreFailure: (state, action: PayloadAction<string>) => {
      state.error.efficiencyScore = action.payload;
      state.loading.efficiencyScore = false;
    },

    // Untapped Talent reducers
    fetchUntappedTalentStart: (state) => {
      state.loading.untappedTalent = true;
      state.error.untappedTalent = null;
    },
    fetchUntappedTalentSuccess: (state, action: PayloadAction<UntappedTalent[]>) => {
      state.untappedTalent = action.payload;
      state.loading.untappedTalent = false;
    },
    fetchUntappedTalentFailure: (state, action: PayloadAction<string>) => {
      state.error.untappedTalent = action.payload;
      state.loading.untappedTalent = false;
    },

    // Response Times reducers
    fetchResponseTimesStart: (state) => {
      state.loading.responseTimes = true;
      state.error.responseTimes = null;
    },
    fetchResponseTimesSuccess: (state, action: PayloadAction<ResponseTime[]>) => {
      state.responseTimes = action.payload;
      state.loading.responseTimes = false;
    },
    fetchResponseTimesFailure: (state, action: PayloadAction<string>) => {
      state.error.responseTimes = action.payload;
      state.loading.responseTimes = false;
    },

    // Negative Communication reducers
    fetchNegativeCommunicationStart: (state) => {
      state.loading.negativeCommunication = true;
      state.error.negativeCommunication = null;
    },
    fetchNegativeCommunicationSuccess: (state, action: PayloadAction<NegativeCommunication[]>) => {
      state.negativeCommunication = action.payload;
      state.loading.negativeCommunication = false;
    },
    fetchNegativeCommunicationFailure: (state, action: PayloadAction<string>) => {
      state.error.negativeCommunication = action.payload;
      state.loading.negativeCommunication = false;
    },

    // Overdue Tasks reducers
    fetchOverdueTasksStart: (state) => {
      state.loading.overdueTasks = true;
      state.error.overdueTasks = null;
    },
    fetchOverdueTasksSuccess: (state, action: PayloadAction<OverdueTasks[]>) => {
      state.overdueTasks = action.payload;
      state.loading.overdueTasks = false;
    },
    fetchOverdueTasksFailure: (state, action: PayloadAction<string>) => {
      state.error.overdueTasks = action.payload;
      state.loading.overdueTasks = false;
    },

    // Repeated Topics reducers
    fetchRepeatedTopicsStart: (state) => {
      state.loading.repeatedTopics = true;
      state.error.repeatedTopics = null;
    },
    fetchRepeatedTopicsSuccess: (state, action: PayloadAction<RepeatedTopic[]>) => {
      state.repeatedTopics = action.payload;
      state.loading.repeatedTopics = false;
    },
    fetchRepeatedTopicsFailure: (state, action: PayloadAction<string>) => {
      state.error.repeatedTopics = action.payload;
      state.loading.repeatedTopics = false;
    },
  },
});

export const {
  fetchPerformanceDragsStart,
  fetchPerformanceDragsSuccess,
  fetchPerformanceDragsFailure,
  fetchEfficiencyScoreStart,
  fetchEfficiencyScoreSuccess,
  fetchEfficiencyScoreFailure,
  fetchUntappedTalentStart,
  fetchUntappedTalentSuccess,
  fetchUntappedTalentFailure,
  fetchResponseTimesStart,
  fetchResponseTimesSuccess,
  fetchResponseTimesFailure,
  fetchNegativeCommunicationStart,
  fetchNegativeCommunicationSuccess,
  fetchNegativeCommunicationFailure,
  fetchOverdueTasksStart,
  fetchOverdueTasksSuccess,
  fetchOverdueTasksFailure,
  fetchRepeatedTopicsStart,
  fetchRepeatedTopicsSuccess,
  fetchRepeatedTopicsFailure,
} = performanceSlice.actions;

export default performanceSlice.reducer;