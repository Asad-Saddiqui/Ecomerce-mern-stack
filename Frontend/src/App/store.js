import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Api/auth/authSlice";
import productSlice from "../Api/Product/productSlice";
import categorySlice from "../Api/category/categorySlice";
import addtocartSlice from "../Api/cart/cartSlice";
import profileSlice from "../Api/profile/profileSlice";
import wishlistSlice from "../Api/wishlist/wishlistSlice";
export const store = configureStore({
    reducer: {
        auth: authReducer,
        product: productSlice,
        cat_: categorySlice,
        addcart: addtocartSlice,
        Profile: profileSlice,
        userWishlist: wishlistSlice,
    },
});