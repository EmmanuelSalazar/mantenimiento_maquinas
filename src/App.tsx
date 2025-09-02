import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import HistoryPage from './pages/HistoryPage';
import InterventionForm from './pages/InterventionForm';
import { InterventionProvider } from './context/InterventionContext';

function App() {
  return (
    <InterventionProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/historial" element={<HistoryPage />} />
            <Route path="/nueva-intervencion" element={<InterventionForm />} />
          </Routes>
        </div>
      </Router>
    </InterventionProvider>
  );
}

export default App;