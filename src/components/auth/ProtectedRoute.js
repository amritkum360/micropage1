'use client';

import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigation } from '@/contexts/NavigationContext';
import { useRouter } from 'next/navigation';
import OnboardingModal from '@/components/onboarding/OnboardingModal';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading, user, completeOnboarding, getProfile, getWebsites, fixOnboardingStatus } = useAuth();
  const { navigateWithLoader } = useNavigation();
  const router = useRouter();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [checkingWebsites, setCheckingWebsites] = useState(false);
  const [hasCheckedWebsites, setHasCheckedWebsites] = useState(false);

  // Check if we're on a subdomain or published page (these don't need authentication)
  const isSubdomainPage = typeof window !== 'undefined' && (
    window.location.pathname.startsWith('/subdomain/') ||
    window.location.pathname.startsWith('/published/')
  );

  const checkExistingWebsites = useCallback(async () => {
    if (checkingWebsites || hasCheckedWebsites) return;
    
    setCheckingWebsites(true);
    setHasCheckedWebsites(true);
    try {
      console.log('🔍 Checking if user already has websites...');
      const websites = await getWebsites();
      console.log('📊 Found websites:', websites?.length || 0);
      
      if (websites && websites.length > 0) {
        console.log('✅ User already has websites, fixing onboarding status');
        // User has websites but onboardingCompleted is false, fix it
        try {
          await fixOnboardingStatus();
          console.log('✅ Onboarding status fixed successfully');
        } catch (error) {
          console.error('❌ Failed to fix onboarding status:', error);
        }
        setShowOnboarding(false);
      } else {
        console.log('🎯 No existing websites found, showing onboarding modal');
        setShowOnboarding(true);
      }
    } catch (error) {
      console.error('❌ Error checking websites:', error);
      // If there's an error, show onboarding to be safe
      setShowOnboarding(true);
    } finally {
      setCheckingWebsites(false);
    }
  }, [getWebsites, fixOnboardingStatus, checkingWebsites, hasCheckedWebsites]);

  // Reset check flag when user changes
  useEffect(() => {
    if (user?.id) {
      setHasCheckedWebsites(false);
      setShowOnboarding(false);
    }
  }, [user?.id]);

  useEffect(() => {
    console.log('🔍 ProtectedRoute - Auth state:', { 
      loading, 
      isAuthenticated, 
      isSubdomainPage,
      user: user ? { 
        id: user.id, 
        onboardingCompleted: user.onboardingCompleted,
        onboardingData: user.onboardingData 
      } : null 
    });

    // Skip authentication for subdomain and published pages
    if (isSubdomainPage) {
      console.log('🌐 ProtectedRoute - Subdomain page, skipping authentication');
      return;
    }

    if (!loading && !isAuthenticated) {
      console.log('🚪 Redirecting to auth - user not authenticated');
      navigateWithLoader(router, '/auth');
    } else if (!loading && isAuthenticated && user && !user.onboardingCompleted && !hasCheckedWebsites) {
      // Check if user already has websites before showing onboarding
      // Only check if we haven't checked yet
      checkExistingWebsites();
    } else if (!loading && isAuthenticated && user && user.onboardingCompleted) {
      console.log('✅ User onboarding completed - allowing dashboard access');
      setShowOnboarding(false); // Make sure onboarding is closed
    } else if (loading) {
      console.log('⏳ ProtectedRoute - Still loading authentication...');
    }
  }, [isAuthenticated, loading, user, router, navigateWithLoader, checkExistingWebsites, hasCheckedWebsites, isSubdomainPage]);

  const handleOnboardingComplete = async (updatedUser) => {
    console.log('🎯 Onboarding completed, updated user:', updatedUser);
    
    // Close onboarding modal first
    setShowOnboarding(false);
    
    // Update the user state immediately to prevent re-triggering onboarding
    if (updatedUser) {
      console.log('🔄 Updating user state with completed onboarding...');
      // The user state will be updated by the AuthContext after completeOnboarding
    }
    
    // Refresh user data to get the latest onboarding status and website data
    try {
      console.log('🔄 Refreshing user profile after onboarding...');
      await getProfile();
      console.log('✅ User profile refreshed successfully');
    } catch (error) {
      console.error('❌ Failed to refresh user profile:', error);
    }
    
    // Small delay to ensure data is properly loaded
    setTimeout(() => {
      console.log('🚀 Navigating to dashboard...');
      // Navigate to dashboard after onboarding
      // The initial website is already created in the backend
      navigateWithLoader(router, '/dashboard');
    }, 1000);
  };

  // Skip authentication for subdomain and published pages
  if (isSubdomainPage) {
    console.log('🌐 ProtectedRoute - Rendering subdomain page without authentication');
    return <>{children}</>;
  }

  if (loading || checkingWebsites) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">
            {checkingWebsites ? 'Checking your websites...' : 'Loading...'}
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      {showOnboarding && (
        <OnboardingModal
          isOpen={showOnboarding}
          onComplete={handleOnboardingComplete}
          user={user}
        />
      )}
      {children}
    </>
  );
}
