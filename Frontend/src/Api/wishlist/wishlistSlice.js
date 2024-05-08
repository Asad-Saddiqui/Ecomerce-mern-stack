import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addToWishlist, removeFromWishlist, getWishlist } from "./wishlistService";

// Async thunk for adding a product to the wishlist
export const addProductToWishlist = createAsyncThunk(
    'wishlist/addProductToWishlist',
    async (productId, thunkAPI) => {
        try {
            const response = await addToWishlist(productId);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    }
);

// Async thunk for removing a product from the wishlist
export const removeProductFromWishlist = createAsyncThunk(
    'wishlist/removeProductFromWishlist',
    async (productId, thunkAPI) => {
        try {
            const response = await removeFromWishlist(productId);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    }
);

// Async thunk for fetching the user's wishlist
export const fetchWishlist = createAsyncThunk(
    'wishlist/fetchWishlist',
    async (_, thunkAPI) => {
        try {
            const response = await getWishlist();
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    }
);

// Initial state for the wishlist slice
const initialState = {
    wishlist:null,
    loading: false,
    error: null,
};

// Wishlist slice definition
const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addProductToWishlist.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addProductToWishlist.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                // Update the wishlist state if needed based on the API response
            })
            .addCase(addProductToWishlist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.error;
            })
            .addCase(removeProductFromWishlist.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeProductFromWishlist.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                // Update the wishlist state if needed based on the API response
            })
            .addCase(removeProductFromWishlist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.error;
            })
            .addCase(fetchWishlist.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchWishlist.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.wishlist = action.payload;
            })
            .addCase(fetchWishlist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.error;
            });
    },
});

export default wishlistSlice.reducer;
