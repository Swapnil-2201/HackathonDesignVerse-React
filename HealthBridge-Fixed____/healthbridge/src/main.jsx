// src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Global, unscoped stylesheets — design tokens (light/dark theme vars)
// and base resets/shared section classes. Imported once here, never
// duplicated in component files (those use CSS Modules instead).
import './styles/tokens.css';
import './styles/base.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
