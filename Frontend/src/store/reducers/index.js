// src/reducers/index.js

import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { signupReducer } from './authReducer';
import { getProducts } from './authReducer';
import { getProductbyid } from './authReducer';
import { brand } from './authReducer';
import { category } from './authReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    signup: signupReducer,
    products: getProducts,
    singleProduct: getProductbyid,
    brand,
    category,
});

export default rootReducer;
