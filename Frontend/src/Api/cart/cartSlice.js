import { AddtoCart, getCart } from "./cartService";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const _addtocart = createAsyncThunk(
    "addtocart",
    async (data, thunkAPI) => {
        const response = await AddtoCart(data);
        if (response.status === 'fail') {
            return thunkAPI.rejectWithValue(response.message);
        }
        return response;
    }
);
export const _carts = createAsyncThunk(
    "carts",
    async (thunkAPI) => {
        const response = await getCart();
        if (response.status === 'fail') {
            return thunkAPI.rejectWithValue(response.message);
        }
        return response;
    }
);

const initialState = {
    addtocart: null, // User data (null if not logged in)
    carts: null,
    loading: false, // Loading state while login request is in progress
    error: null // Error message if login fails
};

const addtocartSlice = createSlice({
    name: "addtocarts",
    initialState,
    reducers: {
        // Additional reducers can be added here if needed
    },
    extraReducers: (builder) => {
        // Reducer for handling login pending state
        builder.addCase(_addtocart.pending, (state) => {
            state.loading = true;
            state.error = null;
        });

        // Reducer for handling successful login
        builder.addCase(_addtocart.fulfilled, (state, action) => {
            state.loading = false;
            state.addtocart = action.payload; // Set user data
            state.error = null; // Clear any previous errors
        });

        // Reducer for handling login failure
        builder.addCase(_addtocart.rejected, (state, action) => {
            state.loading = false;
            state.addtocart = null; // Clear user data
            state.error = action.payload; // Set error message
        });
    },
    extraReducers: (builder) => {
        // Reducer for handling login pending state
        builder.addCase(_carts.pending, (state) => {
            state.loading = true;
            state.error = null;
        });

        // Reducer for handling successful login
        builder.addCase(_carts.fulfilled, (state, action) => {
            state.loading = false;
            state.carts = action.payload; // Set user data
            state.error = null; // Clear any previous errors
        });

        // Reducer for handling login failure
        builder.addCase(_carts.rejected, (state, action) => {
            state.loading = false;
            state.carts = null; // Clear user data
            state.error = action.payload; // Set error message
        });
    },
});

export default addtocartSlice.reducer;
