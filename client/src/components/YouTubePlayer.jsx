import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useAuth } from '../store/auth';
import { useTheme } from '../context/ThemeContext';

const YouTubePlayer = ({ videoUrl, courseId, videoId: externalVideoId }) => {
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
  const [maxWatchedTime, setMaxWatchedTime] = useState(0); // Track maximum time watched
  const [videoProgressMap, setVideoProgressMap] = useState({}); // Track progress for each video in a playlist
  const progressInterval = useRef(null);
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
    // Don't reset player state if we're just re-rendering the component
    // Only reset if the videoId actually changed
    if (!videoId) {
      setError('Invalid YouTube URL');
      setVideoLoading(false);
      return;
    }

    setError(null);
    setVideoLoading(true);

    // Save current progress before changing videos
    if (player && player.getCurrentTime && videoId) {
      try {
        const currentTime = player.getCurrentTime();
        const duration = player.getDuration();
        if (currentTime > 0 && duration > 0) {
          // Comment out progress updating
          // updateProgress(currentTime, duration);
        }

        // Don't destroy the player - just load the new video
        // This helps maintain the player state and prevents flickering
      } catch (err) {
        console.error('Error while saving progress:', err);
      }
    }

    // We already checked for videoId above, so we don't need to check again

    // Check if YouTube API is already loaded
    if (window.YT && window.YT.Player) {
      // If player already exists, just load the new video
      if (player && typeof player.loadVideoById === 'function') {
        try {
          setVideoLoading(true);

          // Just load the new video ID instead of destroying and recreating the player
          player.loadVideoById({
            videoId: videoId,
            startSeconds: 0 // We'll seek to the saved position in onPlayerReady
          });

          // We don't reset states here because we want to maintain the player state
          // The onPlayerReady event will handle seeking to the saved position

          return;
        } catch (err) {
          console.error('Error loading new video:', err);
          setVideoLoading(false);
          // If loading new video fails, reinitialize the player
          initializePlayer();
          return;
        }
      }

      initializePlayer();
      return;
    }

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
      window.onYouTubeIframeAPIReady = null;

      if (progressInterval.current) {
        clearInterval(progressInterval.current);
        progressInterval.current = null;
      }

      // We don't destroy the player here anymore to prevent flickering
      // The player will be reused or destroyed when the component unmounts

      // We also don't reset states here to maintain the player state
      // This helps with the "continue watching" functionality
    };
  }, [videoId]);

  // Initialize the YouTube player
  const initializePlayer = () => {
    try {
      // Check if the element exists
      const playerElement = document.getElementById('youtube-player');
      if (!playerElement) {
        setError('Player element not found');
        setVideoLoading(false);
        return;
      }

      // Clear any existing content in the player element to ensure clean initialization
      playerElement.innerHTML = '';

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
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange,
          'onError': (e) => {
            setError(`Error loading video (code: ${e.data})`);
            setVideoLoading(false);
          }
        }
      });

      setPlayer(newPlayer);
    } catch (err) {
      console.error('Error initializing YouTube player:', err);
      setError('Failed to initialize player');
      setVideoLoading(false);
    }
  };

  // IMPORTANT: Define fetchCourseProgress first before using it in useEffect
  // This prevents the "Cannot access 'fetchCourseProgress' before initialization" error
  const fetchCourseProgress = useCallback(async () => {
    try {
      // Check if we have a valid token and user
      if (!token || !userdata?._id) {
        return;
      }

      // Get the current video ID from the URL or props
      const currentVideoId = externalVideoId || videoId;

      if (!currentVideoId) {
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

        // Store the progress data
        setCourseProgress(data.progress);

        // Initialize video progress map from the data
        if (data.progress && data.progress.videoProgress) {
          // Convert from MongoDB format if needed
          let progressMap = data.progress.videoProgress;

          // Check if it's coming as a MongoDB Map format and convert if needed
          if (typeof progressMap !== 'object' || progressMap === null) {
            progressMap = {};
          }

          setVideoProgressMap(progressMap);
        }

        // Check if we have progress for this specific video
        const videoSpecificProgress = currentVideoId && data.progress?.videoProgress ?
          data.progress.videoProgress[currentVideoId] : null;

        if (videoSpecificProgress && videoSpecificProgress.currentTime > 0) {
          const savedTime = videoSpecificProgress.currentTime;

          // Initialize maxWatchedTime with the saved progress for this video
          setMaxWatchedTime(savedTime);

          // If player is already initialized, seek to the saved position
          if (player && player.seekTo) {
            player.seekTo(savedTime, true);
            setCurrentTime(savedTime);
          }
        } else if (data.progress && data.progress.currentVideoTime && data.progress.currentVideoTime > 0) {
          // Fallback to course-level progress if no video-specific progress is found
          const savedTime = data.progress.currentVideoTime;

          // Initialize maxWatchedTime with the saved progress
          setMaxWatchedTime(savedTime);

          // If player is already initialized, seek to the saved position
          if (player && player.seekTo) {
            player.seekTo(savedTime, true);
            setCurrentTime(savedTime);
          }
        }
      } else if (response.status !== 404) {
        console.error('Error fetching course progress:', response.status);
      }
    } catch (error) {
      console.error('Error fetching course progress:', error);
    }
  }, [API, courseId, player, token, userdata, videoId, externalVideoId]);

  // Fetch existing course progress
  useEffect(() => {
    if (courseId && userdata?._id && token) {
      fetchCourseProgress();
    }
  }, [courseId, userdata, token, API, fetchCourseProgress]);

  // Handle case where courseProgress changes after player is initialized
  useEffect(() => {
    // Get the current video ID from the URL or props
    const currentVideoId = externalVideoId || videoId;

    if (!currentVideoId || !player || !playerLoaded) {
      return;
    }

    // Make sure videoProgress is an object
    const videoProgress = courseProgress?.videoProgress || {};

    // Check if we have video-specific progress
    const videoSpecificProgress = currentVideoId && videoProgress ?
      videoProgress[currentVideoId] : null;

    let savedTime = 0;

    if (videoSpecificProgress && videoSpecificProgress.currentTime > 0) {
      // Use video-specific progress
      savedTime = videoSpecificProgress.currentTime;
    } else if (courseProgress?.currentVideoTime && courseProgress.currentVideoTime > 0) {
      // Fallback to course-level progress
      savedTime = courseProgress.currentVideoTime;
    } else {
      // No progress found
      return;
    }

    // Get current player time
    const currentPlayerTime = player.getCurrentTime();

    // If current time is significantly different from saved time (more than 3 seconds),
    // and current time is near the beginning (less than 3 seconds), then seek
    if (Math.abs(currentPlayerTime - savedTime) > 3 && currentPlayerTime < 3) {
      // Delay seeking to ensure player is ready
      setTimeout(() => {
        try {
          player.seekTo(savedTime, true);
          setCurrentTime(savedTime);
        } catch (err) {
          console.error('Error seeking to saved position:', err);
        }
      }, 500);
    }
  }, [courseProgress, player, playerLoaded, videoId, externalVideoId]);

  // Progress updating is commented out
  /*
  const updateProgress = async (currentTime, totalTime) => {
    // Implementation removed to disable progress tracking
  };
  */

  // Player event handlers
  const onPlayerReady = (event) => {
    const duration = event.target.getDuration();
    setDuration(duration);
    setPlayerLoaded(true);

    // Get the current video ID from the URL or props
    const currentVideoId = externalVideoId || videoId;

    // IMPORTANT: We need to delay seeking to ensure the player is fully ready
    // This is crucial for the seek operation to work properly
    setTimeout(() => {
      // Make sure currentVideoId is valid and videoProgress is an object
      const videoProgress = courseProgress?.videoProgress || {};

      const videoSpecificProgress = currentVideoId && videoProgress ?
        videoProgress[currentVideoId] : null;

      if (videoSpecificProgress && videoSpecificProgress.currentTime > 0) {
        // Use video-specific progress
        const savedTime = videoSpecificProgress.currentTime;

        // Make sure maxWatchedTime is set to the saved progress
        setMaxWatchedTime(prevMax => Math.max(prevMax, savedTime));

        try {
          // Seek to the saved position with a force parameter to ensure it works
          event.target.seekTo(savedTime, true);

          // Update current time display
          setCurrentTime(savedTime);
        } catch (err) {
          console.error('Error seeking to saved position:', err);
        }
      } else if (courseProgress?.currentVideoTime && courseProgress.currentVideoTime > 0) {
        // Fallback to course-level progress if no video-specific progress is found
        const savedTime = courseProgress.currentVideoTime;

        // Make sure maxWatchedTime is set to the saved progress
        setMaxWatchedTime(prevMax => Math.max(prevMax, savedTime));

        try {
          // Seek to the saved position with a force parameter to ensure it works
          event.target.seekTo(savedTime, true);

          // Update current time display
          setCurrentTime(savedTime);
        } catch (err) {
          console.error('Error seeking to saved position:', err);
        }
      }

      // Start playing the video automatically
      event.target.playVideo();
    }, 500); // 500ms delay to ensure player is fully initialized
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

          // Update the current time display
          setCurrentTime(currentTime);
          setDuration(duration);

          // Update maxWatchedTime - keep the maximum value
          setMaxWatchedTime(prevMax => {
            const newMax = Math.max(prevMax, currentTime);
            return newMax;
          });

          // Calculate progress based on current time
          const progressPercent = Math.round((currentTime / duration) * 100);
          setProgress(progressPercent);

          // Progress updating is commented out
          /*
          // Check if we should update progress on the server
          // Update every 10 seconds as requested
          const shouldUpdateProgress =
            Math.floor(currentTime) % 10 === 0 || // Every 10 seconds
            (progressPercent % 5 === 0 && progressPercent > 0); // Or at every 5% milestone

          if (shouldUpdateProgress) {
            // Get the max time for progress update
            const maxTime = Math.max(currentTime, maxWatchedTime);
            updateProgress(maxTime, duration);
          }
          */
        }
      }, 1000);
    } else if (event.data === 0) {
      // YT.PlayerState.ENDED = 0
      setIsPlaying(false);

      if (progressInterval.current) {
        clearInterval(progressInterval.current);
        progressInterval.current = null;
      }

      // Progress updating is commented out
      /*
      // Save progress when video ends - mark as completed
      if (player && player.getCurrentTime) {
        const currentTime = player.getDuration(); // Use full duration when video ends

        // Update maxWatchedTime to full duration
        setMaxWatchedTime(currentTime);

        // Force progress to 100% when video ends
        const progressData = {
          progress: 100,
          currentTime: currentTime, // Use full duration for completed videos
          totalHoursSpent: (courseProgress?.totalHoursSpent || 0) + (1/60),
          status: 'completed'
        };

        // Call the callback directly with completed status
        if (onProgressUpdate) {
          onProgressUpdate(progressData);
        }
      }
      */
    } else if (event.data === 2) {
      // YT.PlayerState.PAUSED = 2
      setIsPlaying(false);

      if (progressInterval.current) {
        clearInterval(progressInterval.current);
        progressInterval.current = null;
      }

      // Progress updating is commented out
      /*
      // Save progress when paused
      if (player && player.getCurrentTime) {
        const currentTime = player.getCurrentTime();
        const duration = player.getDuration();

        // Update maxWatchedTime if current time is greater
        if (currentTime > maxWatchedTime) {
          setMaxWatchedTime(currentTime);
        }

        // Use the max time for progress update
        const timeToSave = Math.max(currentTime, maxWatchedTime);
        updateProgress(timeToSave, duration);
      }
      */
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
      // Clear any intervals
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
        progressInterval.current = null;
      }

      // Destroy the player when the component unmounts
      if (player && typeof player.destroy === 'function') {
        try {
          player.destroy();
        } catch (err) {
          console.error('Error destroying player on unmount:', err);
        }
      }
    };
  }, [player]); // Add player as a dependency to ensure we have the latest reference

  return (
    <div className={`rounded-lg overflow-hidden shadow-lg ${isDark ? 'bg-dark-bg-secondary' : 'bg-light-bg-secondary'}`}>
      <div className="aspect-video relative">
        {/* IMPORTANT: We removed the key={videoId} to prevent the player from being recreated on every render */}
        <div id="youtube-player" className="w-full h-full"></div>

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
          <div>
            <span className={`text-sm ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
            <span className={`text-xs ml-2 text-gray-500`}>
              (Max: {formatTime(maxWatchedTime)})
            </span>
          </div>
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
