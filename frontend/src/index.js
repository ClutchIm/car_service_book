import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/global.scss';
import { AuthProvider } from './services/authContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <AuthProvider>
        <App />
    </AuthProvider>
);
