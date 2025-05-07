import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { FaHome, FaSearch, FaBook, FaQuestionCircle, FaExclamationTriangle } from 'react-icons/fa'

function ErrorPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchTips, setShowSearchTips] = useState(false);

  // Fun error messages that rotate
  const errorMessages = [
    "Looks like this page took a vacation without telling us.",
    "We've looked everywhere, but this page is playing hide and seek.",
    "This page is exploring the digital wilderness.",
    "Our digital compass can't find this page.",
    "Houston, we have a problem finding this page."
  ];

  const randomMessage = errorMessages[Math.floor(Math.random() * errorMessages.length)];

  const handleSearch = (e) => {
    e.preventDefault();
    // In a real app, this would redirect to search results
    // For now, we'll just clear the input
    setSearchQuery('');
    setShowSearchTips(true);
  };

  return (
    <div className={`relative min-h-screen-minus-nav flex items-center justify-center p-6 overflow-hidden z-10 ${isDark ? 'bg-dark-bg-primary text-dark-text-primary' : 'bg-light-bg-primary text-light-text-primary'}`}>
      {/* Background with gradient */}
      <div className={`absolute top-0 left-0 w-full h-full -z-10 bg-[size:30px_30px] ${isDark ? 'bg-grid-pattern-dark' : 'bg-grid-pattern-light'}`}></div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>

      <div className="max-w-2xl mx-auto text-center">
        <div className="relative">
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/404-error-illustration-download-in-svg-png-gif-file-formats--concept-ui-ux-empty-state-page-pack-design-development-illustrations-3119148.png?f=webp"
            alt="404 Error Illustration"
            className="w-[300px] mx-auto mb-8 animate-float"
          />

          {/* Animated elements around the image */}
          <div className="absolute top-0 right-0 w-12 h-12 rounded-full bg-primary/10 animate-float" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 rounded-full bg-primary/10 animate-float" style={{ animationDelay: '1s' }}></div>
        </div>

        <h1 className="text-6xl font-bold text-primary mb-4 animate-pulse-slow">404</h1>

        <p className="text-2xl font-semibold mb-4">
          Oops! Page not found
        </p>

        <p className={`text-lg mb-6 ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
          {randomMessage}
        </p>

        <div className={`p-6 rounded-xl ${isDark ? 'bg-dark-bg-secondary border-dark-border' : 'bg-light-bg-secondary border-light-border'} border shadow-md mb-8`}>
          <h2 className={`text-xl font-semibold mb-4 ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>
            <FaSearch className="inline mr-2" /> Try searching for what you need
          </h2>

          <form onSubmit={handleSearch} className="mb-4">
            <div className="flex">
              <input
                type="text"
                placeholder="Search for courses, topics, etc."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`flex-grow px-4 py-2 rounded-l-lg ${isDark ? 'bg-dark-bg-tertiary text-dark-text-primary border-dark-border' : 'bg-light-bg-tertiary text-light-text-primary border-light-border'} border focus:outline-none focus:ring-2 focus:ring-primary`}
              />
              <button
                type="submit"
                className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-r-lg transition-colors"
              >
                Search
              </button>
            </div>
          </form>

          {showSearchTips && (
            <div className={`p-3 rounded-lg ${isDark ? 'bg-dark-bg-tertiary' : 'bg-light-bg-tertiary'} text-left animate-fadeIn`}>
              <p className={`text-sm ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'} mb-2`}>
                <FaExclamationTriangle className="inline mr-1 text-primary" /> No results found. Try these popular topics:
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary cursor-pointer hover:bg-primary/20">JavaScript</span>
                <span className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary cursor-pointer hover:bg-primary/20">React</span>
                <span className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary cursor-pointer hover:bg-primary/20">Node.js</span>
                <span className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary cursor-pointer hover:bg-primary/20">Web Development</span>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <NavLink
            to="/"
            className="py-3 px-6 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors duration-300 flex items-center justify-center"
          >
            <FaHome className="mr-2" /> Return to Home
          </NavLink>

          <NavLink
            to="/courses"
            className={`py-3 px-6 ${isDark ? 'bg-dark-bg-secondary hover:bg-dark-bg-tertiary text-dark-text-primary' : 'bg-light-bg-secondary hover:bg-light-bg-tertiary text-light-text-primary'} border ${isDark ? 'border-dark-border' : 'border-light-border'} font-medium rounded-lg transition-colors duration-300 flex items-center justify-center`}
          >
            <FaBook className="mr-2" /> Browse Courses
          </NavLink>

          <NavLink
            to="/contact"
            className={`py-3 px-6 ${isDark ? 'bg-dark-bg-secondary hover:bg-dark-bg-tertiary text-dark-text-primary' : 'bg-light-bg-secondary hover:bg-light-bg-tertiary text-light-text-primary'} border ${isDark ? 'border-dark-border' : 'border-light-border'} font-medium rounded-lg transition-colors duration-300 flex items-center justify-center`}
          >
            <FaQuestionCircle className="mr-2" /> Get Help
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default ErrorPage
