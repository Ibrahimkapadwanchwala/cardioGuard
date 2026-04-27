import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar';
import SimulationPage from './pages/SimulationPage';
import DashboardPage from './pages/DashboardPage';
import Auth from './pages/Auth';

import ProtectedRoute from './components/ProtectedRoute';

import { ThemeProvider } from './context/ThemeContext';
import { SimulationProvider } from './context/SimulationContext';

// We extract this to safely use the useLocation hook
const AppContent = () => {
  const location = useLocation();
  // Hide Navbar if the user is on the root login page or /auth
  const isAuthPage = location.pathname === '/' || location.pathname === '/auth';

  return (
    <>
      {/* The Navbar ONLY renders if we are NOT on the login page */}
      {!isAuthPage && <Navbar />}

      <Routes>
        {/* 🔐 Auth Pages */}
        <Route path="/" element={<Auth />} />
        <Route path="/auth" element={<Auth />} />

        {/* 🔒 Protected Routes */}
        <Route
          path="/simulation"
          element={
            <ProtectedRoute>
              <SimulationPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <SimulationProvider>
        <Router>
          <AppContent />
        </Router>
      </SimulationProvider>
    </ThemeProvider>
  );
}