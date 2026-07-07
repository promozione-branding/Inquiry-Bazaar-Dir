import { createSlice } from "@reduxjs/toolkit";

const defaultCity = {
  name: "All India",
  id: "all-india",
};

const initialState = {
  city: defaultCity,
};

const locationSlice = createSlice({
  name: "location",
  initialState,

  reducers: {
    setLocation: (state, action) => {
      state.city = action.payload;

      if (typeof window !== "undefined") {
        localStorage.setItem("location", JSON.stringify(action.payload));
      }
    },

    initializeLocation: (state) => {
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem("location");

        if (saved) {
          state.city = JSON.parse(saved);
        } else {
          state.city = defaultCity;
          localStorage.setItem("location", JSON.stringify(defaultCity));
        }
      }
    },
  },
});

export const { setLocation, initializeLocation } = locationSlice.actions;
export default locationSlice.reducer;