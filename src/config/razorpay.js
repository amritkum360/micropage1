/**
 * Razorpay Configuration
 * Test mode configuration for development
 */

export const RAZORPAY_CONFIG = {
  // Test Mode Configuration
  TEST_MODE: true,
  
  // Test Keys (Correct keys from user)
  TEST_KEY_ID: 'rzp_test_RCclHMZe83kwds',
  TEST_KEY_SECRET: 'hQ8QPfuw4H3nWTHml0TSPvOd', // Only for backend
  
  // Production Keys (For future use)
  PROD_KEY_ID: 'rzp_live_YOUR_LIVE_KEY_ID',
  PROD_KEY_SECRET: 'YOUR_LIVE_KEY_SECRET', // Only for backend
  
  // Backend URLs - Now using local backend
  BACKEND_URL: 'https://micropage.onrender.com/api/razorpay',
  
  // Payment Plans
  PLANS: {
    BASIC: {
      name: 'Basic Publishing Plan',
      amount: 99900, // ₹999 in paise
      currency: 'INR',
      duration: '1 Year',
      features: [
        'Website Publishing',
        'Custom Domain',
        'Basic Analytics',
        'Email Support'
      ]
    },
    PREMIUM: {
      name: 'Premium Publishing Plan',
      amount: 199900, // ₹1,999 in paise
      currency: 'INR',
      duration: '1 Year',
      features: [
        'Website Publishing',
        'Custom Domain',
        'Advanced Analytics',
        'Priority Support',
        'SEO Tools',
        'Multiple Pages'
      ]
    }
  },
  
  // Payment Options
  PAYMENT_OPTIONS: {
    currency: 'INR',
    prefill: {
      method: 'card'
    },
    theme: {
      color: '#3B82F6'
    }
  }
};

/**
 * Get current Razorpay key based on environment
 */
export const getRazorpayKey = () => {
  if (RAZORPAY_CONFIG.TEST_MODE) {
    return RAZORPAY_CONFIG.TEST_KEY_ID;
  }
  return RAZORPAY_CONFIG.PROD_KEY_ID;
};

/**
 * Get current backend URL
 */
export const getBackendUrl = () => {
  return RAZORPAY_CONFIG.BACKEND_URL;
};

/**
 * Get plan details by plan type
 */
export const getPlanDetails = (planType) => {
  return RAZORPAY_CONFIG.PLANS[planType.toUpperCase()] || RAZORPAY_CONFIG.PLANS.BASIC;
};
