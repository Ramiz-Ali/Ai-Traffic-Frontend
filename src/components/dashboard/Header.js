import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from '../../redux/action/auth';
import { User } from 'lucide-react'; // For fallback avatar

const Header = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.auth);

  // Fetch profile on mount
  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  return (
    <div className='flex justify-between items-center bg-white p-4 shadow-md border-b border-gray-200'>
      {/* Greeting */}
      <h1 className='text-xl font-semibold text-[#1a2a6c]'>
        Welcome back,{' '}
        <span className='text-[#b21f1f] font-bold'>{profile?.name || 'User'}</span>
      </h1>

      {/* Profile Section */}
      <div className='flex items-center space-x-2'>
        {profile?.profilePhoto ? (
          <img
            src={profile?.profilePhoto}
            alt='Profile'
            className='w-10 h-10 rounded-full border-2 border-[#1a2a6c] object-cover'
          />
        ) : (
          <div className='w-10 h-10 rounded-full bg-[#1a2a6c] flex items-center justify-center'>
            <User size={24} className='text-white' />
          </div>
        )}
        <span className='text-sm font-medium text-[#1a2a6c] hidden md:block'>
          {profile?.name || 'User'}
        </span>
      </div>
    </div>
  );
};

export default Header;