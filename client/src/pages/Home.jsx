import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../store/auth";
import { useTheme } from "../context/ThemeContext";
import CreatorsContainer from "../components/HomePageComponents/CreatorsContainer";
import ChooseUs from "../components/HomePageComponents/ChooseUs";
import FAQ from "../components/HomePageComponents/FAQ";
import Testimonials from "../components/HomePageComponents/Testimonials";
import NewsLetter from "../components/HomePageComponents/NewsLetter";
import CallToAction from "../components/HomePageComponents/CallToAction";

function Home() {
  const { coursesData } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`relative min-h-screen-minus-nav overflow-hidden ${isDark ? 'bg-dark-bg-primary text-dark-text-primary' : 'bg-light-bg-primary text-light-text-primary'} z-10 flex flex-col justify-center items-center py-16`}>
      {/* Background with gradient */}
      <div className={`absolute top-0 left-0 w-full h-full -z-10 bg-[size:30px_30px] ${isDark ? 'bg-grid-pattern-dark' : 'bg-grid-pattern-light'}`}></div>

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

              <h3 className="text-primary text-xl font-semibold mb-3 text-center">Interactive Learning</h3>

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

              <h3 className="text-primary text-xl font-semibold mb-3 text-center">Expert Instructors</h3>

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

              <h3 className="text-primary text-xl font-semibold mb-3 text-center">Flexible Schedules</h3>

              <p className={`${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'} text-center`}>
                Take courses at your own pace with flexible learning hours. Learn when and where it works best for you.
              </p>
            </div>
          </div>
        </div>

        {/* Optional Floating Graphics */}
        <div className="absolute top-[10%] right-[5%] hidden md:block">
          <img className="animate-float" src="home/planet.svg" alt="Planet" />
        </div>
        <div className="absolute top-[10%] left-[5%] hidden md:block">
          <img className="relative -top-[50px] h-[100px] w-[100px] left-[200px] animate-float" src="home/Designer.png" alt="Designer" />
        </div>

        {/* Stats Section */}
        <div className="w-full py-24 relative">
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden -z-10">
            <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-primary/5 blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-primary/5 blur-3xl"></div>
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
          <CreatorsContainer count={4} />
        </div>

        {/* Roadmaps Preview Section */}
        <div className="w-full py-24 relative">
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden -z-10">
            <div className="absolute top-1/4 right-0 w-64 h-64 rounded-full bg-primary/5 blur-3xl"></div>
            <div className="absolute bottom-1/4 left-0 w-64 h-64 rounded-full bg-primary/5 blur-3xl"></div>
          </div>

          <h2 className={`text-4xl font-bold text-center mb-16 ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'} animate-fadeIn`}>
            Explore Our <span className="text-primary">Learning Paths</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto px-4">
            {/* Frontend Development */}
            <div
              className={`
                relative rounded-xl p-6 min-h-[200px] flex flex-col justify-between items-center
                transition-all duration-300 hover:-translate-y-2 hover:shadow-xl overflow-hidden
                border shadow-md ${isDark ? 'bg-dark-bg-secondary border-dark-border' : 'bg-light-bg-secondary border-light-border'}
                animate-fadeIn animation-delay-200
              `}
            >
              {/* Background pattern */}
              <div className="absolute top-0 right-0 w-24 h-24 opacity-10">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-primary" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 18.178l-4.62-1.256-.328-3.544h2.27l.158 1.844 2.52.667 2.52-.667.26-2.866H6.96l-.635-6.678h11.35l-.227 2.21H8.822l.204 2.256h8.126l-.654 7.034L12 18.178z"/>
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
                relative rounded-xl p-6 min-h-[200px] flex flex-col justify-between items-center
                transition-all duration-300 hover:-translate-y-2 hover:shadow-xl overflow-hidden
                border shadow-md ${isDark ? 'bg-dark-bg-secondary border-dark-border' : 'bg-light-bg-secondary border-light-border'}
                animate-fadeIn animation-delay-300
              `}
            >
              {/* Background pattern */}
              <div className="absolute top-0 right-0 w-24 h-24 opacity-10">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-primary" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
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
                relative rounded-xl p-6 min-h-[200px] flex flex-col justify-between items-center
                transition-all duration-300 hover:-translate-y-2 hover:shadow-xl overflow-hidden
                border shadow-md ${isDark ? 'bg-dark-bg-secondary border-dark-border' : 'bg-light-bg-secondary border-light-border'}
                animate-fadeIn animation-delay-400
              `}
            >
              {/* Background pattern */}
              <div className="absolute top-0 right-0 w-24 h-24 opacity-10">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-primary" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7.375 16.781l1.25-1.562L4.601 12l4.024-3.219-1.25-1.562-5 4a1 1 0 000 1.562l5 4zm9.25-9.562l-1.25 1.562L19.399 12l-4.024 3.219 1.25 1.562 5-4a1 1 0 000-1.562l-5-4zM14.976 3.216l-4 18-1.953-.434 4-18 1.953.434z"/>
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
        <Testimonials />
        <ChooseUs />
        <FAQ />
        <NewsLetter />
        <CallToAction />
      </div>
    </div>
  );
}

export default Home;