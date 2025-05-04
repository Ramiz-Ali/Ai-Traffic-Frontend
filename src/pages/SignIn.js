import React, { useState, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { auth, db } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { routes } from '../contant';

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    if (!formData.email) {
      toast.error('Email is required.', { position: 'top-right' });
      return;
    }
    if (!formData.password) {
      toast.error('Password is required.', { position: 'top-right' });
      return;
    }

    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;
      console.log('Signed in user:', user.uid);

      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);
      console.log('User doc exists:', userDoc.exists());

      let userRole = null;
      if (userDoc.exists()) {
        userRole = userDoc.data().role;
        console.log('User role (raw):', userRole);
        console.log('User role (normalized):', userRole?.toLowerCase());
      } else {
        console.log('No user document found for UID:', user.uid);
        toast.error('User profile not found.', { position: 'top-right' });
        navigate(routes.main);
        return;
      }

      const isAdmin = userDoc.exists() && userRole?.toLowerCase() === 'admin';
      console.log('Is admin:', isAdmin);

      if (isAdmin) {
        console.log('Redirecting to admin dashboard:', routes.adminDashboard);
        navigate(routes.adminDashboard);
      } else {
        console.log('Redirecting to main:', routes.main);
        navigate(routes.main);
      }
      toast.success('Signed in successfully!', { position: 'top-right' });
    } catch (error) {
      let errorMessage = 'Failed to sign in. Please try again.';
      if (error.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password. Please try again or reset your password.';
      } else if (error.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email. Please sign up.';
      } else if (error.code === 'auth/user-disabled') {
        errorMessage = 'This account has been disabled.';
      } else {
        console.error('Sign-in error:', error);
        errorMessage += ' Error: ' + error.message;
      }
      toast.error(errorMessage, { position: 'top-right' });
    } finally {
      setIsLoading(false);
    }
  };

  const colors = [
    'bg-gradient-to-r from-[#1a2a6c] via-[#b21f1f] to-[#fdbb2d]',
    'bg-gradient-to-r from-[#1a2a6c] via-[#b21f1f] to-[#fdbb2d]',
    'bg-gradient-to-r from-[#1a2a6c] via-[#b21f1f] to-[#fdbb2d]',
  ];

  const [bgColor, setBgColor] = useState(colors[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [smoothness, setSmoothness] = useState(100);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % colors.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [colors.length]);

  useEffect(() => {
    setBgColor(colors[currentIndex]);
  }, [currentIndex, colors]);

  return (
    <div
      className={`min-h-screen ${bgColor} flex items-center justify-center p-4 transition-all`}
      style={{ transitionDuration: `${smoothness}ms` }}
    >
      <ToastContainer />
      <div className='bg-white rounded-lg shadow-lg p-8 w-full max-w-md'>
        <h1 className='text-3xl font-bold mb-6 text-center'>Login</h1>
        {isLoading ? (
          <p className='text-center text-gray-600'>Loading...</p>
        ) : (
          <form onSubmit={handleSignIn} className='space-y-6'>
            <div className='space-y-2'>
              <input
                type='email'
                id='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                placeholder='Enter your email'
                className='w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1a2a6c]'
              />
            </div>
            <div className='space-y-2 relative'>
              <input
                type={passwordVisible ? 'text' : 'password'}
                id='password'
                name='password'
                value={formData.password}
                onChange={handleChange}
                placeholder='Enter your password'
                className='w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1a2a6c]'
              />
              <button
                type='button'
                onClick={togglePasswordVisibility}
                className='absolute right-3 top-[32%] transform -translate-y-1/2 text-gray-500'
              >
                {passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <div className='flex justify-between items-center text-sm'>
              <label className='flex items-center space-x-2'>
                <input
                  type='checkbox'
                  name='rememberMe'
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className='rounded border-gray-300 text-[#1a2a6c] focus:ring-[#1a2a6c]'
                />
                <span className='text-gray-600'>Remember me</span>
              </label>
              <a
                href={routes.recoverPassword}
                className='text-[#1a2a6c] hover:underline'
              >
                Forgot password?
              </a>
            </div>
            <button
              type='submit'
              disabled={isLoading}
              className='w-full py-2 bg-[#1a2a6c] hover:bg-[#b21f1f] text-white font-medium rounded-lg transition-all'
            >
              Sign In
            </button>
            <p className='text-center text-sm text-gray-600 mt-4'>
              Don't have an account?{' '}
              <a
                href={routes.signup}
                className='text-[#1a2a6c] hover:underline'
              >
                Sign Up
              </a>
            </p>
            <p className='text-center text-sm text-gray-600 mt-4'>
              Go back to{' '}
              <a
                href={routes.main}
                className='text-[#1a2a6c] hover:underline'
              >
                General page
              </a>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignIn;