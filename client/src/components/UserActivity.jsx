import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { 
  FaPlay, 
  FaCheckCircle, 
  FaBookmark, 
  FaTrash, 
  FaGraduationCap 
} from 'react-icons/fa';

const UserActivity = ({ activities }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  // Format timestamp to relative time (e.g., "2 days ago")
  const getRelativeTime = (timestamp) => {
    const now = new Date();
    const activityDate = new Date(timestamp);
    const diffInSeconds = Math.floor((now - activityDate) / 1000);
    
    if (diffInSeconds < 60) {
      return 'just now';
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
    if (diffInWeeks < 4) {
      return `${diffInWeeks} week${diffInWeeks > 1 ? 's' : ''} ago`;
    }
    
    const diffInMonths = Math.floor(diffInDays / 30);
    return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
  };
  
  // Get icon and text for activity type
  const getActivityDetails = (activity) => {
    switch (activity.activityType) {
      case 'started_course':
        return {
          icon: <FaPlay className="text-blue-500" />,
          title: 'Started course',
          description: activity.courseId?.course_title || 'Unknown course'
        };
      case 'completed_module':
        return {
          icon: <FaCheckCircle className="text-green-500" />,
          title: 'Completed module',
          description: activity.courseId?.course_title || 'Unknown course',
          module: activity.moduleName
        };
      case 'completed_course':
        return {
          icon: <FaGraduationCap className="text-purple-500" />,
          title: 'Completed course',
          description: activity.courseId?.course_title || 'Unknown course'
        };
      case 'added_to_watchlist':
        return {
          icon: <FaBookmark className="text-yellow-500" />,
          title: 'Added to watchlist',
          description: activity.courseId?.course_title || 'Unknown course'
        };
      case 'removed_from_watchlist':
        return {
          icon: <FaTrash className="text-red-500" />,
          title: 'Removed from watchlist',
          description: activity.courseId?.course_title || 'Unknown course'
        };
      default:
        return {
          icon: <FaPlay className="text-gray-500" />,
          title: 'Activity',
          description: activity.courseId?.course_title || 'Unknown course'
        };
    }
  };
  
  // Sample activities if none provided
  const defaultActivities = [
    { 
      id: 1, 
      activityType: 'started_course', 
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      courseId: { course_title: 'React Fundamentals' }
    },
    { 
      id: 2, 
      activityType: 'completed_module', 
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      courseId: { course_title: 'JavaScript Basics' },
      moduleName: 'Functions & Objects'
    },
    { 
      id: 3, 
      activityType: 'added_to_watchlist', 
      timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
      courseId: { course_title: 'Node.js for Beginners' }
    }
  ];
  
  const displayActivities = activities || defaultActivities;
  
  return (
    <div className={`rounded-lg overflow-hidden shadow-lg ${isDark ? 'bg-dark-bg-secondary' : 'bg-light-bg-secondary'} p-4`}>
      <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>
        Recent Activity
      </h3>
      
      <div className="space-y-4">
        {displayActivities.map((activity) => {
          const { icon, title, description, module } = getActivityDetails(activity);
          const relativeTime = getRelativeTime(activity.timestamp);
          
          return (
            <div
              key={activity.id}
              className={`p-3 rounded-lg ${isDark ? 'bg-dark-bg-tertiary' : 'bg-light-bg-tertiary'} border ${isDark ? 'border-dark-border' : 'border-light-border'}`}
            >
              <div className="flex items-start">
                <div className="mr-3 mt-1">{icon}</div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-medium text-primary">{title}</span>
                    <span className={`text-xs ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
                      {relativeTime}
                    </span>
                  </div>
                  <p className={`${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>
                    {description}
                  </p>
                  {module && (
                    <p className={`text-sm ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
                      Module: {module}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserActivity;
