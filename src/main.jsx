import React, { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
const App = React.lazy(() => import('./App.jsx'));
import './assets/css/index.css';
import './assets/css/styles.css';
import LoadingScreen from './components/LoadingScreen.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Suspense fallback={<LoadingScreen />}>
      <App />
    </Suspense>
  </StrictMode>
);