/**
 * Razorpay Payment Service
 * Handles payment integration with local Razorpay backend
 */

import { getRazorpayKey, getBackendUrl, getPlanDetails } from '@/config/razorpay';

const RAZORPAY_BACKEND_URL = 'https://micropage.onrender.com/api/razorpay';
const RAZORPAY_KEY_ID = getRazorpayKey();

/**
 * Create a new payment order
 * @param {Object} orderData - Order details
 * @returns {Promise<Object>} Razorpay order response
 */
export const createOrder = async (orderData) => {
  try {
    console.log('💳 Creating Razorpay order:', orderData);
    
    const response = await fetch(`${RAZORPAY_BACKEND_URL}/order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Order creation failed: ${response.status}`);
    }

    const result = await response.json();
    console.log('✅ Razorpay order created:', result);
    
    return result.order; // Return the actual Razorpay order
  } catch (error) {
    console.error('❌ Order creation error:', error);
    throw error;
  }
};

/**
 * Validate payment signature
 * @param {Object} paymentData - Payment response data
 * @returns {Promise<Object>} Validation result
 */
export const validatePayment = async (paymentData) => {
  try {
    console.log('🔍 Validating payment:', paymentData);
    
    const response = await fetch(`${RAZORPAY_BACKEND_URL}/validate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Payment validation failed: ${response.status}`);
    }

    const result = await response.json();
    console.log('✅ Payment validation result:', result);
    
    return result;
  } catch (error) {
    console.error('❌ Payment validation error:', error);
    throw error;
  }
};

/**
 * Initialize Razorpay payment
 * @param {Object} options - Payment options
 * @returns {Promise<Object>} Payment result
 */
export const initializePayment = async (options) => {
  return new Promise((resolve, reject) => {
    try {
      // Load Razorpay script dynamically
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        const rzp = new window.Razorpay({
          key: RAZORPAY_KEY_ID,
          amount: options.amount,
          currency: options.currency || 'INR',
          name: options.name || 'MicroPage',
          description: options.description || 'Website Subscription',
          order_id: options.order_id,
          prefill: {
            name: options.customer_name || '',
            email: options.customer_email || '',
            contact: options.customer_phone || '',
          },
          theme: {
            color: '#3B82F6',
          },
          handler: function (response) {
            console.log('💳 Payment successful:', response);
            resolve(response);
          },
          modal: {
            ondismiss: function () {
              console.log('💳 Payment cancelled by user');
              reject(new Error('Payment cancelled by user'));
            },
          },
        });

        rzp.open();
      };
      script.onerror = () => {
        reject(new Error('Failed to load Razorpay script'));
      };
      document.body.appendChild(script);
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Complete payment process
 * @param {Object} paymentData - Payment data from Razorpay
 * @param {Object} orderData - Original order data
 * @returns {Promise<Object>} Complete payment result
 */
export const completePayment = async (paymentData, orderData) => {
  try {
    console.log('💳 Completing payment:', { paymentData, orderData });
    
    // Validate payment signature
    const validationResult = await validatePayment(paymentData);
    
    if (validationResult.success) {
      return {
        success: true,
        orderId: validationResult.orderId,
        paymentId: validationResult.paymentId,
        amount: orderData.amount,
        currency: orderData.currency,
        timestamp: new Date().toISOString(),
      };
    } else {
      throw new Error('Payment validation failed');
    }
  } catch (error) {
    console.error('❌ Payment completion error:', error);
    throw error;
  }
};

/**
 * Create subscription order for specific plan
 * @param {string} planType - Plan type (BASIC, PREMIUM)
 * @param {Object} userData - User information
 * @returns {Promise<Object>} Order data
 */
export const createSubscriptionOrder = async (planType, userData) => {
  const plan = getPlanDetails(planType);
  
  const orderData = {
    amount: plan.amount,
    currency: plan.currency,
    receipt: `${planType.toLowerCase()}_${Date.now()}`,
    notes: {
      userId: userData?.id || 'anonymous',
      plan: planType.toLowerCase(),
      description: plan.name,
      userEmail: userData?.email || '',
      userName: userData?.name || ''
    }
  };

  return orderData;
};

/**
 * Get payment status for an order
 * @param {string} orderId - Local order ID
 * @returns {Promise<Object>} Payment status
 */
export const getPaymentStatus = async (orderId) => {
  try {
    const response = await fetch(`${RAZORPAY_BACKEND_URL}/payment/${orderId}`);
    
    if (!response.ok) {
      throw new Error(`Failed to get payment status: ${response.status}`);
    }

    const result = await response.json();
    return result.payment;
  } catch (error) {
    console.error('❌ Get payment status error:', error);
    throw error;
  }
};

/**
 * Get all payments for a user
 * @param {string} userId - User ID
 * @returns {Promise<Array>} User payments
 */
export const getUserPayments = async (userId) => {
  try {
    const response = await fetch(`${RAZORPAY_BACKEND_URL}/payments?userId=${userId}`);
    
    if (!response.ok) {
      throw new Error(`Failed to get user payments: ${response.status}`);
    }

    const result = await response.json();
    return result.payments;
  } catch (error) {
    console.error('❌ Get user payments error:', error);
    throw error;
  }
};
