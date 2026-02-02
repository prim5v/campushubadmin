
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate } from
'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { Users } from './pages/Users';
import { Properties } from './pages/Properties';
import { Listings } from './pages/Listings';
import { Bookings } from './pages/Bookings';
import { Payments } from './pages/Payments';
import { Verifications } from './pages/Verifications';
import { AuditLogs } from './pages/AuditLogs';
import { Settings } from './pages/Settings';

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/orders" element={<Payments />} />
        <Route path="/verifications" element={<Verifications />} />
        <Route path="/products" element={<Listings />} />
        <Route path="/audit-logs" element={<AuditLogs />} />
        <Route path="/reports" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>);

}