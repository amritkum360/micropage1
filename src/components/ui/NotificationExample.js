'use client';

import useNotification from '@/hooks/useNotification';
import NotificationContainer from './NotificationContainer';

// Example component showing how to use notifications
export default function NotificationExample() {
  const { 
    notifications, 
    showSuccess, 
    showError, 
    showWarning, 
    showInfo, 
    removeNotification 
  } = useNotification();

  const handleShowSuccess = () => {
    showSuccess('🎉 Operation completed successfully!');
  };

  const handleShowError = () => {
    showError('❌ Something went wrong. Please try again.');
  };

  const handleShowWarning = () => {
    showWarning('⚠️ Please review your input before proceeding.');
  };

  const handleShowInfo = () => {
    showInfo('ℹ️ Here is some helpful information for you.');
  };

  const handleShowCustomNotification = () => {
    showSuccess('🚀 Custom notification with longer duration!', {
      duration: 10000, // 10 seconds
      position: 'bottom-right',
      autoHide: true
    });
  };

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">Notification Examples</h2>
      
      {/* Notification Container */}
      <NotificationContainer 
        notifications={notifications} 
        onRemove={removeNotification} 
      />

      {/* Demo Buttons */}
      <div className="space-y-2">
        <button
          onClick={handleShowSuccess}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Show Success
        </button>
        
        <button
          onClick={handleShowError}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 ml-2"
        >
          Show Error
        </button>
        
        <button
          onClick={handleShowWarning}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 ml-2"
        >
          Show Warning
        </button>
        
        <button
          onClick={handleShowInfo}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ml-2"
        >
          Show Info
        </button>
        
        <button
          onClick={handleShowCustomNotification}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 ml-2"
        >
          Custom Notification
        </button>
      </div>

      <div className="mt-4 p-4 bg-gray-100 rounded">
        <h3 className="font-semibold">Usage Instructions:</h3>
        <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
          <li><code>showSuccess(message, options)</code> - Green success message</li>
          <li><code>showError(message, options)</code> - Red error message</li>
          <li><code>showWarning(message, options)</code> - Yellow warning message</li>
          <li><code>showInfo(message, options)</code> - Blue info message</li>
          <li><strong>Options:</strong> duration, position, autoHide</li>
          <li><strong>Positions:</strong> top-left, top-center, top-right, bottom-left, bottom-center, bottom-right</li>
        </ul>
      </div>
    </div>
  );
}
