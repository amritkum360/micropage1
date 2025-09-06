'use client';

import { useNavigation } from '@/contexts/NavigationContext';
import { useEffect, useState } from 'react';
import { Loader2, ArrowRight } from 'lucide-react';

export default function NavigationLoader() {
  const { isNavigating, navigationTarget } = useNavigation();
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    if (isNavigating) {
      setShowLoader(true);
      setIsPageLoaded(false);
      
      // Wait for page to fully load
      const timer = setTimeout(() => {
        setIsPageLoaded(true);
        // Keep loader visible for a bit longer to ensure smooth transition
        setTimeout(() => {
          setShowLoader(false);
        }, 500);
      }, 1000); // Minimum 1 second loading time

      return () => clearTimeout(timer);
    }
  }, [isNavigating]);

  // Also listen for page load events
  useEffect(() => {
    const handlePageLoad = () => {
      if (isNavigating) {
        setIsPageLoaded(true);
        // Keep loader visible for smooth transition
        setTimeout(() => {
          setShowLoader(false);
        }, 500);
      }
    };

    // Listen for page load
    if (document.readyState === 'complete') {
      handlePageLoad();
    } else {
      window.addEventListener('load', handlePageLoad);
      return () => window.removeEventListener('load', handlePageLoad);
    }
  }, [isNavigating]);

  if (!showLoader) return null;

  const getTargetName = (target) => {
    switch (target) {
      case '/dashboard':
        return 'Dashboard';
      case '/auth':
        return 'Login Page';
      case '/builder':
        return 'Website Builder';
      case '/profile':
        return 'Profile';
      default:
        if (target.startsWith('/builder/')) {
          return 'Website Editor';
        }
        if (target.startsWith('/published/')) {
          return 'Published Website';
        }
        return 'Page';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
      <div className="bg-white rounded-lg p-6 shadow-xl max-w-sm mx-4">
        <div className="flex items-center space-x-3">
          <Loader2 className="h-6 w-6 text-indigo-600 animate-spin" />
          <div>
            <p className="text-gray-900 font-medium">Navigating to {getTargetName(navigationTarget)}</p>
            <p className="text-gray-500 text-sm">
              {isPageLoaded ? 'Almost there...' : 'Please wait...'}
            </p>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-center">
          <div className="w-full bg-gray-200 rounded-full h-1">
            <div 
              className={`h-1 rounded-full transition-all duration-500 ${
                isPageLoaded ? 'bg-green-600 w-full' : 'bg-indigo-600 w-60 animate-pulse'
              }`}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
