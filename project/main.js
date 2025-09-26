import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './styles/globals.css';

console.log('Main.js loaded');

const rootElement = document.getElementById('root');

if (rootElement) {
  try {
    const root = createRoot(rootElement);
    console.log('Creating React root');
    
    root.render(React.createElement(App));
    
    console.log('App rendered');
    
    // Hide loading screen
    document.body.classList.add('loaded');
  } catch (error) {
    console.error('Failed to render app:', error);
  }
} else {
  console.error('Root element not found');
}