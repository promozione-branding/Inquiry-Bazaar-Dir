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
      if (typeof window === "undefined") return;

      const saved = localStorage.getItem("location");

      // No saved location
      if (!saved) {
        state.city = defaultCity;
        localStorage.setItem("location", JSON.stringify(defaultCity));
        return;
      }

      try {
        const parsed = JSON.parse(saved);

        // ✅ New format
        if (parsed && typeof parsed === "object" && parsed.name && parsed.id) {
          state.city = parsed;
          return;
        }
      } catch (err) {
        // Ignore JSON parse error (old format)
      }

      // ✅ Old format (e.g. "Delhi")
      const oldCityName = saved;

      const city = {
        name: oldCityName,
        id: oldCityName === "All India"
          ? "all-india" : oldCityName.toLowerCase().replace(/\s+/g, "-"),
      };

      state.city = city;

      // Upgrade old localStorage automatically
      localStorage.setItem("location", JSON.stringify(city));
    },
  },
});

export const { setLocation, initializeLocation } = locationSlice.actions;
export default locationSlice.reducer;