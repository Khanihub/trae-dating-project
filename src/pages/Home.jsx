import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Features from '../components/Features'
import Testimonials from '../components/Testimonials'
import Footer from '../components/Footer'

function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* <Navbar /> */}
      <Hero />
      <Features />
      <Testimonials />
      <Footer />
    </div>
  )
}

export default Home

