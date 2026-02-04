
import React, { useState, useEffect } from 'react';
import { CheckIcon } from './Icons';

interface ToastProps {
  message: string;
  duration?: number;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, duration = 2000, onClose }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (message) {
      setIsExiting(false);
      const timer = setTimeout(() => {
        setIsExiting(true);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [message, duration]);

  useEffect(() => {
    if (isExiting) {
      const timer = setTimeout(() => {
        onClose();
      }, 500); // Animation duration
      return () => clearTimeout(timer);
    }
  }, [isExiting, onClose]);

  if (!message) {
    return null;
  }

  return (
    <div
      className={`fixed top-20 left-1/2 bg-gray-800 text-white px-5 py-3 rounded-full shadow-lg flex items-center space-x-3 z-50 ${isExiting ? 'animate-toast-out' : 'animate-toast-in'}`}
    >
       <CheckIcon className="w-5 h-5 text-green-400" />
       <span className="text-sm font-medium">{message}</span>
    </div>
  );
};