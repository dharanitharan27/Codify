import React from 'react';
import { useTheme } from '../context/ThemeContext';

function Loader() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`fixed inset-0 flex flex-col items-center justify-center z-[9999] ${isDark ? 'bg-dark-bg-primary/80' : 'bg-light-bg-primary/80'} backdrop-blur-sm`}>
      <div className="w-32 h-32 mb-4">
        <img src="loading.svg" alt="Loading" className="w-full h-full" />
      </div>
      <div className="flex items-center justify-center font-righteous text-4xl">
        <span className="inline-block animate-bounce-slow animation-delay-100 text-primary">C</span>
        <span className="inline-block animate-bounce-slow animation-delay-200 text-primary">o</span>
        <span className="inline-block animate-bounce-slow animation-delay-300 text-primary">d</span>
        <span className="inline-block animate-bounce-slow animation-delay-400 text-primary">i</span>
        <span className="inline-block animate-bounce-slow animation-delay-500 text-primary">f</span>
        <span className="inline-block animate-bounce-slow animation-delay-600 text-primary">y</span>
      </div>
    </div>
  );
}

export default Loader;
