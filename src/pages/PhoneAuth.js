import React, { useState } from 'react';
import { auth } from '../config/firebaseConfig'; // Import the auth object
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
} from 'firebase/auth';

const AuthComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true); // Switch between login and register
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setMessage('Email and password are required.');
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User registered:', userCredential.user);
      // Send email verification after registration
      await sendEmailVerification(userCredential.user);
      setMessage('Verification email sent! Please check your inbox.');
    } catch (error) {
      setMessage('Error during registration: ' + error.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setMessage('Email and password are required.');
      return;
    }
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in:', userCredential.user);
      setMessage('Login successful!');
    } catch (error) {
      setMessage('Error during login: ' + error.message);
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    if (!email) {
      setMessage('Please enter your email to reset password.');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Password reset email sent! Please check your inbox.');
    } catch (error) {
      setMessage('Error sending password reset email: ' + error.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>{isLogin ? 'Login' : 'Register'}</h2>

      <form onSubmit={isLogin ? handleLogin : handleRegister}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
        </div>
      </form>

      {isLogin && (
        <div>
          <p>
            Don't have an account?{' '}
            <button onClick={() => setIsLogin(false)}>Register</button>
          </p>
          <p>
            Forgot your password?{' '}
            <button onClick={handlePasswordReset}>Reset Password</button>
          </p>
        </div>
      )}

      {!isLogin && (
        <div>
          <p>
            Already have an account?{' '}
            <button onClick={() => setIsLogin(true)}>Login</button>
          </p>
        </div>
      )}

      {message && <p>{message}</p>}
    </div>
  );
};

export default AuthComponent;
