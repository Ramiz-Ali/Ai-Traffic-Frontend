import React, { useState, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react'; // Import icons from lucide-react
import { useNavigate } from 'react-router-dom';
import { routes } from '../contant';
import { login } from '../redux/action/auth';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: '',
    rememberMe: false,
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const dispatch = useDispatch();

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

  const handleSignIn = (e) => {
    e.preventDefault();

    // Validate email/phone and password
    if (!formData.email && !formData.phone) {
      console.error('Email or phone number is required.');
      return;
    }
    if (!formData.password) {
      console.error('Password is required.');
      return;
    }

    const obj = {
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
    };

    dispatch(login(obj, navigate));
  };

  const colors = [
    'bg-gradient-to-r from-[#1a2a6c] via-[#b21f1f] to-[#fdbb2d]',
    'bg-gradient-to-r from-[#1a2a6c] via-[#b21f1f] to-[#fdbb2d]',
    'bg-gradient-to-r from-[#1a2a6c] via-[#b21f1f] to-[#fdbb2d]',
  ];

  const [bgColor, setBgColor] = useState(colors[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [smoothness, setSmoothness] = useState(100); // Transition duration in milliseconds

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % colors.length);
    }, 10000); // Change every 10 seconds

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
        <h1 className='text-3xl font-bold mb-6 text-center'>
          Login
        </h1>
        <form
          onSubmit={handleSignIn}
          className='space-y-6'
        >
          {/* Email Input */}
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

          {/* Phone Input */}
          <small className='block text-center text-gray-700'>OR</small>
          <div className='space-y-2'>
            <input
              type='text'
              id='phone'
              name='phone'
              value={formData.phone}
              onChange={handleChange}
              placeholder='Enter your phone'
              className='w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1a2a6c]'
            />
          </div>

          {/* Password Input */}
          <div className='space-y-2 relative '>
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

          {/* Remember Me Checkbox */}
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

          {/* Submit Button */}
          <button
            type='submit'
            className='w-full py-2 bg-[#1a2a6c] hover:bg-[#b21f1f] text-white font-medium rounded-lg transition-all'
          >
            Sign In
          </button>

          {/* Sign Up Link */}
          <p className='text-center text-sm text-gray-600 mt-4'>
            Don't have an account?{' '}
            <a
              href={routes.signup}
              className='text-[#1a2a6c] hover:underline'
            >
              Sign Up
            </a>
          </p>

          {/* Go Back to General Page */}
          <p className='text-center text-sm text-gray-600 mt-4'>
            Go back to {' '}
            <a
              href={routes.main}
              className='text-[#1a2a6c] hover:underline'
            >
              General page
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;