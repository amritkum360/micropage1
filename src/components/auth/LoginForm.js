'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const LoginForm = ({ onLogin, onSwitchToRegister, onForgotPassword, isLoading }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [forgotPasswordLoading, setForgotPasswordLoading] = useState(false);
  const [forgotPasswordSuccess, setForgotPasswordSuccess] = useState(false);
  const [forgotPasswordError, setForgotPasswordError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    onLogin(formData);
  };

  const handleForgotPasswordClick = (e) => {
    e.preventDefault();
    setForgotPasswordEmail(formData.email || '');
    setShowForgotPasswordModal(true);
    setForgotPasswordError('');
    setForgotPasswordSuccess(false);
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    
    if (!forgotPasswordEmail) {
      setForgotPasswordError('Please enter your email address');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(forgotPasswordEmail)) {
      setForgotPasswordError('Please enter a valid email address');
      return;
    }

    setForgotPasswordLoading(true);
    setForgotPasswordError('');

    try {
      await onForgotPassword(forgotPasswordEmail);
      setForgotPasswordSuccess(true);
      setTimeout(() => {
        setShowForgotPasswordModal(false);
        setForgotPasswordSuccess(false);
      }, 3000);
    } catch (error) {
      setForgotPasswordError(error.message || 'Failed to send reset email');
    } finally {
      setForgotPasswordLoading(false);
    }
  };

  const closeModal = () => {
    setShowForgotPasswordModal(false);
    setForgotPasswordError('');
    setForgotPasswordSuccess(false);
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg w-full">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg mb-6 text-4xl">
              🔑
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-3 font-heading">
              Welcome Back
            </h1>
            <p className="text-lg text-gray-600 font-body">
              Sign in to continue building your amazing website
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-black-100 p-8 border-2 border-dashed">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2 font-body">
                  📧 Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                    📧
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className={`block w-full pl-12 pr-4 py-3 border-2 rounded-xl text-gray-900 placeholder-gray-500 transition-all duration-200 ${
                      errors.email 
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                        : 'border-gray-200 focus:border-blue-500 focus:ring-blue-200'
                    } focus:outline-none focus:ring-4 font-body`}
                    placeholder="Enter your email address"
                  />
                </div>
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600 font-body flex items-center">
                    <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2 font-body">
                  🔒 Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                    🔒
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className={`block w-full pl-12 pr-12 py-3 border-2 rounded-xl text-gray-900 placeholder-gray-500 transition-all duration-200 ${
                      errors.password 
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                        : 'border-gray-200 focus:border-blue-500 focus:ring-blue-200'
                    } focus:outline-none focus:ring-4 font-body`}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <span className="text-lg">🙈</span>
                    ) : (
                      <span className="text-lg">👁️</span>
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-2 text-sm text-red-600 font-body flex items-center">
                    <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-700 font-body">
                    Remember me
                  </label>
                </div>

                <button
                  type="button"
                  onClick={handleForgotPasswordClick}
                  className="text-sm text-blue-600 hover:text-blue-700 font-semibold transition-colors font-body"
                >
                  Forgot password?
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl font-body"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Signing you in...
                  </div>
                ) : (
                  <span className="flex items-center justify-center">
                    🛡️ Sign In
                  </span>
                )}
              </button>
            </form>

            {/* Switch to Register */}
            <div className="mt-8 text-center">
              <p className="text-gray-600 font-body">
                Don&apos;t have an account?{' '}
                <button
                  onClick={onSwitchToRegister}
                  className="text-blue-600 hover:text-blue-700 font-semibold transition-colors font-body"
                >
                  Create one here
                </button>
              </p>
            </div>
          </div>

          {/* Features Preview */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2 text-lg">
                🌐
              </div>
              <p className="text-sm text-gray-700 font-body">Single Page</p>
            </div>
            <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-2 text-lg">
                ⚡
              </div>
              <p className="text-sm text-gray-700 font-body">Lightning Fast</p>
            </div>
            <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2 text-lg">
                ⭐
              </div>
              <p className="text-sm text-gray-700 font-body">Premium</p>
            </div>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-lg hover:bg-gray-100"
            >
              ❌
            </button>

            {/* Header */}
            <div className="text-center mb-6">
              <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 mb-4 text-4xl">
                📧
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2 font-heading">
                Reset Your Password
              </h3>
              <p className="text-gray-600 font-body">
                Enter your email address and we&apos;ll send you a link to reset your password.
              </p>
            </div>

            {/* Success Message */}
            {forgotPasswordSuccess && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">✅</span>
                  <p className="text-sm font-medium text-green-800 font-body">
                    Reset link sent successfully! Check your backend console for the URL.
                  </p>
                </div>
              </div>
            )}

            {/* Error Message */}
            {forgotPasswordError && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">❌</span>
                  <p className="text-sm text-gray-700 font-body">
                    {forgotPasswordError}
                  </p>
                </div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleForgotPasswordSubmit} className="space-y-6">
              <div>
                <label htmlFor="forgot-email" className="block text-sm font-semibold text-gray-700 mb-2 font-body">
                  📧 Email Address
                </label>
                <input
                  id="forgot-email"
                  type="email"
                  value={forgotPasswordEmail}
                  onChange={(e) => setForgotPasswordEmail(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 font-body"
                  placeholder="Enter your email address"
                  disabled={forgotPasswordLoading}
                />
              </div>

              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-200 transition-all duration-200 font-body"
                  disabled={forgotPasswordLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={forgotPasswordLoading}
                  className="flex-1 px-4 py-3 border-2 border-transparent rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-body"
                >
                  {forgotPasswordLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Sending...
                    </div>
                  ) : (
                    'Send Reset Link'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginForm;
