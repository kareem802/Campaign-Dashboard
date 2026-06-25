import { useEffect, useState } from 'react';
import { cn } from '@/shared/lib/utils/cn';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastProps {
  id: string;
  message: string;
  type?: ToastType;
  onClose: (id: string) => void;
  duration?: number;
}

export function Toast({ id, message, type = 'info', onClose, duration = 3000 }: ToastProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  // Handle entry animation
  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(true), 10);
    return () => clearTimeout(timer);
  }, []);

  // Handle auto-dismiss
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsAnimating(false);
        setTimeout(() => onClose(id), 300);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, id, onClose]);

  // Handle manual dismiss
  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => onClose(id), 300);
  };

  const typeStyles = {
    success: 'bg-green-50 text-green-800 border-green-200',
    error: 'bg-red-50 text-red-800 border-red-200',
    info: 'bg-blue-50 text-blue-800 border-blue-200',
  };

  const icons = {
    success: (
      <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
      </svg>
    ),
    error: (
      <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    ),
    info: (
      <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  };

  return (
    <div
      className={cn(
        'flex items-center w-full max-w-xs p-4 space-x-3 rounded-lg border shadow-sm transition-all duration-300 ease-out transform',
        isAnimating ? 'translate-x-0 opacity-100 scale-100' : 'translate-x-8 opacity-0 scale-95',
        typeStyles[type]
      )}
      role="alert"
    >
      <div className="shrink-0">{icons[type]}</div>
      <div className="text-sm font-medium">{message}</div>
      <button
        onClick={handleClose}
        className="ml-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 inline-flex h-8 w-8 hover:bg-black/5 focus:ring-2 focus:ring-slate-400 shrink-0"
      >
        <span className="sr-only">Close</span>
        <svg className="w-4 h-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
