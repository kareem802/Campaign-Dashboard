import { HTMLAttributes } from 'react';
import { cn } from '@/shared/lib/utils/cn';
import { CampaignStatus } from '@/shared/config/constants';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  status: CampaignStatus;
}

export function Badge({ status, className, ...props }: BadgeProps) {
  const statusStyles = {
    Active: 'bg-green-50 text-green-700 border-green-200',
    Paused: 'bg-amber-50 text-amber-700 border-amber-200',
    Completed: 'bg-slate-100 text-slate-700 border-slate-200',
  };

  const dotStyles = {
    Active: 'bg-green-500',
    Paused: 'bg-amber-500',
    Completed: 'bg-slate-400',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border',
        statusStyles[status],
        className
      )}
      {...props}
    >
      <span className={cn('h-1.5 w-1.5 rounded-full', dotStyles[status])} aria-hidden="true" />
      {status}
    </span>
  );
}
