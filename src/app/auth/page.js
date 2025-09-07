'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigation } from '@/contexts/NavigationContext';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';
import { useRouter } from 'next/navigation';
import useNotification from '@/hooks/useNotification';
import NotificationContainer from '@/components/ui/NotificationContainer';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { login, register } = useAuth();
  const { navigateWithLoader } = useNavigation();
  const router = useRouter();
  const { notifications, showSuccess, showError, removeNotification } = useNotification();

  const handleLogin = async (credentials) => {
    setIsLoading(true);
    
    try {
      const result = await login(credentials);
      
      if (result.success) {
        await navigateWithLoader(router, '/dashboard');
      } else {
        showError(result.error);
      }
    } catch (error) {
      showError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (userData) => {
    setIsLoading(true);
    
    try {
      const result = await register(userData);
      
      if (result.success) {
        await navigateWithLoader(router, '/dashboard');
      } else {
        showError(result.error);
      }
    } catch (error) {
      showError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const switchToLogin = () => {
    setIsLogin(true);
  };

  const switchToRegister = () => {
    setIsLogin(false);
  };

  const handleForgotPassword = async (email) => {
    setIsLoading(true);
    
    try {
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://micropage.onrender.com/api';
      const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send reset email');
      }

      // Show success message
      showSuccess('🎉 Password reset link sent successfully! Please check your email inbox and spam folder for the reset URL.');
    } catch (error) {
      showError(error.message || 'Failed to send reset email');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Notification Container */}
      <NotificationContainer 
        notifications={notifications} 
        onRemove={removeNotification} 
      />

      {/* Auth Forms */}
      <div className="transition-all duration-300 ease-in-out">
        {isLogin ? (
          <LoginForm
            onLogin={handleLogin}
            onSwitchToRegister={switchToRegister}
            onForgotPassword={handleForgotPassword}
            isLoading={isLoading}
          />
        ) : (
          <RegisterForm
            onRegister={handleRegister}
            onSwitchToLogin={switchToLogin}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
}
