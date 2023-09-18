import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.scss';
document.documentElement.style.fontSize = 100 / 750 + 'vw';

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
