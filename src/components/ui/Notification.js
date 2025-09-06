'use client';

import { useEffect } from 'react';
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Info,
  X 
} from 'lucide-react';

const Notification = ({ 
  type = 'info', 
  message, 
  onClose, 
  autoHide = true, 
  duration = 5000,
  position = 'top-center'
}) => {
  useEffect(() => {
    if (autoHide && message) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [message, autoHide, duration, onClose]);

  if (!message) return null;

  // Notification types and their styles
  const notificationStyles = {
    success: {
      bg: 'bg-green-100',
      border: 'border-green-400',
      text: 'text-green-700',
      icon: 'text-green-400',
      iconComponent: CheckCircle,
      closeButton: 'text-green-400 hover:text-green-600'
    },
    error: {
      bg: 'bg-red-100',
      border: 'border-red-400',
      text: 'text-red-700',
      icon: 'text-red-400',
      iconComponent: XCircle,
      closeButton: 'text-red-400 hover:text-red-600'
    },
    warning: {
      bg: 'bg-yellow-100',
      border: 'border-yellow-400',
      text: 'text-yellow-700',
      icon: 'text-yellow-400',
      iconComponent: AlertTriangle,
      closeButton: 'text-yellow-400 hover:text-yellow-600'
    },
    info: {
      bg: 'bg-blue-100',
      border: 'border-blue-400',
      text: 'text-blue-700',
      icon: 'text-blue-400',
      iconComponent: Info,
      closeButton: 'text-blue-400 hover:text-blue-600'
    }
  };

  // Position classes
  const positionClasses = {
    'top-left': 'top-4 left-4',
    'top-center': 'top-4 left-1/2 transform -translate-x-1/2',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-center': 'bottom-4 left-1/2 transform -translate-x-1/2',
    'bottom-right': 'bottom-4 right-4'
  };

  const styles = notificationStyles[type];
  const IconComponent = styles.iconComponent;

  return (
    <div className={`fixed ${positionClasses[position]} z-[9999]`}>
      <div className={`${styles.bg} border ${styles.border} ${styles.text} px-4 py-3 rounded-md shadow-2xl max-w-md backdrop-blur-sm`}>
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <IconComponent className={`h-5 w-5 ${styles.icon}`} />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium">{message}</p>
          </div>
          <div className="ml-auto pl-3">
            <button
              onClick={onClose}
              className={`inline-flex ${styles.closeButton} transition-colors duration-200`}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
