'use client';
import { useState, useEffect } from 'react';
import { createOrder, initializePayment, completePayment } from '@/services/razorpayService';
import { getPlanDetails, getCustomPlanDetails } from '@/config/subscriptionPlans';
import useNotification from '@/hooks/useNotification';
import NotificationContainer from '@/components/ui/NotificationContainer';


export default function RenewModal({ 
  isOpen, 
  onClose, 
  onRenewSubscription, 
  subscription, 
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

      console.log('💳 Starting subscription renewal process for:', planData);

      // Create order data for Razorpay
      const orderData = {
        amount: planData.price * 100, // Convert to paise
        currency: 'INR',
        receipt: `renew_${duration}_${Date.now()}`,
        notes: {
          userId: user?.id || subscription?.userId || 'anonymous',
          plan: duration,
          description: `Renewal: ${planData.name}`,
          userEmail: user?.email || subscription?.userEmail || '',
          userName: user?.fullName || user?.name || subscription?.userName || '',
          days: planData.days,
          type: 'renewal'
        }
      };

      // Create order on Razorpay backend
      const order = await createOrder(orderData);
      console.log('✅ Renewal order created:', order);

      // Initialize Razorpay payment
      const paymentResult = await initializePayment({
        amount: orderData.amount,
        currency: orderData.currency,
        order_id: order.id,
        name: 'MicroPage',
        description: `Renewal: ${planData.name} - ${planData.days} days`,
        customer_name: user?.fullName || user?.name || subscription?.userName || '',
        customer_email: user?.email || subscription?.userEmail || '',
        customer_phone: user?.phone || subscription?.userPhone || '',
      });

      console.log('💳 Renewal payment successful:', paymentResult);

      // Complete payment process
      const finalResult = await completePayment(paymentResult, orderData);
      console.log('✅ Renewal payment completed:', finalResult);

      // Call the original subscription handler
      if (onRenewSubscription) {
        onRenewSubscription(duration, finalResult);
      }

      // Close modal and show success
      onClose();
      showSuccess(`🎉 Subscription renewed successfully! Your website is now published for additional ${planData.days} days.`);
      // Force page refresh to get updated subscription data
      setTimeout(() => {
        window.location.reload();
      }, 1000);

    } catch (error) {
      console.error('❌ Subscription renewal error:', error);
      setError(error.message);
      
      if (error.message === 'Payment cancelled by user') {
        setError('Payment was cancelled. Please try again.');
      } else {
        setError(`Subscription renewal failed: ${error.message}`);
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const selectedPlanData = subscriptionPlans[selectedPlan === 'custom' ? `${customMonths}month` : selectedPlan];
  
  // Debug logging
  console.log('🔍 RenewModal Debug:', {
    isOpen,
    subscription: !!subscription,
    subscriptionPlans: !!subscriptionPlans,
    selectedPlan,
    customMonths,
    selectedPlanData,
    availablePlans: Object.keys(subscriptionPlans || {})
  });

  if (!isOpen || !subscription || !subscriptionPlans) return null;

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
          <h2 className="text-xl font-semibold text-gray-900">🔄 Extend Your Publishing Plan</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ❌
          </button>
        </div>

                 {/* Current Subscription Info */}
         <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
           <h3 className="font-medium text-blue-900 mb-2">📊 Current Subscription</h3>
           <div className="space-y-1 text-sm text-blue-800">
             <div className="flex justify-between">
               <span>Status:</span>
               <span className="font-medium">Active</span>
             </div>
             <div className="flex justify-between">
               <span>Expires:</span>
               <span className="font-medium">{new Date(subscription.expiresAt).toLocaleDateString()}</span>
             </div>
             <div className="flex justify-between">
               <span>Plan:</span>
               <span className="font-medium">{subscription.plan}</span>
             </div>
             <div className="flex justify-between">
               <span>Price:</span>
               <span className="font-medium">₹{subscription.price}</span>
             </div>
           </div>
         </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ⏰ Additional Time
            </label>
            <select
              value={selectedPlan}
              onChange={(e) => setSelectedPlan(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="1month">1 Month</option>
              <option value="3month">3 Months</option>
              <option value="6month">6 Months</option>
              <option value="12month">1 Year</option>
              <option value="24month">2 Years</option>
              <option value="custom">Custom</option>
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
              <h3 className="font-medium text-gray-900 mb-2">📋 Extension Summary</h3>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Extension:</span>
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
                  <span>Additional Days:</span>
                  <span className="font-medium">{selectedPlanData.days} days</span>
                </div>
              </div>
            </div>
          )}

          <div className="flex space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              ❌ Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || isProcessing}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              🔄 {isProcessing ? 'Processing...' : isLoading ? 'Loading...' : 'Extend Now'}
            </button>
          </div>
          {error && (
            <div className="mt-4 text-center text-red-600 text-sm">
              ❌ {error}
            </div>
          )}
        </form>
      </div>
    </div>
    </>
  );
}
