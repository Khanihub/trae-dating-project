// import { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'

// function Navbar() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false)
//   const [scrolled, setScrolled] = useState(false)

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 20)
//     }
//     window.addEventListener('scroll', handleScroll)
//     return () => window.removeEventListener('scroll', handleScroll)
//   }, [])

//   return (
//     <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled
//         ? 'bg-white/95 backdrop-blur-md shadow-lg'
//         : 'bg-white/90 backdrop-blur-sm shadow-sm'
//       }`}>
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-20">

//           <div className="flex-shrink-0">
//             <Link
//               to="/"
//               className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent hover:from-primary-700 hover:to-primary-900 transition-all duration-300"
//             >
//               Mashallah
//             </Link>
//           </div>

//           <div className="hidden md:block">
//             <div className="ml-10 flex items-baseline space-x-1">
//               <Link
//                 to="/"
//                 className="text-gray-700 hover:text-primary-600 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-primary-50 relative group"
//               >
//                 Home
//                 <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 transition-all duration-300 group-hover:w-full"></span>
//               </Link>
//               <Link
//                 to="/testimonials"
//                 className="text-gray-700 hover:text-primary-600 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-primary-50 relative group"
//               >
//                 Testimonials
//                 <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 transition-all duration-300 group-hover:w-full"></span>
//               </Link>
//               <Link
//                 to="/contact"
//                 className="text-gray-700 hover:text-primary-600 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-primary-50 relative group"
//               >
//                 Contact
//                 <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 transition-all duration-300 group-hover:w-full"></span>
//               </Link>
//               <a
//                 href="/muslim-dating"
//                 rel="noopener noreferrer"
//                 className="text-gray-700 hover:text-primary-600 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-primary-50 relative group"
//               >
//                 Help
//                 <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 transition-all duration-300 group-hover:w-full"></span>
//               </a>
//               <Link
//                 to="/muslim-dating"
//                 className="text-gray-700 hover:text-primary-600 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-primary-50 relative group"
//               >
//                 Muslim dating site
//                 <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 transition-all duration-300 group-hover:w-full"></span>
//               </Link>
//             </div>
//           </div>

//           {/* Auth Button */}
//           <div className="hidden md:flex items-center">
//             <Link
//               to="/login"
//               className="text-gray-700 hover:text-primary-600 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 hover:bg-gray-100"
//             >
//               Log in
//             </Link>
//           </div>

//           {/* Mobile menu button */}
//           <div className="md:hidden">
//             <button
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="text-gray-700 hover:text-primary-600 focus:outline-none"
//             >
//               <svg
//                 className="h-6 w-6"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 {isMenuOpen ? (
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M6 18L18 6M6 6l12 12"
//                   />
//                 ) : (
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M4 6h16M4 12h16M4 18h16"
//                   />
//                 )}
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile menu */}
//       {isMenuOpen && (
//         <div className="md:hidden">
//           <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
//             <Link
//               to="/"
//               className="text-gray-700 hover:text-primary-600 block px-3 py-2 rounded-md text-base font-medium"
//               onClick={() => setIsMenuOpen(false)}
//             >
//               Home
//             </Link>
//             <Link
//               to="/testimonials"
//               className="text-gray-700 hover:text-primary-600 block px-3 py-2 rounded-md text-base font-medium"
//               onClick={() => setIsMenuOpen(false)}
//             >
//               Testimonials
//             </Link>
//             <Link
//               to="/contact"
//               className="text-gray-700 hover:text-primary-600 block px-3 py-2 rounded-md text-base font-medium"
//               onClick={() => setIsMenuOpen(false)}
//             >
//               Contact
//             </Link>
//             <a
//               href="/muslim-dating"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-gray-700 hover:text-primary-600 block px-3 py-2 rounded-md text-base font-medium"
//               onClick={() => setIsMenuOpen(false)}
//             >
//               Help
//             </a>
//             <Link
//               to="/muslim-dating"
//               className="text-gray-700 hover:text-primary-600 block px-3 py-2 rounded-md text-base font-medium"
//               onClick={() => setIsMenuOpen(false)}
//             >
//               Muslim dating site
//             </Link>
//             <div className="pt-4 pb-3 border-t border-gray-200">
//               <Link
//                 to="/login"
//                 className="text-gray-700 hover:text-primary-600 block px-3 py-2 rounded-md text-base font-medium"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 Log in
//               </Link>
//             </div>
//           </div>
//         </div>
//       )}
//     </nav>
//   )
// }

// export default Navbar




import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Testimonials", path: "/testimonials" },
  { name: "Contact", path: "/contact" },
  { name: "Help", path: "/muslim-dating" },
  { name: "Muslim dating site", path: "/muslim-dating" },
];

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(false);

  // Load dark mode from localStorage on mount
  useEffect(() => {
    const storedDark = localStorage.getItem("darkMode");
    if (storedDark === "true") {
      setDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Handle scroll for navbar shadow
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update localStorage and <html> class when dark mode changes
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  }, [dark]);

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${scrolled
          ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg"
          : "bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-sm"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link
            to="/"
            className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent"
          >
            Mashallah
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 px-4 py-2 rounded-lg text-sm font-medium transition hover:bg-primary-50 dark:hover:bg-gray-800"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-4">
            {/* Dark mode toggle */}
            <button
              onClick={() => setDark(!dark)}
              className="text-xl hover:scale-110 transition"
              aria-label="Toggle dark mode"
            >
              {dark ? "☀️" : "🌙"}
            </button>

            <Link
              to="/login"
              className="text-gray-700 dark:text-gray-300 px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              Log in
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-2xl text-gray-700 dark:text-gray-300"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t dark:border-gray-700">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className="block text-gray-700 dark:text-gray-300 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {link.name}
              </Link>
            ))}

            <div className="flex items-center justify-between pt-3 border-t dark:border-gray-700">
              <Link
                to="/login"
                className="text-gray-700 dark:text-gray-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Log in
              </Link>

              <button onClick={() => setDark(!dark)} className="text-xl">
                {dark ? "☀️" : "🌙"}
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
