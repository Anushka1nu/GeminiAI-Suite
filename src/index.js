
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ContextProvider from './context/Context.jsx';
import { BrowserRouter } from "react-router-dom";

// Create the root element
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the app wrapped in Router and Context
root.render(
  <BrowserRouter>
    <ContextProvider>
    <App />
  </ContextProvider>
  </BrowserRouter>
  
 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

// Measure performance
reportWebVitals();



