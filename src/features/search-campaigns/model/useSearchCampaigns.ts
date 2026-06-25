import { useMemo } from 'react';
import { Campaign } from '@/entities/campaign';
import { useDebounce } from '@/shared/lib/hooks';

export function useSearchCampaigns(campaigns: Campaign[], searchQuery: string) {
  const debouncedQuery = useDebounce(searchQuery, 300);

  const filteredCampaigns = useMemo(() => {
    if (!debouncedQuery.trim()) {
      return campaigns;
    }

    const lowerQuery = debouncedQuery.toLowerCase();
    return campaigns.filter((campaign) =>
      campaign.name.toLowerCase().includes(lowerQuery)
    );
  }, [campaigns, debouncedQuery]);

  return filteredCampaigns;
}
