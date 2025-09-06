'use client';

import { useState } from 'react';

export default function SubscriptionStatus({ 
  subscription, 
  showExpiryWarning, 
  daysUntilExpiry, 
  onRenew,
  handleShowSubscriptionModal,
  user 
}) {
  if (!subscription) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 sm:p-4 md:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          {/* Left Section */}
          <div className="flex items-center">
            <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
            <span className="text-sm md:text-base font-medium text-yellow-800">
              No Publishing Plan
            </span>
          </div>

          {/* Right Section */}
          <button 
            onClick={handleShowSubscriptionModal}
            className="text-sm md:text-base text-orange-600 hover:text-orange-700 font-medium px-3 py-1 border border-orange-200 rounded hover:bg-orange-50 w-full sm:w-auto transition-colors"
          >
            Subscribe Now
          </button>
        </div>

        <div className="text-xs md:text-sm text-yellow-600 mt-2 sm:mt-1">
          Subscribe to publish your website - Starting from ₹199/month
        </div>
      </div>
    );
  }

  return (
    <div
      className={`border rounded-lg p-2 sm:p-3 md:p-4 ${
        showExpiryWarning
          ? "bg-orange-50 border-orange-200"
          : "bg-green-50 border-green-200"
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        {/* Left side: Status */}
        <div className="flex items-center">
          <div
            className={`w-2 h-2 rounded-full mr-2 ${
              showExpiryWarning ? "bg-orange-500" : "bg-green-500"
            }`}
          ></div>
          <span
            className={`text-xs sm:text-sm md:text-base font-medium ${
              showExpiryWarning ? "text-orange-800" : "text-green-800"
            }`}
          >
            {showExpiryWarning ? "Expiring Soon" : "Publishing Active"}
          </span>
        </div>

        {/* Right side: Button */}
        <button
          onClick={onRenew}
          className={`text-xs sm:text-sm md:text-base font-medium px-3 py-1 border rounded hover:bg-opacity-80 w-full sm:w-auto transition-colors ${
            showExpiryWarning
              ? "text-orange-600 hover:text-orange-700 border-orange-200 hover:bg-orange-100"
              : "text-green-600 hover:text-green-700 border-green-200 hover:bg-green-100"
          }`}
        >
          Renew
        </button>
      </div>

      {/* Expiry info */}
      <div
        className={`text-xs sm:text-sm md:text-base mt-2 sm:mt-1 ${
          showExpiryWarning ? "text-orange-600" : "text-green-600"
        }`}
      >
        Expires: {new Date(subscription.expiresAt).toLocaleDateString()}
        {showExpiryWarning && (
          <span className="ml-2 font-medium">
            ({daysUntilExpiry} day{daysUntilExpiry > 1 ? "s" : ""} left)
          </span>
        )}
      </div>
    </div>
  );
}
