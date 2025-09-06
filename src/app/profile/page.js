'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigation } from '@/contexts/NavigationContext';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import useSubscription from '../dashboard/subscriptions/useSubscription';
import SubscriptionModal from '../dashboard/subscriptions/SubscriptionModal';
import RenewModal from '../dashboard/subscriptions/RenewModal';
import { 
  ArrowLeft,
  Eye,
  EyeOff
} from 'lucide-react';

function ProfileContent() {
  const { user, logout, updateProfile, token, getProfile } = useAuth();
  const { navigateWithLoader } = useNavigation();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showProfilePasswordModal, setShowProfilePasswordModal] = useState(false);
  const [profilePassword, setProfilePassword] = useState('');
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [formData, setFormData] = useState({
    phone: '',
    fullName: '',
    email: ''
  });
  const router = useRouter();

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

  useEffect(() => {
    if (user) {
      setFormData({
        phone: user.phone || '',
        fullName: user.fullName || '',
        email: user.email || ''
      });
    }
    loadSubscription();
  }, [user]);

  const handleBackToDashboard = () => {
    navigateWithLoader(router, '/dashboard');
  };

  const handleEdit = () => {
    setIsEditing(true);
    setError('');
    setSuccess('');
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      phone: user.phone || '',
      fullName: user.fullName || '',
      email: user.email || ''
    });
    setError('');
    setSuccess('');
  };

  const handleSave = () => {
    // Show password confirmation modal instead of directly saving
    setShowProfilePasswordModal(true);
    setProfilePassword('');
    setError('');
    setSuccess('');
  };

  const handleConfirmProfileSave = async () => {
    if (!profilePassword) {
      setError('Please enter your password to confirm changes');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // First verify the password
      const response = await fetch(`${API_BASE_URL}/auth/verify-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          password: profilePassword
        }),
      });

      if (!response.ok) {
        throw new Error('Incorrect password. Please try again.');
      }

      // If password is correct, update the profile
      await updateProfile(formData);
      
      // Refresh profile data to ensure we have the latest information
      await getProfile();
      
      setSuccess('Profile updated successfully!');
      setIsEditing(false);
      setShowProfilePasswordModal(false);
      setProfilePassword('');
    } catch (error) {
      setError(error.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelProfilePassword = () => {
    setShowProfilePasswordModal(false);
    setProfilePassword('');
    setError('');
  };

  const handleLogout = () => {
    logout();
    navigateWithLoader(router, '/auth');
  };

  const handlePasswordReset = () => {
    setShowPasswordModal(true);
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setShowPasswords({
      current: false,
      new: false,
      confirm: false
    });
    setPasswordError('');
    setPasswordSuccess('');
  };

  const handleClosePasswordModal = () => {
    setShowPasswordModal(false);
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setShowPasswords({
      current: false,
      new: false,
      confirm: false
    });
    setPasswordError('');
    setPasswordSuccess('');
  };

  // API base URL
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

  const handlePasswordChange = async () => {
    setPasswordLoading(true);
    setPasswordError('');
    setPasswordSuccess('');

    // Validation
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      setPasswordError('All fields are required');
      setPasswordLoading(false);
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError('New passwords do not match');
      setPasswordLoading(false);
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters long');
      setPasswordLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to reset password');
      }

      setPasswordSuccess('Password updated successfully!');
      setTimeout(() => {
        handleClosePasswordModal();
      }, 2000);
    } catch (error) {
      setPasswordError(error.message || 'Failed to reset password');
    } finally {
      setPasswordLoading(false);
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '-';
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getSubscriptionStatus = () => {
    if (!subscription) return { status: 'No Subscription', color: 'bg-gray-100 text-gray-800' };
    
    if (subscription.status === 'active') {
      const expiryDate = new Date(subscription.expiresAt);
      const now = new Date();
      if (now > expiryDate) {
        return { status: 'Expired', color: 'bg-red-100 text-red-800' };
      }
      return { status: 'Active', color: 'bg-green-100 text-green-800' };
    }
    
    return { status: subscription.status || 'Inactive', color: 'bg-yellow-100 text-yellow-800' };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-200/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBackToDashboard}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 shadow-sm"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </button>
              <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Success/Error Messages */}
        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4 shadow-sm">
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">✓</span>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-green-800">{success}</p>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 shadow-sm">
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="w-6 h-6 bg-red-400 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">✕</span>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-red-800">{error}</p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              {/* Profile Header */}
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                                          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm text-4xl">
                        👤
                      </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">
                        {user?.fullName || 'User Profile'}
                      </h2>
                      <p className="text-indigo-100">Manage your account information</p>
                    </div>
                  </div>
                  {!isEditing && (
                    <button
                      onClick={handleEdit}
                      className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 text-sm font-medium rounded-lg text-white hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-all duration-200"
                    >
                      ✏️ Edit Profile
                    </button>
                  )}
                </div>
              </div>

              {/* Profile Information */}
              <div className="px-6 py-8">
                <div className="space-y-6">

                   {/* Full Name */}
                   <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                      👤 Full Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                        placeholder="Enter your full name"
                      />
                    ) : (
                      <p className="text-lg text-gray-900 bg-gray-50 px-4 py-3 rounded-lg border border-gray-200">
                        {user?.fullName || 'Not set'}
                      </p>
                    )}
                  </div>



               

                 

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                      📧 Email Address
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                        placeholder="Enter email address"
                      />
                    ) : (
                      <p className="text-lg text-gray-900 bg-gray-50 px-4 py-3 rounded-lg border border-gray-200">
                        {user?.email || 'Not set'}
                      </p>
                    )}
                  </div>

                                     {/* Phone */}
                   <div>
                     <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                       📱 Phone Number
                     </label>
                     {isEditing ? (
                       <input
                         type="tel"
                         value={formData.phone}
                         onChange={(e) => setFormData({...formData, phone: e.target.value})}
                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                         placeholder="Enter phone number"
                       />
                     ) : (
                       <p className="text-lg text-gray-900 bg-gray-50 px-4 py-3 rounded-lg border border-gray-200">
                         {user?.phone || 'Not set'}
                       </p>
                     )}
                   </div>

                                       {/* Password Reset Button */}
                    <div className="pt-4 border-t border-gray-200">
                      <div className="flex space-x-3">
                        <button
                          onClick={handlePasswordReset}
                          className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 shadow-sm"
                        >
                                                     🔒 Change Password
                        </button>
                        <button
                          onClick={handleLogout}
                          className="inline-flex items-center px-4 py-2 border border-red-300 text-sm font-medium rounded-lg text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200 shadow-sm"
                        >
                                                     🚪 Logout
                        </button>
                      </div>
                    </div>
                </div>

                {/* Action Buttons */}
                {isEditing && (
                  <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end space-x-3">
                    <button
                      onClick={handleCancel}
                      className="px-6 py-3 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all duration-200 shadow-sm"
                    >
                                             ❌ Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={loading}
                      className="px-6 py-3 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-all duration-200 shadow-sm"
                    >
                                             💾 {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Subscription Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-500 to-pink-600 px-6 py-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm text-2xl">
                    👑
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Subscription</h3>
                    <p className="text-purple-100 text-sm">Your plan details</p>
                  </div>
                </div>
              </div>

              <div className="px-6 py-6">
                <div className="space-y-4">
                  {/* Status */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                    <span className={`inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium ${getSubscriptionStatus().color}`}>
                      {getSubscriptionStatus().status}
                    </span>
                  </div>

                  {/* Plan */}
                   {/* <div>
                     <label className="block text-sm font-semibold text-gray-700 mb-2">Plan</label>
                     <p className="text-lg text-gray-900 bg-gray-50 px-4 py-3 rounded-lg border border-gray-200">
                       {subscription?.plan?.name || 'Free Plan'}
                     </p>
                   </div> */}

                   {/* Expiry Date */}
                   {subscription?.expiresAt && (
                     <div>
                       <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                         📅 Expires On
                       </label>
                       <p className="text-lg text-gray-900 bg-gray-50 px-4 py-3 rounded-lg border border-gray-200">
                         {formatDate(subscription.expiresAt)}
                       </p>
                     </div>
                   )}

                   {/* Days Until Expiry */}
                   {daysUntilExpiry !== null && daysUntilExpiry > 0 && (
                     <div>
                       <label className="block text-sm font-semibold text-gray-700 mb-2">Days Remaining</label>
                       <p className="text-lg text-gray-900 bg-gray-50 px-4 py-3 rounded-lg border border-gray-200">
                         {daysUntilExpiry} days
                       </p>
                     </div>
                   )}

                   {/* Upgrade Button */}
                   {(!subscription || subscription.status !== 'active') && (
                     <button
                       onClick={handleShowSubscriptionModal}
                       className="w-full mt-4 inline-flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200 shadow-sm"
                     >
                       💳 Upgrade Plan
                     </button>
                   )}

                   {/* Renew Button */}
                   {subscription && subscription.status === 'active' && daysUntilExpiry <= 7 && (
                     <button
                       onClick={handleShowRenewModal}
                       className="w-full mt-4 inline-flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-200 shadow-sm"
                     >
                       🔄 Renew Subscription
                     </button>
                   )}
                </div>
              </div>
            </div>
          </div>
        </div>
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

       {/* Password Reset Modal */}
       {showPasswordModal && (
         <div className="fixed inset-0 bg-[#dbe2c380] bg-opacity-50 flex items-center justify-center z-50 p-4">
           <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto border-2 border-dashed">
             {/* Modal Header */}
             <div className="px-6 py-4 border-b border-gray-200">
               <div className="flex items-center justify-between">
                 <h3 className="text-lg font-semibold text-gray-900">Change Password</h3>
                 <button
                   onClick={handleClosePasswordModal}
                   className="text-gray-400 hover:text-gray-600 transition-colors"
                 >
                   ❌
                 </button>
               </div>
             </div>

             {/* Modal Content */}
             <div className="px-6 py-4">
               {/* Success/Error Messages */}
               {passwordSuccess && (
                 <div className="mb-4 bg-green-50 border border-green-200 rounded-lg p-3">
                   <p className="text-sm font-medium text-green-800">{passwordSuccess}</p>
                 </div>
               )}

               {passwordError && (
                 <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-3">
                   <p className="text-sm font-medium text-red-800">{passwordError}</p>
                 </div>
               )}

               <div className="space-y-4">
                 {/* Current Password */}
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">
                     Current Password
                   </label>
                   <div className="relative">
                     <input
                       type={showPasswords.current ? 'text' : 'password'}
                       value={passwordData.currentPassword}
                       onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                       placeholder="Enter current password"
                     />
                     <button
                       type="button"
                       onClick={() => togglePasswordVisibility('current')}
                       className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                     >
                       {showPasswords.current ? <span className="text-lg">🙈</span> : <span className="text-lg">👁️</span>}
                     </button>
                   </div>
                 </div>

                 {/* New Password */}
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">
                     New Password
                   </label>
                   <div className="relative">
                     <input
                       type={showPasswords.new ? 'text' : 'password'}
                       value={passwordData.newPassword}
                       onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                       placeholder="Enter new password"
                     />
                     <button
                       type="button"
                       onClick={() => togglePasswordVisibility('new')}
                       className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                     >
                       {showPasswords.new ? <span className="text-lg">🙈</span> : <span className="text-lg">👁️</span>}
                     </button>
                   </div>
                 </div>

                 {/* Confirm New Password */}
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">
                     Confirm New Password
                   </label>
                   <div className="relative">
                     <input
                       type={showPasswords.confirm ? 'text' : 'password'}
                       value={passwordData.confirmPassword}
                       onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                       placeholder="Confirm new password"
                     />
                     <button
                       type="button"
                       onClick={() => togglePasswordVisibility('confirm')}
                       className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                     >
                       {showPasswords.confirm ? <span className="text-lg">🙈</span> : <span className="text-lg">👁️</span>}
                     </button>
                   </div>
                 </div>
               </div>
             </div>

             {/* Modal Footer */}
             <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
               <button
                 onClick={handleClosePasswordModal}
                 className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all duration-200"
               >
                 Cancel
               </button>
               <button
                 onClick={handlePasswordChange}
                 disabled={passwordLoading}
                 className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-all duration-200"
               >
                 {passwordLoading ? 'Updating...' : 'Update Password'}
               </button>
             </div>
           </div>
         </div>
       )}

       {/* Profile Password Confirmation Modal */}
       {showProfilePasswordModal && (
         <div className="fixed inset-0 bg-[#dbe2c380] bg-opacity-50 flex items-center justify-center z-50">
           <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 border-2 border-dashed">
             {/* Modal Header */}
             <div className="px-6 py-4 border-b border-gray-200">
               <div className="flex items-center justify-between">
                 <h3 className="text-lg font-semibold text-gray-900">Confirm Profile Changes</h3>
                 <button
                   onClick={handleCancelProfilePassword}
                   className="text-gray-400 hover:text-gray-600 transition-colors"
                 >
                   ❌
                 </button>
               </div>
             </div>

             {/* Modal Content */}
             <div className="px-6 py-4">
               <p className="text-sm text-gray-600 mb-4">
                 Please enter your password to confirm the profile changes.
               </p>
               
               <div className="space-y-4">
                 {/* Password Input */}
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">
                     Your Password
                   </label>
                   <input
                     type="password"
                     value={profilePassword}
                     onChange={(e) => setProfilePassword(e.target.value)}
                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                     placeholder="Enter your password"
                     onKeyPress={(e) => {
                       if (e.key === 'Enter') {
                         handleConfirmProfileSave();
                       }
                     }}
                   />
                 </div>
               </div>
             </div>

             {/* Modal Footer */}
             <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
               <button
                 onClick={handleCancelProfilePassword}
                 className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all duration-200"
               >
                 Cancel
               </button>
               <button
                 onClick={handleConfirmProfileSave}
                 disabled={loading}
                 className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-all duration-200"
               >
                 {loading ? 'Saving...' : 'Save Changes'}
               </button>
             </div>
           </div>
         </div>
       )}
     </div>
  );
}

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProfileContent />
    </ProtectedRoute>
  );
}
