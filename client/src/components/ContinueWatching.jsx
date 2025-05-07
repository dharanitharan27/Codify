import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { FaPlay, FaClock } from 'react-icons/fa';

const ContinueWatching = ({ courses, onCourseSelect }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  // Format time (hours) to readable format
  const formatTime = (hours) => {
    if (!hours) return '0h 0m';
    
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    
    return `${h}h ${m}m`;
  };
  
  // Format date to relative time
  const getRelativeTime = (timestamp) => {
    if (!timestamp) return 'Never';
    
    const now = new Date();
    const lastWatched = new Date(timestamp);
    const diffInSeconds = Math.floor((now - lastWatched) / 1000);
    
    if (diffInSeconds < 60) {
      return 'Just now';
    }
    
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
    }
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    }
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) {
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    }
    
    const diffInWeeks = Math.floor(diffInDays / 7);
    return `${diffInWeeks} week${diffInWeeks > 1 ? 's' : ''} ago`;
  };
  
  // Sample courses if none provided
  const sampleCourses = [
    {
      _id: 'sample1',
      courseId: {
        _id: 'course1',
        course_title: 'React Fundamentals',
        course_image: 'https://i.ytimg.com/vi/bMknfKXIFA8/hqdefault.jpg',
        creator_name: 'freeCodeCamp.org'
      },
      progress: 35,
      lastWatched: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      currentVideoTime: 1250,
      totalHoursSpent: 2.5
    },
    {
      _id: 'sample2',
      courseId: {
        _id: 'course2',
        course_title: 'JavaScript Basics',
        course_image: 'https://i.ytimg.com/vi/W6NZfCO5SIk/hqdefault.jpg',
        creator_name: 'Programming with Mosh'
      },
      progress: 68,
      lastWatched: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      currentVideoTime: 3600,
      totalHoursSpent: 4.2
    }
  ];
  
  const displayCourses = courses && courses.length > 0 ? courses : sampleCourses;
  
  return (
    <div className={`rounded-lg overflow-hidden shadow-lg ${isDark ? 'bg-dark-bg-secondary' : 'bg-light-bg-secondary'} p-4`}>
      <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>
        Continue Watching
      </h3>
      
      <div className="space-y-4">
        {displayCourses.map((course) => (
          <div 
            key={course._id}
            className={`
              flex items-center p-3 rounded-lg cursor-pointer
              ${isDark ? 'bg-dark-bg-tertiary hover:bg-dark-bg-quaternary' : 'bg-light-bg-tertiary hover:bg-light-bg-quaternary'}
              border ${isDark ? 'border-dark-border' : 'border-light-border'}
              transition-colors
            `}
            onClick={() => onCourseSelect(course.courseId)}
          >
            {/* Course Thumbnail */}
            <div className="relative w-24 h-16 flex-shrink-0 rounded-md overflow-hidden mr-3">
              <img 
                src={course.courseId.course_image} 
                alt={course.courseId.course_title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <FaPlay className="text-white text-xl" />
              </div>
            </div>
            
            {/* Course Info */}
            <div className="flex-1 min-w-0">
              <h4 className={`font-medium truncate ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>
                {course.courseId.course_title}
              </h4>
              <p className={`text-xs ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
                {course.courseId.creator_name}
              </p>
              
              {/* Progress Bar */}
              <div className="mt-2">
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className={`${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
                    {course.progress}% complete
                  </span>
                  <span className="flex items-center text-primary">
                    <FaClock className="mr-1" />
                    {formatTime(course.totalHoursSpent)}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
                  <div 
                    className="bg-primary h-1.5 rounded-full" 
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
            
            {/* Last Watched */}
            <div className={`ml-3 text-xs whitespace-nowrap ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
              {getRelativeTime(course.lastWatched)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContinueWatching;
