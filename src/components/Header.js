import React, { useState, useEffect } from 'react';
import ProfileIcon from '../assets/icons/profile';
import { routes } from '../contant';
import { LogOut, Menu, X, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase'; // Adjust path if firebase.js is elsewhere
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { toast } from 'react-toastify';

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // Track authenticated user
  const [isOpen, setIsOpen] = useState(false); // Profile dropdown
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Mobile menu toggle

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Update user state
    });

    return () => unsubscribe(); // Clean up listener on unmount
  }, []);

  // Toggle profile dropdown
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('Logged out successfully!');
      navigate(routes.signin);
    } catch (error) {
      toast.error('Failed to log out. Please try again.');
    }
  };

  return (
    <header
      onMouseLeave={() => setIsOpen(false)}
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 999,
        background: 'linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d)',
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
        transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
      }}
      className="flex justify-between items-center py-2 px-4 lg:px-6"
    >
      {/* Logo */}
      <h5 className="text-white text-lg font-bold">AI Traffic Management</h5>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex items-center space-x-6">
        <Link
          to={routes.main}
          className="text-white transition-colors duration-300 hover:text-amber-300 focus:outline-none"
        >
          Home
        </Link>
        <Link
          to={routes.trafficanalysis}
          className="text-white transition-colors duration-300 hover:text-amber-300 focus:outline-none"
        >
          Traffic Analysis
        </Link>
        <Link
          to={routes.realTimeMonitoring}
          className="text-white transition-colors duration-300 hover:text-amber-300 focus:outline-none"
        >
          Real-Time Monitoring
        </Link>
        <Link
          to={routes.dynamicSignalControl}
          className="text-white transition-colors duration-300 hover:text-amber-300 focus:outline-none"
        >
          Signal Control
        </Link>
        <Link
          to={routes.AIGeneratedReports}
          className="text-white transition-colors duration-300 hover:text-amber-300 focus:outline-none"
        >
          AI Reports
        </Link>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-white mt-[51px] transform ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out lg:hidden z-50 shadow-lg`}
      >
        <div className="flex flex-col p-4 space-y-4">
          <Link
            to={routes.main}
            className="text-gray-800 transition-colors duration-300 hover:text-amber-500 focus:outline-none text-left"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to={routes.trafficanalysis}
            className="text-gray-800 transition-colors duration-300 hover:text-amber-500 focus:outline-none text-left"
            onClick={() => setIsMenuOpen(false)}
          >
            Traffic Analysis
          </Link>
          <Link
            to={routes.realTimeMonitoring}
            className="text-gray-800 transition-colors duration-300 hover:text-amber-500 focus:outline-none text-left"
            onClick={() => setIsMenuOpen(false)}
          >
            Real-Time Monitoring
          </Link>
          <Link
            to={routes.dynamicSignalControl}
            className="text-gray-800 transition-colors duration-300 hover:text-amber-500 focus:outline-none text-left"
            onClick={() => setIsMenuOpen(false)}
          >
            Signal Control
          </Link>
          <Link
            to={routes.AIGeneratedReports}
            className="text-gray-800 transition-colors duration-300 hover:text-amber-500 focus:outline-none text-left"
            onClick={() => setIsMenuOpen(false)}
          >
            AI Reports
          </Link>
        </div>
      </div>

      {/* Profile and Authentication */}
      <div className="flex items-center space-x-4">
        {/* Hamburger Menu for Mobile */}
        <button
          className="lg:hidden text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        {user ? (
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="bg-blue-200 text-gray-800 rounded-full p-2 hover:bg-blue-300 focus:outline-none"
            >
              <ProfileIcon />
            </button>
            {isOpen && (
              <div className="absolute right-0 top-14 w-36 bg-white border-1 border-zinc-500 rounded-lg shadow-lg z-50">
                <div className="absolute top-[-9px] right-4 w-4 h-4 bg-white border-t-2 border-l-2 border-zinc-500 transform rotate-45"></div>
                <div className="py-2">
                  <button
                    onClick={handleLogout}
                    className="flex items-center px-4 py-2 text-sm text-gray-800 hover:bg-gray-200 hover:rounded-md w-full"
                  >
                    <LogOut size={16} className="mr-2" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link
              to={routes.signup}
              className="text-sm text-white hover:text-amber-300 lg:hidden"
            >
              Signup
            </Link>
            <Link
              to={routes.signin}
              className="text-sm text-white hover:text-amber-300 lg:hidden"
            >
              Login
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;