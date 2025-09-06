'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { 
  CreditCard, 
  Calendar, 
  DollarSign, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Download,
  Filter,
  Search,
  ArrowLeft
} from 'lucide-react';

function BillingHistoryContent() {
  const { user } = useAuth();
  const [billingHistory, setBillingHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, successful, pending, failed
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadBillingHistory();
  }, []);

  const loadBillingHistory = async () => {
    try {
      setLoading(true);
      
      // Debug user object
      console.log('🔍 User object in billing history:', user);
      console.log('🔍 User ID fields:', {
        id: user?.id,
        _id: user?._id,
        userId: user?.userId
      });
      
      // Get the correct user ID
      const userId = user?._id || user?.id || user?.userId;
      
      if (!userId) {
        console.error('❌ No user ID found');
        setBillingHistory([]);
        return;
      }
      
      console.log('🔄 Loading billing history for user:', userId);
      
      // Fetch billing history from backend
      const response = await fetch(`http://localhost:5000/api/razorpay/payments?userId=${userId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      
      console.log('📡 API Response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('✅ Real billing data loaded:', data);
        console.log('📊 Payment count:', data.payments?.length || 0);
        console.log('🔍 User ID:', userId);
        
        if (data.payments && data.payments.length > 0) {
          console.log('💰 Payments found:', data.payments);
        } else {
          console.log('📝 No payments found for user');
        }
        
        setBillingHistory(data.payments || []);
      } else {
        const errorData = await response.text();
        console.error('❌ Failed to load billing history:', response.status);
        console.error('❌ Error details:', errorData);
        setBillingHistory([]);
      }
    } catch (error) {
      console.error('❌ Error loading billing history:', error);
      console.error('❌ Error stack:', error.stack);
      setBillingHistory([]);
    } finally {
      setLoading(false);
    }
  };

  // Real billing data loading - no mock data

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'failed':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'pending':
        return 'Pending';
      case 'failed':
        return 'Failed';
      default:
        return 'Unknown';
    }
  };

  const formatAmount = (amount, currency) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency || 'INR',
      minimumFractionDigits: 2
    }).format(amount / 100); // Convert from paise to rupees
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredBillingHistory = billingHistory.filter(bill => {
    const matchesFilter = filter === 'all' || bill.status === filter;
    
    // Safe property access with null checks
    const description = bill.description || '';
    const paymentId = bill.paymentId || bill.razorpayPaymentId || '';
    const orderId = bill.orderId || bill.razorpayOrderId || '';
    
    const matchesSearch = description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         paymentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         orderId.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const downloadInvoice = async (bill) => {
    try {
      // Use billing service for real invoice download
      const { downloadInvoice: downloadInvoiceService } = await import('@/services/billingService');
      await downloadInvoiceService(bill);
      console.log('✅ Invoice downloaded successfully for:', bill.paymentId || bill.razorpayPaymentId);
    } catch (error) {
      console.error('❌ Error downloading invoice:', error);
      
      // Fallback to simple invoice download
      const invoiceData = `
INVOICE

Payment Details:
Payment ID: ${bill.paymentId || bill.razorpayPaymentId || 'N/A'}
Order ID: ${bill.orderId || bill.razorpayOrderId || 'N/A'}
Amount: ${formatAmount(bill.amount, bill.currency)}
Description: ${bill.description || 'Website Publishing Subscription'}
Status: ${getStatusText(bill.status)}

Transaction Details:
Created: ${formatDate(bill.createdAt)}
${bill.completedAt && bill.status === 'completed' ? `Completed: ${formatDate(bill.completedAt)}` : ''}

Plan Details:
${bill.notes?.plan ? `Plan: ${bill.notes.plan}` : ''}
${bill.notes?.days ? `Duration: ${bill.notes.days} days` : ''}

Thank you for your business!
      `.trim();
      
      const blob = new Blob([invoiceData], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `invoice_${bill.paymentId || bill.razorpayPaymentId || bill.orderId || 'unknown'}.txt`;
      a.click();
      window.URL.revokeObjectURL(url);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading billing history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-200/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => window.history.back()}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 shadow-sm"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Billing History</h1>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={loadBillingHistory}
                disabled={loading}
                className="inline-flex items-center px-4 py-2 border border-indigo-300 text-sm font-medium rounded-lg text-indigo-700 bg-indigo-50 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 shadow-sm disabled:opacity-50"
              >
                <svg className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                {loading ? 'Refreshing...' : 'Refresh'}
              </button>
            </div>
          </div>
        </div>
      </header>

              {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Paid</p>
                <p className="text-2xl font-bold text-gray-900">
                  ₹{billingHistory
                    .filter(bill => bill.status === 'completed')
                    .reduce((sum, bill) => sum + (bill.amount / 100), 0)
                    .toLocaleString('en-IN')}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Transactions</p>
                <p className="text-2xl font-bold text-gray-900">{billingHistory.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending Payments</p>
                <p className="text-2xl font-bold text-gray-900">
                  {billingHistory.filter(bill => bill.status === 'pending').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 mb-6">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                     <input
                     type="text"
                     placeholder="Search by description, payment ID, or order ID..."
                     value={searchTerm}
                     onChange={(e) => setSearchTerm(e.target.value)}
                     className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                   />
                </div>
              </div>

              {/* Filter */}
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-gray-400" />
                                 <select
                   value={filter}
                   onChange={(e) => setFilter(e.target.value)}
                   className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                 >
                  <option value="all">All Transactions</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                  <option value="failed">Failed</option>
                </select>
              </div>
            </div>
          </div>

          {/* Billing History Table */}
          
          {/* No payments message */}
          {billingHistory.length === 0 && !loading && (
            <div className="p-12 text-center">
              <CreditCard className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Payment History</h3>
              <p className="text-gray-500 mb-4">You haven&apos;t made any payments yet. Your billing history will appear here after you subscribe to a plan.</p>
              <button
                onClick={() => window.history.back()}
                className="inline-flex items-center px-4 py-2 border border-indigo-300 text-sm font-medium rounded-lg text-indigo-700 bg-indigo-50 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </button>
            </div>
          )}
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Transaction
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBillingHistory.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                      <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-lg font-medium">No transactions found</p>
                      <p className="text-sm">Try adjusting your search or filter criteria</p>
                    </td>
                  </tr>
                ) : (
                  filteredBillingHistory.map((bill) => (
                    <tr key={bill.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                                                 <div>
                           <div className="text-sm font-medium text-gray-900">
                             {bill.description || `Website Publishing - ${bill.notes?.plan || 'Subscription'}`}
                           </div>
                           <div className="text-sm text-gray-500 space-y-1">
                             <div>Payment ID: {bill.paymentId || bill.razorpayPaymentId || 'N/A'}</div>
                             <div>Order ID: {bill.orderId || bill.razorpayOrderId || 'N/A'}</div>
                             {bill.notes?.plan && <div>Plan: {bill.notes.plan}</div>}
                             {bill.notes?.days && <div>Duration: {bill.notes.days} days</div>}
                           </div>
                         </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {formatAmount(bill.amount, bill.currency)}
                        </div>
                        <div className="text-sm text-gray-500">
                          {bill.currency}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          {getStatusIcon(bill.status)}
                          <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(bill.status)}`}>
                            {getStatusText(bill.status)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {formatDate(bill.createdAt)}
                        </div>
                        {bill.completedAt && bill.status === 'completed' && (
                          <div className="text-sm text-gray-500">
                            Completed: {formatDate(bill.completedAt)}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                                                 <button
                           onClick={() => downloadInvoice(bill)}
                           className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
                         >
                          <Download className="h-4 w-4 mr-1" />
                          Invoice
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BillingHistoryPage() {
  return (
    <ProtectedRoute>
      <BillingHistoryContent />
    </ProtectedRoute>
  );
}
