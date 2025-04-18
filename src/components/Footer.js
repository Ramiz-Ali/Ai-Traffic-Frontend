import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className='bg-gray-900 text-white py-12'>
      <div className='max-w-6xl mx-auto px-4'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          {/* About Section */}
          <div className='mb-6'>
            <h3 className='text-xl font-bold mb-4 text-blue-400'>About Us</h3>
            <p className='text-gray-300'>
              We are dedicated to revolutionizing urban traffic management using AI-powered tools. Our system optimizes traffic flow, reduces congestion, and enhances road safety.
            </p>
          </div>

          {/* Quick Links Section */}
          <div className='mb-6'>
            <h3 className='text-xl font-bold mb-4 text-blue-400'>Quick Links</h3>
            <ul className='space-y-2'>
              <li>
                <a href='#home' className='text-gray-300 hover:text-blue-400 transition duration-300'>
                  Home
                </a>
              </li>
              <li>
                <a href='#features' className='text-gray-300 hover:text-blue-400 transition duration-300'>
                  Features
                </a>
              </li>
              <li>
                <a href='#benefits' className='text-gray-300 hover:text-blue-400 transition duration-300'>
                  Benefits
                </a>
              </li>
              <li>
                <a href='#contact' className='text-gray-300 hover:text-blue-400 transition duration-300'>
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className='mb-6'>
            <h3 className='text-xl font-bold mb-4 text-blue-400'>Contact Us</h3>
            <ul className='space-y-2'>
              <li className='text-gray-300 flex items-center'>
                <FaEnvelope className='mr-2 text-blue-400' />
                info@aitrafficmanagement.com
              </li>
              <li className='text-gray-300 flex items-center'>
                <FaPhone className='mr-2 text-blue-400' />
                +123 456 7890
              </li>
              <li className='text-gray-300 flex items-center'>
                <FaMapMarkerAlt className='mr-2 text-blue-400' />
                123 AI Street, Smart City, SC 12345
              </li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div className='mb-6'>
            <h3 className='text-xl font-bold mb-4 text-blue-400'>Follow Us</h3>
            <div className='flex space-x-4'>
              <a
                href='https://facebook.com'
                target='_blank'
                rel='noopener noreferrer'
                className='text-gray-300 hover:text-blue-400 transition duration-300'
              >
                <FaFacebook size={24} />
              </a>
              <a
                href='https://twitter.com'
                target='_blank'
                rel='noopener noreferrer'
                className='text-gray-300 hover:text-blue-400 transition duration-300'
              >
                <FaTwitter size={24} />
              </a>
              <a
                href='https://linkedin.com'
                target='_blank'
                rel='noopener noreferrer'
                className='text-gray-300 hover:text-blue-400 transition duration-300'
              >
                <FaLinkedin size={24} />
              </a>
              <a
                href='https://instagram.com'
                target='_blank'
                rel='noopener noreferrer'
                className='text-gray-300 hover:text-blue-400 transition duration-300'
              >
                <FaInstagram size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className='border-t border-gray-800 mt-8 pt-8 text-center'>
          <p className='text-gray-300'>
            &copy; {new Date().getFullYear()} AI Traffic Management. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;