import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import profile_ from "./profileServices";


const initialState = {
    user: null,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
};

export const resetStateProfile = createAction("Reset_all");

export const profile__ = createAsyncThunk(
    "profile",
    async (thunkAPI) => {
        try {
            return await profile_.profile();
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);
export const updateProfile = createAsyncThunk(
    "updateprofile",
    async (userdata, thunkAPI) => {
        try {

            return await profile_.updateprofile(userdata);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const profileSlice = createSlice({
    name: "profile",
    initialState: initialState,
    reducers: {},
    extraReducers: (buildeer) => {
        buildeer
            .addCase(profile__.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(profile__.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
                state.message = "success";
            })
            .addCase(profile__.rejected, (state, action) => {
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                state.isLoading = false;
            })
            .addCase(updateProfile.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.message = "Profile updated successfully.";
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error.message;
                state.isLoading = false;
            })
            .addCase(resetStateProfile, () => initialState);


    },
});

export default profileSlice.reducer;
