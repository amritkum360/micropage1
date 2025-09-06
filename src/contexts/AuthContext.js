'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // API base URL
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
  // const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://micropage.onrender.com/api';

  // Check if user is logged in on app start
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    
    setLoading(false);
  }, []);

  // Login function
  const login = async (credentials) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Save to localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // Update state
      setToken(data.token);
      setUser(data.user);

      return { success: true, data };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: userData.phone,
          fullName: userData.fullName,
          email: userData.email,
          password: userData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      // Save to localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // Update state
      setToken(data.token);
      setUser(data.user);

      return { success: true, data };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: error.message };
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  // Get user profile
  const getProfile = async () => {
    if (!token) return null;

    try {
      const response = await fetch(`${API_BASE_URL}/auth/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to get profile');
      }

      const data = await response.json();
      setUser(data);
      localStorage.setItem('user', JSON.stringify(data));
      return data;
    } catch (error) {
      console.error('Get profile error:', error);
      return null;
    }
  };

  // Save website
  const saveWebsite = async (websiteData) => {
    console.log('=== AUTH CONTEXT DEBUG ===');
    console.log('Token:', token);
    console.log('API_BASE_URL:', API_BASE_URL);
    console.log('Website data:', websiteData);
    console.log('==========================');
    
    if (!token) throw new Error('Not authenticated');

    try {
      console.log('Making API call to:', `${API_BASE_URL}/websites`);
      const response = await fetch(`${API_BASE_URL}/websites`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(websiteData),
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Failed to save website');
      }

      // Save domain if subdomain is provided
      if (websiteData.data && websiteData.data.subdomain) {
        try {
          const domainData = {
            websiteId: data.website._id,
            name: websiteData.name,
            subdomain: websiteData.data.subdomain
          };
          
          await saveDomain(domainData);
          console.log('Domain saved successfully');
        } catch (domainError) {
          console.error('Failed to save domain:', domainError);
          // Don't throw error here, website is already saved
        }
      }

      return data;
    } catch (error) {
      console.error('Save website error:', error);
      throw error;
    }
  };

  // Get user's websites
  const getWebsites = async () => {
    if (!token) return [];

    try {
      const response = await fetch(`${API_BASE_URL}/websites`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to get websites');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Get websites error:', error);
      return [];
    }
  };

  // Get single website
  const getWebsite = async (websiteId) => {
    // Wait for authentication to be loaded
    if (loading) {
      throw new Error('Authentication is still loading');
    }
    
    if (!token) {
      throw new Error('Not authenticated');
    }

    try {
      const response = await fetch(`${API_BASE_URL}/websites/${websiteId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Authentication expired');
        }
        throw new Error('Failed to get website');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Get website error:', error);
      throw error;
    }
  };

  // Update website
  const updateWebsite = async (websiteId, websiteData) => {
    if (!token) throw new Error('Not authenticated');

    try {
      const response = await fetch(`${API_BASE_URL}/websites/${websiteId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(websiteData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update website');
      }

      // Update domain if subdomain is provided
      if (websiteData.data && websiteData.data.subdomain) {
        try {
          // First get existing domains to find the domain for this website
          const domains = await getDomains();
          const existingDomain = domains.find(d => d.websiteId === websiteId);
          
          if (existingDomain) {
            // Update existing domain
            await updateDomain(existingDomain._id, {
              name: websiteData.name,
              subdomain: websiteData.data.subdomain
            });
            console.log('Domain updated successfully');
          } else {
            // Create new domain
            const domainData = {
              websiteId: websiteId,
              name: websiteData.name,
              subdomain: websiteData.data.subdomain
            };
            await saveDomain(domainData);
            console.log('Domain created successfully');
          }
        } catch (domainError) {
          console.error('Failed to update domain:', domainError);
          // Don't throw error here, website is already updated
        }
      }

      return data;
    } catch (error) {
      console.error('Update website error:', error);
      throw error;
    }
  };

  // Delete website
  const deleteWebsite = async (websiteId) => {
    if (!token) throw new Error('Not authenticated');

    try {
      const response = await fetch(`${API_BASE_URL}/websites/${websiteId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete website');
      }

      return true;
    } catch (error) {
      console.error('Delete website error:', error);
      throw error;
    }
  };

  // Publish website
  const publishWebsite = async (websiteId) => {
    if (!token) throw new Error('Not authenticated');

    try {
      const response = await fetch(`${API_BASE_URL}/websites/${websiteId}/publish`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to publish website');
      }

      return data;
    } catch (error) {
      console.error('Publish website error:', error);
      throw error;
    }
  };

  // Unpublish website
  const unpublishWebsite = async (websiteId) => {
    if (!token) throw new Error('Not authenticated');

    try {
      const response = await fetch(`${API_BASE_URL}/websites/${websiteId}/unpublish`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to unpublish website');
      }

      return data;
    } catch (error) {
      console.error('Unpublish website error:', error);
      throw error;
    }
  };

  // Get published website (public)
  const getPublishedWebsite = async (websiteId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/websites/published/${websiteId}`);

      if (!response.ok) {
        throw new Error('Website not found or not published');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Get published website error:', error);
      throw error;
    }
  };

  // Get subscription plans
  const getSubscriptionPlans = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/subscriptions/plans`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to get plans');
      }

      return data;
    } catch (error) {
      console.error('Get plans error:', error);
      throw error;
    }
  };

  // Get user subscription
  const getUserSubscription = async () => {
    if (!token) throw new Error('Not authenticated');

    try {
      const response = await fetch(`${API_BASE_URL}/subscriptions`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to get subscription');
      }

      return data;
    } catch (error) {
      console.error('Get subscription error:', error);
      throw error;
    }
  };

  // Create subscription
  const createSubscription = async (duration) => {
    if (!token) throw new Error('Not authenticated');

    try {
      const response = await fetch(`${API_BASE_URL}/subscriptions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ duration }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create subscription');
      }

      return data;
    } catch (error) {
      console.error('Create subscription error:', error);
      throw error;
    }
  };

  // Cancel subscription
  const cancelSubscription = async () => {
    if (!token) throw new Error('Not authenticated');

    try {
      const response = await fetch(`${API_BASE_URL}/subscriptions`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to cancel subscription');
      }

      return data;
    } catch (error) {
      console.error('Cancel subscription error:', error);
      throw error;
    }
  };





  // Check subdomain availability
  const checkSubdomain = async (subdomain) => {
    if (!token) {
      console.log('No token available for subdomain check');
      return {
        available: false,
        message: 'Not authenticated'
      };
    }

    try {
      console.log('Checking subdomain:', subdomain);
      console.log('API URL:', `${API_BASE_URL}/domains/check-subdomain/${subdomain}`);
      
      const response = await fetch(`${API_BASE_URL}/domains/check-subdomain/${subdomain}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Network error' }));
        console.error('API Error:', errorData);
        throw new Error(errorData.message || `HTTP ${response.status}: Failed to check subdomain`);
      }

      const data = await response.json();
      console.log('Subdomain check result:', data);
      return data;
    } catch (error) {
      console.error('Check subdomain error:', error);
      // Return a default response instead of throwing
      return {
        available: false,
        message: error.message || 'Failed to check subdomain'
      };
    }
  };

  // Save domain
  const saveDomain = async (domainData) => {
    if (!token) throw new Error('Not authenticated');

    try {
      const response = await fetch(`${API_BASE_URL}/domains`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(domainData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to save domain');
      }

      return data;
    } catch (error) {
      console.error('Save domain error:', error);
      throw error;
    }
  };

  // Get domains
  const getDomains = async () => {
    if (!token) throw new Error('Not authenticated');

    try {
      const response = await fetch(`${API_BASE_URL}/domains`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to get domains');
      }

      return data;
    } catch (error) {
      console.error('Get domains error:', error);
      throw error;
    }
  };

  // Check domain DNS configuration
  const checkDomainDNS = async (domain) => {
    if (!token) throw new Error('Not authenticated');

    try {
      const response = await fetch(`${API_BASE_URL}/websites/dns/${domain}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to check domain DNS');
      }

      return data;
    } catch (error) {
      console.error('Check domain DNS error:', error);
      throw error;
    }
  };

  // Update domain
  const updateDomain = async (domainId, domainData) => {
    if (!token) throw new Error('Not authenticated');

    try {
      const response = await fetch(`${API_BASE_URL}/domains/${domainId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(domainData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update domain');
      }

      return data;
    } catch (error) {
      console.error('Update domain error:', error);
      throw error;
    }
  };

  // Publish domain
  const publishDomain = async (domainId) => {
    if (!token) throw new Error('Not authenticated');

    try {
      const response = await fetch(`${API_BASE_URL}/domains/${domainId}/publish`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to publish domain');
      }

      return data;
    } catch (error) {
      console.error('Publish domain error:', error);
      throw error;
    }
  };

  // Unpublish domain
  const unpublishDomain = async (domainId) => {
    if (!token) throw new Error('Not authenticated');

    try {
      const response = await fetch(`${API_BASE_URL}/domains/${domainId}/unpublish`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to unpublish domain');
      }

      return data;
    } catch (error) {
      console.error('Unpublish domain error:', error);
      throw error;
    }
  };

  // Update profile
  const updateProfile = async (profileData) => {
    if (!token) throw new Error('Not authenticated');

    try {
      const response = await fetch(`${API_BASE_URL}/auth/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(profileData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update profile');
      }

      // Update local user state and localStorage
      setUser(data.user);
      localStorage.setItem('user', JSON.stringify(data.user));
      return data;
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  };

  // Complete onboarding
  const completeOnboarding = async (onboardingData) => {
    if (!token) throw new Error('Not authenticated');

    try {
      const response = await fetch(`${API_BASE_URL}/auth/complete-onboarding`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(onboardingData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to complete onboarding');
      }

      // Update local user state and localStorage
      setUser(data.user);
      localStorage.setItem('user', JSON.stringify(data.user));
      return data;
    } catch (error) {
      console.error('Complete onboarding error:', error);
      throw error;
    }
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    getProfile,
    saveWebsite,
    getWebsites,
    getWebsite,
    updateWebsite,
    deleteWebsite,
    publishWebsite,
    unpublishWebsite,
    getPublishedWebsite,
    getUserSubscription,
    getSubscriptionPlans,
    createSubscription,
    cancelSubscription,
    checkSubdomain,
    saveDomain,
    getDomains,
    updateDomain,
    publishDomain,
    unpublishDomain,
    checkDomainDNS,
    updateProfile,
    completeOnboarding,
    isAuthenticated: !!token,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
