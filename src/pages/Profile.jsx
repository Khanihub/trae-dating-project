import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Profile.css'

const API_BASE = import.meta.env.VITE_API

function Profile() {
  const navigate = useNavigate()
  const [isVisible, setIsVisible] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  const [formData, setFormData] = useState({
    fullName: '',
    gender: '',
    age: '',
    isMuslim: true,
    sect: '',
    city: '',
    education: '',
    interests: '',
    about: '',
    height: '',
    profession: ''
  })

  const [profileImage, setProfileImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)

  const token = localStorage.getItem('token')
  if (!token) navigate('/login')

  let currentUserId = null
  try {
    currentUserId = JSON.parse(atob(token.split('.')[1])).id
  } catch {
    localStorage.removeItem('token')
    navigate('/login')
  }

  useEffect(() => {
    if (!token) return
    fetchProfile()
    setTimeout(() => setIsVisible(true), 100)
  }, [token])

  // Fetch profile safely
  const fetchProfile = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/profiles/me`, {
        headers: { Authorization: `Bearer ${token}` }
      })

      if (!res.ok) {
        if (res.status === 404) {
          setMessage({ type: 'info', text: 'No profile found. You can create one.' })
        } else {
          const text = await res.text()
          console.error('Fetch profile failed:', res.status, text)
          setMessage({ type: 'error', text: 'Failed to load profile.' })
        }
        return
      }

      const data = await res.json()
      if (data) {
        setFormData({
          fullName: data.fullName || '',
          gender: data.gender || '',
          age: data.age || '',
          isMuslim: data.isMuslim ?? true,
          sect: data.sect || '',
          city: data.city || '',
          education: data.education || '',
          interests: data.interests || '',
          about: data.about || '',
          height: data.height || '',
          profession: data.profession || ''
        })
        if (data.image) setImagePreview(data.image)
      }
    } catch (err) {
      console.error('Error fetching profile:', err)
      setMessage({ type: 'error', text: 'Failed to load profile data.' })
    } finally {
      setLoading(false)
    }
  }

  const handleChange = e => {
    const { name, value, checked } = e.target
    if (name === 'age' && value < 18 && value !== '') {
      setMessage({ type: 'error', text: 'Age must be 18 or above.' })
      return
    }
    if (name === 'isMuslim') {
      setFormData({ ...formData, isMuslim: checked, sect: '' })
      return
    }
    setFormData({ ...formData, [name]: value })
  }

  const handleImageChange = e => {
    const file = e.target.files[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setMessage({ type: 'error', text: 'Please upload an image file.' })
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setMessage({ type: 'error', text: 'Image size should be less than 5MB.' })
      return
    }
    setProfileImage(file)
    const reader = new FileReader()
    reader.onloadend = () => setImagePreview(reader.result)
    reader.readAsDataURL(file)
  }

  const removeImage = () => {
    setProfileImage(null)
    setImagePreview(null)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setSaving(true)
    setMessage({ type: '', text: '' })

    // Frontend validation
    if (!formData.fullName || !formData.gender || !formData.age) {
      setMessage({ type: 'error', text: 'Full Name, Gender, and Age are required.' })
      setSaving(false)
      return
    }
    if (formData.age < 18) {
      setMessage({ type: 'error', text: 'Age must be 18 or above.' })
      setSaving(false)
      return
    }

    try {
      const submitData = new FormData()
      Object.entries(formData).forEach(([key, value]) => submitData.append(key, value ?? ''))
      if (profileImage) submitData.append('image', profileImage)

      const res = await fetch(`${API_BASE}/api/profiles`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: submitData
      })

      const data = await res.json()
      if (res.ok) {
        setMessage({ type: 'success', text: 'Profile saved successfully! ✓' })
        setTimeout(() => navigate('/dashboard'), 2000)
      } else {
        setMessage({ type: 'error', text: data.message || 'Failed to save profile.' })
      }
    } catch (err) {
      console.error('Error saving profile:', err)
      setMessage({ type: 'error', text: 'An unexpected error occurred. Please try again.' })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-content">
          <div className="loading-spinner-large"></div>
          <p className="loading-text">Loading profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="profile-page">
      <main className={`profile-container ${isVisible ? 'visible' : ''}`}>
        <div className="profile-header">
          <button onClick={() => navigate('/dashboard')} className="back-btn">
            ← Back to Dashboard
          </button>
          <div className="header-card">
            <h1>My Profile</h1>
            <p>Complete your profile to find better matches</p>
          </div>
        </div>

        {message.text && <div className={`alert ${message.type}`}>{message.text}</div>}

        <form onSubmit={handleSubmit} className="profile-form">
          {/* Image Upload */}
          <div className="form-section">
            <h3 className="section-title">Profile Picture</h3>
            <div className="image-upload-section">
              <div className="image-upload">
                <div className="image-box">
                  {imagePreview ? <img src={imagePreview} alt="Profile" /> : <div className="no-image">📷 No Image</div>}
                </div>
                <div className="image-actions">
                  <label htmlFor="image-input" className="upload-btn">Choose Image</label>
                  <input id="image-input" type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
                  {imagePreview && <button type="button" onClick={removeImage} className="remove-img-btn">Remove Image</button>}
                </div>
              </div>
            </div>
          </div>

          {/* Basic Info */}
          <div className="form-section">
            <h3 className="section-title">Basic Information</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Full Name *</label>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required className="profile-input" placeholder="Enter your full name" />
              </div>
              <div className="form-group">
                <label>Age *</label>
                <input type="number" name="age" value={formData.age || ''} onChange={handleChange} min="18" className="profile-input" placeholder="Enter your age" />
              </div>
              <div className="form-group">
                <label>Gender *</label>
                <select name="gender" value={formData.gender} onChange={handleChange} required className="profile-input">
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label>Height (cm)</label>
                <input type="number" name="height" value={formData.height} onChange={handleChange} className="profile-input" placeholder="e.g., 170" />
              </div>
            </div>
          </div>

          {/* Religious Info */}
          <div className="form-section">
            <h3 className="section-title">Religious Information</h3>
            <div className="form-group checkbox-group">
              <label className="checkbox-label">
                <input type="checkbox" name="isMuslim" checked={formData.isMuslim} onChange={handleChange} />
                <span className="checkbox-text">I am Muslim</span>
              </label>
            </div>
            {formData.isMuslim && (
              <div className="form-group">
                <label>Sect</label>
                <select name="sect" value={formData.sect} onChange={handleChange} className="profile-input">
                  <option value="">Select Sect</option>
                  <option value="Sunni">Sunni</option>
                  <option value="Shia">Shia</option>
                  <option value="Ahle Hadith">Ahle Hadith</option>
                  <option value="Deobandi">Deobandi</option>
                  <option value="Barelvi">Barelvi</option>
                  <option value="Prefer Not to Say">Prefer Not to Say</option>
                </select>
              </div>
            )}
          </div>

          {/* Location & Education */}
          <div className="form-section">
            <h3 className="section-title">Location & Education</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>City</label>
                <input type="text" name="city" value={formData.city} onChange={handleChange} className="profile-input" placeholder="e.g., Islamabad" />
              </div>
              <div className="form-group">
                <label>Education</label>
                <input type="text" name="education" value={formData.education} onChange={handleChange} className="profile-input" placeholder="e.g., Bachelor's Degree" />
              </div>
              <div className="form-group">
                <label>Profession</label>
                <input type="text" name="profession" value={formData.profession} onChange={handleChange} className="profile-input" placeholder="e.g., Software Engineer" />
              </div>
              <div className="form-group">
                <label>Interests</label>
                <input type="text" name="interests" value={formData.interests} onChange={handleChange} className="profile-input" placeholder="e.g., Reading, Travel, Cooking" />
              </div>
            </div>
          </div>

          {/* About Me */}
          <div className="form-section">
            <h3 className="section-title">About Me</h3>
            <div className="form-group">
              <label>Tell us about yourself</label>
              <textarea name="about" value={formData.about} onChange={handleChange} className="profile-input profile-textarea" rows="6" placeholder="Write a brief description about yourself..." />
            </div>
          </div>

          {/* Submit Button */}
          <div className="form-actions">
            <button type="submit" disabled={saving} className="save-btn">
              {saving ? 'Saving...' : 'Save Profile'}
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}

export default Profile
