import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../store/auth";
import { useTheme } from "../context/ThemeContext";
import { RiCloseLargeLine, RiMenu3Fill } from "react-icons/ri";
import { FaGraduationCap } from "react-icons/fa";
import ThemeSwitcher from "./ThemeSwitcher";
import ThemeColorSelector from "./ThemeColorSelector";

function NavBar() {
  const { isLoggedIn, userdata } = useAuth();
  const { theme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
  const [scrolled, setScrolled] = useState(false);
  const isDark = theme === 'dark';

  // Function to handle resizing the window
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Toggle the side menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`
      sticky top-0 z-50 w-full transition-all duration-300
      ${scrolled
        ? `${isDark ? 'bg-dark-bg-primary/95' : 'bg-white/95'} shadow-nav backdrop-blur-sm`
        : `${isDark ? 'bg-primary/90' : 'bg-primary/90'}`}
      ${isDark ? 'text-dark-text-primary' : 'text-white'}
    `}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <NavLink to="/" className="flex items-center space-x-2 font-bold text-xl">
              <FaGraduationCap className="text-2xl" />
              <span className="font-righteous">Codify</span>
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <NavLink
                to="/"
                className={({ isActive }) => `
                  px-3 py-2 rounded-md text-sm font-medium transition-colors
                  ${isActive
                    ? 'bg-white/20 text-white'
                    : 'text-white/90 hover:bg-white/10 hover:text-white'}
                `}
              >
                Home
              </NavLink>

              <NavLink
                to="/about"
                className={({ isActive }) => `
                  px-3 py-2 rounded-md text-sm font-medium transition-colors
                  ${isActive
                    ? 'bg-white/20 text-white'
                    : 'text-white/90 hover:bg-white/10 hover:text-white'}
                `}
              >
                About
              </NavLink>

              <NavLink
                to="/courses"
                className={({ isActive }) => `
                  px-3 py-2 rounded-md text-sm font-medium transition-colors
                  ${isActive
                    ? 'bg-white/20 text-white'
                    : 'text-white/90 hover:bg-white/10 hover:text-white'}
                `}
              >
                Courses
              </NavLink>

              <NavLink
                to="/roadmap"
                className={({ isActive }) => `
                  px-3 py-2 rounded-md text-sm font-medium transition-colors
                  ${isActive
                    ? 'bg-white/20 text-white'
                    : 'text-white/90 hover:bg-white/10 hover:text-white'}
                `}
              >
                Roadmaps
              </NavLink>

              <NavLink
                to="/contact"
                className={({ isActive }) => `
                  px-3 py-2 rounded-md text-sm font-medium transition-colors
                  ${isActive
                    ? 'bg-white/20 text-white'
                    : 'text-white/90 hover:bg-white/10 hover:text-white'}
                `}
              >
                Contact
              </NavLink>

              {isLoggedIn ? (
                <>
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) => `
                      px-3 py-2 rounded-md text-sm font-medium transition-colors
                      ${isActive
                        ? 'bg-white/20 text-white'
                        : 'text-white/90 hover:bg-white/10 hover:text-white'}
                    `}
                  >
                    Dashboard
                  </NavLink>

                  {userdata?.isAdmin && (
                    <NavLink
                      to="/admin"
                      className={({ isActive }) => `
                        px-3 py-2 rounded-md text-sm font-medium transition-colors
                        ${isActive
                          ? 'bg-white/20 text-white'
                          : 'text-white/90 hover:bg-white/10 hover:text-white'}
                      `}
                    >
                      Admin
                    </NavLink>
                  )}

                  <NavLink
                    to="/logout"
                    className="px-3 py-2 rounded-md text-sm font-medium bg-white/10 text-white hover:bg-white/20 transition-colors"
                  >
                    Logout
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink
                    to="/login"
                    className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-white/10 transition-colors"
                  >
                    Login
                  </NavLink>

                  <NavLink
                    to="/signup"
                    className="px-3 py-2 rounded-md text-sm font-medium bg-white/20 text-white hover:bg-white/30 transition-colors"
                  >
                    Sign Up
                  </NavLink>
                </>
              )}
            </div>
          </div>

          {/* Theme Controls */}
          <div className="hidden md:flex items-center space-x-3">
            <ThemeSwitcher />
            <ThemeColorSelector />
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-3">
            <ThemeSwitcher />
            <ThemeColorSelector />
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-white/10 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              <RiMenu3Fill className="block h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`
          md:hidden fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out
          ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <div className="relative h-full w-full">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={toggleMenu}
          ></div>

          {/* Menu panel */}
          <div className={`
            absolute right-0 top-0 h-full w-64 overflow-y-auto
            ${isDark ? 'bg-dark-bg-primary' : 'bg-white'}
            ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}
            shadow-lg
          `}>
            <div className="px-4 pt-5 pb-6 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FaGraduationCap className={`text-2xl ${isDark ? 'text-primary' : 'text-primary'}`} />
                  <span className="ml-2 font-righteous text-xl">Codify</span>
                </div>
                <button
                  onClick={toggleMenu}
                  className={`
                    rounded-md p-2 focus:outline-none transition-colors
                    ${isDark
                      ? 'text-dark-text-primary hover:bg-dark-bg-tertiary'
                      : 'text-light-text-primary hover:bg-light-bg-tertiary'}
                  `}
                >
                  <span className="sr-only">Close menu</span>
                  <RiCloseLargeLine className="h-6 w-6" />
                </button>
              </div>

              <div className="mt-6">
                <nav className="grid gap-y-2">
                  <NavLink
                    to="/"
                    onClick={toggleMenu}
                    className={({ isActive }) => `
                      px-3 py-2 rounded-md text-base font-medium transition-colors
                      ${isActive
                        ? isDark
                          ? 'bg-dark-bg-tertiary text-primary'
                          : 'bg-light-bg-tertiary text-primary'
                        : isDark
                          ? 'text-dark-text-primary hover:bg-dark-bg-tertiary'
                          : 'text-light-text-primary hover:bg-light-bg-tertiary'
                      }
                    `}
                  >
                    Home
                  </NavLink>

                  <NavLink
                    to="/about"
                    onClick={toggleMenu}
                    className={({ isActive }) => `
                      px-3 py-2 rounded-md text-base font-medium transition-colors
                      ${isActive
                        ? isDark
                          ? 'bg-dark-bg-tertiary text-primary'
                          : 'bg-light-bg-tertiary text-primary'
                        : isDark
                          ? 'text-dark-text-primary hover:bg-dark-bg-tertiary'
                          : 'text-light-text-primary hover:bg-light-bg-tertiary'
                      }
                    `}
                  >
                    About
                  </NavLink>

                  <NavLink
                    to="/courses"
                    onClick={toggleMenu}
                    className={({ isActive }) => `
                      px-3 py-2 rounded-md text-base font-medium transition-colors
                      ${isActive
                        ? isDark
                          ? 'bg-dark-bg-tertiary text-primary'
                          : 'bg-light-bg-tertiary text-primary'
                        : isDark
                          ? 'text-dark-text-primary hover:bg-dark-bg-tertiary'
                          : 'text-light-text-primary hover:bg-light-bg-tertiary'
                      }
                    `}
                  >
                    Courses
                  </NavLink>

                  <NavLink
                    to="/roadmap"
                    onClick={toggleMenu}
                    className={({ isActive }) => `
                      px-3 py-2 rounded-md text-base font-medium transition-colors
                      ${isActive
                        ? isDark
                          ? 'bg-dark-bg-tertiary text-primary'
                          : 'bg-light-bg-tertiary text-primary'
                        : isDark
                          ? 'text-dark-text-primary hover:bg-dark-bg-tertiary'
                          : 'text-light-text-primary hover:bg-light-bg-tertiary'
                      }
                    `}
                  >
                    Roadmaps
                  </NavLink>

                  <NavLink
                    to="/contact"
                    onClick={toggleMenu}
                    className={({ isActive }) => `
                      px-3 py-2 rounded-md text-base font-medium transition-colors
                      ${isActive
                        ? isDark
                          ? 'bg-dark-bg-tertiary text-primary'
                          : 'bg-light-bg-tertiary text-primary'
                        : isDark
                          ? 'text-dark-text-primary hover:bg-dark-bg-tertiary'
                          : 'text-light-text-primary hover:bg-light-bg-tertiary'
                      }
                    `}
                  >
                    Contact
                  </NavLink>

                  {isLoggedIn ? (
                    <>
                      <NavLink
                        to="/dashboard"
                        onClick={toggleMenu}
                        className={({ isActive }) => `
                          px-3 py-2 rounded-md text-base font-medium transition-colors
                          ${isActive
                            ? isDark
                              ? 'bg-dark-bg-tertiary text-primary'
                              : 'bg-light-bg-tertiary text-primary'
                            : isDark
                              ? 'text-dark-text-primary hover:bg-dark-bg-tertiary'
                              : 'text-light-text-primary hover:bg-light-bg-tertiary'
                          }
                        `}
                      >
                        Dashboard
                      </NavLink>

                      {userdata?.isAdmin && (
                        <NavLink
                          to="/admin"
                          onClick={toggleMenu}
                          className={({ isActive }) => `
                            px-3 py-2 rounded-md text-base font-medium transition-colors
                            ${isActive
                              ? isDark
                                ? 'bg-dark-bg-tertiary text-primary'
                                : 'bg-light-bg-tertiary text-primary'
                              : isDark
                                ? 'text-dark-text-primary hover:bg-dark-bg-tertiary'
                                : 'text-light-text-primary hover:bg-light-bg-tertiary'
                            }
                          `}
                        >
                          Admin Panel
                        </NavLink>
                      )}

                      <NavLink
                        to="/logout"
                        onClick={toggleMenu}
                        className={`
                          px-3 py-2 rounded-md text-base font-medium transition-colors
                          ${isDark
                            ? 'bg-primary/10 text-primary hover:bg-primary/20'
                            : 'bg-primary/10 text-primary hover:bg-primary/20'}
                        `}
                      >
                        Logout
                      </NavLink>
                    </>
                  ) : (
                    <>
                      <NavLink
                        to="/login"
                        onClick={toggleMenu}
                        className={`
                          px-3 py-2 rounded-md text-base font-medium transition-colors
                          ${isDark
                            ? 'text-dark-text-primary hover:bg-dark-bg-tertiary'
                            : 'text-light-text-primary hover:bg-light-bg-tertiary'}
                        `}
                      >
                        Login
                      </NavLink>

                      <NavLink
                        to="/signup"
                        onClick={toggleMenu}
                        className={`
                          px-3 py-2 rounded-md text-base font-medium transition-colors
                          ${isDark
                            ? 'bg-primary text-white hover:bg-primary-dark'
                            : 'bg-primary text-white hover:bg-primary-dark'}
                        `}
                      >
                        Sign Up
                      </NavLink>
                    </>
                  )}
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;

// src/components/NavBar.jsx
// import React, { useEffect, useState } from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';
// import { useAuth } from '../store/auth';
// import './css/Navbar.css'; // Import your CSS styles
// import { RiCloseLargeLine, RiMenu3Fill } from 'react-icons/ri';

// const NavBar = () => {
//   const { isLoggedIn, LogoutUser, userdata } = useAuth();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
//   const navigate = useNavigate();

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   const handleLogout = () => {
//     LogoutUser();
//     navigate('/login'); // Redirect to login after logout
//   };

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth <= 1024);
//     };

//     window.addEventListener('resize', handleResize);
//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

//   return (
//     <nav className="navbar">
//       <div className="navbar-brand">
//         <h1>Codify</h1>
//         {isMobile ? (
//           <button onClick={toggleMenu} className="menu-toggle">
//             {isMenuOpen ? <RiCloseLargeLine /> : <RiMenu3Fill />}
//           </button>
//         ) : null}
//       </div>
//       {(isMenuOpen || !isMobile) && (
//         <ul className="navbar-links">
//           <li>
//             <NavLink to="/courses" onClick={toggleMenu}>
//               Courses
//             </NavLink>
//           </li>
//           {isLoggedIn ? (
//             <>
//               <li>
//                 <NavLink to={userdata.isAdmin ? '/admin' : '/dashboard'} onClick={toggleMenu}>
//                   Dashboard
//                 </NavLink>
//               </li>
//               <li>
//                 <button onClick={handleLogout}>Logout</button>
//               </li>
//             </>
//           ) : (
//             <>
//               <li>
//                 <NavLink to="/login" onClick={toggleMenu}>
//                   Login
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink to="/signup" onClick={toggleMenu}>
//                   Signup
//                 </NavLink>
//               </li>
//             </>
//           )}
//           {userdata.isAdmin && (
//             <li>
//               <NavLink to="/admin" onClick={toggleMenu}>
//                 Admin Panel
//               </NavLink>
//             </li>
//           )}
//         </ul>
//       )}
//     </nav>
//   );
// };

// export default NavBar;
