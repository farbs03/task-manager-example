import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

//standard index.js file that every React app contains; renders the App component using React DOM
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
