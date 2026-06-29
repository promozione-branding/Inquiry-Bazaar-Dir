import { createSlice } from "@reduxjs/toolkit";
const initialState = { city: "All India" };

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
        const savedLocation = localStorage.getItem("location");
        state.city = savedLocation || "Delhi";

        if (!savedLocation) {
          localStorage.setItem("location", "All India");
        }
      }
    },
  },
});

export const { setLocation, initializeLocation, } = locationSlice.actions;
export default locationSlice.reducer;