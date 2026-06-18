import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    loading: false,
};

const userSlice = createSlice({
    name: "user",

    initialState,

    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },

        clearUser: (state) => {
            state.user = null;
        },

        setLoading: (state, action) => {
            state.loading = action.payload;
        },

        initializeUser: (state) => {
            if (typeof window !== "undefined") {
                const savedUser =
                    localStorage.getItem("user");

                state.user = savedUser
                    ? JSON.parse(savedUser)
                    : null;
            }
        },
    },
});

export const {
    setUser,
    clearUser,
    setLoading,
    initializeUser,
} = userSlice.actions;

export default userSlice.reducer;