import { createSlice } from "@reduxjs/toolkit";

const callSlice = createSlice({
  name: "call",
  initialState: {
    loading: false,
    error: null,
    scheduledCalls: []
  },
  reducers: {
    scheduleHealthCallRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    scheduleHealthCallSuccess: (state, action) => {
      state.loading = false;
      state.scheduledCalls.push(action.payload);
    },
    scheduleHealthCallFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const {
  scheduleHealthCallRequest,
  scheduleHealthCallSuccess,
  scheduleHealthCallFailure
} = callSlice.actions;

export default callSlice.reducer;