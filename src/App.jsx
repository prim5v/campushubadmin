import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { useAuth } from "./components/context/AuthContext";

import { Dashboard } from "./pages/Dashboard";
import { Users } from "./pages/Users";
import { Properties } from "./pages/Properties";
import { Listings } from "./pages/Listings";
import { Bookings } from "./pages/Bookings";
import { Payments } from "./pages/Payments";
import { Verifications } from "./pages/Verifications";
import { AuditLogs } from "./pages/AuditLogs";
import { Settings } from "./pages/Settings";
import RecentActivities from "./pages/RecentActivities";
import AdminPlans from "./pages/Plans";
import Login from "./pages/login";

/* ----------------------------- */
/* Route Guards                  */
/* ----------------------------- */

function PrivateRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  // if (loading) return null;
  if (loading) return <div className="min-h-screen flex justify-center items-center">Loading...</div>;

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function PublicRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  // if (loading) return null;
  if (loading) return <div className="min-h-screen flex justify-center items-center">Loading...</div>;

  return isAuthenticated ? <Navigate to="/" replace /> : children;
}

/* ----------------------------- */
/* App                           */
/* ----------------------------- */

export function App() {
  return (
    <Router>
      <Routes>

        {/* Public */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/users"
          element={
            <PrivateRoute>
              <Users />
            </PrivateRoute>
          }
        />

        <Route
          path="/properties"
          element={
            <PrivateRoute>
              <Properties />
            </PrivateRoute>
          }
        />

        <Route
          path="/listings"
          element={
            <PrivateRoute>
              <Listings />
            </PrivateRoute>
          }
        />

        <Route
          path="/bookings"
          element={
            <PrivateRoute>
              <Bookings />
            </PrivateRoute>
          }
        />

        <Route
          path="/payments"
          element={
            <PrivateRoute>
              <Payments />
            </PrivateRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <PrivateRoute>
              <Payments />
            </PrivateRoute>
          }
        />

        <Route
          path="/verifications"
          element={
            <PrivateRoute>
              <Verifications />
            </PrivateRoute>
          }
        />

        <Route
          path="/products"
          element={
            <PrivateRoute>
              <Listings />
            </PrivateRoute>
          }
        />

        <Route
          path="/audit-logs"
          element={
            <PrivateRoute>
              <AuditLogs />
            </PrivateRoute>
          }
        />

        <Route
          path="/reports"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <PrivateRoute>
              <Settings />
            </PrivateRoute>
          }
        />

        <Route
          path="/recent"
          element={
            <PrivateRoute>
              <RecentActivities />
            </PrivateRoute>
          }
        />

        <Route
          path="/plans"
          element={
            <PrivateRoute>
              <AdminPlans />
            </PrivateRoute>
          }
        />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </Router>
  );
}