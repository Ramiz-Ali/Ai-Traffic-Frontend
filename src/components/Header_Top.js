import React from 'react';
import * as Icons from 'lucide-react';
import { Facebook, Linkedin, Twitter, Instagram, Youtube } from 'lucide-react';
import { routes } from '../contant';
import { useNavigate } from 'react-router-dom';

const Header_Top = () => {
  const navigate = useNavigate();
  const socialIcons = [
    { name: 'Facebook', icon: Facebook },
    { name: 'Linkedin', icon: Linkedin },
    { name: 'Twitter', icon: Twitter },
    { name: 'Instagram', icon: Instagram },
    { name: 'Youtube', icon: Youtube },
  ];

  return (
    <header
      className='hidden md:block py-2 px-4'
      style={{
        background: '#f0f4f8', // Light gray background
        color: '#2d3748', // Dark gray text color
      }}
    >
      <div className='container mx-auto flex flex-wrap justify-between items-center'>
        {/* Left Section: Key Feature */}
        <div className='hidden md:flex items-center justify-start !space-x-2 h-auto'>
          <Icons.Zap className='h-4 w-4 flex-shrink-0 text-blue-600' />
          <p className='text-sm leading-none m-0 text-gray-800'>
            Optimize Traffic Flow with AI-Powered Tools!
          </p>
        </div>

        {/* Middle Section: Social Icons (Hidden on mobile screens) */}
        <div className='hidden lg:flex space-x-5'>
          <div className='border-l-2 border-gray-300 max-h-full'></div>
          {socialIcons.map(({ name, icon: IconComponent }) => (
            <a
              key={name}
              href='#'
              className='relative group flex items-center h-6 justify-center'
              aria-label={name}
            >
              <IconComponent className='h-5 w-5 text-gray-700 group-hover:text-blue-600 transition-colors duration-200' />
            </a>
          ))}
        </div>

        {/* Right Section: Login/Register or Subscription Status */}
        <div className='flex items-center space-x-4'>
          {localStorage.getItem('token') ? (
            <>
              <div className='border-l-2 border-gray-300 max-h-full'></div>
              <div className='flex gap-1'>
                <button className='text-sm text-gray-800 hover:text-blue-600'>
                  Welcome To Ai Traffic Management System 
                </button>
              </div>
            </>
          ) : (
            <div className='flex space-x-4'>
              <div className='border-l-2 border-gray-300 max-h-full'></div>
              <div className='flex gap-1' onClick={() => navigate(routes.signin)}>
                <Icons.User className='w-4 text-gray-700' />
                <button className='text-sm text-gray-800 hover:text-blue-600'>Log In</button>
              </div>
              <div className='border-l-2 border-gray-300 max-h-full'></div>
              <div className='flex gap-1' onClick={() => navigate(routes.signup)}>
                <Icons.UserRoundPen className='w-4 text-gray-700' />
                <button className='text-sm text-gray-800 hover:text-blue-600'>Register Now</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header_Top;