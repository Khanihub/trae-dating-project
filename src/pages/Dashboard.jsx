import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Dashboard() {
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
    }
  }, [navigate])

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 text-white shadow-xl mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2">
            Welcome to Your Dashboard
          </h1>
          <p className="text-primary-100 text-lg">
            Start your journey to find your perfect life partner 🤍
          </p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* My Profile */}
          <div className="bg-white p-8 rounded-2xl shadow hover:shadow-2xl transition">
            <h3 className="text-xl font-bold mb-3">My Profile</h3>
            <p className="text-gray-600 mb-6">
              Complete or update your personal and family details.
            </p>
            <Link
              to="/profile"
              className="inline-block px-6 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700"
            >
              View Profile
            </Link>
          </div>

          {/* Find Matches */}
          <div className="bg-white p-8 rounded-2xl shadow hover:shadow-2xl transition">
            <h3 className="text-xl font-bold mb-3">Find Matches</h3>
            <p className="text-gray-600 mb-6">
              Browse compatible and verified profiles.
            </p>
            <Link
              to="/matches"
              className="inline-block px-6 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700"
            >
              Explore Matches
            </Link>
          </div>

          {/* Messages */}
          <div className="bg-white p-8 rounded-2xl shadow hover:shadow-2xl transition">
            <h3 className="text-xl font-bold mb-3">Messages</h3>
            <p className="text-gray-600 mb-6">
              Communicate safely with your matches.
            </p>
            <Link
              to="/messages"
              className="inline-block px-6 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700"
            >
              Open Messages
            </Link>
          </div>

          {/* Interests */}
          <div className="bg-white p-8 rounded-2xl shadow hover:shadow-2xl transition">
            <h3 className="text-xl font-bold mb-3">Interests</h3>
            <p className="text-gray-600 mb-6">
              See who has shown interest in your profile.
            </p>
            <Link
              to="/interests"
              className="inline-block px-6 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700"
            >
              View Interests
            </Link>
          </div>

          {/* Settings */}
          <div className="bg-white p-8 rounded-2xl shadow hover:shadow-2xl transition">
            <h3 className="text-xl font-bold mb-3">Account Settings</h3>
            <p className="text-gray-600 mb-6">
              Manage privacy, password, and preferences.
            </p>
            <Link
              to="/settings"
              className="inline-block px-6 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700"
            >
              Settings
            </Link>
          </div>

          {/* Logout */}
          <div className="bg-white p-8 rounded-2xl shadow hover:shadow-2xl transition">
            <h3 className="text-xl font-bold mb-3 text-red-600">Logout</h3>
            <p className="text-gray-600 mb-6">
              Securely sign out of your account.
            </p>
            <button
              onClick={() => {
                localStorage.removeItem('token')
                navigate('/login')
              }}
              className="px-6 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Dashboard
