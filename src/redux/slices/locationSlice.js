// redux/slices/locationSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  city: "Delhi",
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setLocation: (state, action) => {
      state.city = action.payload;

      if (typeof window !== "undefined") {
        localStorage.setItem("location", action.payload);
      }
    },

    initializeLocation: (state) => {
      if (typeof window !== "undefined") {
        state.city = localStorage.getItem("location");
      }
    },
  },
});

export const { setLocation, initializeLocation } = locationSlice.actions;
export default locationSlice.reducer;