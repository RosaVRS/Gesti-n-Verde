// Safeguard against environments where window.fetch has only a getter
try {
  const _fetch = window.fetch;
  Object.defineProperty(window, 'fetch', {
    get() {
      return _fetch;
    },
    set(fn) {
      Object.defineProperty(window, 'fetch', {
        value: fn,
        writable: true,
        configurable: true,
        enumerable: true,
      });
    },
    configurable: true,
    enumerable: true,
  });
} catch (_) {}

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
