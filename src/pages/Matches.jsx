import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import './Matches.css'

function Matches() {
  const navigate = useNavigate()
  const [isVisible, setIsVisible] = useState(false)
  const [activeFilter, setActiveFilter] = useState('all')
  const [ageRange, setAgeRange] = useState([20, 35])
  const [showFilters, setShowFilters] = useState(false)
  const [selectedMatch, setSelectedMatch] = useState(null)
  const [showProfileModal, setShowProfileModal] = useState(false)

  // Filter states
  const [filters, setFilters] = useState({
    religion: '',
    location: '',
    education: '',
    profession: '',
    maritalStatus: ''
  })

  // Dummy matches data - Replace with API call
  const [matches, setMatches] = useState([
    {
      id: 1,
      name: 'Sarah Ahmed',
      age: 26,
      profession: 'Software Engineer',
      location: 'Islamabad, Pakistan',
      education: 'Masters in Computer Science',
      religion: 'Muslim',
      height: '5\'6"',
      maritalStatus: 'Never Married',
      about: 'Looking for a life partner who values family, education, and personal growth. I enjoy reading, traveling, and cooking.',
      interests: ['Reading', 'Travel', 'Cooking', 'Technology'],
      image: 'https://i.pravatar.cc/400?img=5',
      verified: true,
      online: true
    },
    {
      id: 2,
      name: 'Fatima Khan',
      age: 24,
      profession: 'Doctor',
      location: 'Lahore, Pakistan',
      education: 'MBBS',
      religion: 'Muslim',
      height: '5\'4"',
      maritalStatus: 'Never Married',
      about: 'Medical professional seeking a understanding and supportive partner. Family-oriented with traditional values.',
      interests: ['Medicine', 'Volunteering', 'Painting', 'Nature'],
      image: 'https://i.pravatar.cc/400?img=9',
      verified: true,
      online: false
    },
    {
      id: 3,
      name: 'Ayesha Malik',
      age: 28,
      profession: 'Teacher',
      location: 'Karachi, Pakistan',
      education: 'Masters in Education',
      religion: 'Muslim',
      height: '5\'5"',
      maritalStatus: 'Never Married',
      about: 'Educator with a passion for making a difference. Looking for someone who shares similar values and goals.',
      interests: ['Teaching', 'Books', 'Music', 'Fitness'],
      image: 'https://i.pravatar.cc/400?img=10',
      verified: true,
      online: true
    },
    {
      id: 4,
      name: 'Zainab Ali',
      age: 25,
      profession: 'Graphic Designer',
      location: 'Rawalpindi, Pakistan',
      education: 'Bachelor in Fine Arts',
      religion: 'Muslim',
      height: '5\'3"',
      maritalStatus: 'Never Married',
      about: 'Creative soul with a love for art and design. Seeking a partner who appreciates creativity and family values.',
      interests: ['Design', 'Art', 'Photography', 'Coffee'],
      image: 'https://i.pravatar.cc/400?img=20',
      verified: false,
      online: false
    },
    {
      id: 5,
      name: 'Hira Hussain',
      age: 27,
      profession: 'Architect',
      location: 'Islamabad, Pakistan',
      education: 'Bachelor in Architecture',
      religion: 'Muslim',
      height: '5\'7"',
      maritalStatus: 'Never Married',
      about: 'Passionate architect who loves creating beautiful spaces. Looking for a mature and career-oriented partner.',
      interests: ['Architecture', 'Travel', 'Sketching', 'Yoga'],
      image: 'https://i.pravatar.cc/400?img=23',
      verified: true,
      online: true
    },
    {
      id: 6,
      name: 'Amna Hassan',
      age: 23,
      profession: 'Marketing Manager',
      location: 'Lahore, Pakistan',
      education: 'MBA',
      religion: 'Muslim',
      height: '5\'5"',
      maritalStatus: 'Never Married',
      about: 'Marketing professional with a vibrant personality. Seeking someone ambitious and family-oriented.',
      interests: ['Marketing', 'Social Media', 'Fashion', 'Food'],
      image: 'https://i.pravatar.cc/400?img=24',
      verified: true,
      online: false
    }
  ])

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
    }
    
    // Fetch matches from your API here
    // fetchMatches()
    
    setTimeout(() => setIsVisible(true), 100)
  }, [navigate])

  const handleShowInterest = (matchId) => {
    // Add your API call here to send interest
    console.log('Showing interest in match:', matchId)
    alert('Interest sent successfully!')
  }

  const handleShortlist = (matchId) => {
    // Add your API call here to shortlist
    console.log('Shortlisting match:', matchId)
    alert('Added to shortlist!')
  }

  const handleViewProfile = (match) => {
    setSelectedMatch(match)
    setShowProfileModal(true)
  }

  const filteredMatches = matches.filter(match => {
    if (activeFilter === 'online' && !match.online) return false
    if (activeFilter === 'verified' && !match.verified) return false
    if (filters.religion && match.religion !== filters.religion) return false
    if (filters.location && !match.location.includes(filters.location)) return false
    if (filters.education && !match.education.includes(filters.education)) return false
    if (filters.profession && !match.profession.includes(filters.profession)) return false
    if (match.age < ageRange[0] || match.age > ageRange[1]) return false
    return true
  })

  const resetFilters = () => {
    setFilters({
      religion: '',
      location: '',
      education: '',
      profession: '',
      maritalStatus: ''
    })
    setAgeRange([20, 35])
    setActiveFilter('all')
  }

  return (
    <div className="matches-page">
      <Navbar />

      <main className="matches-main">
        {/* Header */}
        <div className={`matches-header ${isVisible ? 'visible' : ''}`}>
          <div className="header-bg-circle circle-1"></div>
          <div className="header-bg-circle circle-2"></div>
          <div className="header-bg-circle circle-3"></div>
          
          <div className="header-content">
            <h1>Find Your Perfect Match</h1>
            <p>Discover compatible profiles and start your journey to happily ever after 💕</p>
          </div>
        </div>

        {/* Filter Section */}
        <div className={`filter-section ${isVisible ? 'visible' : ''}`}>
          <div className="filter-header">
            <div className="filter-tabs">
              <button 
                className={`filter-tab ${activeFilter === 'all' ? 'active' : ''}`}
                onClick={() => setActiveFilter('all')}
              >
                <span className="tab-icon">👥</span>
                All Matches
                <span className="tab-count">{matches.length}</span>
              </button>
              <button 
                className={`filter-tab ${activeFilter === 'online' ? 'active' : ''}`}
                onClick={() => setActiveFilter('online')}
              >
                <span className="tab-icon">🟢</span>
                Online Now
                <span className="tab-count">{matches.filter(m => m.online).length}</span>
              </button>
              <button 
                className={`filter-tab ${activeFilter === 'verified' ? 'active' : ''}`}
                onClick={() => setActiveFilter('verified')}
              >
                <span className="tab-icon">✓</span>
                Verified
                <span className="tab-count">{matches.filter(m => m.verified).length}</span>
              </button>
            </div>
            
            <button 
              className="toggle-filters-btn"
              onClick={() => setShowFilters(!showFilters)}
            >
              <span>🔍</span>
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="advanced-filters">
              <div className="filters-grid">
                <div className="filter-group">
                  <label>Age Range: {ageRange[0]} - {ageRange[1]}</label>
                  <div className="age-range-inputs">
                    <input
                      type="number"
                      value={ageRange[0]}
                      onChange={(e) => setAgeRange([parseInt(e.target.value), ageRange[1]])}
                      min="18"
                      max="60"
                    />
                    <span>to</span>
                    <input
                      type="number"
                      value={ageRange[1]}
                      onChange={(e) => setAgeRange([ageRange[0], parseInt(e.target.value)])}
                      min="18"
                      max="60"
                    />
                  </div>
                </div>

                <div className="filter-group">
                  <label>Religion</label>
                  <select 
                    value={filters.religion}
                    onChange={(e) => setFilters({...filters, religion: e.target.value})}
                  >
                    <option value="">All Religions</option>
                    <option value="Muslim">Muslim</option>
                    <option value="Christian">Christian</option>
                    <option value="Hindu">Hindu</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="filter-group">
                  <label>Location</label>
                  <select 
                    value={filters.location}
                    onChange={(e) => setFilters({...filters, location: e.target.value})}
                  >
                    <option value="">All Locations</option>
                    <option value="Islamabad">Islamabad</option>
                    <option value="Lahore">Lahore</option>
                    <option value="Karachi">Karachi</option>
                    <option value="Rawalpindi">Rawalpindi</option>
                  </select>
                </div>

                <div className="filter-group">
                  <label>Education</label>
                  <select 
                    value={filters.education}
                    onChange={(e) => setFilters({...filters, education: e.target.value})}
                  >
                    <option value="">All Education Levels</option>
                    <option value="Bachelor">Bachelor's Degree</option>
                    <option value="Masters">Master's Degree</option>
                    <option value="PhD">PhD</option>
                    <option value="Diploma">Diploma</option>
                  </select>
                </div>

                <div className="filter-group">
                  <label>Profession</label>
                  <input
                    type="text"
                    placeholder="e.g., Engineer, Doctor"
                    value={filters.profession}
                    onChange={(e) => setFilters({...filters, profession: e.target.value})}
                  />
                </div>

                <div className="filter-group">
                  <label>Marital Status</label>
                  <select 
                    value={filters.maritalStatus}
                    onChange={(e) => setFilters({...filters, maritalStatus: e.target.value})}
                  >
                    <option value="">All</option>
                    <option value="Never Married">Never Married</option>
                    <option value="Divorced">Divorced</option>
                    <option value="Widowed">Widowed</option>
                  </select>
                </div>
              </div>

              <div className="filter-actions">
                <button className="btn-reset" onClick={resetFilters}>
                  Reset Filters
                </button>
                <button className="btn-apply" onClick={() => setShowFilters(false)}>
                  Apply Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results Info */}
        <div className={`results-info ${isVisible ? 'visible' : ''}`}>
          <p>Showing <strong>{filteredMatches.length}</strong> matches based on your preferences</p>
        </div>

        {/* Matches Grid */}
        <div className={`matches-grid ${isVisible ? 'visible' : ''}`}>
          {filteredMatches.length > 0 ? (
            filteredMatches.map((match, index) => (
              <div 
                key={match.id} 
                className="match-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Profile Image */}
                <div className="match-image-container">
                  <img src={match.image} alt={match.name} className="match-image" />
                  {match.online && <div className="online-badge">Online</div>}
                  {match.verified && (
                    <div className="verified-badge" title="Verified Profile">
                      ✓
                    </div>
                  )}
                </div>

                {/* Match Info */}
                <div className="match-info">
                  <h3 className="match-name">{match.name}</h3>
                  <p className="match-age">{match.age} years old</p>
                  
                  <div className="match-details">
                    <div className="detail-item">
                      <span className="detail-icon">💼</span>
                      <span>{match.profession}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-icon">📍</span>
                      <span>{match.location}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-icon">🎓</span>
                      <span>{match.education}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-icon">📏</span>
                      <span>{match.height}</span>
                    </div>
                  </div>

                  <p className="match-about">{match.about.substring(0, 100)}...</p>

                  {/* Interests */}
                  <div className="match-interests">
                    {match.interests.slice(0, 3).map((interest, idx) => (
                      <span key={idx} className="interest-tag">{interest}</span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="match-actions">
                    <button 
                      className="btn-view-profile"
                      onClick={() => handleViewProfile(match)}
                    >
                      View Profile
                    </button>
                    <button 
                      className="btn-icon"
                      onClick={() => handleShortlist(match.id)}
                      title="Add to Shortlist"
                    >
                      ⭐
                    </button>
                    <button 
                      className="btn-interest"
                      onClick={() => handleShowInterest(match.id)}
                    >
                      💝 Send Interest
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-matches">
              <div className="no-matches-icon">😔</div>
              <h3>No matches found</h3>
              <p>Try adjusting your filters to see more profiles</p>
              <button className="btn-reset" onClick={resetFilters}>
                Reset Filters
              </button>
            </div>
          )}
        </div>

        {/* Profile Modal */}
        {showProfileModal && selectedMatch && (
          <div className="modal-overlay" onClick={() => setShowProfileModal(false)}>
            <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
              <button 
                className="modal-close"
                onClick={() => setShowProfileModal(false)}
              >
                ×
              </button>

              <div className="modal-content">
                <div className="modal-header-section">
                  <div className="modal-image-container">
                    <img src={selectedMatch.image} alt={selectedMatch.name} />
                    {selectedMatch.online && <div className="online-badge large">Online</div>}
                  </div>
                  
                  <div className="modal-header-info">
                    <h2>
                      {selectedMatch.name}
                      {selectedMatch.verified && <span className="verified-icon">✓</span>}
                    </h2>
                    <p className="modal-age">{selectedMatch.age} years old</p>
                    <p className="modal-profession">{selectedMatch.profession}</p>
                    <p className="modal-location">📍 {selectedMatch.location}</p>
                  </div>
                </div>

                <div className="modal-body">
                  <div className="modal-section">
                    <h3>About</h3>
                    <p>{selectedMatch.about}</p>
                  </div>

                  <div className="modal-section">
                    <h3>Basic Information</h3>
                    <div className="info-grid">
                      <div className="info-item">
                        <span className="info-label">Education:</span>
                        <span className="info-value">{selectedMatch.education}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Height:</span>
                        <span className="info-value">{selectedMatch.height}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Religion:</span>
                        <span className="info-value">{selectedMatch.religion}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Marital Status:</span>
                        <span className="info-value">{selectedMatch.maritalStatus}</span>
                      </div>
                    </div>
                  </div>

                  <div className="modal-section">
                    <h3>Interests</h3>
                    <div className="interests-list">
                      {selectedMatch.interests.map((interest, idx) => (
                        <span key={idx} className="interest-badge">{interest}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="modal-actions">
                  <button 
                    className="btn-modal-shortlist"
                    onClick={() => handleShortlist(selectedMatch.id)}
                  >
                    ⭐ Shortlist
                  </button>
                  <button 
                    className="btn-modal-interest"
                    onClick={() => handleShowInterest(selectedMatch.id)}
                  >
                    💝 Send Interest
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

    </div>
  )
}

export default Matches