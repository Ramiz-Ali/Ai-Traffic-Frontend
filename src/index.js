// src/index.js
import React from 'react';
import ReactDOM from "react-dom/client"; // Import createRoot from react-dom/client
import { Provider } from 'react-redux';
import store from './redux/store';  // Ensure the store path is correct
import './index.css'; // Import the Tailwind CSS file here

import App from './App';

// Create a root element using React 18's createRoot API
const root = ReactDOM.createRoot(document.getElementById('root')); // Ensure the root element exists in your index.html

// Render the app with Redux Provider
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
