/**
 * Subscription Plans Configuration
 * Defines different subscription plans with pricing and features
 */

export const SUBSCRIPTION_PLANS = {
  '1month': {
    name: '1 Month Plan',
    price: 199,
    days: 30,
    savings: 0,
    features: [
      'Website Publishing',
      'Custom Domain',
      'Basic Analytics',
      'Email Support'
    ],
    popular: false
  },
  '3month': {
    name: '3 Months Plan',
    price: 499,
    days: 90,
    savings: 98, // 3 * 199 - 499
    features: [
      'Website Publishing',
      'Custom Domain',
      'Basic Analytics',
      'Email Support',
      'Priority Queue'
    ],
    popular: false
  },
  '6month': {
    name: '6 Months Plan',
    price: 899,
    days: 180,
    savings: 295, // 6 * 199 - 899
    features: [
      'Website Publishing',
      'Custom Domain',
      'Basic Analytics',
      'Email Support',
      'Priority Queue',
      'Advanced Templates'
    ],
    popular: false
  },
  '12month': {
    name: '1 Year Plan',
    price: 1599,
    days: 365,
    savings: 789, // 12 * 199 - 1599
    features: [
      'Website Publishing',
      'Custom Domain',
      'Advanced Analytics',
      'Priority Support',
      'SEO Tools',
      'Multiple Pages',
      'Custom Branding'
    ],
    popular: true
  },
  '24month': {
    name: '2 Years Plan',
    price: 2999,
    days: 730,
    savings: 1777, // 24 * 199 - 2999
    features: [
      'Website Publishing',
      'Custom Domain',
      'Advanced Analytics',
      'Priority Support',
      'SEO Tools',
      'Multiple Pages',
      'Custom Branding',
      'API Access',
      'White Label Option'
    ],
    popular: false
  }
};

/**
 * Get plan details by plan type
 */
export const getPlanDetails = (planType) => {
  return SUBSCRIPTION_PLANS[planType] || SUBSCRIPTION_PLANS['1month'];
};

/**
 * Get custom plan details
 */
export const getCustomPlanDetails = (months) => {
  const basePrice = 199;
  const totalPrice = months * basePrice;
  const days = months * 30;
  
  return {
    name: `${months} Months Custom Plan`,
    price: totalPrice,
    days: days,
    savings: 0,
    features: [
      'Website Publishing',
      'Custom Domain',
      'Basic Analytics',
      'Email Support'
    ],
    popular: false
  };
};

/**
 * Get all plans as array
 */
export const getAllPlans = () => {
  return Object.entries(SUBSCRIPTION_PLANS).map(([key, plan]) => ({
    key,
    ...plan
  }));
};

/**
 * Get popular plans
 */
export const getPopularPlans = () => {
  return getAllPlans().filter(plan => plan.popular);
};

/**
 * Calculate savings for a plan
 */
export const calculateSavings = (planType, months = 1) => {
  const basePrice = 199;
  const plan = getPlanDetails(planType);
  
  if (planType === 'custom') {
    return 0;
  }
  
  const monthlyPrice = plan.price / (plan.days / 30);
  const savings = (basePrice - monthlyPrice) * (plan.days / 30);
  
  return Math.max(0, Math.round(savings));
};
