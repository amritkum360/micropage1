'use client';

export default function ExpiryWarning({ 
  daysUntilExpiry, 
  onDismiss, 
  onRenew 
}) {
  return (
    <div className="mb-6 bg-orange-50 border border-orange-200 rounded-lg p-3 sm:p-4">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-3 lg:space-y-0">
        <div className="flex items-start lg:items-center">
          <svg className="w-5 h-5 text-orange-600 mr-3 flex-shrink-0 mt-0.5 lg:mt-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <div>
            <h3 className="text-sm font-medium text-orange-800">
              Subscription Expiring Soon
            </h3>
            <p className="text-sm text-orange-700 mt-1">
              Your publishing subscription expires in {daysUntilExpiry} day{daysUntilExpiry > 1 ? 's' : ''}. 
              Renew now to keep your website published!
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
          <button
            onClick={onDismiss}
            className="text-orange-600 hover:text-orange-800 text-sm font-medium px-3 py-2 rounded border border-orange-200 hover:bg-orange-100"
          >
            Dismiss
          </button>
          <button
            onClick={onRenew}
            className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Renew Now
          </button>
        </div>
      </div>
    </div>
  );
}
