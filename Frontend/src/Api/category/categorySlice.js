import { Category } from "./categoryService";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getcategory = createAsyncThunk(
    "cat",
    async (thunkAPI) => {
        const response = await Category();
        if (response.status === 'fail') {
            return thunkAPI.rejectWithValue(response.message);
        }
        return response;
    }
);

const initialState = {
    category: null, // User data (null if not logged in)
    loading: false, // Loading state while login request is in progress
    error: null // Error message if login fails
};

const categorySlice = createSlice({
    name: "Category",
    initialState,
    reducers: {
        // Additional reducers can be added here if needed
    },
    extraReducers: (builder) => {
        // Reducer for handling login pending state
        builder.addCase(getcategory.pending, (state) => {
            state.loading = true;
            state.error = null;
        });

        // Reducer for handling successful login
        builder.addCase(getcategory.fulfilled, (state, action) => {
            state.loading = false;
            state.category = action.payload; // Set user data
            state.error = null; // Clear any previous errors
        });

        // Reducer for handling login failure
        builder.addCase(getcategory.rejected, (state, action) => {
            state.loading = false;
            state.category = null; // Clear user data
            state.error = action.payload; // Set error message
        });
    },
});

export default categorySlice.reducer;
