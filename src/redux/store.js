// Import required modules
import { createStore, applyMiddleware } from "redux";
import { thunk } from 'redux-thunk';  // Correct for named exports

import rootReducer from './rootReducer';  // Path to the rootReducer

const store = createStore(rootReducer, applyMiddleware(thunk));






// Define initial state
const initialState = {
  email: "",
  password: "",
  confirmPassword: "",
  error: "",
  loading: false, // To handle async actions
};

// Define action types
const SET_EMAIL = "SET_EMAIL";
const SET_PASSWORD = "SET_PASSWORD";
const SET_CONFIRM_PASSWORD = "SET_CONFIRM_PASSWORD";
const SET_ERROR = "SET_ERROR";
const SET_LOADING = "SET_LOADING";

// Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_EMAIL:
      return { ...state, email: action.payload };
    case SET_PASSWORD:
      return { ...state, password: action.payload };
    case SET_CONFIRM_PASSWORD:
      return { ...state, confirmPassword: action.payload };
    case SET_ERROR:
      return { ...state, error: action.payload };
    case SET_LOADING:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

// Action creators
export const setEmail = (email) => ({ type: SET_EMAIL, payload: email });
export const setPassword = (password) => ({ type: SET_PASSWORD, payload: password });
export const setConfirmPassword = (confirmPassword) => ({ type: SET_CONFIRM_PASSWORD, payload: confirmPassword });
export const setError = (error) => ({ type: SET_ERROR, payload: error });
export const setLoading = (loading) => ({ type: SET_LOADING, payload: loading });

// Example async action using thunk
export const submitForm = (formData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    // Simulate an API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Form submitted successfully:", formData);
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError("Failed to submit form."));
    dispatch(setLoading(false));
  }
};

// Create store with thunk middleware

export default store;
