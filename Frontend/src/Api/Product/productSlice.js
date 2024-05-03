import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import products_ from './productService';

const initialState = {
    products: [],
    product: null,
    status: 'idle',
    error: null
};

// Define thunk for fetching all products
export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (thunkAPI) => {
        console.log("fectsh")
        const response = await products_.getProducts();

        if (response.status === 'fail') {
            return thunkAPI.rejectWithValue(response.message);
        }

        return response;
    }
);

// Define thunk for fetching a product by id
export const fetchProductById = createAsyncThunk(
    'products/fetchProductById',
    async (data, thunkAPI) => {
        console.log(data)
        const response = await products_.getProductbyId_(data.id);
        console.log({s: response})
        if (response.status === 'fail') {
            return thunkAPI.rejectWithValue(response.message);
        }

        return response;
    }
);

// Define productSlice
const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Reducer for fetchProducts thunk
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });

        // Reducer for fetchProductById thunk
        builder
            .addCase(fetchProductById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.product = action.payload;
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});


export default productSlice.reducer;
