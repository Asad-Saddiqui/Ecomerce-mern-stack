import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import profileService from "./profileServices";

export const profileGet = createAsyncThunk(
    "profile",
    async (_, thunkAPI) => {
        try {
            const response = await profileService.profile();
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    }
);

export const updateProfile = createAsyncThunk(
    "profile/update",
    async (data, thunkAPI) => {
        try {
            const response = await profileService.updateprofileUser(data);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    }
);
export const resetState = createAction("Reset_all");

const initialState = {
    profile: null,
    loading: false,
    error: null,
    success: false
};

const profileSlice = createSlice({
    name: "Profile",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(profileGet.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(profileGet.fulfilled, (state, action) => {
                state.loading = false;
                state.profile = action.payload;
                state.error = null;
            })
            .addCase(profileGet.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; // Corrected to access error property
            })
            .addCase(updateProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.error; // Corrected to access error property
            })
            .addCase(resetState, () => initialState);

    },
});

export default profileSlice.reducer;
