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
import UploadVideos from './components/Upload_Videos'
import { routes } from './contant';
import { BounceLoader } from 'react-spinners';
import AdminDashboard from './pages/admin/AdminDashboard';
import TrafficAnalysis from './components/TrafficAnalysis';
import RealTimeMonitoring from './components/RealTimeMonitoring';
import SignalControl from './components/SignalControl';
import AIGeneratedReports from './components/AiGeneratedResports';
import { auth, db } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

// Public Route Component
const PublicRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });
    return () => unsubscribe();
  }, []);

  if (isAuthenticated === null) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <BounceLoader />
      </div>
    );
  }

  return isAuthenticated ? <Navigate to={routes.main} /> : children;
};

// Private Route Component with Role Check
const PrivateRoute = ({ children, requiredRole }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsAuthenticated(true);
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setUserRole(userDoc.data().role);
        } else {
          setUserRole(null);
        }
      } else {
        setIsAuthenticated(false);
        setUserRole(null);
      }
    });
    return () => unsubscribe();
  }, []);

  if (isAuthenticated === null || userRole === null) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <BounceLoader />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={routes.signin} />;
  }

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to={routes.main} />;
  }

  return children;
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
       
        <Route path="/traffic-analysis" element={<TrafficAnalysis />} />
        <Route path="/RealTimeMonitoring" element={<RealTimeMonitoring />} />
        <Route path="/SignalControl" element={<SignalControl />} />
        <Route path="/Ai-Reports" element={<AIGeneratedReports />} />
        <Route path="/adminPanel" element={<AdminDashboard />} />

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
        <Route path="/upload-videos" element={<UploadVideos />} />
        <Route path='/verify' element={<Verify />} />
        <Route path='/' element={<Navigate to={routes.main} />} />
      </Routes>
    </Router>
  );
}

export default App;