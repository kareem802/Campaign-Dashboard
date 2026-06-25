import { useState, useRef, type ReactNode } from 'react';
import { cn } from '@/shared/lib/utils/cn';

export interface TooltipProps {
  content: string;
  children: ReactNode;
  /** If true, the tooltip will not show up */
  disabled?: boolean;
  /** Delay in milliseconds before showing the tooltip */
  delayMs?: number;
  className?: string;
}

export function Tooltip({ content, children, disabled = false, delayMs = 300, className }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const handleMouseEnter = () => {
    if (disabled) return;
    timeoutRef.current = window.setTimeout(() => {
      setIsVisible(true);
    }, delayMs);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  return (
    <div
      className={cn("relative inline-flex", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}

      {isVisible && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1.5 bg-slate-800 text-white text-xs rounded shadow-lg whitespace-nowrap z-50 animate-in fade-in duration-200">
          {content}
          {/* Tooltip Arrow */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800" />
        </div>
      )}
    </div>
  );
}
