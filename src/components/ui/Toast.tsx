import React, { useEffect } from 'react';
import { useNotificationStore } from '../../stores/notificationStore';
import type { Notification } from '../../stores/notificationStore';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import { clsx } from 'clsx';

const ToastItem = ({ notification }: { notification: Notification }) => {
  const removeNotification = useNotificationStore(state => state.removeNotification);

  useEffect(() => {
    const timer = setTimeout(() => {
      removeNotification(notification.id);
    }, 5000);
    return () => clearTimeout(timer);
  }, [notification.id, removeNotification]);

  const icons = {
    success: <CheckCircle className="text-green-500" size={20} />,
    error: <AlertCircle className="text-red-500" size={20} />,
    warning: <AlertCircle className="text-orange-500" size={20} />,
    info: <Info className="text-blue-500" size={20} />
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      className="bg-white border border-gray-100 shadow-xl rounded-xl p-4 flex items-start gap-3 w-80 max-w-[calc(100vw-2rem)] pointer-events-auto"
    >
      <div className="flex-shrink-0 mt-0.5">
        {icons[notification.type]}
      </div>
      <div className="flex-grow flex flex-col">
        <p className="text-sm font-medium text-gray-900">{notification.message}</p>
      </div>
      <button 
        onClick={() => removeNotification(notification.id)}
        className="flex-shrink-0 p-1 hover:bg-gray-100 rounded-lg transition-colors -mr-1 -mt-1 text-gray-400 hover:text-gray-600"
      >
        <X size={16} />
      </button>
    </motion.div>
  );
};

const ToastContainer = () => {
  const notifications = useNotificationStore(state => state.notifications);
  // We only show unread or recent notifications in toasts. Actually, let's just show them all in the bottom right and the ones that timeout will be removed.
  // Wait, if they are meant to be a dropdown in the UI as well, maybe we separate toast from notification? 
  // Let's just use the notification store as a toast store for simplicity, or just show them if they are fresh.
  
  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {notifications.slice(0, 5).map(notification => (
          <ToastItem key={notification.id} notification={notification} />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ToastContainer;
