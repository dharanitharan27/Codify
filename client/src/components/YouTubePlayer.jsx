import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../store/auth';
import { useTheme } from '../context/ThemeContext';

const YouTubePlayer = ({ videoUrl, courseId, onProgressUpdate }) => {
  const { API, userdata } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [player, setPlayer] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [courseProgress, setCourseProgress] = useState(null);
  const [error, setError] = useState(null);
  const [playerLoaded, setPlayerLoaded] = useState(false);
  const [videoLoading, setVideoLoading] = useState(true); // Track video loading state
  const progressInterval = useRef(null);
  const playerContainerRef = useRef(null); // Reference to the player container
  const token = localStorage.getItem('token');

  // Extract video ID from YouTube URL
  const getYouTubeVideoId = (url) => {
    if (!url) return null;

    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = getYouTubeVideoId(videoUrl);

  // Load YouTube API
  useEffect(() => {
    console.log('YouTubePlayer: videoUrl changed:', videoUrl);
    console.log('YouTubePlayer: extracted videoId:', videoId);

    setError(null);
    setPlayerLoaded(false);
    setVideoLoading(true);

    // Save current progress before changing videos
    if (player && player.getCurrentTime && videoId) {
      console.log('YouTubePlayer: Saving progress for current video before changing');
      try {
        const currentTime = player.getCurrentTime();
        const duration = player.getDuration();
        if (currentTime > 0 && duration > 0) {
          updateProgress(currentTime, duration);
        }

        // Always destroy the existing player when video changes
        if (typeof player.destroy === 'function') {
          console.log('YouTubePlayer: Destroying existing player instance on videoUrl change');
          player.destroy();
          setPlayer(null);
        }
      } catch (err) {
        console.error('YouTubePlayer: Error while saving progress:', err);
      }
    }

    if (!videoId) {
      console.error('YouTubePlayer: Invalid YouTube URL, no videoId extracted');
      setError('Invalid YouTube URL');
      setVideoLoading(false);
      return;
    }

    // Check if YouTube API is already loaded
    if (window.YT && window.YT.Player) {
      console.log('YouTubePlayer: YouTube API is already loaded');

      // If player already exists, just load the new video
      if (player && typeof player.loadVideoById === 'function') {
        try {
          console.log('YouTubePlayer: Existing player found, loading new video:', videoId);
          setVideoLoading(true);

          // Destroy the existing player first to prevent issues
          if (typeof player.destroy === 'function') {
            console.log('YouTubePlayer: Destroying existing player instance');
            player.destroy();
          }

          // Create a new player instance
          console.log('YouTubePlayer: Creating new player instance for video:', videoId);
          initializePlayer();

          // Reset states
          setDuration(0);
          setCurrentTime(0);
          setProgress(0);

          // Reset progress tracking interval
          if (progressInterval.current) {
            console.log('YouTubePlayer: Clearing existing progress interval');
            clearInterval(progressInterval.current);
            progressInterval.current = null;
          }

          return;
        } catch (err) {
          console.error('YouTubePlayer: Error loading new video:', err);
          setVideoLoading(false);
          // If loading new video fails, reinitialize the player
          console.log('YouTubePlayer: Reinitializing player after error');
          initializePlayer();
          return;
        }
      }

      console.log('YouTubePlayer: No existing player or loadVideoById not available, initializing new player');
      initializePlayer();
      return;
    }

    console.log('YouTubePlayer: YouTube API not loaded yet, loading script');

    // Load the YouTube IFrame Player API code asynchronously
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    tag.onerror = () => {
      setError('Failed to load YouTube player');
      setVideoLoading(false);
    };
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // Create YouTube player when API is ready
    window.onYouTubeIframeAPIReady = initializePlayer;

    return () => {
      // Clean up
      console.log('YouTubePlayer: Cleaning up on videoId change or unmount');
      window.onYouTubeIframeAPIReady = null;

      if (progressInterval.current) {
        console.log('YouTubePlayer: Clearing progress interval');
        clearInterval(progressInterval.current);
        progressInterval.current = null;
      }

      // Clean up the player when videoId changes
      if (player && typeof player.destroy === 'function') {
        try {
          console.log('YouTubePlayer: Destroying player in cleanup function');
          player.destroy();
          setPlayer(null);
        } catch (err) {
          console.error('YouTubePlayer: Error destroying player in cleanup:', err);
        }
      }

      // Reset states
      setPlayerLoaded(false);
      setVideoLoading(true);
      setCurrentTime(0);
      setDuration(0);
      setProgress(0);
    };
  }, [videoId]);

  // Initialize the YouTube player
  const initializePlayer = () => {
    try {
      console.log('YouTubePlayer: Initializing player for videoId:', videoId);

      // Check if the element exists
      const playerElement = document.getElementById('youtube-player');
      if (!playerElement) {
        console.error('YouTubePlayer: YouTube player element not found in DOM');
        setError('Player element not found');
        setVideoLoading(false);
        return;
      }

      // Clear any existing content in the player element to ensure clean initialization
      playerElement.innerHTML = '';

      console.log('YouTubePlayer: Creating new YT.Player instance with videoId:', videoId);
      const newPlayer = new window.YT.Player('youtube-player', {
        height: '390',
        width: '100%',
        videoId: videoId,
        playerVars: {
          'playsinline': 1,
          'rel': 0,
          'modestbranding': 1,
          'autoplay': 1 // Autoplay when possible
        },
        events: {
          'onReady': (event) => {
            console.log('YouTubePlayer: onReady event fired');
            onPlayerReady(event);
          },
          'onStateChange': (event) => {
            console.log('YouTubePlayer: onStateChange event fired, state:', event.data);
            onPlayerStateChange(event);
          },
          'onError': (e) => {
            console.error('YouTubePlayer: YouTube player error:', e.data);
            setError(`Error loading video (code: ${e.data})`);
            setVideoLoading(false);
          }
        }
      });

      console.log('YouTubePlayer: Player instance created, setting in state');
      setPlayer(newPlayer);
    } catch (err) {
      console.error('YouTubePlayer: Error initializing YouTube player:', err);
      setError('Failed to initialize player');
      setVideoLoading(false);
    }
  };

  // Fetch existing course progress
  useEffect(() => {
    if (courseId && userdata?._id) {
      fetchCourseProgress();
    }
  }, [courseId, userdata]);

  const fetchCourseProgress = async () => {
    try {
      // Check if we have a valid token and user
      if (!token || !userdata?._id) {
        console.log('No token or user ID available for progress tracking');
        return;
      }

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

        // If there's saved progress, seek to that position when player is ready
        if (data.progress && player && player.seekTo) {
          player.seekTo(data.progress.currentVideoTime, true);
        }
      } else if (response.status === 404) {
        // This is expected for new courses - no progress yet
        console.log('No progress record found for this course - first time viewing');
        // We'll create a progress record when the user starts watching
      } else {
        console.error('Error fetching course progress:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error fetching course progress:', error);
    }
  };

  // Update course progress on the server
  const updateProgress = async (currentTime, totalTime) => {
    if (!courseId || !userdata?._id || !token) return;

    // Don't update if time values are invalid
    if (isNaN(currentTime) || isNaN(totalTime) || totalTime <= 0) {
      console.log('Invalid time values, skipping progress update');
      return;
    }

    try {
      const progressPercent = Math.round((currentTime / totalTime) * 100);

      const response = await fetch(`${API}/progress/${courseId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          progress: progressPercent,
          currentVideoTime: currentTime,
          totalHoursSpent: (courseProgress?.totalHoursSpent || 0) + (1/60), // Add 1 minute
          status: progressPercent >= 90 ? 'completed' : 'in-progress'
        })
      });

      if (response.ok) {
        const data = await response.json();
        setCourseProgress(data.progress);

        // Call the callback to update parent components
        if (onProgressUpdate) {
          onProgressUpdate(data.progress);
        }
      } else {
        console.error('Error updating course progress:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error updating course progress:', error);
    }
  };

  // Player event handlers
  const onPlayerReady = (event) => {
    console.log('YouTubePlayer: onPlayerReady handler executing');
    const duration = event.target.getDuration();
    console.log('YouTubePlayer: Video duration:', duration);
    setDuration(duration);
    setPlayerLoaded(true);

    // Check if this is a new video or if we have saved progress for this video
    // For now, we'll just start from the beginning for each new video
    // In a more advanced implementation, you could store progress per video ID

    // If we have saved progress for the course, seek to that position
    if (courseProgress?.currentVideoTime) {
      console.log('YouTubePlayer: Seeking to saved position:', courseProgress.currentVideoTime);
      event.target.seekTo(courseProgress.currentVideoTime, true);
    }

    // Start playing the video automatically
    console.log('YouTubePlayer: Calling playVideo()');
    event.target.playVideo();

    console.log('YouTubePlayer: Player ready with video:', videoId);
  };

  const onPlayerStateChange = (event) => {
    // YT.PlayerState values: -1 (unstarted), 0 (ended), 1 (playing), 2 (paused), 3 (buffering), 5 (video cued)

    // Handle buffering state
    if (event.data === 3) {
      setVideoLoading(true);
    } else {
      // For any other state, video is not in loading state
      setVideoLoading(false);
    }

    // YT.PlayerState.PLAYING = 1
    if (event.data === 1) {
      setIsPlaying(true);
      setPlayerLoaded(true);
      setVideoLoading(false);

      // Start tracking progress
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }

      progressInterval.current = setInterval(() => {
        if (player && player.getCurrentTime) {
          const currentTime = player.getCurrentTime();
          const duration = player.getDuration();
          setCurrentTime(currentTime);
          setDuration(duration);
          setProgress(Math.round((currentTime / duration) * 100));

          // Update progress on server every 30 seconds
          if (Math.floor(currentTime) % 30 === 0) {
            updateProgress(currentTime, duration);
          }
        }
      }, 1000);
    } else {
      // YT.PlayerState.PAUSED = 2, YT.PlayerState.ENDED = 0
      setIsPlaying(false);

      if (progressInterval.current) {
        clearInterval(progressInterval.current);
        progressInterval.current = null;
      }

      // Save progress when paused or ended
      if (player && player.getCurrentTime) {
        const currentTime = player.getCurrentTime();
        const duration = player.getDuration();
        updateProgress(currentTime, duration);
      }
    }
  };

  // Format time (seconds) to MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  if (error) {
    return (
      <div className={`rounded-lg overflow-hidden shadow-lg ${isDark ? 'bg-dark-bg-secondary' : 'bg-light-bg-secondary'} p-6`}>
        <div className="aspect-video flex items-center justify-center bg-gray-800 mb-4">
          <div className="text-center p-6">
            <p className="text-red-500 mb-2">{error}</p>
            <p className="text-gray-400 text-sm">
              There was a problem loading the video. Please try again later or check the URL.
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <a
            href={videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
          >
            Watch on YouTube
          </a>
        </div>
      </div>
    );
  }

  // Effect to clean up the player container on unmount
  useEffect(() => {
    return () => {
      console.log('YouTubePlayer: Component unmounting, cleaning up player');
      if (player && typeof player.destroy === 'function') {
        try {
          player.destroy();
        } catch (err) {
          console.error('Error destroying player on unmount:', err);
        }
      }
    };
  }, []);

  return (
    <div className={`rounded-lg overflow-hidden shadow-lg ${isDark ? 'bg-dark-bg-secondary' : 'bg-light-bg-secondary'}`}>
      <div className="aspect-video relative">
        {/* Use key to force re-creation of the DOM element when videoId changes */}
        <div key={videoId} id="youtube-player" className="w-full h-full"></div>

        {/* Loading overlay - show only when video is loading or player is not loaded */}
        {(videoLoading || !playerLoaded) && !error && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/70 z-10">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
              <p className="text-white text-sm">Loading video...</p>
            </div>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <span className={`text-sm ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
          <span className={`text-sm font-medium ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
            {progress}% completed
          </span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div
            className="bg-primary h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default YouTubePlayer;
