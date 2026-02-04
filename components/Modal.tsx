
import React from 'react';
import { CheckBadgeIcon } from './Icons';

interface ModalProps {
  isVisible: boolean;
  onConfirm: () => void;
  onClose: () => void;
  title: string;
  message: string;
  confirmText: string;
}

export const Modal: React.FC<ModalProps> = ({ isVisible, onConfirm, onClose, title, message, confirmText }) => {
  if (!isVisible) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-lg shadow-xl p-6 sm:p-8 text-center max-w-sm w-full relative transform transition-all" role="document">
        <button 
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          aria-label="Close modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <CheckBadgeIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />

        <h3 id="modal-title" className="text-2xl font-bold text-gray-900">{title}</h3>
        <p className="mt-2 text-gray-600">{message}</p>

        <div className="mt-6">
          <button
            onClick={onConfirm}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};
