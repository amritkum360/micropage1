'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

const VercelDomainStatus = ({ domain, onStatusUpdate }) => {
  const { token } = useAuth();
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const checkDomainStatus = async () => {
    if (!domain || !token) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/vercel/domains/${encodeURIComponent(domain)}/status`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (response.ok) {
        setStatus(data);
        if (onStatusUpdate) {
          onStatusUpdate(data);
        }
      } else {
        setError(data.message || 'Failed to check domain status');
      }
    } catch (err) {
      setError('Network error while checking domain status');
      console.error('Domain status check error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (domain) {
      checkDomainStatus();
    }
  }, [domain, token]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified':
        return 'text-green-600 bg-green-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'failed':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'verified':
        return 'Verified';
      case 'pending':
        return 'Pending Verification';
      case 'failed':
        return 'Verification Failed';
      default:
        return 'Unknown';
    }
  };

  if (!domain) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-gray-900">Vercel Domain Status</h3>
        <button
          onClick={checkDomainStatus}
          disabled={loading}
          className="text-xs text-indigo-600 hover:text-indigo-800 disabled:opacity-50"
        >
          {loading ? 'Checking...' : 'Refresh'}
        </button>
      </div>

      {error && (
        <div className="mb-3 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-600">
          {error}
        </div>
      )}

      {status && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Domain:</span>
            <span className="text-sm font-medium">{status.domain}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Status:</span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status.status)}`}>
              {getStatusText(status.status)}
            </span>
          </div>

          {status.verification && (
            <div className="mt-3 p-3 bg-gray-50 rounded">
              <h4 className="text-xs font-medium text-gray-700 mb-2">Verification Details:</h4>
              <div className="space-y-1 text-xs text-gray-600">
                {status.verification.type && (
                  <div>Type: {status.verification.type}</div>
                )}
                {status.verification.domain && (
                  <div>Domain: {status.verification.domain}</div>
                )}
                {status.verification.value && (
                  <div>Value: {status.verification.value}</div>
                )}
                {status.verification.reason && (
                  <div>Reason: {status.verification.reason}</div>
                )}
              </div>
            </div>
          )}

          {status.status === 'pending' && (
            <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded">
              <p className="text-xs text-blue-700">
                <strong>Next Steps:</strong> Add the DNS records shown above to your domain provider to complete verification.
              </p>
            </div>
          )}

          {status.status === 'failed' && (
            <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded">
              <p className="text-xs text-red-700">
                <strong>Verification Failed:</strong> Please check your DNS configuration and try again.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VercelDomainStatus;
