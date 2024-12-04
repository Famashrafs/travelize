// src/components/ProfileSetup.js
import React, { useState, useEffect } from 'react';
import { auth, db, storage } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { updateEmail, reauthenticateWithCredential, EmailAuthProvider, updatePassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const ProfileSetup = () => {
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    dob: '',
    profilePicUrl: ''
  });
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isProfilePicChanged, setIsProfilePicChanged] = useState(false);
  const navigate = useNavigate();
  const user = auth.currentUser;

  useEffect(() => {
    const fetchProfileData = async () => {
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfileData(docSnap.data());
        }
      }
    };
    fetchProfileData();
  }, [user]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profilePic') {
      setProfileData((prevData) => ({
        ...prevData,
        profilePicUrl: URL.createObjectURL(files[0])
      }));
      setIsProfilePicChanged(true);
    } else {
      setProfileData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    setError('');

    if (
      !profileData.firstName ||
      !profileData.lastName ||
      !profileData.email ||
      !profileData.phone ||
      !profileData.country ||
      !profileData.dob
    ) {
      setError('All fields are required.');
      setIsLoading(false);
      return;
    }

    try {
      if (isProfilePicChanged) {
        const profilePicRef = ref(storage, `profilePictures/${user.uid}/profilePic.jpg`);
        const response = await fetch(profileData.profilePicUrl);
        const blob = await response.blob();
        await uploadBytes(profilePicRef, blob);
        const profilePicUrl = await getDownloadURL(profilePicRef);
        profileData.profilePicUrl = profilePicUrl;
      }

      const userDocRef = doc(db, 'users', user.uid);
      await updateDoc(userDocRef, profileData);

      if (user.email !== profileData.email) {
        await updateEmail(user, profileData.email);
      }

      if (newPassword && confirmNewPassword && newPassword === confirmNewPassword) {
        const credential = EmailAuthProvider.credential(user.email, oldPassword);
        await reauthenticateWithCredential(user, credential);
        await updatePassword(user, newPassword);
      }

      navigate('/dashboard'); // Navigate to dashboard after saving
      window.location.reload(); // Reload the page after saving
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile.');
    }

    setIsLoading(false);
  };

  return (
    <div className="profile-setup page-margin-top">
      <h1>Edit Profile</h1>
      <div className="form-group">
        <label>First Name</label>
        <input
          type="text"
          name="firstName"
          value={profileData.firstName}
          onChange={handleChange}
          className={profileData.firstName ? '' : 'error'}
        />
      </div>
      <div className="form-group">
        <label>Last Name</label>
        <input
          type="text"
          name="lastName"
          value={profileData.lastName}
          onChange={handleChange}
          className={profileData.lastName ? '' : 'error'}
        />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={profileData.email}
          onChange={handleChange}
          className={profileData.email ? '' : 'error'}
        />
      </div>
      <div className="form-group">
        <label>Phone</label>
        <input
          type="text"
          name="phone"
          value={profileData.phone}
          onChange={handleChange}
          className={profileData.phone ? '' : 'error'}
        />
      </div>
      <div className="form-group">
        <label>Country</label>
        <input
          type="text"
          name="country"
          value={profileData.country}
          onChange={handleChange}
          className={profileData.country ? '' : 'error'}
        />
      </div>
      <div className="form-group">
        <label>Date of Birth</label>
        <input
          type="date"
          name="dob"
          value={profileData.dob}
          onChange={handleChange}
          className={profileData.dob ? '' : 'error'}
        />
      </div>
      <div className="form-group">
        <label>Profile Picture</label>
        <input
          type="file"
          name="profilePic"
          onChange={handleChange}
          className={profileData.profilePicUrl ? '' : 'error'}
        />
      </div>
      <div className="form-group">
        <label>Old Password</label>
        <input
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>New Password</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Confirm New Password</label>
        <input
          type="password"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
        />
      </div>
      {error && <p className="error-message">{error}</p>}
      <button className="btn-save" onClick={handleSave} disabled={isLoading}>
        {isLoading ? 'Saving...' : 'Save'}
      </button>
      <button className="btn-cancel" onClick={() => navigate('/dashboard')}>
        Cancel
      </button>
    </div>
  );
};

export default ProfileSetup;
