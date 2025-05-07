import React from 'react'
import { NavLink } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

function ErrorPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`relative min-h-screen-minus-nav flex items-center justify-center p-6 overflow-hidden z-10 ${isDark ? 'bg-dark-bg-primary text-dark-text-primary' : 'bg-light-bg-primary text-light-text-primary'}`}>
      {/* Background with gradient */}
      <div className={`absolute top-0 left-0 w-full h-full -z-10 bg-[size:30px_30px] ${isDark ? 'bg-grid-pattern-dark' : 'bg-grid-pattern-light'}`}></div>

      <div className="max-w-lg mx-auto text-center">
        <img
          src="https://cdni.iconscout.com/illustration/premium/thumb/404-error-illustration-download-in-svg-png-gif-file-formats--concept-ui-ux-empty-state-page-pack-design-development-illustrations-3119148.png?f=webp"
          alt="404 Error Illustration"
          className="w-[300px] mx-auto mb-8"
        />

        <h1 className="text-5xl font-bold text-primary mb-4">404</h1>

        <p className="text-2xl font-semibold mb-4">
          Oops! Page not found
        </p>

        <p className={`text-lg mb-8 ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        <NavLink
          to="/"
          className="inline-block py-3 px-8 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors duration-300"
        >
          Return to Home
        </NavLink>
      </div>
    </div>
  )
}

export default ErrorPage
