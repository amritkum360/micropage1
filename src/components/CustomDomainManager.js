'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export default function CustomDomainManager({ website, onUpdate }) {
  const { user } = useAuth();
  const [customDomain, setCustomDomain] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  useEffect(() => {
    if (website?.data?.customDomain) {
      setCustomDomain(website.data.customDomain);
    }
  }, [website]);

  const handleSaveCustomDomain = async () => {
    if (!customDomain.trim()) {
      setMessage('Please enter a domain');
      setMessageType('error');
      return;
    }

    // Basic domain validation
    const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]?\.[a-zA-Z]{2,}$/;
    if (!domainRegex.test(customDomain)) {
      setMessage('Please enter a valid domain (e.g., example.com)');
      setMessageType('error');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const response = await fetch(`/api/websites/${website._id}/custom-domain`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({ customDomain: customDomain.trim() })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Custom domain saved successfully!');
        setMessageType('success');
        onUpdate && onUpdate();
      } else {
        setMessage(data.message || 'Failed to save custom domain');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Error saving custom domain:', error);
      setMessage('Failed to save custom domain');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveCustomDomain = async () => {
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch(`/api/websites/${website._id}/custom-domain`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });

      const data = await response.json();

      if (response.ok) {
        setCustomDomain('');
        setMessage('Custom domain removed successfully!');
        setMessageType('success');
        onUpdate && onUpdate();
      } else {
        setMessage(data.message || 'Failed to remove custom domain');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Error removing custom domain:', error);
      setMessage('Failed to remove custom domain');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Custom Domain</h3>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="customDomain" className="block text-sm font-medium text-gray-700 mb-2">
            Your Domain
          </label>
          <input
            type="text"
            id="customDomain"
            value={customDomain}
            onChange={(e) => setCustomDomain(e.target.value)}
            placeholder="example.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            disabled={loading}
          />
          <p className="text-sm text-gray-500 mt-1">
            Enter your custom domain (e.g., example.com, mywebsite.com)
          </p>
        </div>

        {message && (
          <div className={`p-3 rounded-md ${
            messageType === 'success' 
              ? 'bg-green-50 text-green-700 border border-green-200' 
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            {message}
          </div>
        )}

        <div className="flex space-x-3">
          <button
            onClick={handleSaveCustomDomain}
            disabled={loading}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Saving...' : 'Save Domain'}
          </button>
          
          {website?.data?.customDomain && (
            <button
              onClick={handleRemoveCustomDomain}
              disabled={loading}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Remove Domain
            </button>
          )}
        </div>

        {website?.data?.customDomain && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
            <h4 className="font-medium text-blue-900 mb-2">DNS Configuration</h4>
            <p className="text-sm text-blue-700 mb-2">
              To use your custom domain, add this DNS record:
            </p>
            <div className="bg-white p-3 rounded border font-mono text-sm">
              <div>Type: A</div>
              <div>Name: @ (or your domain)</div>
              <div>Value: [Your Server IP]</div>
              <div>TTL: 300</div>
            </div>
            <p className="text-xs text-blue-600 mt-2">
              Contact your domain provider to add this DNS record.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
