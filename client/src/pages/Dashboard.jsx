import React, { useState, useEffect } from 'react';
import { useAuth } from '../store/auth';
import { useTheme } from '../context/ThemeContext';
import CardBody from '../components/CardBody';
import YouTubePlayer from '../components/YouTubePlayer';
import CourseModules from '../components/CourseModules';
import UserActivity from '../components/UserActivity';
import ContinueWatching from '../components/ContinueWatching';
import { FaBookmark, FaGraduationCap, FaChartLine, FaClock } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Dashboard() {
  const { userdata, API } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [watchlist, setWatchlist] = useState([]);
  const [stats, setStats] = useState({
    coursesInProgress: 0,
    coursesCompleted: 0,
    totalHoursLearned: 0,
    lastActive: new Date().toISOString()
  });
  const [activities, setActivities] = useState([]);
  const [courseProgress, setCourseProgress] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedCourseProgress, setSelectedCourseProgress] = useState(null);
  const [continueWatchingCourses, setContinueWatchingCourses] = useState([]);
  const token = localStorage.getItem('token');

  // Fetch user's watchlist
  const fetchWatchlist = async () => {
    try {
      const response = await fetch(`${API}/user/watchlist`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      if (response.ok) {
        const data = await response.json();
        setWatchlist(data.watchlist || []);

        // Update stats based on watchlist
        if (data.watchlist) {
          setStats({
            ...stats,
            coursesInProgress: Math.min(data.watchlist.length, 3), // Assuming some courses are in progress
            coursesCompleted: Math.floor(Math.random() * 5), // Placeholder for completed courses
            totalHoursLearned: Math.floor(Math.random() * 50) // Placeholder for hours learned
          });
        }
      } else {
        console.error('Failed to fetch watchlist:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error fetching watchlist:', error);
    }
  };

  // Fetch user's progress data
  const fetchUserProgress = async () => {
    try {
      const response = await fetch(`${API}/progress`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      if (response.ok) {
        const data = await response.json();
        setCourseProgress(data.progress || []);

        // Calculate stats based on progress
        let inProgress = 0;
        let completed = 0;
        let totalHours = 0;

        // Filter courses in progress for "Continue Watching" section
        const inProgressCourses = [];

        data.progress.forEach(course => {
          if (course.status === 'in-progress') {
            inProgress++;
            // Add to continue watching if it has a courseId reference
            if (course.courseId && typeof course.courseId === 'object') {
              inProgressCourses.push({
                ...course,
                lastWatched: course.lastAccessedAt,
                progress: course.progress || 0
              });
            }
          } else if (course.status === 'completed') {
            completed++;
          }
          totalHours += course.totalHoursSpent || 0;
        });

        // Sort by last accessed (most recent first)
        inProgressCourses.sort((a, b) =>
          new Date(b.lastWatched) - new Date(a.lastWatched)
        );

        setContinueWatchingCourses(inProgressCourses);

        setStats(prev => ({
          ...prev,
          coursesInProgress: inProgress,
          coursesCompleted: completed,
          totalHoursLearned: Math.round(totalHours)
        }));

        // If there's at least one course in progress, select it
        if (inProgressCourses.length > 0) {
          setSelectedCourse(inProgressCourses[0].courseId);
          setSelectedCourseProgress(inProgressCourses[0]);
        } else if (data.progress && data.progress.length > 0) {
          const firstCourse = data.progress[0].courseId;
          setSelectedCourse(firstCourse);
          setSelectedCourseProgress(data.progress[0]);
        }
      }
    } catch (error) {
      console.error('Error fetching user progress:', error);
    }
  };

  // Fetch user's activity
  const fetchUserActivity = async () => {
    try {
      const response = await fetch(`${API}/progress/activity`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      if (response.ok) {
        const data = await response.json();
        setActivities(data.activities || []);

        // Update last active date
        if (data.activities && data.activities.length > 0) {
          setStats(prev => ({
            ...prev,
            lastActive: data.activities[0].timestamp
          }));
        }
      }
    } catch (error) {
      console.error('Error fetching user activity:', error);
    }
  };

  // Handle course selection
  const handleCourseSelect = (course) => {
    setSelectedCourse(course);

    // Find progress for this course
    const progress = courseProgress.find(p => p.courseId._id === course._id);
    setSelectedCourseProgress(progress || null);
  };

  // Handle progress update
  const handleProgressUpdate = (updatedProgress) => {
    // Update the progress in the courseProgress array
    setCourseProgress(prev => {
      const newProgress = prev.map(p =>
        p._id === updatedProgress._id ? updatedProgress : p
      );

      // Update continue watching courses
      const updatedContinueWatching = newProgress
        .filter(course => course.status === 'in-progress' && course.courseId)
        .map(course => ({
          ...course,
          lastWatched: course.lastAccessedAt,
          progress: course.progress || 0
        }))
        .sort((a, b) => new Date(b.lastWatched) - new Date(a.lastWatched));

      setContinueWatchingCourses(updatedContinueWatching);

      return newProgress;
    });

    // Update selected course progress if it's the current course
    if (selectedCourseProgress && selectedCourseProgress._id === updatedProgress._id) {
      setSelectedCourseProgress(updatedProgress);
    }

    // Refresh activity data
    fetchUserActivity();
  };

  useEffect(() => {
    fetchWatchlist();
    fetchUserProgress();
    fetchUserActivity();
  }, [API, token]);

  // Handle watchlist update in CardBody
  const updateWatchlist = () => {
    fetchWatchlist();
    fetchUserActivity(); // Refresh activity after watchlist changes
  };

  return (
    <div className={`relative min-h-screen-minus-nav overflow-hidden z-10 ${isDark ? 'bg-dark-bg-primary text-dark-text-primary' : 'bg-light-bg-primary text-light-text-primary'}`}>
      {/* Background with gradient */}
      <div className={`absolute top-0 left-0 w-full h-full -z-10 bg-[size:30px_30px] ${isDark ? 'bg-grid-pattern-dark' : 'bg-grid-pattern-light'}`}></div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Dashboard Header */}
        <div className="mb-12">
          <h1 className={`text-4xl font-bold mb-4 ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>
            Welcome back, <span className="text-primary">{userdata ? userdata.username : "Learner"}</span>!
          </h1>
          <p className={`text-lg ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
            Track your progress, manage your courses, and continue your learning journey.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className={`p-6 rounded-xl ${isDark ? 'bg-dark-bg-secondary border-dark-border' : 'bg-light-bg-secondary border-light-border'} border shadow-md flex items-center`}>
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
              <FaBookmark className="text-primary text-xl" />
            </div>
            <div>
              <p className={`text-sm ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>Saved Courses</p>
              <h3 className="text-2xl font-bold">{watchlist.length}</h3>
            </div>
          </div>

          <div className={`p-6 rounded-xl ${isDark ? 'bg-dark-bg-secondary border-dark-border' : 'bg-light-bg-secondary border-light-border'} border shadow-md flex items-center`}>
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
              <FaGraduationCap className="text-primary text-xl" />
            </div>
            <div>
              <p className={`text-sm ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>Completed</p>
              <h3 className="text-2xl font-bold">{stats.coursesCompleted}</h3>
            </div>
          </div>

          <div className={`p-6 rounded-xl ${isDark ? 'bg-dark-bg-secondary border-dark-border' : 'bg-light-bg-secondary border-light-border'} border shadow-md flex items-center`}>
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
              <FaChartLine className="text-primary text-xl" />
            </div>
            <div>
              <p className={`text-sm ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>In Progress</p>
              <h3 className="text-2xl font-bold">{stats.coursesInProgress}</h3>
            </div>
          </div>

          <div className={`p-6 rounded-xl ${isDark ? 'bg-dark-bg-secondary border-dark-border' : 'bg-light-bg-secondary border-light-border'} border shadow-md flex items-center`}>
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
              <FaClock className="text-primary text-xl" />
            </div>
            <div>
              <p className={`text-sm ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>Hours Learned</p>
              <h3 className="text-2xl font-bold">{stats.totalHoursLearned}</h3>
            </div>
          </div>
        </div>

        {/* Main Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Current Course & Modules */}
          <div className="lg:col-span-2 space-y-8">
            {/* Current Course Section */}
            <div>
              <div className="mb-4 flex justify-between items-center">
                <h2 className={`text-2xl font-bold ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>
                  Continue Learning
                </h2>
              </div>

              {selectedCourse ? (
                <div className="space-y-6">
                  <YouTubePlayer
                    videoUrl={selectedCourse.creator_youtube_link}
                    courseId={selectedCourse._id}
                    onProgressUpdate={handleProgressUpdate}
                  />

                  <CourseModules
                    courseId={selectedCourse._id}
                    progress={selectedCourseProgress}
                    onModuleComplete={handleProgressUpdate}
                  />
                </div>
              ) : (
                <div className={`p-12 rounded-xl ${isDark ? 'bg-dark-bg-secondary border-dark-border' : 'bg-light-bg-secondary border-light-border'} border shadow-md text-center`}>
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <FaGraduationCap className="text-primary text-2xl" />
                  </div>
                  <h3 className={`text-xl font-semibold mb-3 ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>
                    No courses in progress
                  </h3>
                  <p className={`mb-6 ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
                    Start learning by adding courses to your watchlist.
                  </p>
                  <Link
                    to="/courses"
                    className="py-2 px-6 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors"
                  >
                    Explore Courses
                  </Link>
                </div>
              )}
            </div>

            {/* Watchlist Section */}
            <div>
              <div className="mb-4 flex justify-between items-center">
                <h2 className={`text-2xl font-bold ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>
                  Your Watchlist
                </h2>
                <Link
                  to="/courses"
                  className="text-primary hover:text-primary-dark transition-colors"
                >
                  Browse more courses
                </Link>
              </div>

              {watchlist.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {watchlist.map(course => (
                    <div key={course._id}>
                      <CardBody
                        course={course}
                        watchlist={watchlist}
                        updateWatchlist={updateWatchlist}
                        onClick={handleCourseSelect}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className={`p-8 rounded-xl ${isDark ? 'bg-dark-bg-secondary border-dark-border' : 'bg-light-bg-secondary border-light-border'} border shadow-md text-center`}>
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <FaBookmark className="text-primary text-xl" />
                  </div>
                  <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>
                    Your watchlist is empty
                  </h3>
                  <p className={`mb-4 ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
                    Save courses to watch later and track your learning progress.
                  </p>
                  <Link
                    to="/courses"
                    className="py-2 px-4 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors text-sm"
                  >
                    Explore Courses
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Stats & Activity */}
          <div className="space-y-8">
            {/* Continue Watching Section */}
            <ContinueWatching
              courses={continueWatchingCourses}
              onCourseSelect={handleCourseSelect}
            />

            {/* User Activity */}
            <UserActivity activities={activities} />

            {/* Learning Recommendations */}
            <div className={`p-6 rounded-xl ${isDark ? 'bg-dark-bg-secondary border-dark-border' : 'bg-light-bg-secondary border-light-border'} border shadow-md`}>
              <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>
                Recommended For You
              </h3>

              <div className="space-y-4">
                <div
                  className={`p-3 rounded-lg ${isDark ? 'bg-dark-bg-tertiary' : 'bg-light-bg-tertiary'} border ${isDark ? 'border-dark-border' : 'border-light-border'} hover:border-primary transition-colors cursor-pointer`}
                  onClick={() => window.open("https://www.youtube.com/watch?v=8zKuNo4ay8E", "_blank")}
                >
                  <h4 className={`font-medium ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>Advanced JavaScript Concepts</h4>
                  <p className={`text-sm ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'} mb-2`}>
                    Take your JS skills to the next level
                  </p>
                  <div className="flex items-center text-xs text-primary">
                    <span className="bg-primary/10 px-2 py-1 rounded">Intermediate</span>
                    <span className="ml-2">4.8 ★</span>
                  </div>
                </div>

                <div
                  className={`p-3 rounded-lg ${isDark ? 'bg-dark-bg-tertiary' : 'bg-light-bg-tertiary'} border ${isDark ? 'border-dark-border' : 'border-light-border'} hover:border-primary transition-colors cursor-pointer`}
                  onClick={() => window.open("https://www.youtube.com/watch?v=7A5X_iwWdvw", "_blank")}
                >
                  <h4 className={`font-medium ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>React Performance Optimization</h4>
                  <p className={`text-sm ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'} mb-2`}>
                    Learn techniques to optimize React apps
                  </p>
                  <div className="flex items-center text-xs text-primary">
                    <span className="bg-primary/10 px-2 py-1 rounded">Advanced</span>
                    <span className="ml-2">4.9 ★</span>
                  </div>
                </div>

                <div
                  className={`p-3 rounded-lg ${isDark ? 'bg-dark-bg-tertiary' : 'bg-light-bg-tertiary'} border ${isDark ? 'border-dark-border' : 'border-light-border'} hover:border-primary transition-colors cursor-pointer`}
                  onClick={() => window.open("https://www.youtube.com/watch?v=ktjafK4SgWM", "_blank")}
                >
                  <h4 className={`font-medium ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>Full Stack Development with MERN</h4>
                  <p className={`text-sm ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'} mb-2`}>
                    Build complete web applications
                  </p>
                  <div className="flex items-center text-xs text-primary">
                    <span className="bg-primary/10 px-2 py-1 rounded">Intermediate</span>
                    <span className="ml-2">4.7 ★</span>
                  </div>
                </div>
              </div>

              <Link
                to="/courses"
                className="mt-4 text-primary hover:text-primary-dark transition-colors text-sm flex justify-end items-center"
              >
                View all recommendations
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
