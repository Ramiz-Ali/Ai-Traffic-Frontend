import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useSearchParams,
  useNavigate,
} from 'react-router-dom';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import RecoverPassword from './pages/RecoverPassword';
import ResetPassword from './pages/ResetPassword';
import HomePage from './pages/HomePage';
import { routes } from './contant';
import { BounceLoader } from 'react-spinners';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import TrafficAnalysis from './components/TrafficAnalysis';
import RealTimeMonitoring from './components/RealTimeMonitoring';
import SignalControl from './components/SignalControl';
import AIGeneratedReports from './components/AiGeneratedResports';

// Public Route Component
const PublicRoute = ({ children }) => {
  const token = getToken();
  return token ? <Navigate to='/' /> : children;
};

// Private Route Component
const PrivateRoute = ({ children }) => {
  const token = getToken();
  return token ? children : <Navigate to='/signin' />;
};

// Verification Component
const Verify = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const mode = searchParams.get('mode');

  useEffect(() => {
    if (mode === 'verifyEmail') {
      navigate(routes.account);
    } else if (mode === 'resetPassword') {
      navigate(routes.resetPassword);
    } else {
      console.error('Unsupported mode:', mode);
    }
  }, [mode, navigate]);

  return <div>Processing your request...</div>;
};

const getToken = () => {
  const token = localStorage.getItem('token');
  return !!token;
};

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <BounceLoader />
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path={routes.main} element={<HomePage />} />
        <Route
          path={routes.adminDashboard}
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route path="/traffic-analysis" element={<TrafficAnalysis />} />
        <Route path="/RealTimeMonitoring" element={<RealTimeMonitoring />} />
        <Route path="/SignalControl" element={<SignalControl />} />
        <Route path="/Ai-Reports" element={<AIGeneratedReports />} />
        <Route
          path={routes.signup}
          element={
            <PublicRoute>
              <SignUp />
            </PublicRoute>
          }
        />
        <Route
          path={routes.signin}
          element={
            <PublicRoute>
              <SignIn />
            </PublicRoute>
          }
        />
        <Route path={routes.recoverPassword} element={<RecoverPassword />} />
        <Route path={routes.resetPassword} element={<ResetPassword />} />
        <Route path='/verify' element={<Verify />} />
        <Route path='/' element={<Navigate to={routes.main} />} />
      </Routes>
    </Router>
  );
}

export default App;