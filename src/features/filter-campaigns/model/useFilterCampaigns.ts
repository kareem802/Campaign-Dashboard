import { useMemo } from 'react';
import { Campaign } from '@/entities/campaign';
import { FilterStatus, STATUS_ALL } from '@/shared/config';

export function useFilterCampaigns(campaigns: Campaign[], statusFilter: FilterStatus) {
  const filteredCampaigns = useMemo(() => {
    if (statusFilter === STATUS_ALL) {
      return campaigns;
    }
    return campaigns.filter((campaign) => campaign.status === statusFilter);
  }, [campaigns, statusFilter]);

  return filteredCampaigns;
}
