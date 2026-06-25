import { FilterStatus, STATUS_ALL, CAMPAIGN_STATUSES } from '@/shared/config';
import { cn } from '@/shared/lib/utils';
import { Campaign } from '@/entities/campaign';

interface StatusFilterProps {
  currentFilter: FilterStatus;
  onChange: (status: FilterStatus) => void;
  campaigns: Campaign[]; // Needed to calculate counts
  className?: string;
}

export function StatusFilter({ currentFilter, onChange, campaigns, className }: StatusFilterProps) {
  const filters: FilterStatus[] = [STATUS_ALL, ...CAMPAIGN_STATUSES];

  const getCountForStatus = (status: FilterStatus) => {
    if (status === STATUS_ALL) return campaigns.length;
    return campaigns.filter((c) => c.status === status).length;
  };

  return (
    <div className={cn('flex flex-wrap items-center gap-2 sm:gap-6 border-b border-slate-200 w-full', className)}>
      {filters.map((status) => {
        const isActive = currentFilter === status;
        const count = getCountForStatus(status);

        return (
          <button
            key={status}
            onClick={() => onChange(status)}
            className={cn(
              'relative pb-3 text-sm font-medium transition-colors flex items-center gap-2',
              isActive ? 'text-purple-600' : 'text-slate-500 hover:text-slate-700'
            )}
          >
            {status}
            <span
              className={cn(
                'inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs font-semibold',
                isActive ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-600'
              )}
            >
              {count}
            </span>
            {/* Active underline indicator */}
            {isActive && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600 rounded-t-full" />
            )}
          </button>
        );
      })}
    </div>
  );
}
