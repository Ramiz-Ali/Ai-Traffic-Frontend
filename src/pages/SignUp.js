import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addAccount, completeProfile } from '../redux/action/auth';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { motion } from 'framer-motion';
import '../style/signup.css';
import { routes } from '../contant';

export default function RegistrationForm() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState(Number(localStorage.getItem('phase')) || 1);
  const [fileSelected, setFileSelected] = useState();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    verified: true,
    userType: 'Student',
  });

  const [profileData, setProfileData] = useState({
    address: '',
    CNIC: '',
    profilePhoto: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.email === '') {
      toast.error('Please input the email!');
      return;
    }
    if (formData.password === '' || formData.confirmPassword === '') {
      toast.error('Please fill in the password fields!');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error('Password fields should match!');
      return;
    }
    localStorage.setItem('registerMail', formData.email);
    dispatch(addAccount(formData, navigate));
    localStorage.setItem('phase', 2);
    setPhase(2);
  };

  const handleSubmitProfile = async (e) => {
    e.preventDefault();

    if (profileData.address === '') {
      toast.error('Please input the address field');
      return;
    }
    if (profileData.CNIC === '') {
      toast.error('Please provide your CNIC');
      return;
    }

    try {
      const response = await dispatch(completeProfile(profileData)); // Dispatch the action
      if (response) {
        toast.success('Profile setup completed successfully!');
        navigate(routes.signin); // Redirect to the login page
      }
    } catch (error) {
      toast.error('Failed to complete profile setup. Please try again.');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleProfileData = (e) => {
    if (e.target.name === 'profilePhoto') {
      const { files } = e.target;
      const file = files[0];
      setFileSelected(file?.name);
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result;
        setProfileData((prevData) => ({
          ...prevData,
          [e.target.name]: base64String,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setProfileData({
        ...profileData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result;
        setFileSelected(file.name);
        setProfileData((prevData) => ({
          ...prevData,
          profilePhoto: base64String,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-r from-[#1a2a6c] via-[#b21f1f] to-[#fdbb2d] flex items-center justify-center'>
      <nav className='flex fixed top-0 left-0 w-full bg-gray-800 text-white shadow-lg z-50'>
        {/* Account Register */}
        <motion.div
          className={`py-3 px-2 flex-1 text-center cursor-pointer text-xs sm:text-sm md:text-base ${
            phase === 1
              ? 'border-b-4 border-[#1B5E20] bg-[#FFA000]'
              : 'bg-gray-700 hover:bg-gray-600'
          }`}
          onClick={() => {
            setPhase(1);
            localStorage.setItem('phase', 1);
          }}
          initial={{ scale: 1 }}
          animate={{ scale: phase === 1 ? 1.1 : 1 }}
          transition={{ type: 'spring', stiffness: 50 }}
        >
          ACCOUNT REGISTER
        </motion.div>

        {/* Profile Register */}
        <motion.div
          className={`py-3 px-2 flex-1 text-center cursor-pointer text-xs sm:text-sm md:text-base ${
            phase === 2
              ? 'border-b-4 border-[#1B5E20] bg-[#FFA000]'
              : 'bg-gray-700 hover:bg-gray-600'
          }`}
          onClick={() => {
            setPhase(2);
            localStorage.setItem('phase', 2);
          }}
          initial={{ scale: 1 }}
          animate={{ scale: phase === 2 ? 1.1 : 1 }}
          transition={{ type: 'spring', stiffness: 50 }}
        >
          PROFILE REGISTER
        </motion.div>
      </nav>

      <div className='mt-5'>
        <motion.div
          key={phase}
          initial={{ x: '-100vw', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '100vw', opacity: 0 }}
          transition={{ type: 'spring', stiffness: 50 }}
        >
          {/* Form 1 */}
          {phase === 1 && (
            <div className='form-1 container mx-auto px-4 py-8'>
              <div className='w-[360px] mx-auto bg-white rounded-lg shadow-md p-6'>
                <h2 className='text-3xl font-bold mb-6 text-center'>
                  Registration
                </h2>
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
                    <span className='text-gray-600'>
                      Already have an account?{' '}
                    </span>
                    <Link to='/signin' className='text-[#1a2a6c] hover:text-[#b21f1f]'>
                      Login Here
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Form 2 */}
          {phase === 2 && (
            <div className='form-1 container mx-auto px-4 py-8'>
              <div className='w-[360px] mx-auto bg-white rounded-lg shadow-md p-6'>
                <h2 className='text-3xl font-bold mb-6 text-center'>
                  Profile Detail
                </h2>
                <form onSubmit={handleSubmitProfile} className='space-y-4'>
                  <div>
                    <input
                      type='text'
                      name='CNIC'
                      placeholder='Enter your CNIC'
                      value={profileData.CNIC}
                      onChange={handleProfileData}
                      className='w-full p-2 border border-gray-300 rounded'
                      required
                    />
                  </div>
                  <div>
                    <input
                      type='text'
                      name='address'
                      placeholder='Please enter your address'
                      value={profileData.address}
                      onChange={handleProfileData}
                      className='w-full p-2 border border-gray-300 rounded'
                      required
                    />
                  </div>
                  <div
                    className='w-full px-3 py-2 border border-gray-300 rounded-md flex h-[100px] items-center justify-center cursor-pointer'
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                  >
                    <input
                      id='profilePhoto'
                      name='profilePhoto'
                      type='file'
                      accept='.png, .jpg, .jpeg'
                      onChange={handleProfileData}
                      className='hidden'
                    />
                    {fileSelected ? (
                      <>
                        <p className='text-green-500 mt-2'>
                          Selected File: {fileSelected}
                        </p>
                        <br />
                        <label
                          htmlFor='profilePhoto'
                          className='cursor-pointer bg-gray-500 rounded text-white p-2'
                        >
                          +
                        </label>
                      </>
                    ) : (
                      <label
                        htmlFor='profilePhoto'
                        className='cursor-pointer text-gray-500'
                      >
                        Please Select Profile Picture
                      </label>
                    )}
                  </div>

                  <button
                    type='submit'
                    className='w-full bg-[#1a2a6c] text-white py-3 rounded hover:bg-[#b21f1f] transition-colors duration-300'
                  >
                    SETUP PROFILE
                  </button>
                  <div className='text-center mt-4'>
                    <span className='text-gray-600'>
                      Already have an account?{' '}
                    </span>
                    <Link to='/signin' className='text-[#1a2a6c] hover:text-[#b21f1f]'>
                      Login Here
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      <ToastContainer />
    </div>
  );
}