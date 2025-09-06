'use client';

import Notification from './Notification';

const NotificationContainer = ({ notifications, onRemove }) => {
  return (
    <>
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          type={notification.type}
          message={notification.message}
          autoHide={notification.autoHide}
          duration={notification.duration}
          position={notification.position}
          onClose={() => onRemove(notification.id)}
        />
      ))}
    </>
  );
};

export default NotificationContainer;
