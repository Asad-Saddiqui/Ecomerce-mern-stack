import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AddtoCart, AddtocartUpdate, getCart, deletecart } from "./cartService";

export const _addtocart = createAsyncThunk(
    "addtocart",
    async (data, thunkAPI) => {
        try {
            const response = await AddtoCart(data);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    }
);

export const _addtocartUpdate = createAsyncThunk(
    "_addtocartUpdate",
    async (data, thunkAPI) => {
        try {
            const response = await AddtocartUpdate(data);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    }
);

export const _carts = createAsyncThunk(
    "carts",
    async (_, thunkAPI) => {
        try {
            const response = await getCart();
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    }
);

export const _deletecart = createAsyncThunk(
    "deletecart",
    async (id, thunkAPI) => {
        try {
            const response = await deletecart(id);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    }
);

const initialState = {
    addtocart: null,
    carts: null,
    loading: false,
    error: null,
    success: false
};

const addtocartSlice = createSlice({
    name: "addtocarts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(_addtocart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(_addtocart.fulfilled, (state, action) => {
                state.loading = false;
                state.addtocart = action.payload;
                state.error = null;
            })
            .addCase(_addtocart.rejected, (state, action) => {
                state.loading = false;
                state.addtocart = null;
                state.error = action.payload.error;
            })
            .addCase(_addtocartUpdate.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(_addtocartUpdate.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
                state.error = null;
            })
            .addCase(_addtocartUpdate.rejected, (state, action) => {
                state.loading = false;
                state.addtocart = null;
                state.success = false;
                state.error = action.payload.error;
            })
            .addCase(_carts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(_carts.fulfilled, (state, action) => {
                state.loading = false;
                state.carts = action.payload;
                state.error = null;
            })
            .addCase(_carts.rejected, (state, action) => {
                state.loading = false;
                state.carts = null;
                state.error = action.payload.error;
            })
            .addCase(_deletecart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(_deletecart.fulfilled, (state, action) => {
                state.loading = false;
                // Handle delete cart success here if needed
            })
            .addCase(_deletecart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.error;
            });
    },
});

export default addtocartSlice.reducer;
