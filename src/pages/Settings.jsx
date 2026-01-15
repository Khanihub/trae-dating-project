import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Settings.css';

const API_PROFILE = import.meta.env.VITE_API_PROFILE;

function Settings() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [profileData, setProfileData] = useState({
    fullName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: ''
  });

  const [privacySettings, setPrivacySettings] = useState({
    showProfile: true,
    showPhotos: true,
    showContact: false,
    allowMessages: true,
    showLastSeen: true
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    newMatches: true,
    messages: true,
    interests: true,
    promotions: false
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/login');

    const fetchUserData = async () => {
      try {
        const res = await axios.get(API_PROFILE, { headers: { Authorization: `Bearer ${token}` } });
        setProfileData(res.data.profile);
        setPrivacySettings(res.data.privacySettings);
        setNotificationSettings(res.data.notificationSettings);
        setTimeout(() => setIsVisible(true), 100);
      } catch {
        navigate('/login');
      }
    };

    fetchUserData();
  }, [navigate]);

  const triggerSuccess = () => {
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(`${API_PROFILE}/update`, profileData, { headers: { Authorization: `Bearer ${token}` } });
      setProfileData(res.data.profile);
      triggerSuccess();
    } catch {
      alert('Failed to update profile');
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) return alert('Passwords do not match!');
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${API_PROFILE}/password`, { currentPassword: passwordData.currentPassword, newPassword: passwordData.newPassword }, { headers: { Authorization: `Bearer ${token}` } });
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      triggerSuccess();
    } catch {
      alert('Failed to update password');
    }
  };

  const handlePrivacyUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${API_PROFILE}/privacy`, privacySettings, { headers: { Authorization: `Bearer ${token}` } });
      triggerSuccess();
    } catch {
      alert('Failed to update privacy settings');
    }
  };

  const handleNotificationUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${API_PROFILE}/notifications`, notificationSettings, { headers: { Authorization: `Bearer ${token}` } });
      triggerSuccess();
    } catch {
      alert('Failed to update notification settings');
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(API_PROFILE, { headers: { Authorization: `Bearer ${token}` } });
      localStorage.removeItem('token');
      navigate('/login');
    } catch {
      alert('Failed to delete account');
    }
  };

  const tabs = [
    { id: 'profile', name: 'Profile Info', icon: '👤' },
    { id: 'password', name: 'Password', icon: '🔒' },
    { id: 'privacy', name: 'Privacy', icon: '🛡️' },
    { id: 'notifications', name: 'Notifications', icon: '🔔' },
    { id: 'danger', name: 'Account', icon: '⚠️' }
  ];

  return (
    <div className="settings-page">
      <Navbar />
      <main className={`settings-main ${isVisible ? 'visible' : ''}`}>
        <header className="settings-header">
          <h1>Account Settings</h1>
          <p>Manage your account preferences and security</p>
        </header>

        {showSuccessMessage && (
          <div className="success-message">
            <span>✔</span>
            <p>Settings updated successfully!</p>
          </div>
        )}

        <div className="settings-container">
          <aside className="settings-sidebar">
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={activeTab === tab.id ? 'active' : ''}>
                <span>{tab.icon}</span> {tab.name}
              </button>
            ))}
          </aside>

          <section className="settings-content">
            {activeTab === 'profile' && (
              <form onSubmit={handleProfileUpdate} className="settings-form">
                <h2>Personal Information</h2>
                <div className="form-grid">
                  {['fullName', 'email', 'phone', 'dateOfBirth'].map(field => (
                    <label key={field}>
                      {field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      <input
                        type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : field === 'dateOfBirth' ? 'date' : 'text'}
                        value={profileData[field]}
                        onChange={e => setProfileData({ ...profileData, [field]: e.target.value })}
                      />
                    </label>
                  ))}
                  <label>
                    Gender
                    <select value={profileData.gender} onChange={e => setProfileData({ ...profileData, gender: e.target.value })}>
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </label>
                </div>
                <button type="submit">Save Changes</button>
              </form>
            )}

            {activeTab === 'password' && (
              <form onSubmit={handlePasswordChange} className="settings-form">
                <h2>Change Password</h2>
                {['currentPassword', 'newPassword', 'confirmPassword'].map(field => (
                  <label key={field}>
                    {field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    <input
                      type="password"
                      value={passwordData[field]}
                      onChange={e => setPasswordData({ ...passwordData, [field]: e.target.value })}
                    />
                  </label>
                ))}
                <button type="submit">Update Password</button>
              </form>
            )}

            {activeTab === 'privacy' && (
              <div className="settings-form">
                <h2>Privacy Settings</h2>
                {Object.keys(privacySettings).map(key => (
                  <label key={key}>
                    <input type="checkbox" checked={privacySettings[key]} onChange={e => setPrivacySettings({ ...privacySettings, [key]: e.target.checked })} />
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </label>
                ))}
                <button onClick={handlePrivacyUpdate}>Save Privacy Settings</button>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="settings-form">
                <h2>Notification Preferences</h2>
                {Object.keys(notificationSettings).map(key => (
                  <label key={key}>
                    <input type="checkbox" checked={notificationSettings[key]} onChange={e => setNotificationSettings({ ...notificationSettings, [key]: e.target.checked })} />
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </label>
                ))}
                <button onClick={handleNotificationUpdate}>Save Notification Settings</button>
              </div>
            )}

            {activeTab === 'danger' && (
              <div className="settings-form">
                <h2>Danger Zone</h2>
                <button onClick={() => setShowDeleteConfirm(true)}>Delete Account</button>
                {showDeleteConfirm && (
                  <div className="modal">
                    <div>
                      <p>Are you sure you want to delete your account?</p>
                      <button onClick={handleDeleteAccount}>Yes, Delete</button>
                      <button onClick={() => setShowDeleteConfirm(false)}>Cancel</button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

export default Settings;
