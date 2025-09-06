'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import useNotification from '@/hooks/useNotification';

export default function useSubscription() {
  const { getUserSubscription, createSubscription, getSubscriptionPlans } = useAuth();
  const { showSuccess, showError, showWarning } = useNotification();
  
  const [subscription, setSubscription] = useState(null);
  const [subscriptionPlans, setSubscriptionPlans] = useState({});
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [showRenewModal, setShowRenewModal] = useState(false);
  const [showExpiryWarning, setShowExpiryWarning] = useState(false);
  const [daysUntilExpiry, setDaysUntilExpiry] = useState(0);
  const [creatingSubscription, setCreatingSubscription] = useState(false);

  const loadSubscription = async () => {
    try {
      const subscriptionData = await getUserSubscription();
      setSubscription(subscriptionData.subscription);
      
      // Check if subscription is expiring soon (within 10 days)
      if (subscriptionData.subscription) {
        const expiryDate = new Date(subscriptionData.subscription.expiresAt);
        const today = new Date();
        const daysUntilExpiry = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
        
        if (daysUntilExpiry <= 10 && daysUntilExpiry > 0) {
          // Show warning banner instead of alert
          setShowExpiryWarning(true);
          setDaysUntilExpiry(daysUntilExpiry);
        } else if (daysUntilExpiry <= 0) {
          showWarning('⚠️ Your publishing subscription has expired. Your website will be unpublished. Renew to continue publishing!');
          // Force reload to update UI
          window.location.reload();
        }
      }
    } catch (error) {
      console.error('Failed to load subscription:', error);
    }
  };

  const loadSubscriptionPlans = async () => {
    try {
      const response = await getSubscriptionPlans();
      setSubscriptionPlans(response.plans);
    } catch (error) {
      console.error('Failed to load subscription plans:', error);
    }
  };

  const handleCreateSubscription = async (duration, paymentResult) => {
    try {
      setCreatingSubscription(true);
      
      // If paymentResult is provided, it means Razorpay payment was successful
      if (paymentResult) {
        console.log('✅ Subscription created via Razorpay:', paymentResult);
        
        // Wait a bit for backend to process the payment
        console.log('⏳ Waiting for backend to process payment...');
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Try to reload subscription data multiple times
        let retryCount = 0;
        const maxRetries = 3;
        
        while (retryCount < maxRetries) {
          try {
            console.log(`🔄 Attempting to reload subscription data (attempt ${retryCount + 1})`);
            await loadSubscription();
            
            // Check if subscription was loaded successfully
            if (subscription) {
              console.log('✅ Subscription data loaded successfully:', subscription);
              break;
            }
            
            retryCount++;
            if (retryCount < maxRetries) {
              console.log(`⏳ Retrying in 2 seconds... (${retryCount}/${maxRetries})`);
              await new Promise(resolve => setTimeout(resolve, 2000));
            }
          } catch (error) {
            console.error(`❌ Failed to reload subscription (attempt ${retryCount + 1}):`, error);
            retryCount++;
            if (retryCount < maxRetries) {
              await new Promise(resolve => setTimeout(resolve, 2000));
            }
          }
        }
        
        // Close modals
        setShowSubscriptionModal(false);
        setShowRenewModal(false);
        
        // Show success message using notification system
        showSuccess('🎉 Subscription activated successfully! You can now publish your website.');
        
        return;
      }
      
      // Fallback to old method if needed
      await createSubscription(duration);
      await loadSubscription();
      setShowSubscriptionModal(false);
      setShowRenewModal(false);
      showSuccess('🎉 Subscription created successfully!');
    } catch (error) {
      console.error('Failed to create subscription:', error);
      showError('❌ Failed to create subscription. Please try again.');
    } finally {
      setCreatingSubscription(false);
    }
  };

  const handleRenewSubscription = async (duration, paymentResult) => {
    try {
      setCreatingSubscription(true);
      
      // If paymentResult is provided, it means Razorpay payment was successful
      if (paymentResult) {
        console.log('✅ Subscription renewed via Razorpay:', paymentResult);
        // The subscription is already renewed via Razorpay, just reload to update UI
        await loadSubscription();
        setShowRenewModal(false);
        setShowExpiryWarning(false);
        return; // Don't show success message as it's already shown in modal
      }
      
      // Fallback to old method if needed
      await createSubscription(duration);
      await loadSubscription();
      setShowRenewModal(false);
      setShowExpiryWarning(false);
      showSuccess('🎉 Subscription extended successfully!');
    } catch (error) {
      console.error('Failed to extend subscription:', error);
      showError('❌ Failed to extend subscription. Please try again.');
    } finally {
      setCreatingSubscription(false);
    }
  };

  const handleDismissWarning = () => {
    setShowExpiryWarning(false);
  };

  const handleShowRenewModal = () => {
    setShowRenewModal(true);
  };

  const handleShowSubscriptionModal = () => {
    setShowSubscriptionModal(true);
  };

  useEffect(() => {
    loadSubscription();
    loadSubscriptionPlans();
  }, []);

  return {
    // State
    subscription,
    subscriptionPlans,
    showSubscriptionModal,
    showRenewModal,
    showExpiryWarning,
    daysUntilExpiry,
    creatingSubscription,
    
    // Actions
    setShowSubscriptionModal,
    setShowRenewModal,
    handleCreateSubscription,
    handleRenewSubscription,
    handleDismissWarning,
    handleShowRenewModal,
    handleShowSubscriptionModal,
    loadSubscription
  };
}
