import React, { createContext, useContext, useState, useEffect } from 'react';

// Available theme colors
const themeColors = {
  purple: {
    name: 'Purple',
    value: '#9381ff',
    light: '#a89bff',
    dark: '#7b6fe6',
  },
  blue: {
    name: 'Blue',
    value: '#4361ee',
    light: '#5a75f0',
    dark: '#3a53cc',
  },
  green: {
    name: 'Green',
    value: '#4caf50',
    light: '#6abe6e',
    dark: '#3d8c40',
  },
  red: {
    name: 'Red',
    value: '#e63946',
    light: '#eb5d68',
    dark: '#c42f3b',
  },
  orange: {
    name: 'Orange',
    value: '#ff9f1c',
    light: '#ffb14d',
    dark: '#e68a00',
  },
  teal: {
    name: 'Teal',
    value: '#2ec4b6',
    light: '#4fd0c3',
    dark: '#25a093',
  },
};

// Create the theme context
const ThemeContext = createContext();

// Custom hook to use the theme context
export const useTheme = () => useContext(ThemeContext);

// Theme provider component
export const ThemeProvider = ({ children }) => {
  // Get stored preferences or use defaults
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'light' ? 'light' : 'dark';
  };

  const getInitialColor = () => {
    const savedColor = localStorage.getItem('themeColor');
    return savedColor && themeColors[savedColor] ? savedColor : 'purple';
  };

  // State for theme mode and color
  const [theme, setTheme] = useState(getInitialTheme);
  const [themeColor, setThemeColor] = useState(getInitialColor);

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;
    
    // Apply dark/light mode
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    
    // Save to localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Apply theme color
  useEffect(() => {
    const root = document.documentElement;
    const color = themeColors[themeColor];
    
    if (color) {
      // Set CSS variables for the theme color
      root.style.setProperty('--color-primary', color.value);
      root.style.setProperty('--color-primary-light', color.light);
      root.style.setProperty('--color-primary-dark', color.dark);
      
      // Generate and set color shades
      root.style.setProperty('--color-primary-50', color.value + '10');
      root.style.setProperty('--color-primary-100', color.value + '20');
      root.style.setProperty('--color-primary-200', color.value + '30');
      root.style.setProperty('--color-primary-300', color.value + '40');
      root.style.setProperty('--color-primary-400', color.light);
      root.style.setProperty('--color-primary-500', color.value);
      root.style.setProperty('--color-primary-600', color.dark);
      root.style.setProperty('--color-primary-700', color.dark + 'dd');
      root.style.setProperty('--color-primary-800', color.dark + 'bb');
      root.style.setProperty('--color-primary-900', color.dark + '99');
      root.style.setProperty('--color-primary-950', color.dark + '77');
      
      // Save to localStorage
      localStorage.setItem('themeColor', themeColor);
    }
  }, [themeColor]);

  // Toggle theme function
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  // Change theme color function
  const changeThemeColor = (colorName) => {
    if (themeColors[colorName]) {
      setThemeColor(colorName);
    }
  };

  // Context value
  const value = {
    theme,
    themeColor,
    toggleTheme,
    changeThemeColor,
    availableColors: themeColors,
    isDark: theme === 'dark',
    isLight: theme === 'light',
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
