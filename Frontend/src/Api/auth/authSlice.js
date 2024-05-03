import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService"; // Import your authentication service

export const loginUser = createAsyncThunk(
    "auth",
    async (userData, thunkAPI) => {
        const response = await authService.login(userData);
        if (response.status === 'fail') {
            return thunkAPI.rejectWithValue(response.message);
        }
        return response;
    }
);
export const signupUser = createAsyncThunk(
    "auth",
    async (userData, thunkAPI) => {
        const response = await authService.signup(userData);
        if (response.status === 'fail') {
            return thunkAPI.rejectWithValue(response.message);
        }
        return response;
    }
);
export const profileuser = createAsyncThunk(
    "auth",
    async (thunkAPI) => {
        const response = await authService.profile();
        if (response.status === 'fail') {
            return thunkAPI.rejectWithValue(response.message);
        }
        return response;
    }
);
export const usercart_ = createAsyncThunk(
    "cart",
    async (thunkAPI) => {
        const response = await authService.usercartGet();
        if (response.status === 'fail') {
            return thunkAPI.rejectWithValue(response.message);
        }
        console.log({response})
        return response;
    }
);

const initialState = {
    user: null, // User data (null if not logged in)
    signupuser: null, // User data (null if not logged in)
    loading: false, // Loading state while login request is in progress
    profile: null,
    usercart: null,
    error: null // Error message if login fails
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // Additional reducers can be added here if needed
    },
    extraReducers: (builder) => {
        // Reducer for handling login pending state
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        });

        // Reducer for handling successful login
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload; // Set user data
            state.error = null; // Clear any previous errors
        });

        // Reducer for handling login failure
        builder.addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.user = null; // Clear user data
            state.error = action.payload; // Set error message
        });
    },
    extraReducers: (builder) => {
        // Reducer for handling login pending state
        builder.addCase(profileuser.pending, (state) => {
            state.loading = true;
            state.error = null;
        });

        // Reducer for handling successful login
        builder.addCase(profileuser.fulfilled, (state, action) => {
            state.loading = false;
            state.profile = action.payload; // Set user data
            state.error = null; // Clear any previous errors
        });

        // Reducer for handling login failure
        builder.addCase(profileuser.rejected, (state, action) => {
            state.loading = false;
            state.profile = null; // Clear user data
            state.error = action.payload; // Set error message
        });
    },
    extraReducers: (builder) => {
        // Reducer for handling login pending state
        builder.addCase(usercart_.pending, (state) => {
            state.loading = true;
            state.error = null;
        });

        // Reducer for handling successful login
        builder.addCase(usercart_.fulfilled, (state, action) => {
            state.loading = false;
            state.usercart = action.payload; // Set user data
            state.error = null; // Clear any previous errors
        });

        // Reducer for handling login failure
        builder.addCase(profileuser.rejected, (state, action) => {
            state.loading = false;
            state.usercart = null; // Clear user data
            state.error = action.payload; // Set error message
        });
    },
    extraReducers: (builder) => {
        // Reducer for handling login pending state
        builder.addCase(signupUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        });

        // Reducer for handling successful login
        builder.addCase(signupUser.fulfilled, (state, action) => {
            state.loading = false;
            state.signupuser = action.payload; // Set user data
            state.error = null; // Clear any previous errors
        });

        // Reducer for handling login failure
        builder.addCase(profileuser.rejected, (state, action) => {
            state.loading = false;
            state.signupuser = null; // Clear user data
            state.error = action.payload; // Set error message
        });
    },
});

export default authSlice.reducer;
