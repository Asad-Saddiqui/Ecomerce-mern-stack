// Loing Types
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

// Signup Types
export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

// Get Product Types
export const GET_PRODUCT_REQUEST = 'GET_PRODUCT_REQUEST';
export const GET_PRODUCT_SUCCESS = 'GET_PRODUCT_SUCCESS';
export const GET_PRODUCT_FAILURE = 'GET_PRODUCT_FAILURE';

// Get Product By Id Types
export const GET_PRODUCT_ID_REQUEST = 'GET_PRODUCT_ID_REQUEST';
export const GET_PRODUCT_ID_SUCCESS = 'GET_PRODUCT_ID_SUCCESS';
export const GET_PRODUCT_ID_FAILURE = 'GET_PRODUCT_ID_FAILURE';

// Get category Types
export const categoryREQUEST = 'categoryREQUEST';
export const categorySUCCESS = 'categorySUCCESS';
export const categoryFAILURE = 'categoryFAILURE';

export const GET_BRAND_REQUEST = 'GET_BRAND_REQUEST';
export const GET_BRAND_SUCCESS = 'GET_BRAND_SUCCESS';
export const GET_BRAND_FAILURE = 'GET_BRAND_FAILURE';

export const categoryRequest = () => ({
  type: categoryREQUEST
});

export const categorySuccess = (userData) => ({
  type: categorySUCCESS,
  payload: userData
});

export const categoryFailure = (error) => ({
  type: categoryFAILURE,
  payload: error
});





export const Login_Request = () => ({
  type: LOGIN_REQUEST
});

export const Login_Success = (userData) => ({
  type: LOGIN_SUCCESS,
  payload: userData
});

export const Login_Failure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error
});



export const SIGNUP_Request = () => ({
  type: SIGNUP_REQUEST
});

export const SIGNUP_Success = (userData) => ({
  type: SIGNUP_SUCCESS,
  payload: userData
});

export const SIGNUP_Failure = (error) => ({
  type: SIGNUP_FAILURE,
  payload: error
});
export const GET_PRODUCT_Request = () => ({
  type: GET_PRODUCT_REQUEST
});


export const GET_PRODUCT_Success = (product) => {
  return {
    type: GET_PRODUCT_SUCCESS,
    payload: product
  }
};

export const GET_PRODUCT_Failure = (error) => ({
  type: GET_PRODUCT_FAILURE,
  payload: error
});




export const GET_PRODUCT_ID_Request = () => ({
  type: GET_PRODUCT_ID_REQUEST
});
export const GET_PRODUCT_ID_Success = (product) => ({
  type: GET_PRODUCT_ID_SUCCESS,
  payload: product
});
export const GET_PRODUCT_ID_Failure = (error) => ({
  type: GET_PRODUCT_ID_FAILURE,
  payload: error
});

export const GET_BRAND_Request = () => ({
  type: GET_BRAND_REQUEST
});
export const GET_BRAND_Success = (product) => ({
  type: GET_BRAND_SUCCESS,
  payload: product
});
export const GET_BRAND_Failure = (error) => ({
  type: GET_BRAND_FAILURE,
  payload: error
});