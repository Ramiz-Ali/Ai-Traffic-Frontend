// Import combineReducers from redux and authReducer from authReducer.js
import { combineReducers } from 'redux';
import authReducer from './authReducer';  // Ensure this path is correct

// Combine reducers
const rootReducer = combineReducers({
  auth: authReducer,  // Use authReducer here
});

export default rootReducer;
