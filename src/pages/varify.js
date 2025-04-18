import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useSearchParams,
  useNavigate,
} from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Account from "./pages/Account";
import RecoverPassword from "./pages/RecoverPassword";
import ResetPassword from "./pages/ResetPassword";
import HomePage from "./pages/HomePage";
import AboutUs from "./pages/AboutUs";
import Dashboard from "./pages/Dashboard";
import { routes } from "./contant";

// Public Route Component
const PublicRoute = ({ isAuthenticated, children }) => {
  return isAuthenticated ? <Navigate to="/" /> : children;
};

// Private Route Component
const PrivateRoute = ({ isAuthenticated, children }) => {
  return isAuthenticated ? children : <Navigate to="/signin" />;
};

// Verification Component
const Verify = ({ isAuthenticated }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const mode = searchParams.get("mode");

  useEffect(() => {
    if (mode === "verifyEmail") {
      // Navigate to Account page
      navigate(routes.account);
    } else if (mode === "forResetPassword") {
      // Navigate to Reset Password page
      navigate(routes.resetPassword);
    } else {
      // Handle unsupported modes
      console.error("Unsupported mode:", mode);
    }
  }, [mode, navigate]);

  return <div>Processing your request...</div>;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path={routes.main} element={<HomePage />} />
        <Route path={routes.aboutUs} element={<AboutUs />} />
        <Route
          path={routes.dashboard}
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path={routes.account}
          element={
            <PublicRoute isAuthenticated={isAuthenticated}>
              <Account />
            </PublicRoute>
          }
        />
        <Route
          path={routes.signup}
          element={
            <PublicRoute isAuthenticated={isAuthenticated}>
              <SignUp setIsAuthenticated={setIsAuthenticated} />
            </PublicRoute>
          }
        />
        <Route
          path={routes.signin}
          element={
            <PublicRoute isAuthenticated={isAuthenticated}>
              <SignIn setIsAuthenticated={setIsAuthenticated} />
            </PublicRoute>
          }
        />
        <Route path={routes.recoverPassword} element={<RecoverPassword />} />
        <Route path={routes.resetPassword} element={<ResetPassword />} />

        {/* New Verify Route */}
        <Route
          path="/verify"
          element={<Verify isAuthenticated={isAuthenticated} />}
        />

        <Route path="/" element={<Navigate to={routes.main} />} />
      </Routes>
    </Router>
  );
}

export default App;
