import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import { BrandApplication } from './components/BrandApplication';
import { StatusPage } from './pages/StatusPage';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/apply/:brandKey" element={<BrandApplication />} />
        <Route path="/status" element={<StatusPage />} />
      </Routes>
    </Router>
  </StrictMode>
);