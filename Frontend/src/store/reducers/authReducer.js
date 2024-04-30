
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from '../actions/authActionTypes';
import { SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE } from '../actions/authActionTypes';
import { GET_PRODUCT_REQUEST, GET_PRODUCT_SUCCESS, GET_PRODUCT_FAILURE } from '../actions/authActionTypes';
import { GET_PRODUCT_ID_REQUEST, GET_PRODUCT_ID_SUCCESS, GET_PRODUCT_ID_FAILURE } from '../actions/authActionTypes';
import { GET_BRAND_REQUEST, GET_BRAND_SUCCESS, GET_BRAND_FAILURE } from '../actions/authActionTypes';
import { categoryREQUEST, categorySUCCESS, categoryFAILURE } from '../actions/authActionTypes';

const CategoryInit = {
    isLoading: false,
    category: null,
    error: null
};
export const category = (state = CategoryInit, action) => {
    switch (action.type) {
        case categoryREQUEST:
            return {
                ...state,
                isLoading: true,
                error: null
            };
        case categorySUCCESS:
            return {
                ...state,
                isLoading: false,
                category: action.payload,
                error: null
            };
        case categoryFAILURE:
            return {
                ...state,
                isLoading: false,
                category: null,
                error: action.payload
            };
        default:
            return state;
    }
};
const brandInit = {
    isLoading: false,
    brand: null,
    error: null
};
export const brand = (state = brandInit, action) => {
    switch (action.type) {
        case GET_BRAND_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null
            };
        case GET_BRAND_SUCCESS:
            return {
                ...state,
                isLoading: false,
                brand: action.payload,
                error: null
            };
        case GET_BRAND_FAILURE:
            return {
                ...state,
                isLoading: false,
                brand: null,
                error: action.payload
            };
        default:
            return state;
    }
};
const initialState = {
    isLoading: false,
    user: null,
    error: null
};
export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: action.payload,
                error: null
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                isLoading: false,
                user: null,
                error: action.payload
            };
        default:
            return state;
    }
};
const SIGNUPINITALState = {
    isLoading: false,
    user: null,
    error: null
};
export const signupReducer = (state = SIGNUPINITALState, action) => {
    switch (action.type) {
        case SIGNUP_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null
            };
        case SIGNUP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: action.payload,
                error: null
            };
        case SIGNUP_FAILURE:
            return {
                ...state,
                isLoading: false,
                user: null,
                error: action.payload
            };
        default:
            return state;
    }
};
const Product = {
    isLoading: false,
    data: null,
    error: null
};
export const getProducts = (state = Product, action) => {
    switch (action.type) {
        case GET_PRODUCT_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null
            };
        case GET_PRODUCT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                error: null
            };
        case GET_PRODUCT_FAILURE:
            return {
                ...state,
                isLoading: false,
                data: null,
                error: action.payload
            };
        default:
            return state;
    }
};
const Productbyid = {
    isLoading: false,
    Sdata: null,
    error: null
};
export const getProductbyid = (state = Productbyid, action) => {
    switch (action.type) {
        case GET_PRODUCT_ID_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null
            };
        case GET_PRODUCT_ID_SUCCESS:
            return {
                ...state,
                isLoading: false,
                Sdata: action.payload,
                error: null
            };
        case GET_PRODUCT_ID_FAILURE:
            return {
                ...state,
                isLoading: false,
                Sdata: null,
                error: action.payload
            };
        default:
            return state;
    }
};

