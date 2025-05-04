import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import '../style/signup.css';
import { routes } from '../contant';

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error('Please enter your name!', { position: 'top-right' });
      return;
    }
    if (!validateEmail(formData.email)) {
      toast.error('Please enter a valid email address!', { position: 'top-right' });
      return;
    }
    if (!formData.phone.trim()) {
      toast.error('Please enter your phone number!', { position: 'top-right' });
      return;
    }
    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters!', { position: 'top-right' });
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match!', { position: 'top-right' });
      return;
    }

    let role = 'user';
    let userType = 'Student';
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      await updateProfile(user, { displayName: formData.name });

      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) {
        if (formData.email === 'admin@example.com') {
          if (window.confirm('Are you sure you want to create an admin account for ' + formData.email + '?')) {
            role = 'admin';
            userType = 'Admin';
          }
        }
        await setDoc(userDocRef, {
          email: formData.email,
          displayName: formData.name,
          phone: formData.phone,
          role: role,
          userType: userType,
          registerDate: new Date(),
        }, { merge: true });
      }

      const successMessage = role === 'admin' ? 'Admin account created successfully!' : 'Account created successfully!';
      toast.success(successMessage, { position: 'top-right' });
      navigate(role === 'admin' ? routes.adminDashboard : routes.main);
    } catch (error) {
      let errorMessage = 'Failed to create account. Please try again.';
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'This email is already registered. Please sign in or use a different email.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email format.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password is too weak. Use at least 6 characters.';
      } else {
        console.error('Detailed error:', error);
        errorMessage += ' Error: ' + error.message;
      }
      toast.error(errorMessage, { position: 'top-right' });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className='min-h-screen bg-gradient-to-r from-[#1a2a6c] via-[#b21f1f] to-[#fdbb2d] flex items-center justify-center'>
      <motion.div
        initial={{ x: '-100vw', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 50 }}
      >
        <div className='container mx-auto px-4 py-8'>
          <div className='w-[360px] mx-auto bg-white rounded-lg shadow-md p-6'>
            <h2 className='text-3xl font-bold mb-6 text-center'>Registration</h2>
            <p className='text-center text-sm text-gray-500 mb-4'>Note: Using <strong>admin@example.com</strong> will create an admin account (requires confirmation).</p>
            <form onSubmit={handleSubmit} className='space-y-4'>
              <div>
                <input
                  type='text'
                  name='name'
                  placeholder='Enter name'
                  value={formData.name}
                  onChange={handleChange}
                  className='w-full p-2 border border-gray-300 rounded'
                  required
                />
              </div>
              <div>
                <input
                  type='email'
                  name='email'
                  placeholder='Email address'
                  value={formData.email}
                  onChange={handleChange}
                  className='w-full p-2 border border-gray-300 rounded'
                  required
                />
              </div>
              <div>
                <input
                  type='tel'
                  name='phone'
                  placeholder='Enter Mobile Number'
                  value={formData.phone}
                  onChange={handleChange}
                  className='w-full p-2 border border-gray-300 rounded'
                  required
                />
              </div>
              <div>
                <input
                  type='password'
                  name='password'
                  placeholder='Password'
                  value={formData.password}
                  onChange={handleChange}
                  className='w-full p-2 border border-gray-300 rounded'
                  required
                />
              </div>
              <div>
                <input
                  type='password'
                  name='confirmPassword'
                  placeholder='Confirm password'
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className='w-full p-2 border border-gray-300 rounded'
                  required
                />
              </div>
              <button
                type='submit'
                className='w-full bg-[#1a2a6c] text-white py-3 rounded hover:bg-[#b21f1f] transition-colors duration-300'
              >
                REGISTER NOW
              </button>
              <div className='text-center mt-4'>
                <span className='text-gray-600'>Already have an account? </span>
                <Link to='/signin' className='text-[#1a2a6c] hover:text-[#b21f1f]'>
                  Login Here
                </Link>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
      <ToastContainer />
    </div>
  );
}