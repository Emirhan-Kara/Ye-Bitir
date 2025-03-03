import React, { createContext, useState, useContext, useEffect } from 'react';

// Define theme configurations
export const themes = {
  light: {
    name: 'light',
    colors: {
      primary: '#c0392b',
      primaryHover: ' #a82315',
      secondary: '#34495e',
      secondaryHover: '#2c3e50',
      background: '#f8f8f8',
      backgroundAlt: '#e2ece0',
      headerFooter: '#cfd8dc',
      cardBackground: '#ffffff',
      text: {
        primary: '#34495e',
        secondary: '#707070',
        light: '#ffffff',
        link: '#c0392b',
        linkHover: '#a82315',
      },
      button: {
        primary: '#c0392b',
        primaryHover: '#a82315',
        secondary: '#34495e',
        secondaryHover: '#2c3e50',
        text: '#ffffff',
      },
      input: {
        background: '#ffffff',
        border: '#e2e8f0',
        focus: '#c0392b',
      },
    }
  },
  dark: {
    name: 'dark',
    colors: {
      primary: ' #e74c3c',
      primaryHover: ' #c0392b',
      secondary: ' #2c3e50',
      secondaryHover: ' #1a252f',
      background: ' #411a1a',
      backgroundAlt: ' #1e1e1e',
      headerFooter: ' #1a1a1a',
      cardBackground: ' #2d2d2d',
      text: {
        primary: '#f5f5f5',
        secondary: '#b3b3b3',
        light: '#ffffff',
        link: '#e74c3c',
        linkHover: '#c0392b',
      },
      button: {
        primary: '#e74c3c',
        primaryHover: '#c0392b',
        secondary: '#2c3e50',
        secondaryHover: '#1a252f',
        text: '#ffffff',
      },
      input: {
        background: '#2d2d2d',
        border: '#3d3d3d',
        focus: '#e74c3c',
      },
    }
  }
};

// Create the theme context
const ThemeContext = createContext({
  theme: themes.light,
  toggleTheme: () => {}
});

// Theme provider component
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    try {
      // Try to get theme from localStorage
      const savedTheme = localStorage.getItem('theme');
      
      // If savedTheme exists and is valid, parse and return it
      if (savedTheme) {
        const parsedTheme = JSON.parse(savedTheme);
        // Validate the parsed theme
        return parsedTheme.name === 'light' || parsedTheme.name === 'dark' 
          ? parsedTheme 
          : themes.light;
      }
      
      // If no valid theme in localStorage, return default light theme
      return themes.light;
    } catch (error) {
      // If parsing fails, return default light theme
      console.error('Error parsing theme from localStorage:', error);
      return themes.light;
    }
  });

  // Save theme to localStorage when it changes
  useEffect(() => {
    try {
      localStorage.setItem('theme', JSON.stringify(theme));
    } catch (error) {
      console.error('Error saving theme to localStorage:', error);
    }
    
    // Update CSS variables
    const root = document.documentElement;
    
    // Update key CSS variables
    root.style.setProperty('--color-primary', theme.colors.primary);
    root.style.setProperty('--color-background', theme.colors.background);
    root.style.setProperty('--color-text-primary', theme.colors.text.primary);
    root.style.setProperty('--color-header-footer', theme.colors.headerFooter);
  }, [theme]);

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setTheme(prevTheme => 
      prevTheme.name === 'light' ? themes.dark : themes.light
    );
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};