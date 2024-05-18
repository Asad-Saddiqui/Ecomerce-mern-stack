import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import getOrders_ from './orderService';

const initialState = {
    Orders: [],
    status: null,
    error: null
};

// Define thunk for fetching all products
export const getOrders = createAsyncThunk(
    'GET-ORDERS',
    async (thunkAPI) => {
        const response = await getOrders_.getOrders();
        if (response.status === 'fail') {
            return thunkAPI.rejectWithValue(response.message);
        }
        return response;
    }
);
const orderSlice = createSlice({
    name: 'Order',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Reducer for fetchProducts thunk
        builder
            .addCase(getOrders.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getOrders.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.Orders = action.payload;
            })
            .addCase(getOrders.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});


export default orderSlice.reducer;
