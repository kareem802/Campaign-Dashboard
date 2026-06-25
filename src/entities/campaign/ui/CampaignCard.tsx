import { Campaign } from '../model/types';
import { CampaignStatusBadge } from './CampaignStatusBadge';
import { formatLeadsCount } from '@/shared/lib/utils';
import { ReactNode } from 'react';

export interface CampaignCardProps {
  campaign: Campaign;
  actions?: ReactNode;
}

export function CampaignCard({ campaign, actions }: CampaignCardProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row sm:items-center">
        <div className="flex flex-col">
          <h3 className="text-base font-semibold text-slate-900 line-clamp-1" title={campaign.name}>
            {campaign.name}
          </h3>
          <div className="flex items-center gap-3 mt-2 sm:mt-1.5">
            <CampaignStatusBadge status={campaign.status} />
            <span className="text-sm text-slate-500 font-medium">
              {formatLeadsCount(campaign.leadsCount, true)} Leads
            </span>
          </div>
        </div>
      </div>
      {actions && (
        <div className="flex items-center gap-2 mt-4 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-t-0 border-slate-100">
          {actions}
        </div>
      )}
    </div>
  );
}
