'use client';

import { createContext, useContext, useState } from 'react';

const NavigationContext = createContext();

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};

export const NavigationProvider = ({ children }) => {
  const [isNavigating, setIsNavigating] = useState(false);
  const [navigationTarget, setNavigationTarget] = useState('');

  const startNavigation = (target) => {
    setIsNavigating(true);
    setNavigationTarget(target);
  };

  const stopNavigation = () => {
    setIsNavigating(false);
    setNavigationTarget('');
  };

  const navigateWithLoader = async (router, path, callback) => {
    startNavigation(path);
    
    try {
      await router.push(path);
      if (callback) {
        await callback();
      }
    } finally {
      // Add a small delay to ensure the navigation is complete
      setTimeout(() => {
        stopNavigation();
      }, 500);
    }
  };

  return (
    <NavigationContext.Provider value={{
      isNavigating,
      navigationTarget,
      startNavigation,
      stopNavigation,
      navigateWithLoader
    }}>
      {children}
    </NavigationContext.Provider>
  );
};
