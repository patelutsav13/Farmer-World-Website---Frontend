import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';
import AOS from 'aos'; // Import AOS JavaScript

AOS.init({ duration: 1200 });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);