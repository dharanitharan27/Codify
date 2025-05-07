import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';
import { useTheme } from '../context/ThemeContext';
import YouTubePlayer from '../components/YouTubePlayer';
import YouTubePlaylist from '../components/YouTubePlaylist';
import CourseModules from '../components/CourseModules';
import { getYouTubeUrlType, extractPlaylistId, extractVideoId } from '../utils/youtubeUtils';
import { FaArrowLeft, FaBookmark, FaPlay, FaShare, FaEye, FaThumbsUp } from 'react-icons/fa';

const CoursePlayer = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { userdata, API } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const token = localStorage.getItem('token');

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [courseProgress, setCourseProgress] = useState(null);
  const [inWatchlist, setInWatchlist] = useState(false);
  const apiKey=import.meta.env.VITE_YOUTUBE_API;
  // YouTube link analysis
  const [youtubeData, setYoutubeData] = useState({
    type: 'unknown',
    id: null,
    playlistId: null,
    videoId: null
  });

  // Fetch course data
  // 1. First useEffect: Fetch the course data only
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch all courses and filter for the specific one
        const response = await fetch(`${API}/api/v1/courses`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }

        const coursesData = await response.json();
        const courseData = coursesData.data.find(course => course._id === courseId);

        if (!courseData) {
          throw new Error('Course not found');
        }

        setCourse(courseData);
      } catch (err) {
        console.error('Error fetching course:', err);
        setError(err.message || 'Failed to load course');
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchCourse();
    }
  }, []); // Only depend on courseId and API
  // }, [courseId, API]); // Only depend on courseId and API

  // 2. Second useEffect: Check if course is in watchlist (depends on course and userdata)
  useEffect(() => {
    const checkWatchlist = async () => {
      if (!course || !userdata?._id || !token) return;

      try {
        const watchlistResponse = await fetch(`${API}/user/watchlist`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (watchlistResponse.ok) {
          const watchlistData = await watchlistResponse.json();
          const isInWatchlist = watchlistData.watchlist.some(item => item._id === courseId);
          setInWatchlist(isInWatchlist);
        }
      } catch (error) {
        console.error('Error checking watchlist:', error);
      }
    };

    checkWatchlist();
  }, []);
  // }, [course, userdata, token, API, courseId]);

  // 3. Third useEffect: Analyze YouTube link (depends on course)
  useEffect(() => {
    const analyzeYouTubeLink = () => {
      if (!course || !course.creator_youtube_link) {
        console.log('No YouTube link provided for this course');
        return;
      }

      try {
        console.log('Analyzing YouTube link:', course.creator_youtube_link);

        // Ensure the URL is properly formatted
        let url = course.creator_youtube_link;
        if (!url.startsWith('http')) {
          url = 'https://' + url;
        }

        const linkType = getYouTubeUrlType(url);
        console.log('Link type detected:', linkType);

        let playlistId = null;
        let videoId = null;

        if (linkType.type === 'playlist') {
          playlistId = linkType.id;
        } else if (linkType.type === 'video') {
          videoId = linkType.id;

          // Check if the video URL also contains a playlist ID
          playlistId = extractPlaylistId(url);
        } else if (linkType.type === 'channel') {
          // For channels, we don't have a specific video to show
          console.log('Channel URL detected, no specific video to show');
        } else {
          // Try to extract a video ID directly as a fallback
          videoId = extractVideoId(url);
          if (videoId) {
            console.log('Extracted video ID as fallback:', videoId);
          }
        }

        setYoutubeData({
          type: linkType.type,
          id: linkType.id,
          playlistId,
          videoId
        });
      } catch (error) {
        console.error('Error analyzing YouTube URL:', error);
      }
    };

    analyzeYouTubeLink();
  }, [course]);

  // 4. Fourth useEffect: Fetch course progress (depends on course and userdata)
  useEffect(() => {
    const fetchProgress = async () => {
      if (!course || !userdata?._id || !token || !courseId) return;

      try {
        const response = await fetch(`${API}/progress/${courseId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setCourseProgress(data.progress);
        } else if (response.status === 404) {
          // If progress not found, it's okay - the user hasn't started this course yet
          console.log('No progress found for this course yet');
          // We'll create progress when the user starts watching
        } else {
          console.error('Error fetching course progress:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching course progress:', error);
      }
    };

    fetchProgress();
  }, []);
  // }, [course, userdata, token, API, courseId]);

  // Handle video selection from playlist
  const handleVideoSelect = (video) => {
    console.log('CoursePlayer: Video selected from playlist:', video);
    console.log('CoursePlayer: Current selectedVideo:', selectedVideo);

    // Save current progress before switching videos
    if (courseProgress) {
      console.log('CoursePlayer: Current course progress:', courseProgress);
      // In a more advanced implementation, you could store progress per video
      // For now, we'll just update the overall course progress
    }

    // Scroll to the video player to show the user the video is changing
    const videoPlayerElement = document.getElementById('video-player-section');
    if (videoPlayerElement) {
      console.log('CoursePlayer: Scrolling to video player section');
      videoPlayerElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Ensure the video has a proper videoUrl with a valid YouTube video ID
    const videoWithUrl = {
      ...video,
      videoUrl: video.videoUrl || `https://www.youtube.com/watch?v=${video.id}`
    };

    console.log('CoursePlayer: Setting selected video with URL:', videoWithUrl.videoUrl);
    console.log('CoursePlayer: Video ID:', video.id);

    // Force a re-render by setting to null first, then to the new video
    setSelectedVideo(null);

    // Use setTimeout to ensure the state update and re-render happens
    setTimeout(() => {
      console.log('CoursePlayer: Now setting the new video after brief delay');
      setSelectedVideo(videoWithUrl);
    }, 50);

    // Track this video selection in user activity
    if (userdata?._id && token) {
      try {
        fetch(`${API}/activity/add`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            courseId,
            activityType: 'video_change',
            details: {
              videoId: video.id,
              videoTitle: video.title
            }
          })
        });
      } catch (error) {
        console.error('Error tracking video selection:', error);
      }
    }
  };

  // Handle progress update
  const handleProgressUpdate = (updatedProgress) => {
    setCourseProgress(updatedProgress);
  };

  // Toggle watchlist
  const toggleWatchlist = async () => {
    if (!userdata?._id) {
      navigate('/login');
      return;
    }

    try {
      const response = await fetch(`${API}/user/addToWatchlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ courseId })
      });

      if (response.ok) {
        setInWatchlist(!inWatchlist);
      }
    } catch (error) {
      console.error('Error updating watchlist:', error);
    }
  };

  // Share course
  const shareCourse = () => {
    if (navigator.share) {
      navigator.share({
        title: course?.course_title,
        text: `Check out this course: ${course?.course_title}`,
        url: window.location.href
      });
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen-minus-nav">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>
            Error Loading Course
          </h2>
          <p className="text-red-500">{error || 'Course not found'}</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen-minus-nav ${isDark ? 'bg-dark-bg-primary text-dark-text-primary' : 'bg-light-bg-primary text-light-text-primary'}`}>
      <div className="container mx-auto px-4 py-8">
        {/* Course Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <button
              onClick={() => navigate(-1)}
              className={`mr-4 p-2 rounded-full ${isDark ? 'hover:bg-dark-bg-tertiary' : 'hover:bg-light-bg-tertiary'} transition-colors`}
            >
              <FaArrowLeft />
            </button>
            <h1 className="text-3xl font-bold">{course.course_title}</h1>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img
                src={course.creator_image}
                alt={course.creator_name}
                className="w-10 h-10 rounded-full mr-3"
              />
              <span className={`${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
                {course.creator_name}
              </span>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={toggleWatchlist}
                className={`
                  p-2 rounded-full transition-colors
                  ${inWatchlist
                    ? 'bg-primary/20 text-primary'
                    : isDark ? 'hover:bg-dark-bg-tertiary' : 'hover:bg-light-bg-tertiary'
                  }
                `}
                title={inWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}
              >
                <FaBookmark />
              </button>

              <button
                onClick={shareCourse}
                className={`
                  p-2 rounded-full transition-colors
                  ${isDark ? 'hover:bg-dark-bg-tertiary' : 'hover:bg-light-bg-tertiary'}
                `}
                title="Share course"
              >
                <FaShare />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Video Player and Description */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Player Section */}
            <div id="video-player-section" className={`rounded-lg overflow-hidden ${isDark ? 'bg-dark-bg-secondary' : 'bg-light-bg-secondary'}`}>
              {/* Video Title */}
              {selectedVideo && (
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 className={`text-xl font-bold ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>
                    {selectedVideo.title}
                  </h3>
                  <div className="flex items-center mt-1 text-sm">
                    <span className={`${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
                      {selectedVideo.channelTitle}
                    </span>
                    <span className="mx-2">•</span>
                    <span className={`${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
                      {new Date(selectedVideo.publishedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              )}

              {/* Video Player */}
              {selectedVideo ? (
                <>
                  {console.log('CoursePlayer: Rendering YouTubePlayer with selected video URL:', selectedVideo.videoUrl)}
                  <YouTubePlayer
                    key={selectedVideo.id} // Add key to force re-render when video changes
                    videoUrl={selectedVideo.videoUrl}
                    courseId={courseId}
                    onProgressUpdate={handleProgressUpdate}
                  />
                </>
              ) : youtubeData.videoId ? (
                <div>
                  {console.log('CoursePlayer: Rendering YouTubePlayer with course videoId:', youtubeData.videoId)}
                  <YouTubePlayer
                    key={youtubeData.videoId} // Add key to force re-render when video changes
                    videoUrl={`https://www.youtube.com/watch?v=${youtubeData.videoId}`}
                    courseId={courseId}
                    onProgressUpdate={handleProgressUpdate}
                  />
                </div>
              ) : (
                <div className={`aspect-video flex flex-col items-center justify-center p-6`}>
                  <p className="text-lg mb-4">No video available for direct playback</p>
                  {course.creator_youtube_link && (
                    <a
                      href={course.creator_youtube_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 px-4 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors flex items-center"
                    >
                      <FaPlay className="mr-2" /> Watch on YouTube
                    </a>
                  )}
                </div>
              )}

              {/* Video Actions */}
              {selectedVideo && (
                <div className="p-4 flex justify-between items-center border-t border-gray-200 dark:border-gray-700">
                  <div className="flex space-x-2">
                    <a
                      href={selectedVideo.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline flex items-center"
                    >
                      <FaPlay className="mr-1 text-xs" /> Watch on YouTube
                    </a>
                  </div>

                  <div className="flex items-center text-sm">
                    <span className="flex items-center mr-3">
                      <FaEye className="mr-1" /> {parseInt(selectedVideo.viewCount).toLocaleString()} views
                    </span>
                    {selectedVideo.likeCount && (
                      <span className="flex items-center">
                        <FaThumbsUp className="mr-1" /> {parseInt(selectedVideo.likeCount).toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Course Description */}
            <div className={`p-6 rounded-lg ${isDark ? 'bg-dark-bg-secondary' : 'bg-light-bg-secondary'}`}>
              <h3 className="text-xl font-bold mb-4">About this course</h3>
              <p className={`whitespace-pre-line ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
                {course.description}
              </p>
            </div>

            {/* Course Modules */}
            {/* <CourseModules
              courseId={courseId}
              progress={courseProgress}
              onModuleComplete={handleProgressUpdate}
            /> */}
          </div>

          {/* Right Column - Playlist */}
          <div className="h-full sticky top-24">
            {youtubeData.playlistId && (
              <YouTubePlaylist
                playlistId={youtubeData.playlistId}
                apiKey={apiKey}
                onVideoSelect={handleVideoSelect}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePlayer;
