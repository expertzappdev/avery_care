import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  familyMembers: [],
  loading: false,
  error: null,
  // ❌ Removed successMessage from initial state
};

const familySlice = createSlice({
  name: "family",
  initialState,
  reducers: {
    fetchFamilyMembersRequest: (state) => {
      state.loading = true;
      state.error = null; // Clear previous error
      // ❌ Removed successMessage clearing
    },
    fetchFamilyMembersSuccess: (state, action) => {
      state.loading = false;
      state.familyMembers = action.payload;
      state.error = null;
      // ❌ Removed successMessage setting
    },
    fetchFamilyMembersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      // ❌ Removed successMessage clearing
    },

    addFamilyMemberRequest: (state) => {
      state.loading = true;
      state.error = null;
      // ❌ Removed successMessage clearing
    },
    addFamilyMemberSuccess: (state) => {
      state.loading = false;
      state.error = null;
      // ❌ Removed successMessage setting
    },
    addFamilyMemberFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      // ❌ Removed successMessage clearing
    },

    deleteFamilyMemberRequest: (state) => {
      state.loading = true;
      state.error = null;
      // ❌ Removed successMessage clearing
    },
    deleteFamilyMemberSuccess: (state) => {
      state.loading = false;
      state.error = null;
      // ❌ Removed successMessage setting
    },
    deleteFamilyMemberFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      // ❌ Removed successMessage clearing
    },
    // ❌ Removed clearMessages reducer
    // clearMessages: (state) => {
    //   state.error = null;
    //   state.successMessage = null;
    // }
  },
});

export const {
  fetchFamilyMembersRequest,
  fetchFamilyMembersSuccess,
  fetchFamilyMembersFailure,
  addFamilyMemberRequest,
  addFamilyMemberSuccess,
  addFamilyMemberFailure,
  deleteFamilyMemberRequest,
  deleteFamilyMemberSuccess,
  deleteFamilyMemberFailure,
  // ❌ Removed clearMessages export
} = familySlice.actions;

export default familySlice.reducer; // ✅ Corrected from Slice.reducer