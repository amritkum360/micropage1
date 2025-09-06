'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigation } from '@/contexts/NavigationContext';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import SubscriptionModal from './subscriptions/SubscriptionModal';
import RenewModal from './subscriptions/RenewModal';
import ExpiryWarning from './subscriptions/ExpiryWarning';
import SubscriptionStatus from './subscriptions/SubscriptionStatus';
import useSubscription from './subscriptions/useSubscription';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  LogOut, 
  User, 
  Globe,
  Calendar,
  Clock,
  X,
  CreditCard
} from 'lucide-react';
import useNotification from '@/hooks/useNotification';
import NotificationContainer from '@/components/ui/NotificationContainer';
import CelebrationAnimation from '@/components/ui/CelebrationAnimation';

function DashboardContent() {
  const { user, logout, getWebsites, deleteWebsite, publishWebsite, unpublishWebsite, updateWebsite, getDomains, saveDomain, updateDomain, checkDomainDNS, getWebsite } = useAuth();
  const { navigateWithLoader } = useNavigation();
  const [websites, setWebsites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [publishingId, setPublishingId] = useState(null);
  const [unpublishingId, setUnpublishingId] = useState(null);
  const [showDomainModal, setShowDomainModal] = useState(false);
  const [selectedWebsite, setSelectedWebsite] = useState(null);
  const [customDomain, setCustomDomain] = useState('');
  const [addingDomain, setAddingDomain] = useState(false);
  const [dnsStatus, setDnsStatus] = useState({});
  const [checkingDNS, setCheckingDNS] = useState({});
  const [showCelebration, setShowCelebration] = useState(false);
  const { showSuccess, showError, showWarning, showInfo, notifications, removeNotification } = useNotification();
  
  // Use custom subscription hook
  const {
    subscription,
    subscriptionPlans,
    showSubscriptionModal,
    showRenewModal,
    showExpiryWarning,
    daysUntilExpiry,
    creatingSubscription,
    setShowSubscriptionModal,
    setShowRenewModal,
    handleCreateSubscription,
    handleRenewSubscription,
    handleDismissWarning,
    handleShowRenewModal,
    handleShowSubscriptionModal,
    loadSubscription
  } = useSubscription();

  const router = useRouter();

  useEffect(() => {
    loadWebsites();
    loadSubscription();
    
    // Trigger celebration animation after a short delay
    const celebrationTimer = setTimeout(() => {
      setShowCelebration(true);
    }, 1000);

    return () => clearTimeout(celebrationTimer);
  }, [loadWebsites, loadSubscription]);

  // Refresh websites when user data changes (after onboarding)
  useEffect(() => {
    if (user && user.onboardingCompleted) {
      console.log('🔄 User onboarding completed, refreshing websites...');
      loadWebsites();
    }
  }, [user?.onboardingCompleted, loadWebsites, user]);



  const loadWebsites = async () => {
    try {
      console.log('🔄 Loading websites for user:', user?.id);
      const userWebsites = await getWebsites();
      console.log('✅ Loaded websites:', userWebsites);
      console.log('📊 Number of websites:', userWebsites?.length || 0);
      setWebsites(userWebsites || []);
    } catch (error) {
      console.error('❌ Failed to load websites:', error);
      setWebsites([]);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigateWithLoader(router, '/auth');
  };



  const handleCreateWebsite = async () => {
    // If user already has a website, show warning and navigate
    if (websites.length >= 1) {
      showWarning('⚠️ You already have a website. Creating a new one will replace the existing website.');
      // For now, just navigate to builder - user can handle replacement there
      await navigateWithLoader(router, '/builder');
      return;
    } else {
      // No existing website, create new one
      await navigateWithLoader(router, '/builder');
    }
  };

  const triggerCelebration = () => {
    setShowCelebration(true);
  };

  const handleEditWebsite = (websiteId) => {
    navigateWithLoader(router, `/builder/${websiteId}`);
  };

  const handleDeleteWebsite = async (websiteId) => {
    setDeletingId(websiteId);
    try {
      await deleteWebsite(websiteId);
      setWebsites(websites.filter(w => w._id !== websiteId));
      showSuccess('✅ Website deleted successfully!');
    } catch (error) {
      console.error('Failed to delete website:', error);
      showError('❌ Failed to delete website. Please try again.');
    } finally {
      setDeletingId(null);
    }
  };

  const handlePublishWebsite = async (websiteId) => {
    setPublishingId(websiteId);
    try {
      const result = await publishWebsite(websiteId);
      setWebsites(websites.map(w => 
        w._id === websiteId 
          ? { ...w, isPublished: true, publishedUrl: result.publishedUrl }
          : w
      ));
      showSuccess('🎉 Website published successfully!');
      triggerCelebration(); // Trigger celebration on successful publish
    } catch (error) {
      console.error('Failed to publish website:', error);
      if (error.message && error.message.includes('subscribe')) {
        handleShowSubscriptionModal();
      } else {
        showError('❌ Failed to publish website. Please try again.');
      }
    } finally {
      setPublishingId(null);
    }
  };

  const handleUnpublishWebsite = async (websiteId) => {
    setUnpublishingId(websiteId);
    try {
      await unpublishWebsite(websiteId);
      setWebsites(websites.map(w => 
        w._id === websiteId 
          ? { ...w, isPublished: false, publishedUrl: null }
          : w
      ));
      showSuccess('🔒 Website unpublished successfully!');
    } catch (error) {
      console.error('Failed to unpublish website:', error);
      showError('❌ Failed to unpublish website. Please try again.');
    } finally {
      setUnpublishingId(null);
    }
  };

  const handleAddDomain = (website) => {
    setSelectedWebsite(website);
    setCustomDomain(website.data?.customDomain || '');
    setShowDomainModal(true);
  };

  const handleSaveDomain = async () => {
    if (!customDomain.trim()) {
      showError('❌ Please enter a valid domain name');
      return;
    }

    // Basic domain validation
    const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]?\.[a-zA-Z]{2,}$/;
    if (!domainRegex.test(customDomain)) {
      showError('❌ Please enter a valid domain name (e.g., example.com)');
      return;
    }

    setAddingDomain(true);
    try {
      // Get current complete website data first
      const currentWebsite = await getWebsite(selectedWebsite._id);
      
      // Update website with custom domain in backend, preserving all existing data
      const updatedData = {
        ...currentWebsite.data,
        customDomain: customDomain.trim()
      };

      const result = await updateWebsite(selectedWebsite._id, {
        name: selectedWebsite.name,
        data: updatedData
      });

      console.log('Update result:', result);
      console.log('Selected website:', selectedWebsite);

      // Extract website object from API response
      const updatedWebsite = {
        ...(result.website || {}),
        _id: (result.website && result.website._id) || selectedWebsite._id
      };

      console.log('Updated website:', updatedWebsite);

      // Update domain in domains collection
      try {
        const domains = await getDomains();
        const existingDomain = domains.find(d => d.websiteId === selectedWebsite._id);
        
        if (existingDomain) {
          // Update existing domain
          await updateDomain(existingDomain._id, {
            customDomain: customDomain.trim()
          });
          console.log('Domain updated in domains collection');
        } else {
          // Create new domain entry
          await saveDomain({
            websiteId: selectedWebsite._id,
            name: selectedWebsite.name,
            customDomain: customDomain.trim()
          });
          console.log('Domain created in domains collection');
        }
      } catch (domainError) {
        console.error('Failed to update domain in domains collection:', domainError);
        // Don't show error to user as website is already updated
      }

      // Update local state with the response from backend
      setWebsites(websites.map(w => 
        w._id === selectedWebsite._id ? updatedWebsite : w
      ));

      setShowDomainModal(false);
      setSelectedWebsite(null);
      setCustomDomain('');
      showSuccess('✅ Custom domain added successfully!');
      triggerCelebration(); // Trigger celebration on successful domain addition
      // Refresh the page to reflect latest DNS status and domain state
      router.refresh?.();
    } catch (error) {
      console.error('Failed to add custom domain:', error);
      showError('❌ Failed to add custom domain. Please try again.');
    } finally {
      setAddingDomain(false);
    }
  };

  const handleRemoveDomain = async (websiteId) => {
    try {
      // Get current complete website data first
      const currentWebsite = await getWebsite(websiteId);
      
      const updatedData = {
        ...currentWebsite.data,
        customDomain: null
      };

      const result = await updateWebsite(websiteId, {
        name: currentWebsite.name,
        data: updatedData
      });

      // Extract website object from API response
      const updatedWebsite = {
        ...(result.website || {}),
        _id: (result.website && result.website._id) || websiteId
      };

      // Remove custom domain from domains collection
      try {
        const domains = await getDomains();
        const existingDomain = domains.find(d => d.websiteId === websiteId);
        
        if (existingDomain) {
          // Update domain to remove custom domain
          await updateDomain(existingDomain._id, {
            customDomain: null
          });
          console.log('Custom domain removed from domains collection');
        }
      } catch (domainError) {
        console.error('Failed to remove custom domain from domains collection:', domainError);
        // Don't show error to user as website is already updated
      }

      // Update local state with the response from backend
      setWebsites(websites.map(w => 
        w._id === websiteId ? updatedWebsite : w
      ));

      // Clear DNS status for this website
      setDnsStatus(prev => {
        const newStatus = { ...prev };
        delete newStatus[websiteId];
        return newStatus;
      });

      showSuccess('✅ Custom domain removed successfully!');
      // Refresh the page to clear DNS status and domain state
      router.refresh?.();
    } catch (error) {
      console.error('Failed to remove custom domain:', error);
      showError('❌ Failed to remove custom domain. Please try again.');
    }
  };

  const handleCheckDNS = useCallback(async (websiteId, domain) => {
    setCheckingDNS(prev => ({ ...prev, [websiteId]: true }));
    
    try {
      const result = await checkDomainDNS(domain);
      setDnsStatus(prev => ({
        ...prev,
        [websiteId]: result.dnsStatus
      }));
    } catch (error) {
      console.error('Failed to check DNS:', error);
      setDnsStatus(prev => ({
        ...prev,
        [websiteId]: {
          configured: false,
          message: 'Failed to check DNS configuration'
        }
      }));
    } finally {
      setCheckingDNS(prev => ({ ...prev, [websiteId]: false }));
    }
  }, [checkDomainDNS]);

  // Auto-check DNS status after websites load
  useEffect(() => {
    if (websites.length > 0) {
      websites.forEach(website => {
        if (website.data?.customDomain && !dnsStatus[website._id]) {
          // Delay DNS check to avoid blocking page load
          setTimeout(() => {
            handleCheckDNS(website._id, website.data.customDomain);
          }, 2000); // 2 second delay
        }
      });
    }
  }, [websites, dnsStatus, handleCheckDNS]);

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '-';
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <>
      {/* Notification Container */}
      <NotificationContainer 
        notifications={notifications} 
        onRemove={removeNotification} 
      />
      
      {/* Celebration Animation */}
      <CelebrationAnimation 
        isVisible={showCelebration} 
        onComplete={() => setShowCelebration(false)}
      />
      
      <div className="min-h-screen bg-gray-50">


      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900 font-heading">MicroPage Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigateWithLoader(router, '/profile')}
                className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              >
                <User className="h-4 w-4 mr-2" />
                <span className="font-body">Profile</span>
              </button>
            </div>
          </div>
        </div>
      </header>

            {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                 {/* Expiry Warning Banner */}
                 {showExpiryWarning && (
                   <ExpiryWarning
                     daysUntilExpiry={daysUntilExpiry}
                     onDismiss={handleDismissWarning}
                     onRenew={handleShowRenewModal}
                   />
                 )}

                 {/* Welcome Section */}
         <div className="mb-8">
           <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-blue-50 rounded-lg p-4 sm:p-6 border border-indigo-100 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-[1.02] relative overflow-hidden">
             {/* Animated background elements */}
             <div className="absolute inset-0 overflow-hidden">
               <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-yellow-200 to-orange-300 rounded-full opacity-20 animate-pulse"></div>
               <div className="absolute -bottom-8 -left-8 w-16 h-16 bg-gradient-to-br from-pink-200 to-purple-300 rounded-full opacity-20 animate-ping"></div>
               <div className="absolute top-1/2 right-1/4 w-12 h-12 bg-gradient-to-br from-blue-200 to-cyan-300 rounded-full opacity-20 animate-bounce"></div>
             </div>
             
             <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 relative z-10">
               <div className="flex items-center">
                 <div className="flex-shrink-0">
                   <div className="relative">
                     <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-3 rounded-full shadow-lg animate-pulse">
                       <User className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                     </div>
                     <span className="absolute -top-2 -right-2 text-2xl animate-bounce">👋</span>
                   </div>
                 </div>
                 <div className="ml-3 sm:ml-4">
                   <h2 className="text-lg sm:text-xl font-bold text-gray-900 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent font-heading">
                     <span className="mr-2 animate-pulse">🎉</span>
                     Welcome back, {user?.fullName}!
                     <span className="ml-2 animate-pulse">✨</span>
                   </h2>
                   <p className="text-sm sm:text-base text-gray-600 mt-1 font-body">
                     <span className="mr-2 animate-bounce">🚀</span>
                     Ready to build your amazing single-page website?
                     <span className="ml-2 animate-bounce">💫</span>
                   </p>
                 </div>
               </div>
               
               {/* Subscription Status */}
               <div className="lg:text-right">
                 <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4 border border-white/20 shadow-lg">
                   <SubscriptionStatus
                     subscription={subscription}
                     showExpiryWarning={showExpiryWarning}
                     daysUntilExpiry={daysUntilExpiry}
                     onRenew={handleShowRenewModal}
                     handleShowSubscriptionModal={handleShowSubscriptionModal}
                     user={user}
                   />
                   
                   {/* Billing History Link */}
                   <div className="mt-3">
                     <a
                       href="/dashboard/billing"
                       className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-700 font-medium hover:scale-105 transition-all duration-300 bg-white/70 hover:bg-white px-3 py-2 rounded-lg shadow-md hover:shadow-lg"
                     >
                       <span className="mr-1 animate-pulse">💳</span>
                       <CreditCard className="h-4 w-4 mr-1" />
                       <span className="font-body">View Billing History</span>
                       <span className="ml-1 animate-pulse">📊</span>
                     </a>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </div>

         {/* New User Welcome Message */}
         {user?.onboardingCompleted && user?.onboardingData?.completedAt && 
          new Date(user.onboardingData.completedAt) > new Date(Date.now() - 24 * 60 * 60 * 1000) && (
           <div className="mb-8">
             <div className="bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50 rounded-lg p-6 border border-green-200 shadow-lg">
               <div className="flex items-center space-x-4">
                 <div className="flex-shrink-0">
                   <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                     <span className="text-2xl">🎉</span>
                   </div>
                 </div>
                 <div className="flex-1">
                   <h3 className="text-lg font-bold text-green-900 mb-1">
                     Welcome to MicroPage! 🚀
                   </h3>
                   <p className="text-green-700 mb-2">
                     Your website <strong>&quot;{user.onboardingData.websiteName}&quot;</strong> has been created successfully!
                   </p>
                   <p className="text-sm text-green-600">
                     You can now edit, customize, and publish your website. Start by clicking the &quot;Edit&quot; button below.
                   </p>
                 </div>
               </div>
             </div>
           </div>
         )}

         {/* Floating Celebration Elements */}
         <div className="relative mb-8">
           <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
             {/* Floating stars */}
             <div className="absolute top-4 left-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-ping opacity-60"></div>
             <div className="absolute top-8 right-1/3 w-1 h-1 bg-blue-400 rounded-full animate-pulse opacity-80"></div>
             <div className="absolute top-12 left-2/3 w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce opacity-70"></div>
             
             {/* Floating sparkles */}
             <div className="absolute top-6 left-1/2 transform -translate-x-1/2">
               <div className="w-1 h-1 bg-yellow-300 rounded-full animate-ping"></div>
               <div className="w-1 h-1 bg-purple-300 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
               <div className="w-1 h-1 bg-cyan-300 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
             </div>
           </div>
         </div>

        {/* Websites Cards */}
        <div className="mb-6">
          <div className="relative">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-2 ml-4 font-heading">Your Single Page Website</h3>
            <p className="text-sm text-gray-500 mb-6 ml-4 font-body">
              Manage and edit your single-page website
            </p>
            
            {/* Creative arrow connecting from heading to cards - only show when websites exist */}
            {websites.length > 0 && (
              <div className="absolute left-8 top-12 w-6 h-32">
                {/* Curved arrow line */}
                <svg width="24" height="128" viewBox="0 0 24 128" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path 
                    d="M12 0 Q12 64 12 128" 
                    stroke="#ef4444" 
                    strokeWidth="2" 
                    strokeDasharray="3 3" 
                    strokeLinecap="round"
                    fill="none"
                  />
                  {/* Arrow head at bottom */}
                  <path 
                    d="M8 120 L12 128 L16 120" 
                    stroke="#ef4444" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    fill="none"
                  />
                  {/* Small circle at top connecting to heading */}
                  <circle cx="12" cy="4" r="2" fill="#ef4444" />
                </svg>
              </div>
            )}
            
            {/* Arrow pointing to Create Website button when no websites exist */}
            {websites.length === 0 && (
              <div className="absolute left-1/2 transform -translate-x-1/2 top-2 w-82 h-48">
                <svg width="128" height="412" viewBox="20 0 128 192" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Curved arrow path pointing to Create Website button */}
                  <path 
                    d="M0 12 Q34 8 44 90 Q64 152 100 152" 
                    stroke="#ef4444" 
                    strokeWidth="2" 
                    strokeDasharray="4 4" 
                    strokeLinecap="round"
                    fill="none"
                  />
                  {/* Arrow head pointing to button */}
                  <path 
                    d="M90 147 L100 152 L90 157" 
                    stroke="#ef4444" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    fill="none"
                  />
                </svg>
              </div>
            )}
          </div>
        </div>

        {websites.length === 0 ? (
          <div className="text-center py-12 bg-gradient-to-br from-white to-indigo-50 rounded-lg shadow-lg border border-indigo-100 hover:shadow-xl transition-all duration-500 transform hover:scale-[1.02]">
            <div className="relative">
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-4 rounded-full w-20 h-20 mx-auto mb-4 shadow-lg animate-pulse">
                <Globe className="h-12 w-12 text-white" />
              </div>
              {/* Floating elements around the globe */}
              <div className="absolute -top-2 -right-2 w-3 h-3 bg-yellow-400 rounded-full animate-bounce"></div>
              <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-pink-400 rounded-full animate-ping"></div>
              <div className="absolute top-1/2 -right-4 w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></div>
            </div>
            <h3 className="mt-2 text-lg font-bold text-gray-900 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent font-heading">No websites yet</h3>
            <p className="mt-1 text-sm text-gray-600 font-body">
              Let&apos;s create something amazing together! 🚀
            </p>
            <div className="mt-6">
               <button
                 onClick={handleCreateWebsite}
                 className="inline-flex items-center px-6 py-3 border border-transparent shadow-lg text-sm font-bold rounded-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
               >
                 <Plus className="h-5 w-5 mr-2" />
                 <span className="font-body">Create Your Website</span>
                 <span className="ml-2">✨</span>
               </button>
             </div>
          </div>
                ) : (
          <div className="w-full">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50/50">
              {websites.map((website, index) => (
                <div key={website._id || `website-${index}`} className="bg-white rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-500 transform hover:scale-[1.02] w-full mb-6 last:mb-0 overflow-hidden">
                  {/* Card Header */}
                  <div className="p-4 sm:p-6 lg:p-8 border-b border-gray-100 bg-gradient-to-r from-indigo-50 via-purple-50 to-blue-50 relative overflow-hidden">
                    {/* Animated background elements */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <div className="absolute -top-10 -right-10 w-16 h-16 bg-gradient-to-br from-yellow-200 to-orange-300 rounded-full opacity-20 animate-pulse"></div>
                      <div className="absolute -bottom-8 -left-8 w-12 h-12 bg-gradient-to-br from-pink-200 to-purple-300 rounded-full opacity-20 animate-bounce"></div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex-1">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 font-heading">{website.name}</h2>
                        {/* <p className="text-sm sm:text-base text-gray-600">Your Single Page Website</p> */}
                      </div>
                                                                      <div className="sm:ml-6 flex items-center gap-3 relative z-20">
                          {website.isPublished ? (
                            <span className="inline-flex items-center px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-semibold bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200 shadow-md animate-pulse">
                              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-ping"></div>
                              🚀 Live
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-semibold bg-gradient-to-amber-100 text-yellow-800 border border-yellow-200 shadow-md">
                              <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                              ⏳ Not Live
                            </span>
                          )}
                        
                        {website.isPublished ? (
                          <button
                            onClick={() => handleUnpublishWebsite(website._id)}
                            disabled={unpublishingId === website._id}
                            className="inline-flex items-center px-3 py-1.5 border border-orange-300 text-xs font-medium rounded-lg text-orange-700 bg-gradient-to-r from-white to-orange-50 hover:from-orange-50 hover:to-orange-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg disabled:opacity-50"
                          >
                            {unpublishingId === website._id ? (
                              <>
                                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-orange-700 mr-1"></div>
                                Unpublishing...
                              </>
                            ) : (
                              <>
                                <Globe className="h-3 w-3 mr-1" />
                                ⏸️ Unpublish
                              </>
                            )}
                          </button>
                        ) : subscription ? (
                          <button
                            onClick={() => {
                              console.log('Publish button clicked for website:', website._id);
                              handlePublishWebsite(website._id);
                            }}
                            disabled={publishingId === website._id}
                            className="inline-flex items-center px-3 py-1.5 border border-green-300 text-xs font-medium rounded-lg text-green-700 bg-gradient-to-r from-white to-green-50 hover:from-green-50 hover:to-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg disabled:opacity-50 cursor-pointer relative z-10"
                            style={{ position: 'relative', zIndex: 10 }}
                          >
                            {publishingId === website._id ? (
                              <>
                                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-green-700 mr-1"></div>
                                Publishing...
                              </>
                            ) : (
                              <>
                                <Globe className="h-3 w-3 mr-1" />
                                🚀 Publish
                              </>
                            )}
                          </button>
                        ) : (
                          <button
                            onClick={handleShowSubscriptionModal}
                            className="inline-flex items-center px-3 py-1.5 border border-orange-300 text-xs font-medium rounded-lg text-orange-700 bg-gradient-to-r from-white to-orange-50 hover:from-orange-50 hover:to-orange-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg cursor-pointer relative z-10"
                            style={{ position: 'relative', zIndex: 10 }}
                          >
                            <CreditCard className="h-3 w-3 mr-1" />
                            💳 Subscribe to Publish
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-4 sm:p-6 lg:p-8">


                                                        {/* Domain Information and DNS Status */}
                  <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
                    {/* Domain Information */}
                    <div className="flex-1">
                      <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                            <span className="text-gray-700 font-medium font-body">Subdomain:</span>
                          </div>
                          <a 
                            href={`https://${website.data?.subdomain || 'input'}.jirocash.com`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-600 hover:text-green-700 font-semibold text-base sm:text-lg break-all"
                          >
                            {website.data?.subdomain || 'input'}.jirocash.com
                          </a>
                        </div>
                        
                        {/* Custom Domain Section */}
                        <div className="space-y-3">
                          {website.data?.customDomain ? (
                            <div className="flex flex-col gap-2">
                              <div className="flex items-center gap-2">
                                <div className="flex items-center">
                                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                                  <span className="text-gray-700 font-medium font-body">Your Own Domain:</span>
                                </div>
                                <a 
                                  href={`https://${website.data.customDomain}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:text-blue-700 font-semibold text-base sm:text-lg break-all"
                                >
                                  {website.data.customDomain}
                                </a>
                              </div>
                              <button
                                onClick={() => handleRemoveDomain(website._id)}
                                className="text-sm text-red-600 hover:text-red-700 font-medium px-3 py-1 border border-red-200 rounded hover:bg-red-50 self-start"
                              >
                                <span className="font-body">Remove Your Own Domain</span>
                              </button>
                            </div>
                          ) : (
                            <div className="flex flex-col gap-2">
                              <div className="flex items-center gap-2">
                                <div className="flex items-center">
                                  <div className="w-3 h-3 bg-gray-400 rounded-full mr-3"></div>
                                  <span className="text-gray-600 font-body">Your Own Domain:</span>
                                </div>
                                <span className="text-gray-500">Not configured</span>
                              </div>
                              <button
                                onClick={() => handleAddDomain(website)}
                                className="text-sm text-indigo-600 hover:text-indigo-700 font-medium px-3 py-1 border border-indigo-200 rounded hover:bg-indigo-50 self-start"
                              >
                                <span className="font-body">Add Your Domain</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                                         {/* DNS Status - Only show if custom domain is configured */}
                     {website.data?.customDomain && (
                       <div className="lg:w-120">
                        <div className={`border rounded-lg p-3 sm:p-4 ${
                          dnsStatus[website._id]?.configured 
                            ? 'bg-green-50 border-green-200' 
                            : dnsStatus[website._id]?.configured === false
                            ? 'bg-red-50 border-red-200'
                            : 'bg-yellow-50 border-yellow-200'
                        }`}>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                        <span className={`text-sm sm:text-base font-medium ${
                          dnsStatus[website._id]?.configured 
                            ? 'text-green-700' 
                            : dnsStatus[website._id]?.configured === false
                            ? 'text-red-700'
                            : 'text-yellow-700'
                        }`}>
                          {dnsStatus[website._id]?.configured 
                            ? 'Custom Domain configured correctly'
                            : dnsStatus[website._id]?.configured === false
                            ? '❌ Custom Domain not configured - Follow steps below'
                            : 'DNS Status Unknown'
                          }
                        </span>
                        <div className="flex items-center space-x-2">
                          {checkingDNS[website._id] ? (
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                          ) : (
                            <button
                              onClick={() => handleCheckDNS(website._id, website.data.customDomain)}
                              className="text-blue-600 hover:text-blue-700 text-sm font-medium px-2 py-1 border border-blue-200 rounded hover:bg-blue-50"
                            >
                              <span className="font-body">Check DNS</span>
                            </button>
                          )}
                        </div>
                      </div>
                      {dnsStatus[website._id] && (
                        <div className={`mt-3 rounded-lg p-3 ${
                          dnsStatus[website._id]?.configured 
                            ? 'bg-green-100' 
                            : 'bg-red-100'
                        }`}>
                          <div className="flex items-center text-sm mb-2">
                            <div className={`w-3 h-3 rounded-full mr-3 ${
                              dnsStatus[website._id]?.configured 
                                ? 'bg-green-500' 
                                : 'bg-red-500'
                            }`}></div>
                            <span className={dnsStatus[website._id]?.configured ? 'text-green-700' : 'text-red-700'}>
                              {dnsStatus[website._id]?.configured ? '✅ DNS Configured Correctly' : '❌ Custom Domain not configured - Follow steps below'}
                            </span>
                          </div>
                          <p className={`text-sm ${
                            dnsStatus[website._id]?.configured ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {dnsStatus[website._id]?.configured ? dnsStatus[website._id]?.message : (
                              <span>
                                Step 1: Go to your domain provider (GoDaddy, Namecheap, etc.)<br />
                                Step 2: Find DNS/Nameserver settings<br />
                                Step 3: Replace with: ns1.vercel-dns.com and ns2.vercel-dns.com
                              </span>
                            )}
                          </p>
                          {dnsStatus[website._id]?.nameservers && dnsStatus[website._id]?.nameservers.length > 0 && !dnsStatus[website._id]?.configured && (
                            <div className="mt-2">
                              <p className="text-xs text-red-600 mb-1">❌ Current nameservers (WRONG):</p>
                              <div className="text-xs font-mono bg-red-100 p-2 rounded border border-red-200">
                                {dnsStatus[website._id]?.nameservers.map((ns, index) => (
                                  <div key={index} className="text-red-700">{ns}</div>
                                ))}
                              </div>
                              <p className="text-xs text-green-600 mt-2 mb-1">✅ Replace with these Vercel nameservers:</p>
                              <div className="text-xs font-mono bg-green-100 p-2 rounded border border-green-200">
                                <div className="text-green-800 font-bold">ns1.vercel-dns.com</div>
                                <div className="text-green-800 font-bold">ns2.vercel-dns.com</div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div></div>
                  )}
                </div>

                  {/* Dates */}
                  {/* <div className="text-xs text-gray-500 text-left">
                    Created: {formatDate(website.createdAt)} | Updated: {formatDate(website.updatedAt)}
                  </div> */}

                  {/* Subscription Status for Website */}
                  {!subscription && (
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <svg className="w-4 h-4 text-orange-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                          </svg>
                          <span className="text-sm font-medium text-orange-800 font-body">Publishing requires subscription</span>
                        </div>
                        <button
                          onClick={handleShowSubscriptionModal}
                          className="text-sm text-orange-600 hover:text-orange-700 font-medium px-3 py-1 border border-orange-200 rounded hover:bg-orange-50"
                        >
                          <span className="font-body">Subscribe Now</span>
                        </button>
                      </div>
                    </div>
                  )}

                                                          {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:space-x-2">
                      <button
                        onClick={() => handleEditWebsite(website._id)}
                        className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        <span className="font-body">Edit</span>
                      </button>
                      
                      {website.isPublished && (
                        <a
                          href={`/published/${website._id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          <span className="font-body">View</span>
                        </a>
                      )}
                      
                      <button
                        onClick={() => handleDeleteWebsite(website._id)}
                        disabled={deletingId === website._id}
                        className="inline-flex items-center justify-center p-2 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors disabled:opacity-50"
                      >
                        {deletingId === website._id ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-700"></div>
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    
                    {/* Dates - Bottom Corner */}
                    <div className="text-xs text-gray-500 text-left mt-4 pt-3 border-t border-gray-100 font-body">
                      Created: {formatDate(website.createdAt)} | Updated: {formatDate(website.updatedAt)}
                    </div>
                </div>
              </div>
            ))}
          </div></div>
                 )}

         {/* Custom Domain Modal */}
         {showDomainModal && (
          <div className="fixed inset-0 bg-[#dbe2c380] flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 border-2 border-dashed">
               <div className="flex items-center justify-between mb-4">
                 <h3 className="text-lg font-semibold text-gray-900 font-heading">
                   Add Custom Domain
                 </h3>
                 <button
                   onClick={() => {
                     setShowDomainModal(false);
                     setSelectedWebsite(null);
                     setCustomDomain('');
                   }}
                   className="text-gray-400 hover:text-gray-600"
                 >
                   <X className="h-5 w-5" />
                 </button>
               </div>
               
               <div className="mb-4">
                 <p className="text-sm text-gray-600 mb-4 font-body">
                   Add your own domain to your website. Make sure your domain is pointing to our nameservers.
                 </p>
                 
                 <div className="mb-4">
                   <label className="block text-sm font-medium text-gray-700 mb-2 font-body">
                     Domain Name
                   </label>
                   <input
                     type="text"
                     value={customDomain}
                     onChange={(e) => setCustomDomain(e.target.value)}
                     placeholder="example.com"
                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                   />
                 </div>
                 
                 <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                   <h4 className="text-sm font-medium text-blue-800 mb-2 font-heading">📋 DNS Configuration Instructions</h4>
                   <div className="space-y-3 text-xs text-blue-700 font-body">
                     <p><strong>Step 1:</strong> Go to your domain provider (like GoDaddy, Namecheap, etc.)</p>
                     <p><strong>Step 2:</strong> Find &quot;DNS Settings&quot; or &quot;Nameservers&quot;</p>
                     <p><strong>Step 3:</strong> You will see current nameservers like:</p>
                     <div className="bg-red-100 p-2 rounded font-mono text-sm border border-red-200">
                       <div className="text-red-700">pdns04.domaincontrol.com</div>
                       <div className="text-red-700">pdns03.domaincontrol.com</div>
                       <div className="text-red-600 text-[10px] mt-1">❌ DELETE THESE OLD ONES</div>
                     </div>
                     <p><strong>Step 4:</strong> Replace them with these new nameservers:</p>
                     <div className="bg-green-100 p-2 rounded font-mono text-sm border border-green-200">
                       <div className="font-bold text-green-800">ns1.vercel-dns.com</div>
                       <div className="font-bold text-green-800">ns2.vercel-dns.com</div>
                       <div className="text-green-700 text-[10px] mt-1">✅ ADD THESE NEW ONES</div>
                     </div>
                     <p className="text-[11px] text-blue-600 mt-2">
                       💡 <strong>Note:</strong> This may take 15-30 minutes to work. Keep checking &quot;Check DNS&quot; button.
                     </p>
                   </div>
                 </div>
               </div>
               
               <div className="flex justify-end space-x-3">
                 <button
                   onClick={() => {
                     setShowDomainModal(false);
                     setSelectedWebsite(null);
                     setCustomDomain('');
                   }}
                   className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                 >
                   <span className="font-body">Cancel</span>
                 </button>
                 <button
                   onClick={handleSaveDomain}
                   disabled={addingDomain || !customDomain.trim()}
                   className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-md transition-colors"
                 >
                   {addingDomain ? <span className="font-body">Adding...</span> : <span className="font-body">Add Domain</span>}
                 </button>
               </div>
             </div>
           </div>
                   )}


        </main>

                {/* Subscription Modals */}
                <SubscriptionModal
                  isOpen={showSubscriptionModal}
                  onClose={() => setShowSubscriptionModal(false)}
                  onCreateSubscription={handleCreateSubscription}
                  subscriptionPlans={subscriptionPlans}
                  isLoading={creatingSubscription}
                  user={user}
                />

                <RenewModal
                  isOpen={showRenewModal}
                  onClose={() => setShowRenewModal(false)}
                  onRenewSubscription={handleRenewSubscription}
                  subscription={subscription}
                  subscriptionPlans={subscriptionPlans}
                  isLoading={creatingSubscription}
                  user={user}
                />
      </div>
    </>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
