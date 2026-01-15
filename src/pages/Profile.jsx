import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import './Profile.css'

function Profile() {
  const navigate = useNavigate()

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

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) return navigate('/login')
    fetchProfile()
  }, [navigate])

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await fetch('http://localhost:5000/api/profile', {
        headers: { Authorization: `Bearer ${token}` }
      })
      const data = await res.json()
      if (res.ok && data.profile) {
        setFormData({
          fullName: data.profile.fullName || '',
          gender: data.profile.gender || '',
          age: data.profile.age || '',
          isMuslim: data.profile.isMuslim ?? true,
          sect: data.profile.sect || '',
          city: data.profile.city || '',
          education: data.profile.education || '',
          interests: data.profile.interests || '',
          about: data.profile.about || '',
          height: data.profile.height || '',
          profession: data.profile.profession || ''
        })
        if (data.profile.profileImage) setImagePreview(data.profile.profileImage)
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to load profile.' })
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    if (name === 'isMuslim') {
      setFormData({ ...formData, isMuslim: checked, sect: '' })
    } else if (name === 'age' && value < 18) {
      setMessage({ type: 'error', text: 'Age must be 18 or above.' })
    } else {
      setFormData({ ...formData, [name]: type === 'number' ? Number(value) : value })
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    if (!file.type.startsWith('image/')) return setMessage({ type: 'error', text: 'Please upload an image file.' })
    if (file.size > 5 * 1024 * 1024) return setMessage({ type: 'error', text: 'Image must be less than 5MB.' })

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
      const token = localStorage.getItem('token')
      const submitData = new FormData()
      Object.entries(formData).forEach(([key, value]) => submitData.append(key, value))
      if (profileImage) submitData.append('profileImage', profileImage)

      const res = await fetch('http://localhost:5000/api/profile', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: submitData
      })
      const data = await res.json()

      if (res.ok) {
        setMessage({ type: 'success', text: 'Profile saved successfully!' })
        setTimeout(() => navigate('/dashboard'), 1500)
      } else {
        setMessage({ type: 'error', text: data.message || 'Failed to save profile.' })
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'An error occurred. Please try again.' })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner-large"></div>
        <p>Loading profile...</p>
      </div>
    )
  }

  return (
    <div className="profile-container">
      <main className="profile-main">
        {message.text && (
          <div className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-error'}`}>
            {message.text}
          </div>
        )}
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="profile-picture-section">
            <div className="image-preview">{imagePreview ? <img src={imagePreview} alt="Profile" /> : <span>No Image</span>}</div>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {imagePreview && <button type="button" onClick={removeImage} className="remove-img">Remove</button>}
          </div>

          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" required className="profile-input" />
          <input type="number" name="age" value={formData.age || ''} onChange={handleChange} placeholder="Age" className="profile-input" min="18" max="100" />

          <select name="gender" value={formData.gender} onChange={handleChange} required className="profile-input">
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <label className="checkbox-label">
            <input type="checkbox" name="isMuslim" checked={formData.isMuslim} onChange={handleChange} /> Muslim
          </label>

          {formData.isMuslim && (
            <select name="sect" value={formData.sect} onChange={handleChange} className="profile-input">
              <option value="">Select Sect</option>
              <option value="Sunni">Sunni</option>
              <option value="Shia">Shia</option>
              <option value="Ahle Hadith">Ahle Hadith</option>
              <option value="Deobandi">Deobandi</option>
              <option value="Barelvi">Barelvi</option>
              <option value="Prefer Not to Say">Prefer Not to Say</option>
            </select>
          )}

          <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" className="profile-input" />
          <input type="text" name="education" value={formData.education} onChange={handleChange} placeholder="Education" className="profile-input" />
          <input type="text" name="interests" value={formData.interests} onChange={handleChange} placeholder="Interests" className="profile-input" />
          <input type="text" name="profession" value={formData.profession} onChange={handleChange} placeholder="Profession" className="profile-input" />
          <input type="number" name="height" value={formData.height} onChange={handleChange} placeholder="Height (cm)" className="profile-input" />
          <textarea name="about" value={formData.about} onChange={handleChange} placeholder="About Me" className="profile-input"></textarea>

          <button type="submit" disabled={saving} className="save-btn">{saving ? 'Saving...' : 'Save Profile'}</button>
        </form>
      </main>
      <Footer />
    </div>
  )
}

export default Profile
