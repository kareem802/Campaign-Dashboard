import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/shared/lib/utils/cn';
import { Spinner } from '../spinner/Spinner';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'icon';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading = false, disabled, children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
    
    const variants = {
      primary: 'bg-purple-600 text-white hover:bg-purple-700 focus-visible:ring-purple-600',
      secondary: 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 focus-visible:ring-slate-500',
      danger: 'bg-red-50 text-red-600 hover:bg-red-100 focus-visible:ring-red-500',
      ghost: 'bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus-visible:ring-slate-500',
      icon: 'bg-transparent text-slate-400 hover:text-slate-600 hover:bg-slate-100 focus-visible:ring-slate-500',
    };

    const sizes = {
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-4 py-2 text-sm',
      lg: 'h-12 px-8 text-base',
      icon: 'h-8 w-8 p-0',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <Spinner className="mr-2 h-4 w-4" />}
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';
