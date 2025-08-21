import { createSlice } from "@reduxjs/toolkit";

const callSlice = createSlice({
  name: "call",
  initialState: {
    loading: false, // Indicates if an API call is in progress
    error: null, // Stores any error messages
    scheduledCalls: {
      data: [], // Stores scheduled calls as an array for the current page
      total: 0, // Total number of calls across all pages (for pagination)
      page: 1, // Current page number (from backend response)
      limit: 5, // Items per page (from backend response)
    },
    message: null, // Stores success messages from backend
  },
  reducers: {
    // Action for initiating a health call schedule
    scheduleHealthCallRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    // Action for successful health call scheduling
    scheduleHealthCallSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    // Action for failed health call scheduling
    scheduleHealthCallFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },

    // Action for initiating fetching of scheduled calls
    fetchScheduledCallsRequest: (state, action) => { // 'action' contains page/limit payload
      state.loading = true;
      state.error = null;
      state.message = null;
      // Optionally update state.scheduledCalls.page and limit here
      // state.scheduledCalls.page = action.payload.page || 1;
      // state.scheduledCalls.limit = action.payload.limit || 5;
    },
    // Action for successful fetching of scheduled calls
    fetchScheduledCallsSuccess: (state, action) => {
      state.loading = false;
      // Payload is now expected to be an object: { success, data: callsArray, total, page, limit, etc. }
      state.scheduledCalls.data = action.payload.data;
      state.scheduledCalls.total = action.payload.total;
      state.scheduledCalls.page = action.payload.page;
      state.scheduledCalls.limit = action.payload.limit;
      state.error = null;
    },
    // Action for failed fetching of scheduled calls
    fetchScheduledCallsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },

    // Action for initiating an update to a scheduled call
    updateScheduledCallRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    // Action for successful update of a scheduled call
    updateScheduledCallSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    // Action for failed update of a scheduled call
    updateScheduledCallFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },

    // Action for initiating a deletion of a scheduled call
    deleteScheduledCallRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    // Action for successful deletion of a scheduled call
    deleteScheduledCallSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    // Action for failed deletion of a scheduled call
    deleteScheduledCallFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },

    // Action to clear any success or error messages (for toasts)
    clearCallMessages: (state) => {
      state.error = null;
      state.message = null;
    },
  },
});

export const {
  scheduleHealthCallRequest,
  scheduleHealthCallSuccess,
  scheduleHealthCallFailure,
  fetchScheduledCallsRequest,
  fetchScheduledCallsSuccess,
  fetchScheduledCallsFailure,
  updateScheduledCallRequest,
  updateScheduledCallSuccess,
  updateScheduledCallFailure,
  deleteScheduledCallRequest,
  deleteScheduledCallSuccess,
  deleteScheduledCallFailure,
  clearCallMessages,
} = callSlice.actions;

export default callSlice.reducer;