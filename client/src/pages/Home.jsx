import React, { lazy, Suspense, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../store/auth";
import { useTheme } from "../context/ThemeContext";

// Lazy loaded components
const CreatorsContainer = lazy(() => import("../components/HomePageComponents/CreatorsContainer"));
const ChooseUs = lazy(() => import("../components/HomePageComponents/ChooseUs"));
const FAQ = lazy(() => import("../components/HomePageComponents/FAQ"));
const Testimonials = lazy(() => import("../components/HomePageComponents/Testimonials"));
const NewsLetter = lazy(() => import("../components/HomePageComponents/NewsLetter"));
const CallToAction = lazy(() => import("../components/HomePageComponents/CallToAction"));

function Home() {
  const { coursesData } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [randomSize, setRandomSize] = useState(30);
  useEffect(() => {
    const interval = setInterval(() => {
      setRandomSize(Math.floor(Math.random() * 8) * 10 + 40);
    }, 5000);
    return () => clearInterval(interval);
  }, [])
  console.log("random size", randomSize);
  return (
    <div className={`relative min-h-screen-minus-nav overflow-hidden ${isDark ? 'bg-dark-bg-primary text-dark-text-primary' : 'bg-light-bg-primary text-light-text-primary'} z-10 flex flex-col justify-center items-center py-16`}>
      {/* Background with gradient */}
      <div className={`absolute top-0 left-0 w-full h-full -z-10 ${isDark ? 'bg-grid-pattern-dark' : 'bg-grid-pattern-light'}`} style={{ backgroundSize: `${randomSize}px ${randomSize}px` }} ></div>

      {/* Main Content */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4">
        {/* Headline and CTA */}
        <div className="text-center my-16 relative">
          {/* Decorative elements */}
          <div className="absolute -top-16 -left-16 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>

          <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'} animate-fadeIn`}>
            Discover Your <span className="text-primary relative">
              Perfect Learning Path
              <span className="absolute bottom-2 left-0 w-full h-2 bg-primary/20 -z-10 rounded-full"></span>
            </span>
          </h1>

          <p className={`text-xl my-8 ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'} max-w-2xl mx-auto animate-fadeIn animation-delay-200`}>
            Explore new ways to learn with us through engaging and hands-on courses.
          </p>

          <NavLink
            to="/courses"
            className="bg-primary hover:bg-primary-dark text-white py-3 px-8 text-lg rounded-md uppercase transition-all duration-300 hover:shadow-lg hover:-translate-y-1 inline-flex items-center gap-2 animate-fadeIn animation-delay-300"
          >
            <span>Get Started</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </NavLink>
        </div>

        {/* Features Section */}
        <div className="my-24">
          <h2 className={`text-3xl font-bold text-center mb-16 ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'} animate-fadeIn animation-delay-100`}>
            Why Learn With <span className="text-primary">Codify</span>
          </h2>

          <div className="flex flex-wrap justify-center gap-8">
            {/* Feature 1 */}
            <div
              className={`
                p-8 rounded-xl w-[300px] border ${isDark ? 'bg-dark-bg-secondary border-dark-border' : 'bg-light-bg-secondary border-light-border'}
                shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl
                animate-slide-in-bottom animation-delay-200
              `}
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>

              <h3 className="text-primary -z-10 text-xl font-semibold mb-3 text-center">Interactive Learning</h3>

              <p className={`${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'} text-center`}>
                Our courses provide hands-on learning with real-world examples and interactive exercises to reinforce concepts.
              </p>
            </div>

            {/* Feature 2 */}
            <div
              className={`
                p-8 rounded-xl w-[300px] border ${isDark ? 'bg-dark-bg-secondary border-dark-border' : 'bg-light-bg-secondary border-light-border'}
                shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl
                animate-slide-in-bottom animation-delay-400
              `}
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>

              <h3 className="text-primary -z-10 text-xl font-semibold mb-3 text-center">Expert Instructors</h3>

              <p className={`${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'} text-center`}>
                Learn from industry professionals who guide you step by step through complex topics with clarity and expertise.
              </p>
            </div>

            {/* Feature 3 */}
            <div
              className={`
                p-8 rounded-xl w-[300px] border ${isDark ? 'bg-dark-bg-secondary border-dark-border' : 'bg-light-bg-secondary border-light-border'}
                shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl
                animate-slide-in-bottom animation-delay-600
              `}
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>

              <h3 className="text-primary -z-10 text-xl font-semibold mb-3 text-center">Flexible Schedules</h3>

              <p className={`${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'} text-center`}>
                Take courses at your own pace with flexible learning hours. Learn when and where it works best for you.
              </p>
            </div>
          </div>
        </div>

        {/* Floating Icons and Elements */}
        <div className="absolute top-[10%] right-[5%] hidden md:block text-5xl animate-float">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
          </svg>
        </div>

        <div className="absolute top-[15%] left-[8%] hidden md:block text-primary -z-10 text-4xl animate-float animation-delay-300">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" />
          </svg>
        </div>

        <div className="absolute top-[30%] right-[15%] hidden md:block text-primary -z-10 text-3xl animate-float animation-delay-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7 5h10v2h2V3c0-1.1-.9-1.99-2-1.99L7 1c-1.1 0-2 .9-2 2v4h2V5zm8.41 11.59L20 12l-4.59-4.59L14 8.83 17.17 12 14 15.17l1.41 1.42zM10 15.17L6.83 12 10 8.83 8.59 7.41 4 12l4.59 4.59L10 15.17zM17 19H7v-2H5v4c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2v-4h-2v2z" />
          </svg>
        </div>

        <div className="absolute top-[40%] left-[12%] hidden md:block text-primary -z-10 text-3xl animate-float animation-delay-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H4v-4h11v4zm0-5H4V9h11v4zm5 5h-4V9h4v9z" />
          </svg>
        </div>

        <div className="absolute top-[25%] left-[25%] hidden md:block text-primary -z-10 text-2xl animate-pulse animation-delay-200">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
          </svg>
        </div>

        <div className="absolute bottom-[30%] right-[10%] hidden md:block text-primary -z-10 text-3xl animate-spin-slow">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9h10v2H7z" />
          </svg>
        </div>

        <div className="absolute bottom-[45%] left-[18%] hidden md:block text-primary -z-10 text-2xl animate-bounce-slow">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5C13 2.12 11.88 1 10.5 1S8 2.12 8 3.5V5H4c-1.1 0-1.99.9-1.99 2v3.8H3.5c1.49 0 2.7 1.21 2.7 2.7s-1.21 2.7-2.7 2.7H2V20c0 1.1.9 2 2 2h3.8v-1.5c0-1.49 1.21-2.7 2.7-2.7 1.49 0 2.7 1.21 2.7 2.7V22H17c1.1 0 2-.9 2-2v-4h1.5c1.38 0 2.5-1.12 2.5-2.5S21.88 11 20.5 11z" />
          </svg>
        </div>

        <div className="absolute top-[60%] right-[20%] hidden md:block text-primary -z-10 text-xl animate-float animation-delay-800">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" />
          </svg>
        </div>

        {/* Stats Section */}
        <div className="w-full py-24 relative">
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden -z-10">
            <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-primary/5 blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-primary/5 blur-3xl"></div>

            {/* Additional floating icons in the stats section */}
            <div className="absolute top-10 right-10 text-primary -z-10 text-2xl animate-float animation-delay-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56zm2.95-8H5.08c.96-1.66 2.49-2.93 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z" />
              </svg>
            </div>

            <div className="absolute bottom-16 left-16 text-primary -z-10 text-xl animate-pulse">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14h-2V9h-2V7h4v10z" />
              </svg>
            </div>
          </div>

          <div className={`max-w-4xl mx-auto ${isDark ? 'bg-dark-bg-secondary/50' : 'bg-light-bg-secondary/50'} backdrop-blur-sm rounded-2xl p-12 border ${isDark ? 'border-dark-border' : 'border-light-border'} shadow-xl`}>
            <h2 className={`text-center text-4xl font-bold mb-16 ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'} animate-fadeIn`}>
              Making an Impact <span className="text-primary">Together</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Courses Stat */}
              <div className="group">
                <div className={`
                  text-center p-8 rounded-xl ${isDark ? 'bg-dark-bg-tertiary border-dark-border' : 'bg-light-bg-tertiary border-light-border'}
                  border shadow-md transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-xl
                  animate-fadeIn animation-delay-200
                `}>
                  <div className="relative mb-2">
                    <div className="absolute inset-0 bg-primary/10 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-500"></div>
                    <h3 className="text-5xl text-primary mb-1 font-bold relative z-10">{coursesData?.length || 70}+</h3>
                  </div>
                  <p className={`text-lg font-medium ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>Courses</p>
                </div>
              </div>

              {/* Roadmaps Stat */}
              <div className="group">
                <div className={`
                  text-center p-8 rounded-xl ${isDark ? 'bg-dark-bg-tertiary border-dark-border' : 'bg-light-bg-tertiary border-light-border'}
                  border shadow-md transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-xl
                  animate-fadeIn animation-delay-300
                `}>
                  <div className="relative mb-2">
                    <div className="absolute inset-0 bg-primary/10 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-500"></div>
                    <h3 className="text-5xl text-primary mb-1 font-bold relative z-10">35+</h3>
                  </div>
                  <p className={`text-lg font-medium ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>Roadmaps</p>
                </div>
              </div>

              {/* Creators Stat */}
              <div className="group">
                <div className={`
                  text-center p-8 rounded-xl ${isDark ? 'bg-dark-bg-tertiary border-dark-border' : 'bg-light-bg-tertiary border-light-border'}
                  border shadow-md transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-xl
                  animate-fadeIn animation-delay-400
                `}>
                  <div className="relative mb-2">
                    <div className="absolute inset-0 bg-primary/10 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-500"></div>
                    <h3 className="text-5xl text-primary mb-1 font-bold relative z-10">
                      {[...new Map(coursesData?.map(course => [course.creator_name, course])).values()].length || 30}+
                    </h3>
                  </div>
                  <p className={`text-lg font-medium ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>Expert Creators</p>
                </div>
              </div>

              {/* Users Stat */}
              <div className="group">
                <div className={`
                  text-center p-8 rounded-xl ${isDark ? 'bg-dark-bg-tertiary border-dark-border' : 'bg-light-bg-tertiary border-light-border'}
                  border shadow-md transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-xl
                  animate-fadeIn animation-delay-500
                `}>
                  <div className="relative mb-2">
                    <div className="absolute inset-0 bg-primary/10 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-500"></div>
                    <h3 className="text-5xl text-primary mb-1 font-bold relative z-10">100+</h3>
                  </div>
                  <p className={`text-lg font-medium ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>Active Users</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Creators Showcase Section */}
        <div className="w-full py-16 text-center">
          <h2 className={`text-4xl font-bold mb-12 ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>
            Meet Our <span className="text-primary">Top Creators</span>
          </h2>
          <Suspense fallback={
            <div className="flex items-center justify-center h-40">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
            </div>
          }>
            <CreatorsContainer count={4} />
          </Suspense>
        </div>

        {/* Roadmaps Preview Section */}
        <div className="w-full py-24 relative">
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden -z-10">
            <div className="absolute top-1/4 right-0 w-64 h-64 rounded-full bg-primary/5 blur-3xl"></div>
            <div className="absolute bottom-1/4 left-0 w-64 h-64 rounded-full bg-primary/5 blur-3xl"></div>

            {/* Additional floating icons in the roadmaps section */}
            <div className="absolute top-20 left-20 text-primary -z-10 text-2xl animate-float animation-delay-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6A4.997 4.997 0 017 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z" />
              </svg>
            </div>

            <div className="absolute bottom-32 right-24 text-primary -z-10 text-xl animate-spin-slow">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
              </svg>
            </div>

            <div className="absolute top-1/2 left-10 text-primary -z-10 text-xl animate-bounce-slow animation-delay-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
              </svg>
            </div>
          </div>

          <h2 className={`text-4xl font-bold text-center mb-16 ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'} animate-fadeIn`}>
            Explore Our <span className="text-primary">Learning Paths</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto px-4">
            {/* Frontend Development */}
            <div
              className={`
                  group relative rounded-xl p-6 min-h-[200px] flex flex-col justify-between items-center
                  transition-all duration-300 hover:-translate-y-2 hover:shadow-xl 
                  border shadow-md ${isDark ? 'bg-dark-bg-secondary border-dark-border' : 'bg-light-bg-secondary border-light-border'}
                  animate-fadeIn animation-delay-200
                `}
            >
              {/* Background pattern with smooth hover animation */}
              <div
                className="absolute top-0 right-0 group-hover:-top-4 group-hover:-right-4 transition-all duration-500 ease-in-out 
               w-24 h-24 opacity-10 group-hover:w-28 group-hover:h-28 group-hover:opacity-80"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full text-primary transition-colors duration-500 group-hover:text-secondary"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 18.178l-4.62-1.256-.328-3.544h2.27l.158 1.844 2.52.667 2.52-.667.26-2.866H6.96l-.635-6.678h11.35l-.227 2.21H8.822l.204 2.256h8.126l-.654 7.034L12 18.178z" />
                </svg>
              </div>

              <div className="z-10 text-center mt-4">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className={`text-xl font-semibold ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'} mb-2`}>Frontend Development</h3>
                <p className={`text-sm ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'} mb-4`}>
                  Master HTML, CSS, JavaScript and modern frameworks
                </p>
              </div>

              <Link
                to="/roadmap"
                className="py-2 px-4 text-sm bg-transparent border border-primary text-primary rounded-md hover:bg-primary hover:text-white transition-colors duration-300 mt-auto"
              >
                View Path
              </Link>
            </div>

            {/* Backend Development */}
            <div
              className={`
                group relative rounded-xl p-6 min-h-[200px] flex flex-col justify-between items-center
                transition-all duration-300 hover:-translate-y-2 hover:shadow-xl 
                border shadow-md ${isDark ? 'bg-dark-bg-secondary border-dark-border' : 'bg-light-bg-secondary border-light-border'}
                animate-fadeIn animation-delay-300
              `}
            >
              {/* Background pattern */}
              <div
                className="absolute top-0 right-0 group-hover:-top-4 group-hover:-right-4 transition-all duration-500 ease-in-out 
               w-24 h-24 opacity-10 group-hover:w-28 group-hover:h-28 group-hover:opacity-80"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-primary" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                </svg>
              </div>

              <div className="z-10 text-center mt-4">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                  </svg>
                </div>
                <h3 className={`text-xl font-semibold ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'} mb-2`}>Backend Development</h3>
                <p className={`text-sm ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'} mb-4`}>
                  Build APIs, servers and databases with Node.js and more
                </p>
              </div>

              <Link
                to="/roadmap"
                className="py-2 px-4 text-sm bg-transparent border border-primary text-primary rounded-md hover:bg-primary hover:text-white transition-colors duration-300 mt-auto"
              >
                View Path
              </Link>
            </div>

            {/* Full Stack Development */}
            <div
              className={`
                group relative rounded-xl p-6 min-h-[200px] flex flex-col justify-between items-center
                transition-all duration-300 hover:-translate-y-2 hover:shadow-xl 
                border shadow-md ${isDark ? 'bg-dark-bg-secondary border-dark-border' : 'bg-light-bg-secondary border-light-border'}
                animate-fadeIn animation-delay-400
              `}
            >
              {/* Background pattern */}
              <div
                className="absolute top-0 right-0 group-hover:-top-4 group-hover:-right-4 transition-all duration-500 ease-in-out 
               w-24 h-24 opacity-10 group-hover:w-28 group-hover:h-28 group-hover:opacity-80"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-primary" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7.375 16.781l1.25-1.562L4.601 12l4.024-3.219-1.25-1.562-5 4a1 1 0 000 1.562l5 4zm9.25-9.562l-1.25 1.562L19.399 12l-4.024 3.219 1.25 1.562 5-4a1 1 0 000-1.562l-5-4zM14.976 3.216l-4 18-1.953-.434 4-18 1.953.434z" />
                </svg>
              </div>

              <div className="z-10 text-center mt-4">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className={`text-xl font-semibold ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'} mb-2`}>Full Stack Development</h3>
                <p className={`text-sm ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'} mb-4`}>
                  Become proficient in both frontend and backend technologies
                </p>
              </div>

              <Link
                to="/roadmap"
                className="py-2 px-4 text-sm bg-transparent border border-primary text-primary rounded-md hover:bg-primary hover:text-white transition-colors duration-300 mt-auto"
              >
                View Path
              </Link>
            </div>

            {/* View All Paths */}
            <div
              className={`
                relative rounded-xl p-6 min-h-[200px] flex flex-col justify-center items-center
                transition-all duration-300 hover:-translate-y-2 hover:shadow-xl overflow-hidden
                border shadow-md ${isDark ? 'bg-dark-bg-secondary border-dark-border' : 'bg-light-bg-secondary border-light-border'}
                animate-fadeIn animation-delay-500
              `}
            >
              {/* Background pattern */}
              <div className="absolute inset-0 bg-primary/5"></div>

              <div className="z-10 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/20 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </div>

                <Link
                  to="/roadmap"
                  className="py-3 px-6 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors duration-300 inline-flex items-center gap-2 group"
                >
                  <span>View All Paths</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Additional sections */}
        <Suspense fallback={
          <div className="flex items-center justify-center h-40">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
          </div>
        }>
          <Testimonials />
        </Suspense>

        <Suspense fallback={
          <div className="flex items-center justify-center h-40">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
          </div>
        }>
          <ChooseUs />
        </Suspense>

        <Suspense fallback={
          <div className="flex items-center justify-center h-40">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
          </div>
        }>
          <FAQ />
        </Suspense>

        <Suspense fallback={
          <div className="flex items-center justify-center h-40">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
          </div>
        }>
          <NewsLetter />
        </Suspense>

        <Suspense fallback={
          <div className="flex items-center justify-center h-40">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
          </div>
        }>
          <CallToAction />
        </Suspense>
      </div>
    </div>
  );
}

export default Home;