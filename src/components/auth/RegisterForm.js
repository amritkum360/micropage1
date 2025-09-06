'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const RegisterForm = ({ onRegister, onSwitchToLogin, isLoading }) => {
  const [formData, setFormData] = useState({
    phone: '',
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

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
    
    // Validate mobile number (Indian format: 10 digits starting with 6-9)
    if (!formData.phone) {
      newErrors.phone = 'Mobile number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number';
    }
    
    // Validate full name
    if (!formData.fullName) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    } else if (!/^[a-zA-Z\s]+$/.test(formData.fullName)) {
      newErrors.fullName = 'Full name can only contain letters and spaces';
    }
    
    // Validate Gmail (must end with @gmail.com)
    if (!formData.email) {
      newErrors.email = 'Gmail address is required';
    } else if (!formData.email.endsWith('@gmail.com')) {
      newErrors.email = 'Please use a valid Gmail address (@gmail.com)';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    onRegister(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg mb-6 text-4xl">
            ✨
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3 font-heading">
            Create Your Account
          </h1>
          <p className="text-lg text-gray-600 font-body">
            Join thousands of creators building amazing single-page websites
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-black p-8 border-2 border-dashed">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name Field */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-2 font-body">
                👤 Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  👤
                </div>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`block w-full pl-12 pr-4 py-3 border-2 rounded-xl text-gray-900 placeholder-gray-500 transition-all duration-200 ${
                    errors.fullName 
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                      : 'border-gray-200 focus:border-blue-500 focus:ring-blue-200'
                  } focus:outline-none focus:ring-4 font-body`}
                  placeholder="Enter your full name"
                />
              </div>
              {errors.fullName && (
                <p className="mt-2 text-sm text-red-600 font-body flex items-center">
                  <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                  {errors.fullName}
                </p>
              )}
            </div>

            {/* Mobile Number Field */}
            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2 font-body">
                📱 Mobile Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  📱
                </div>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className={`block w-full pl-12 pr-4 py-3 border-2 rounded-xl text-gray-900 placeholder-gray-500 transition-all duration-200 ${
                    errors.phone 
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                      : 'border-gray-200 focus:border-blue-500 focus:ring-blue-200'
                  } focus:outline-none focus:ring-4 font-body`}
                  placeholder="Enter your mobile number"
                  maxLength="10"
                />
              </div>
              {errors.phone && (
                <p className="mt-2 text-sm text-red-600 font-body flex items-center">
                  <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                  {errors.phone}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2 font-body">
                📧 Gmail Address
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
                  placeholder="Enter your Gmail address"
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
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className={`block w-full pl-12 pr-12 py-3 border-2 rounded-xl text-gray-900 placeholder-gray-500 transition-all duration-200 ${
                    errors.password 
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                      : 'border-gray-200 focus:border-blue-500 focus:ring-blue-200'
                  } focus:outline-none focus:ring-4 font-body`}
                  placeholder="Create a strong password"
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

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2 font-body">
                🛡️ Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  🛡️
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`block w-full pl-12 pr-12 py-3 border-2 rounded-xl text-gray-900 placeholder-gray-500 transition-all duration-200 ${
                    errors.confirmPassword 
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                      : 'border-gray-200 focus:border-blue-500 focus:ring-blue-200'
                  } focus:outline-none focus:ring-4 font-body`}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <span className="text-lg">🙈</span>
                  ) : (
                    <span className="text-lg">👁️</span>
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-2 text-sm text-red-600 font-body flex items-center">
                  <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start space-x-3 pt-2">
              <input
                id="agree-terms"
                name="agree-terms"
                type="checkbox"
                required
                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-0.5"
              />
              <label htmlFor="agree-terms" className="text-sm text-gray-700 font-body leading-relaxed">
                I agree to the{' '}
                <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold underline">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold underline">
                  Privacy Policy
                </a>
              </label>
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
                  Creating your account...
                </div>
              ) : (
                <span className="flex items-center justify-center">
                  ⭐ Create Account
                </span>
              )}
            </button>
          </form>

          {/* Switch to Login */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 font-body">
              Already have an account?{' '}
              <button
                onClick={onSwitchToLogin}
                className="text-blue-600 hover:text-blue-700 font-semibold transition-colors font-body"
              >
                Sign in here
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
  );
};

export default RegisterForm;
