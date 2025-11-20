import React, { useMemo } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import './styles/theme.css';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Offices from './pages/Offices';
import Employees from './pages/Employees';

// PUBLIC_INTERFACE
function App() {
  /** Root application with sidebar layout and routing. */
  // You can extend with theme switching later; for now we use Ocean Professional theme via CSS variables.

  const navItems = useMemo(
    () => [
      { label: 'Offices', to: '/offices' },
      { label: 'Employees', to: '/employees' },
    ],
    []
  );

  return (
    <BrowserRouter>
      <div className="container-app">
        <Sidebar items={navItems} />
        <main className="main-content">
          <Header title="Office & Employee Manager" />
          <Routes>
            <Route path="/" element={<Navigate to="/offices" replace />} />
            <Route path="/offices" element={<Offices />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="*" element={<Navigate to="/offices" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
