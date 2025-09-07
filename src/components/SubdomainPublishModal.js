'use client';

import { useState, useEffect } from 'react';
import { X, Globe, Check, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function SubdomainPublishModal({ 
  isOpen, 
  onClose, 
  websiteId, 
  onPublishSuccess 
}) {
  const { publishWebsite, checkSubdomain } = useAuth();
  const [subdomain, setSubdomain] = useState('');
  const [customDomain, setCustomDomain] = useState('');
  const [publishing, setPublishing] = useState(false);
  const [checkingSubdomain, setCheckingSubdomain] = useState(false);
  const [subdomainStatus, setSubdomainStatus] = useState(null);
  const [domainType, setDomainType] = useState('subdomain'); // 'subdomain' or 'custom'

  useEffect(() => {
    if (isOpen) {
      setSubdomain('');
      setCustomDomain('');
      setSubdomainStatus(null);
      setDomainType('subdomain');
    }
  }, [isOpen]);

  const handleSubdomainChange = async (value) => {
    setSubdomain(value);
    
    if (value.length < 3) {
      setSubdomainStatus(null);
      return;
    }

    setCheckingSubdomain(true);
    try {
      const result = await checkSubdomain(value);
      setSubdomainStatus(result);
    } catch (error) {
      setSubdomainStatus({
        available: false,
        message: 'Error checking subdomain'
      });
    } finally {
      setCheckingSubdomain(false);
    }
  };

  const handlePublish = async () => {
    if (domainType === 'subdomain' && (!subdomain || !subdomainStatus?.available)) {
      return;
    }

    if (domainType === 'custom' && !customDomain) {
      return;
    }

    setPublishing(true);
    try {
      const result = await publishWebsite(
        websiteId, 
        domainType === 'subdomain' ? subdomain : null,
        domainType === 'custom' ? customDomain : null
      );
      
      onPublishSuccess(result);
      onClose();
    } catch (error) {
      console.error('Publish error:', error);
      // Error will be handled by the parent component
    } finally {
      setPublishing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Publish Website</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Domain Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Choose how to publish your website:
            </label>
            <div className="space-y-3">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="domainType"
                  value="subdomain"
                  checked={domainType === 'subdomain'}
                  onChange={(e) => setDomainType(e.target.value)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                />
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4 text-indigo-600" />
                  <span className="text-sm text-gray-700">Subdomain (free)</span>
                </div>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="domainType"
                  value="custom"
                  checked={domainType === 'custom'}
                  onChange={(e) => setDomainType(e.target.value)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                />
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4 text-indigo-600" />
                  <span className="text-sm text-gray-700">Custom Domain</span>
                </div>
              </label>
            </div>
          </div>

          {/* Subdomain Input */}
          {domainType === 'subdomain' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subdomain
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={subdomain}
                  onChange={(e) => handleSubdomainChange(e.target.value)}
                  placeholder="yourname"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  {checkingSubdomain ? (
                    <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                  ) : subdomainStatus ? (
                    subdomainStatus.available ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-red-500" />
                    )
                  ) : null}
                </div>
              </div>
              <div className="mt-1 text-sm text-gray-500">
                Your website will be available at: <span className="font-mono">
                  {subdomain ? `${subdomain}.jirocash.com` : 'yourname.jirocash.com'}
                </span>
              </div>
              {subdomainStatus && (
                <div className={`mt-2 text-sm ${
                  subdomainStatus.available ? 'text-green-600' : 'text-red-600'
                }`}>
                  {subdomainStatus.message}
                </div>
              )}
            </div>
          )}

          {/* Custom Domain Input */}
          {domainType === 'custom' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Custom Domain
              </label>
              <input
                type="text"
                value={customDomain}
                onChange={(e) => setCustomDomain(e.target.value)}
                placeholder="yourdomain.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <div className="mt-1 text-sm text-gray-500">
                Make sure your domain points to our servers
              </div>
            </div>
          )}

          {/* Publish Button */}
          <div className="flex space-x-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handlePublish}
              disabled={
                publishing || 
                (domainType === 'subdomain' && (!subdomain || !subdomainStatus?.available)) ||
                (domainType === 'custom' && !customDomain)
              }
              className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
            >
              {publishing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Publishing...
                </>
              ) : (
                'Publish Website'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
