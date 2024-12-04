import React, { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, db, storage } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import Loading from '../components/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faPhone, faFlag, faCalendar, faCamera } from '@fortawesome/free-solid-svg-icons';

const Dashboard = ({ setUserData }) => {
  const [userData, setLocalUserData] = useState({
    email: '',
    phone: '',
    country: '',
    dob: '',
    profilePicUrl: '',
    firstName: '',
    lastName: ''
  });
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState('');
  const [passwordChangeMode, setPasswordChangeMode] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [isGoogleUser, setIsGoogleUser] = useState(false);
  const user = auth.currentUser;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
              const updatedData = docSnap.data();
              setLocalUserData(updatedData);
              setUserData(updatedData);

            // Check if user signed in with Google
            setIsGoogleUser(user.providerData.some(provider => provider.providerId === 'google.com'));

            // Show alert if profile is incomplete
          } else {
            console.log('No such document!');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user, setUserData]);

  const handleEditToggle = () => {
    setEditMode(!editMode);
    setError('');
  };

  const handleChange = (e) => {
    setLocalUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const storageRef = ref(storage, `profilePictures/${user.uid}/${file.name}`);
      try {
        await uploadBytes(storageRef, file);
        const fileUrl = await getDownloadURL(storageRef);
        setLocalUserData({ ...userData, profilePicUrl: fileUrl });
        setUserData({ ...userData, profilePicUrl: fileUrl }); // Update the userData in App
      } catch (error) {
        console.error('Error uploading file:', error);
        setError('Failed to upload profile picture.');
      }
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    // Validation: Check if any field is blank
    if (!userData.email || !userData.phone || !userData.country || !userData.dob || !userData.profilePicUrl) {
      setError('All fields must be filled out.');
      return;
    }

    try {
      const docRef = doc(db, 'users', user.uid);
      await updateDoc(docRef, {
        ...userData,
        isProfileComplete: !!(userData.email && userData.phone && userData.country && userData.dob),
    }); 

    setLocalUserData({
      ...userData,
      isProfileComplete: !!(userData.email && userData.phone && userData.country && userData.dob),
    });

      setEditMode(false);
      navigate('/dashboard'); // Reload and navigate to dashboard
    } catch (error) {
      setError('Failed to update profile.');
      console.error('Error updating profile:', error);
    }
    window.location.reload();
  };

  const handlePasswordChangeToggle = () => {
    setPasswordChangeMode(!passwordChangeMode);
    setOldPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
    setError('');
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (!oldPassword || !newPassword || !confirmNewPassword) {
      setError('All password fields must be filled out.');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setError('New password and confirm password do not match.');
      return;
    }

    try {
      const credential = EmailAuthProvider.credential(user.email, oldPassword);
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);
      setPasswordChangeMode(false);
      setError(''); // Clear the error message
    } catch (error) {
      setError('Failed to change password. Please check your old password.');
      console.error('Error changing password:', error);
    }
  };

  const handleCompleteProfile = () => {
    setEditMode(true);
  };

  if (loading) {
    return <Loading />;
  }
  console.log(userData);

  return (
    <div className="dashboard-container page-margin-top">
      <div className="sidebar">
        <div className='profile-pic-container'>
          <img src={userData.profilePicUrl || 'default-profile.png'} alt="Profile" className="profile-pic" />
          <FontAwesomeIcon className='change-profile-pic' icon={faCamera} onClick={handleEditToggle} />
        </div>
        <h2>{userData.firstName} {userData.lastName}</h2>
        <button className="btn-edit" onClick={handleEditToggle}>
          {editMode ? 'Cancel' : 'Edit Profile'}
        </button>
        <button className="btn-logout" onClick={() => auth.signOut()}>
          Logout
        </button>
      </div>
      <div className="main-content">
        { userData && !userData.isProfileComplete && (
          <div className="alert">
            <p>We want to know more about you. Complete your profile now.</p>
            <button onClick={handleCompleteProfile} className="alert-button">
              Go to Profile Setup
            </button>
          </div>
        )}
        <h1>Welcome, {userData.firstName }</h1>
        <form onSubmit={handleUpdateProfile}>
        <div className="form-group">
            <FontAwesomeIcon icon={faUser} />
            <label>First Name:</label>
            {editMode ? (
              <input
                type="text"
                name="firstName"
                value={userData.firstName}
                onChange={handleChange}
                style={{ borderColor: !userData.firstName ? '#d11544' : '' }}
              />
            ) : (
              <p>{userData.firstName || 'N/A'}</p>
            )}
          </div>
          <div className="form-group">
            <FontAwesomeIcon icon={faUser} />
            <label>Last Name:</label>
            {editMode ? (
              <input
                type="text"
                name="lastName"
                value={userData.lastName}
                onChange={handleChange}
                style={{ borderColor: !userData.lastName ? '#d11544' : '' }}
              />
            ) : (
              <p>{userData.lastName || 'N/A'}</p>
            )}
          </div>
          <div className="form-group">
            <FontAwesomeIcon icon={faEnvelope} />
            <label>Email:</label>
            {editMode ? (
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                style={{ borderColor: !userData.email ? '#d11544' : '' }}
              />
            ) : (
              <p>{userData.email || 'N/A'}</p>
            )}
          </div>
          <div className="form-group">
            <FontAwesomeIcon icon={faPhone} />
            <label>Phone:</label>
            {editMode ? (
              <input
                type="text"
                name="phone"
                value={userData.phone}
                onChange={handleChange}
                style={{ borderColor: !userData.phone ? '#d11544' : '' }}
              />
            ) : (
              <p>{userData.phone || 'N/A'}</p>
            )}
          </div>
          <div className="form-group">
            <FontAwesomeIcon icon={faFlag} />
            <label>Country:</label>
            {editMode ? (
              <input
                type="text"
                name="country"
                value={userData.country}
                onChange={handleChange}
                style={{ borderColor: !userData.country ? '#d11544' : '' }}
              />
            ) : (
              <p>{userData.country || 'N/A'}</p>
            )}
          </div>
          <div className="form-group">
            <FontAwesomeIcon icon={faCalendar} />
            <label>Date of Birth:</label>
            {editMode ? (
              <input
                type="date"
                name="dob"
                value={userData.dob}
                onChange={handleChange}
                style={{ borderColor: !userData.dob ? '#d11544' : '' }}
              />
            ) : (
              <p>{userData.dob || 'N/A'}</p>
            )}
          </div>
          <div className="form-group">
            {editMode && (
              <>
                <FontAwesomeIcon icon={faCamera} />
                <label>Profile Photo:</label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  style={{ borderColor: !userData.profilePicUrl ? '#d11544' : '' }}
                />
              </>
            )}
          </div>
          {editMode && <button type="submit">Save</button>}
        </form>
        {editMode && !isGoogleUser && (
          <>
            <button onClick={handlePasswordChangeToggle}>
              {passwordChangeMode ? 'Cancel' : 'Change Password'}
            </button>
            {passwordChangeMode && (
              <form onSubmit={handlePasswordChange}>
                <div className="form-group">
                  <label>Old Password:</label>
                  <input
                    type="password"
                    name="oldPassword"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    style={{ borderColor: error.includes('old password') ? '#d11544' : '' }}
                  />
                </div>
                <div className="form-group">
                  <label>New Password:</label>
                  <input
                    type="password"
                    name="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    style={{ borderColor: error.includes('new password') ? '#d11544' : '' }}
                  />
                </div>
                <div className="form-group">
                  <label>Confirm New Password:</label>
                  <input
                    type="password"
                    name="confirmNewPassword"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    style={{ borderColor: error.includes('confirm password') ? '#d11544' : '' }}
                  />
                </div>
                <button type="submit">Change Password</button>
                {error && <p style={{ color: '#d11544' }}>{error}</p>}
              </form>
            )}
          </>
        )}
        {editMode && isGoogleUser && (
          <p>Password change is not available for Google users. Please manage your password through your Google account.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
