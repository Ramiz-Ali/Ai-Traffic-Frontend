import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import Logo from '../assets/image/Logo.png';
import ResetPassIcon from '../assets/icons/resetPasswordIcon';
import { firebaseResetPasswordEmail } from '../redux/action/auth';

const RecoverPassword = () => {
  const [email, setEmailInput] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      toast.error('Please enter your email address.');
      return;
    }
    dispatch(firebaseResetPasswordEmail(email));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#5A70E9] to-[#15B7A7]  items-center justify-center">
      <ToastContainer />

      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8 px-4 py-8 relative top-[20vh] ">
       
          <h1 className="text-3xl font-bold mb-6 text-center">
            Recover Account
          </h1>
        
          <form
            className="space-y-4 mt-5"
            onSubmit={handleSubmit}
          >
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmailInput(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <button
              type="submit"
              className="w-full bg-[#1B5E20] text-white py-3 rounded"
            >
              Recover Account
            </button>
          </form>
       

      </div>
    </div>
  );
};

export default RecoverPassword;
