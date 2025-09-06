/**
 * Billing Service
 * Handles all billing-related API calls
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

/**
 * Get user's billing history
 */
export const getBillingHistory = async (userId) => {
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_BASE_URL}/api/razorpay/payments?userId=${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch billing history');
    }

    const data = await response.json();
    return data.payments || [];
  } catch (error) {
    console.error('Error fetching billing history:', error);
    throw error;
  }
};

/**
 * Get payment details by order ID
 */
export const getPaymentDetails = async (orderId) => {
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_BASE_URL}/api/razorpay/payment/${orderId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch payment details');
    }

    const data = await response.json();
    return data.payment;
  } catch (error) {
    console.error('Error fetching payment details:', error);
    throw error;
  }
};

/**
 * Download invoice for a payment
 */
export const downloadInvoice = async (paymentData) => {
  try {
    // Create invoice content
    const invoiceContent = `
INVOICE

Payment Details:
Payment ID: ${paymentData.paymentId || 'N/A'}
Order ID: ${paymentData.orderId || 'N/A'}
Amount: ₹${(paymentData.amount / 100).toFixed(2)}
Currency: ${paymentData.currency || 'INR'}
Description: ${paymentData.description || 'Website Publishing Subscription'}
Status: ${paymentData.status || 'N/A'}

Transaction Details:
Created: ${new Date(paymentData.createdAt).toLocaleString('en-IN')}
${paymentData.completedAt ? `Completed: ${new Date(paymentData.completedAt).toLocaleString('en-IN')}` : ''}

Plan Details:
${paymentData.plan ? `Plan: ${paymentData.plan}` : ''}
${paymentData.days ? `Duration: ${paymentData.days} days` : ''}

Thank you for your business!
    `.trim();

    // Create and download file
    const blob = new Blob([invoiceContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `invoice_${paymentData.paymentId || paymentData.orderId || 'unknown'}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    return true;
  } catch (error) {
    console.error('Error downloading invoice:', error);
    throw error;
  }
};

/**
 * Get billing statistics
 */
export const getBillingStats = async (userId) => {
  try {
    const billingHistory = await getBillingHistory(userId);
    
    const stats = {
      totalTransactions: billingHistory.length,
      totalPaid: billingHistory
        .filter(bill => bill.status === 'completed')
        .reduce((sum, bill) => sum + (bill.amount / 100), 0),
      pendingPayments: billingHistory.filter(bill => bill.status === 'pending').length,
      failedPayments: billingHistory.filter(bill => bill.status === 'failed').length,
      completedPayments: billingHistory.filter(bill => bill.status === 'completed').length
    };

    return stats;
  } catch (error) {
    console.error('Error calculating billing stats:', error);
    throw error;
  }
};
