'use client';
import { useState, useEffect } from 'react';
import { createOrder, initializePayment, completePayment } from '@/services/razorpayService';
import { getPlanDetails, getCustomPlanDetails } from '@/config/subscriptionPlans';
import useNotification from '@/hooks/useNotification';
import NotificationContainer from '@/components/ui/NotificationContainer';

export default function SubscriptionModal({ 
  isOpen, 
  onClose, 
  onCreateSubscription, 
  subscriptionPlans, 
  isLoading,
  user 
}) {
  const [selectedPlan, setSelectedPlan] = useState('1month');
  const [customMonths, setCustomMonths] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const { showSuccess, showError, notifications, removeNotification } = useNotification();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsProcessing(true);

    try {
      const duration = selectedPlan === 'custom' ? `${customMonths}month` : selectedPlan;
      const planData = selectedPlan === 'custom' 
        ? getCustomPlanDetails(customMonths)
        : getPlanDetails(selectedPlan);

      console.log('💳 Starting subscription process for:', planData);

      // Debug user object
      console.log('🔍 User object in SubscriptionModal:', user);
      console.log('🔍 User ID fields:', {
        id: user?.id,
        _id: user?._id,
        userId: user?.userId
      });

      // Validate user ID
      const userId = user?._id || user?.id || user?.userId;
      if (!userId || userId === 'anonymous') {
        throw new Error('User ID not found. Please log in again.');
      }

      // Create order data for Razorpay
      const orderData = {
        amount: planData.price * 100, // Convert to paise
        currency: 'INR',
        receipt: `${duration}_${Date.now()}`,
        notes: {
          userId: userId, // Use validated userId
          plan: duration,
          description: planData.name,
          userEmail: user?.email || '',
          userName: user?.fullName || user?.name || '',
          days: planData.days
        }
      };

      console.log('💳 Order data created:', orderData);

      // Create order on Razorpay backend
      const order = await createOrder(orderData);
      console.log('✅ Order created:', order);

      // Initialize Razorpay payment
      const paymentResult = await initializePayment({
        amount: orderData.amount,
        currency: orderData.currency,
        order_id: order.id,
        name: 'MicroPage',
        description: `${planData.name} - ${planData.days} days`,
        customer_name: user?.name || '',
        customer_email: user?.email || '',
        customer_phone: user?.phone || '',
      });

      console.log('💳 Payment successful:', paymentResult);

      // Complete payment process
      const finalResult = await completePayment(paymentResult, orderData);
      console.log('✅ Payment completed:', finalResult);

      // Call the original subscription handler
      if (onCreateSubscription) {
        await onCreateSubscription(duration, finalResult);
      }

      // Close modal and show success
      onClose();
      
      // Show success message
      showSuccess(`🎉 Subscription successful! Your website is now published for ${planData.days} days.`);
      
      // Wait a bit for backend processing, then refresh subscription data
      console.log('⏳ Waiting for backend to process subscription...');
      setTimeout(async () => {
        try {
          // Try to refresh subscription data
          if (onCreateSubscription) {
            await onCreateSubscription(duration, finalResult);
          }
          console.log('✅ Subscription data refreshed successfully');
        } catch (error) {
          console.error('❌ Failed to refresh subscription data:', error);
          // Force page reload as fallback
          window.location.reload();
        }
      }, 2000);

    } catch (error) {
      console.error('❌ Subscription error:', error);
      setError(error.message);
      
      if (error.message === 'Payment cancelled by user') {
        setError('Payment was cancelled. Please try again.');
      } else {
        setError(`Subscription failed: ${error.message}`);
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const selectedPlanData = selectedPlan === 'custom' 
    ? getCustomPlanDetails(customMonths)
    : getPlanDetails(selectedPlan);

  if (!isOpen) return null;

  return (
    <>
      {/* Notification Container */}
      <NotificationContainer 
        notifications={notifications} 
        onRemove={removeNotification} 
      />
      
      <div className="fixed inset-0 bg-[#dbe2c380] bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 border-2 border-dashed">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">💳 Subscribe to Publish</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ❌
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">❌ {error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ⏰ Choose Duration
            </label>
            <select
              value={selectedPlan}
              onChange={(e) => setSelectedPlan(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="1month">1 Month - ₹199</option>
              <option value="3month">3 Months - ₹499</option>
              <option value="6month">6 Months - ₹899</option>
              <option value="12month">1 Year - ₹1599 (Save ₹789)</option>
              <option value="24month">2 Years - ₹2999 (Save ₹1777)</option>
              <option value="custom">Custom Duration</option>
            </select>
          </div>

          {selectedPlan === 'custom' && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                📅 Number of Months (1-60)
              </label>
              <input
                type="number"
                min="1"
                max="60"
                value={customMonths}
                onChange={(e) => setCustomMonths(Math.min(60, Math.max(1, parseInt(e.target.value) || 1)))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          {selectedPlanData && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">📋 Plan Summary</h3>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Plan:</span>
                  <span className="font-medium">{selectedPlanData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Price:</span>
                  <span className="font-medium">₹{selectedPlanData.price}</span>
                </div>
                {selectedPlanData.savings > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>You Save:</span>
                    <span className="font-medium">₹{selectedPlanData.savings}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Duration:</span>
                  <span className="font-medium">{selectedPlanData.days} days</span>
                </div>
              </div>
            </div>
          )}

          <div className="flex space-x-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isProcessing}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              ❌ Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || isProcessing}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isProcessing ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </div>
              ) : isLoading ? (
                'Creating...'
              ) : (
                '💳 Subscribe Now'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
}
