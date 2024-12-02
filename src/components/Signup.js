import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useNavigate , Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Flag from 'react-world-flags';
import countriesData from '../data/countries.json';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [phone, setPhone] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(countriesData[0]);
  const [dob, setDob] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const auth = getAuth();
  const db = getFirestore();
  const storage = getStorage();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      // Sign up user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Upload profile picture if selected
      let profilePicUrl = '';
      if (profilePic) {
        const profilePicRef = ref(storage, `profile_pictures/${user.uid}/${profilePic.name}`);
        await uploadBytes(profilePicRef, profilePic);
        profilePicUrl = await getDownloadURL(profilePicRef);
        console.log('Profile picture URL:', profilePicUrl); // Debugging: log the URL
      }

      // Save user details to Firestore
      const userDocRef = doc(db, 'users', user.uid);
      await setDoc(userDocRef, {
        firstName,
        lastName,
        email,
        phone,
        country: selectedCountry.name,
        dob,
        profilePicUrl
      });

      // Redirect to dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Error signing up:', error);
      alert('Error signing up');
    } finally {
      setLoading(false);
    }
  };

  const handleProfilePicChange = (e) => {
    setProfilePic(e.target.files[0]);
  };

  const handlePhoneChange = (e) => {
    const phoneNumber = e.target.value;
    setPhone(phoneNumber);

    // Automatically detect the country code based on the phone number
    const matchedCountry = countriesData.find(country => phoneNumber.startsWith(country.phoneCode));
    if (matchedCountry) {
      setSelectedCountry(matchedCountry);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md page-margin-top">
      <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
      <form onSubmit={handleSignup}>
        <label className="block mb-2">
          <span className="text-gray-700">First Name</span>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="form-input mt-1 block w-full"
            required
          />
        </label>
        <label className="block mb-2">
          <span className="text-gray-700">Last Name</span>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="form-input mt-1 block w-full"
            required
          />
        </label>
        <label className="block mb-2">
          <span className="text-gray-700">Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input mt-1 block w-full"
            required
          />
        </label>
        <label className="block mb-2">
          <span className="text-gray-700">Password</span>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input mt-1 block w-full"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showPassword ? <FaEyeSlash className='eye-icon' /> : <FaEye className='eye-icon' />}
            </button>
          </div>
        </label>
        <label className="block mb-2">
          <span className="text-gray-700">Confirm Password</span>
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="form-input mt-1 block w-full"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showConfirmPassword ? <FaEyeSlash className='eye-icon' /> : <FaEye className='eye-icon' />}
            </button>
          </div>
        </label>
        <label className="block mb-2">
          <span className="text-gray-700">Country</span>
          <div className="flex items-center mb-4">
            <Flag
              code={selectedCountry.code}
              style={{ width: '2em', height: '1.5em', marginRight: '0.5em' }}
            />
            <select
              value={selectedCountry.code}
              onChange={(e) => setSelectedCountry(countriesData.find(c => c.code === e.target.value))}
              className="form-select mt-1 block w-full"
            >
              {countriesData.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
        </label>
        <label className="block mb-2">
          <span className="text-gray-700">Phone Number</span>
          <div className="flex items-center">
            <Flag
              code={selectedCountry.code}
              style={{ width: '2em', height: '1.5em', marginRight: '0.5em' }}
            />
            <input
              type="tel"
              value={phone}
              onChange={handlePhoneChange}
              className="form-input mt-1 block w-full"
              placeholder={`${selectedCountry.phoneCode}`}
              required
            />
          </div>
        </label>
        <label className="block mb-2">
          <span className="text-gray-700">Date of Birth</span>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="form-input mt-1 block w-full"
            required
          />
        </label>
        <label className="block mb-2">
          <span className="text-gray-700">Profile Picture</span>
          <input
            type="file"
            onChange={handleProfilePicChange}
            className="form-input mt-1 block w-full"
          />
        </label>
        <button
          type="submit"
          className={`bg-blue-500 text-white px-4 py-2 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>
      <p className="mt-4">
        Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
      </p>
    </div>
  );
};

export default Signup;
