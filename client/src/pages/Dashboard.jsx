import React, { useState, useEffect, lazy, Suspense, useMemo, useCallback } from 'react';
import { useAuth } from '../store/auth';
import { useTheme } from '../context/ThemeContext';
import { FaBookmark, FaGraduationCap, FaChartLine, FaClock, FaPlay } from 'react-icons/fa';
import { Link } from 'react-router-dom';

// Lazy loaded components
const CardBody = lazy(() => import('../components/CardBody'));
const CourseModules = lazy(() => import('../components/CourseModules'));
const UserActivity = lazy(() => import('../components/UserActivity'));
const ContinueWatching = lazy(() => import('../components/ContinueWatching'));

function Dashboard() {
  const { userdata, API } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [watchlist, setWatchlist] = useState([]);
  // Stats for user dashboard with proper tracking
  const [stats, setStats] = useState({
    coursesInProgress: 0,
    coursesCompleted: 0,
    totalHoursLearned: 0,
    lastActive: new Date().toISOString(),
    savedCourses: 0
  });
  const [activities, setActivities] = useState([]);
  const [courseProgress, setCourseProgress] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedCourseProgress, setSelectedCourseProgress] = useState(null);
  const [continueWatchingCourses, setContinueWatchingCourses] = useState([]);
  const token = localStorage.getItem('token');

  // Fetch user's watchlist (Saved Courses) - memoized to prevent unnecessary re-renders
  const fetchWatchlist = useCallback(async () => {
    try {
      //console.log('Fetching user watchlist...');
      const response = await fetch(`${API}/user/watchlist`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      if (response.ok) {
        const data = await response.json();
        //console.log('Watchlist data:', data);
        setWatchlist(data.watchlist || []);

        // Update saved courses count in stats
        setStats(prevStats => ({
          ...prevStats,
          savedCourses: data.watchlist ? data.watchlist.length : 0
        }));
      } else {
        console.error('Failed to fetch watchlist:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error fetching watchlist:', error);
    }
  }, [API, token]);

  // Fetch user's progress data for Continue Watching and stats - memoized to prevent unnecessary re-renders
  const fetchUserProgress = useCallback(async () => {
    try {
      //console.log('Fetching user progress data...');
      const response = await fetch(`${API}/progress`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      if (response.ok) {
        const data = await response.json();
        //console.log('Progress data:', data);

        // Filter out any invalid progress entries
        const validProgress = data.progress ? data.progress.filter(
          course => course.courseId && typeof course.courseId === 'object'
        ) : [];

        setCourseProgress(validProgress);

        // Calculate stats based on progress
        let inProgress = 0;
        let completed = 0;
        let totalHours = 0;

        // Filter courses in progress for "Continue Watching" section
        const inProgressCourses = [];

        validProgress.forEach(course => {
          // Ensure we have valid data
          if (!course.courseId || typeof course.courseId !== 'object') {
            console.warn('Invalid course progress entry:', course);
            return;
          }

          if (course.status === 'in-progress') {
            inProgress++;
            // Add to continue watching
            inProgressCourses.push({
              ...course,
              lastWatched: course.lastAccessedAt || course.updatedAt,
              progress: course.progress || 0
            });
          } else if (course.status === 'completed') {
            completed++;
          }

          // Add up total learning hours
          totalHours += course.totalHoursSpent || 0;
        });

        // Sort by last accessed (most recent first)
        inProgressCourses.sort((a, b) => {
          const dateA = new Date(a.lastWatched || 0);
          const dateB = new Date(b.lastWatched || 0);
          return dateB - dateA;
        });

        //console.log('Continue watching courses:', inProgressCourses);
        setContinueWatchingCourses(inProgressCourses);

        // Update stats with real data
        setStats(prev => ({
          ...prev,
          coursesInProgress: inProgress,
          coursesCompleted: completed,
          totalHoursLearned: Math.round(totalHours)
        }));

        // If there's at least one course in progress, select it for the dashboard
        if (inProgressCourses.length > 0) {
          setSelectedCourse(inProgressCourses[0].courseId);
          setSelectedCourseProgress(inProgressCourses[0]);
        } else if (validProgress.length > 0) {
          // Otherwise, select the first course with progress
          const firstCourse = validProgress[0].courseId;
          setSelectedCourse(firstCourse);
          setSelectedCourseProgress(validProgress[0]);
        }
      } else {
        console.error('Failed to fetch progress:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error fetching user progress:', error);
    }
  }, [API, token]);

  // Fetch user's activity for the activity feed - memoized to prevent unnecessary re-renders
  const fetchUserActivity = useCallback(async () => {
    try {
      //console.log('Fetching user activity data...');
      const response = await fetch(`${API}/activity`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      if (response.ok) {
        const data = await response.json();
        //console.log('Activity data:', data);

        // Ensure we have valid activity data
        const validActivities = data.activities ? data.activities.filter(
          activity => activity && activity.timestamp
        ) : [];

        setActivities(validActivities);

        // Update last active date from the most recent activity
        if (validActivities.length > 0) {
          // Sort activities by timestamp (newest first)
          validActivities.sort((a, b) => {
            const dateA = new Date(a.timestamp || 0);
            const dateB = new Date(b.timestamp || 0);
            return dateB - dateA;
          });

          setStats(prev => ({
            ...prev,
            lastActive: validActivities[0].timestamp
          }));
        }
      } else {
        console.error('Failed to fetch activity:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error fetching user activity:', error);
    }
  }, [API, token]);

  // Handle course selection and track the activity - memoized to prevent unnecessary re-renders
  const handleCourseSelect = useCallback(async (course) => {
    //console.log('Course selected:', course);
    setSelectedCourse(course);

    // Find progress for this course
    const progress = courseProgress.find(p => p.courseId._id === course._id);
    setSelectedCourseProgress(progress || null);

    // Track this course selection in user activity
    if (userdata?._id && token) {
      try {
        //console.log('Tracking course selection activity');
        const response = await fetch(`${API}/activity/add`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            courseId: course._id,
            activityType: 'course_select',
            details: {
              courseTitle: course.course_title,
              action: 'Selected from dashboard'
            }
          })
        });

        if (response.ok) {
          //console.log('Activity tracked successfully');
          // Refresh activity data
          fetchUserActivity();
        }
      } catch (error) {
        console.error('Error tracking course selection:', error);
      }
    }
  }, [courseProgress, userdata, token, API, fetchUserActivity]);

  // Handle progress update and store in database - memoized to prevent unnecessary re-renders
  const handleProgressUpdate = useCallback(async (updatedProgress) => {
    //console.log('Progress update received:', updatedProgress);

    // First, update the local state
    setCourseProgress(prev => {
      // Find the course to update or add it if it doesn't exist
      const exists = prev.some(p => p._id === updatedProgress._id);
      const newProgress = exists
        ? prev.map(p => p._id === updatedProgress._id ? updatedProgress : p)
        : [...prev, updatedProgress];

      // Update continue watching courses
      const updatedContinueWatching = newProgress
        .filter(course => course.status === 'in-progress' && course.courseId)
        .map(course => ({
          ...course,
          lastWatched: course.lastAccessedAt || course.updatedAt,
          progress: course.progress || 0
        }))
        .sort((a, b) => {
          const dateA = new Date(a.lastWatched || 0);
          const dateB = new Date(b.lastWatched || 0);
          return dateB - dateA;
        });

      setContinueWatchingCourses(updatedContinueWatching);

      // Update stats based on new progress data
      let inProgress = 0;
      let completed = 0;
      let totalHours = 0;

      newProgress.forEach(course => {
        if (course.status === 'in-progress') {
          inProgress++;
        } else if (course.status === 'completed') {
          completed++;
        }
        totalHours += course.totalHoursSpent || 0;
      });

      setStats(prev => ({
        ...prev,
        coursesInProgress: inProgress,
        coursesCompleted: completed,
        totalHoursLearned: Math.round(totalHours)
      }));

      return newProgress;
    });

    // Update selected course progress if it's the current course
    if (selectedCourseProgress && selectedCourseProgress._id === updatedProgress._id) {
      setSelectedCourseProgress(updatedProgress);
    }

    // Save the progress to the database
    if (updatedProgress.courseId && token) {
      try {
        //console.log('Saving progress to database...');
        const courseId = typeof updatedProgress.courseId === 'object'
          ? updatedProgress.courseId._id
          : updatedProgress.courseId;

        const response = await fetch(`${API}/progress/${courseId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            progress: updatedProgress.progress || 0,
            currentVideoTime: updatedProgress.currentVideoTime || 0,
            totalHoursSpent: updatedProgress.totalHoursSpent || 0,
            status: updatedProgress.status || 'in-progress'
          })
        });

        if (response.ok) {
          //console.log('Progress saved successfully');
          // Refresh activity data
          fetchUserActivity();
        } else {
          console.error('Failed to save progress:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error saving progress:', error);
      }
    }
  }, [selectedCourseProgress, token, API, fetchUserActivity]);

  useEffect(() => {
    fetchWatchlist();
    fetchUserProgress();
    fetchUserActivity();
  }, [fetchWatchlist, fetchUserProgress, fetchUserActivity]);

  // Handle watchlist update in CardBody and track the activity - memoized to prevent unnecessary re-renders
  const updateWatchlist = useCallback(async (course, action) => {
    //console.log(`Watchlist update: ${action} course ${course?._id}`);

    // Refresh watchlist data
    await fetchWatchlist();

    // Track this watchlist action in user activity
    if (userdata?._id && token && course) {
      try {
        //console.log('Tracking watchlist activity');
        const response = await fetch(`${API}/activity/add`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            courseId: course._id,
            activityType: 'watchlist_update',
            details: {
              courseTitle: course.course_title,
              action: action || 'updated'
            }
          })
        });

        if (response.ok) {
          //console.log('Watchlist activity tracked successfully');
          // Refresh activity data
          fetchUserActivity();
        }
      } catch (error) {
        console.error('Error tracking watchlist activity:', error);
      }
    } else {
      // Just refresh activity data
      fetchUserActivity();
    }
  }, [userdata, token, API, fetchWatchlist, fetchUserActivity]);

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
              <h3 className="text-2xl font-bold">{stats.savedCourses}</h3>
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
                  {/* YouTubePlayer removed from dashboard */}
                  <div className={`p-6 rounded-lg ${isDark ? 'bg-dark-bg-secondary' : 'bg-light-bg-secondary'} border ${isDark ? 'border-dark-border' : 'border-light-border'} shadow-md`}>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className={`text-xl font-bold ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>
                        {selectedCourse.course_title}
                      </h3>
                      <Link
                        to={`/courses/${selectedCourse._id}`}
                        className="py-2 px-4 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors text-sm flex items-center"
                      >
                        <FaPlay className="mr-2" /> Continue Watching
                      </Link>
                    </div>

                    <div className="flex items-center mb-4">
                      <img
                        src={selectedCourse.course_image || 'https://via.placeholder.com/150'}
                        alt={selectedCourse.course_title}
                        className="w-20 h-20 object-cover rounded-md mr-4"
                      />
                      <div>
                        <p className={`text-sm ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'} mb-1`}>
                          By {selectedCourse.creator_name}
                        </p>
                        {selectedCourseProgress && (
                          <div className="mt-2">
                            <div className="flex justify-between items-center text-xs mb-1">
                              <span className={`${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
                                {selectedCourseProgress.progress || 0}% complete
                              </span>
                              <span className="flex items-center text-primary">
                                <FaClock className="mr-1" />
                                {Math.round(selectedCourseProgress.totalHoursSpent || 0)}h
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                              <div
                                className="bg-primary h-2 rounded-full"
                                style={{ width: `${selectedCourseProgress.progress || 0}%` }}
                              ></div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <Suspense fallback={
                    <div className="flex items-center justify-center h-40">
                      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
                    </div>
                  }>
                    <CourseModules
                      courseId={selectedCourse._id}
                      progress={selectedCourseProgress}
                      onModuleComplete={handleProgressUpdate}
                    />
                  </Suspense>
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
                      <Suspense fallback={
                        <div className="flex items-center justify-center h-40">
                          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
                        </div>
                      }>
                        <CardBody
                          course={course}
                          watchlist={watchlist}
                          updateWatchlist={updateWatchlist}
                          onClick={handleCourseSelect}
                        />
                      </Suspense>
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
            <Suspense fallback={
              <div className="flex items-center justify-center h-40">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
              </div>
            }>
              <ContinueWatching
                courses={continueWatchingCourses}
                onCourseSelect={handleCourseSelect}
              />
            </Suspense>

            {/* User Activity */}
            <Suspense fallback={
              <div className="flex items-center justify-center h-40">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
              </div>
            }>
              <UserActivity activities={activities} />
            </Suspense>

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
