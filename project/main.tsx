import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

console.log('Main.tsx loaded');

// Import CSS after React to ensure proper loading order
import('/styles/globals.css').then(() => {
  console.log('CSS loaded');
}).catch(err => {
  console.error('CSS loading failed:', err);
});

const rootElement = document.getElementById('root');
console.log('Root element:', rootElement);

if (rootElement) {
  try {
    const root = createRoot(rootElement);
    console.log('Creating React root');
    
    root.render(
      React.createElement(App)
    );
    
    console.log('App rendered');
  } catch (error) {
    console.error('Failed to render app:', error);
  }
} else {
  console.error('Root element not found');
}