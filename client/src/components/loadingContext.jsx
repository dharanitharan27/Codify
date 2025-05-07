import React, { createContext, useContext, useState, useEffect } from 'react';
import Loader from './Loader';

const LoadingContext = createContext();

export function LoadingProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);

  // Prevent scrolling when loader is active
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isLoading]);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {isLoading && <Loader />}
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  return useContext(LoadingContext);
}