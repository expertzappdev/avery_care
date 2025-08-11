// redux/familySlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  familyMembers: [],
  selectedFamilyMember: null, // ✅ for detail page
  loading: false,
  error: null,
};

const familySlice = createSlice({
  name: "family",
  initialState,
  reducers: {
    fetchFamilyMembersRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchFamilyMembersSuccess: (state, action) => {
      state.loading = false;
      state.familyMembers = action.payload;
      state.error = null;
    },
    fetchFamilyMembersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    addFamilyMemberRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    addFamilyMemberSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },
    addFamilyMemberFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    deleteFamilyMemberRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteFamilyMemberSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },
    deleteFamilyMemberFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    updateFamilyMemberRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateFamilyMemberSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      // update in list
      const index = state.familyMembers.findIndex((m) => m._id === action.payload._id);
      if (index !== -1) {
        state.familyMembers[index] = action.payload;
      }
      state.selectedFamilyMember = action.payload; // update selected
    },
    updateFamilyMemberFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    setSelectedFamilyMember: (state, action) => {
      state.selectedFamilyMember = action.payload;
    },
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
  updateFamilyMemberRequest,
  updateFamilyMemberSuccess,
  updateFamilyMemberFailure,
  setSelectedFamilyMember,
} = familySlice.actions;

export default familySlice.reducer;
