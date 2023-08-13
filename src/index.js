import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));//rendered content should be inserted into the DOM element with the id 'root'.
root.render(
  <React.StrictMode> 
    <App />
  </React.StrictMode>
);
//catch potential problems and warnings in your application by enabling strict development mode checks

