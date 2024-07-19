// filterSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  carat: [],
  fluor: [],
  cut: [],
  polish: [],
  color: [],
  clarity: [],
  lab: [],
  symm: [],
  location: [],
  shape: [],
  // ... other filters
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state[action.payload.filterType] = action.payload.values;
    },
    resetFilters: (state) => {
      return initialState; // Reset all filters to their initial state
    },
  },
});

export const { setFilter, resetFilters } = filterSlice.actions;
export default filterSlice.reducer;
