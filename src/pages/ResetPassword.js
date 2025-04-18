import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Eye icons for visibility toggle
import { ToastContainer, toast } from 'react-toastify';
import { resetPassword } from '../redux/action/auth';


const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [password, setPasswordInput] = useState('');
  const [confirmPassword, setConfirmPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false); 
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); 
  const handleSubmit = () => {
    if (!password || !confirmPassword) {
      toast.error('Both fields are required.');
      return;
    }
    if (password !== confirmPassword) {
      toast.error('Password and confirm password should be match.');
      return;
    }
    dispatch(resetPassword(password, navigate)); 
  };

  return (
    <div className='min-h-screen bg-gradient-to-r from-[#5A70E9] to-[#15B7A7]  items-center justify-center'>
      <ToastContainer />

      <div className='max-w-md mx-auto bg-white rounded-lg shadow-md p-8 px-4 py-8 relative top-[20vh] '>
        <h1 className='text-3xl font-bold mb-6 text-center'>Reset Password</h1>
        <form
          className='space-y-4 w-full max-w-md'
        >

          <div className='relative'>

            
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder='Create New Password'
              value={password}
              onChange={(e) => setPasswordInput(e.target.value)}
              className='w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500'

              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className='absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer'
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>

          {/* Confirm Password Field */}
          <div className='relative'>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder='Confirm Password'
              value={confirmPassword}
              onChange={(e) => setConfirmPasswordInput(e.target.value)}
              className='w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500'

              required
            />
            <span
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className='absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer'
            >
              {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>

          {/* Submit Button */}
          <button
            type='button'
            onClick={handleSubmit}
            className='w-full bg-[#1B5E20] text-white py-3 rounded'
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
