'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigation } from '@/contexts/NavigationContext';
import { useRouter } from 'next/navigation';
import OnboardingModal from '@/components/onboarding/OnboardingModal';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading, user, completeOnboarding, getProfile } = useAuth();
  const { navigateWithLoader } = useNavigation();
  const router = useRouter();
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    console.log('🔍 ProtectedRoute - Auth state:', { 
      loading, 
      isAuthenticated, 
      user: user ? { 
        id: user.id, 
        onboardingCompleted: user.onboardingCompleted,
        onboardingData: user.onboardingData 
      } : null 
    });

    if (!loading && !isAuthenticated) {
      console.log('🚪 Redirecting to auth - user not authenticated');
      navigateWithLoader(router, '/auth');
    } else if (!loading && isAuthenticated && user && !user.onboardingCompleted) {
      console.log('🎯 Showing onboarding modal - user needs to complete onboarding');
      setShowOnboarding(true);
    } else if (!loading && isAuthenticated && user && user.onboardingCompleted) {
      console.log('✅ User onboarding completed - allowing dashboard access');
    }
  }, [isAuthenticated, loading, user, router, navigateWithLoader]);

  const handleOnboardingComplete = async (updatedUser) => {
    console.log('🎯 Onboarding completed, updated user:', updatedUser);
    
    // Close onboarding modal first
    setShowOnboarding(false);
    
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
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
