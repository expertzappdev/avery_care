import { createSlice } from "@reduxjs/toolkit";

const callSlice = createSlice({
  name: "call",
  initialState: {
    loading: false, // Indicates if an API call is in progress
    error: null,    // Stores any error messages
    scheduledCalls: {}, // Stores scheduled calls as an object for easy lookup by ID
    message: null,  // Stores success messages from backend
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
      // Adds the new scheduled call to the scheduledCalls object
      state.scheduledCalls[action.payload.scheduledCall._id] = action.payload.scheduledCall;
      state.message = action.payload.message;
    },
    // Action for failed health call scheduling
    scheduleHealthCallFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },

    // Action for initiating fetching of scheduled calls
    fetchScheduledCallsRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    // Action for successful fetching of scheduled calls
    fetchScheduledCallsSuccess: (state, action) => {
      state.loading = false;
      state.scheduledCalls = action.payload; // Payload is the transformed data object from backend
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
      // Updates the specific call in the scheduledCalls object
      state.scheduledCalls[action.payload.data.call._id] = action.payload.data.call;
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
      // Removes the deleted call from the scheduledCalls object
      delete state.scheduledCalls[action.payload.data.deletedCall._id];
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