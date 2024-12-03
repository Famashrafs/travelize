// src/pages/Login.js
import React, { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider, facebookProvider, db } from '../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useNavigate, Link } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaGoogle, FaFacebook } from 'react-icons/fa';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [inputErrors, setInputErrors] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const errors = {};
    if (!email) {
      errors.email = 'Please enter your email address.';
    }
    if (!password) {
      errors.password = 'Please enter your password.';
    }
    setInputErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log('User:', user);
        navigate('/dashboard');
      } catch (error) {
        console.error('Login error:', error.message);
        setError('Invalid email or password.');
      }
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setInputErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value ? '' : `Please enter your ${name}.`
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleGoogleLogin = async () => {
    try {
      googleProvider.setCustomParameters({ prompt: 'select_account' });
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Check if user data exists in Firestore
      const userRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        // User exists, navigate to dashboard
        console.log('Existing User:', userDoc.data());
        navigate('/dashboard');
      } else {
        // Create new user data with profile picture
        const profilePicUrl = user.photoURL || '../images/avater.png'; // Replace with the path to your default image
        await setDoc(userRef, {
          email: user.email,
          displayName: user.displayName,
          profilePicUrl: profilePicUrl
        });

        console.log('New Google User:', user);
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Google login error:', error.message);
      setError('Google login failed.');
    }
  };

  const handleFacebookLogin = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      const user = result.user;

      // Check if user data exists in Firestore
      const userRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        // User exists, navigate to dashboard
        console.log('Existing User:', userDoc.data());
        navigate('/dashboard');
      } else {
        // Create new user data with profile picture
        const profilePicUrl = user.photoURL || '../images/avater.png'; // Replace with the path to your default image
        await setDoc(userRef, {
          email: user.email,
          displayName: user.displayName,
          profilePicUrl: profilePicUrl
        });

        console.log('New Facebook User:', user);
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Facebook login error:', error.message);
      setError('Facebook login failed.');
    }
  };

  return (
    <div className='login-page page-margin-top'>
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md login-form">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="input-container">
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={handleBlur}
              className={`form-input ${inputErrors.email ? 'error' : ''}`}
              required
              placeholder=" "
              style={{ paddingTop: "1.5rem"}}
            />
            <label className="floating-label">Email</label>
            {inputErrors.email && <span className="error-message">{inputErrors.email}</span>}
          </div>
          <div className="input-container">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={handleBlur}
              className={`form-input ${inputErrors.password ? 'error' : ''}`}
              required
              placeholder=" "
              style={{ paddingTop: "1.5rem"}}
            />
            <label className="floating-label">Password</label>
            <span className="password-toggle" onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            {inputErrors.password && <span className="error-message">{inputErrors.password}</span>}
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          >
            Login
          </button>
          <p></p>
        </form>
        <div className="social-login-buttons mt-4">
          <button
            onClick={handleGoogleLogin}
            className="bg-red-500 text-white px-4 py-2 rounded mt-2 flex items-center"
          >
            <FaGoogle className="mr-2" /> Login with Google
          </button>
          <button
            onClick={handleFacebookLogin}
            className="bg-blue-800 text-white px-4 py-2 rounded mt-2 flex items-center"
          >
            <FaFacebook className="mr-2" /> Login with Facebook
          </button>
        </div>
        <p className="mt-4">
          Don't have an account? <Link to="/signup" className="text-blue-500">Sign up</Link>
        </p>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default Login;