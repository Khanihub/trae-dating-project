import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Footer from '../components/Footer'
import './Profile.css'

function Profile() {
  const navigate = useNavigate()

  const [isVisible, setIsVisible] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  const [formData, setFormData] = useState({
    gender: '',
    age: '',
    city: '',
    education: '',
    sect: '',
  })

  const [profileImage, setProfileImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)

  const API_PROFILE = import.meta.env.VITE_API_PROFILE

  const getAuthHeader = () => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
      return null
    }
    return { Authorization: `Bearer ${token}` }
  }

  useEffect(() => {
    fetchProfile()
    setTimeout(() => setIsVisible(true), 100)
  }, [])

  const fetchProfile = async () => {
    try {
      const headers = getAuthHeader()
      if (!headers) return

      const { data } = await axios.get(API_PROFILE, { headers })

      setFormData({
        gender: data.gender || '',
        age: data.age || '',
        city: data.city || '',
        education: data.education || '',
        sect: data.sect || '',
      })

      if (data.profileImage) {
        setImagePreview(data.profileImage)
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to load profile data.' })
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'age' && value < 18) {
      setMessage({ type: 'error', text: 'Age must be 18 or above.' })
      return
    }
    setFormData({ ...formData, [name]: value })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setMessage({ type: 'error', text: 'Only image files are allowed.' })
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setMessage({ type: 'error', text: 'Image size must be under 5MB.' })
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setMessage({ type: '', text: '' })

    try {
      const headers = getAuthHeader()
      if (!headers) return

      const submitData = new FormData()
      Object.entries(formData).forEach(([key, value]) =>
        submitData.append(key, value)
      )
      if (profileImage) submitData.append('profileImage', profileImage)

      await axios.post(API_PROFILE, submitData, {
        headers: {
          ...headers,
          'Content-Type': 'multipart/form-data',
        },
      })

      setMessage({ type: 'success', text: 'Profile updated successfully.' })
      setTimeout(() => navigate('/dashboard'), 1500)
    } catch (err) {
      setMessage({
        type: 'error',
        text: err.response?.data?.message || 'Profile save failed.',
      })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="loader-page">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="profile-page">
      <main className="profile-container">

        <div className={`profile-header ${isVisible ? 'show' : ''}`}>
          <button onClick={() => navigate('/dashboard')} className="back-btn">
            ← Back to Dashboard
          </button>

          <div className="header-card">
            <h1>My Profile</h1>
            <p>Keep your information updated for better matches.</p>
          </div>
        </div>

        {message.text && (
          <div className={`alert ${message.type}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="profile-form">

          <div className="image-upload">
            <div className="image-box">
              {imagePreview ? (
                <img src={imagePreview} alt="Profile" />
              ) : (
                <span>No Image</span>
              )}
            </div>

            <input type="file" accept="image/*" onChange={handleImageChange} />
            {imagePreview && (
              <button type="button" onClick={removeImage} className="remove-img">
                Remove Image
              </button>
            )}
          </div>

          {['gender', 'age', 'city', 'education', 'sect'].map((field) => (
            <input
              key={field}
              type={field === 'age' ? 'number' : 'text'}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              placeholder={`Enter ${field}`}
              required
              className="profile-input"
            />
          ))}

          <button type="submit" disabled={saving} className="save-btn">
            {saving ? 'Saving...' : 'Save Profile'}
          </button>

        </form>
      </main>
      <Footer />
    </div>
  )
}

export default Profile
