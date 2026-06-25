import { Campaign, CampaignCard } from '@/entities/campaign';
import { DeleteCampaignButton } from '@/features/delete-campaign';
import { Button, Spinner, EmptyState } from '@/shared/ui';

interface CampaignListProps {
  campaigns: Campaign[];
  totalCampaignsCount: number;
  isLoading: boolean;
  onEditClick: (campaign: Campaign) => void;
  onClearFilters: () => void;
  onAddClick: () => void;
}

export function CampaignList({ campaigns, totalCampaignsCount, isLoading, onEditClick, onClearFilters, onAddClick }: CampaignListProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white border border-slate-200 rounded-xl">
        <Spinner className="w-8 h-8 text-purple-600 mb-4" />
        <p className="text-slate-500 font-medium">Loading campaigns...</p>
      </div>
    );
  }

  if (totalCampaignsCount === 0) {
    return (
      <EmptyState
        title="No campaigns yet"
        description="Get started by creating your first marketing campaign."
        icon={
          <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        }
        action={
          <Button variant="primary" onClick={onAddClick}>
            Create Campaign
          </Button>
        }
      />
    );
  }

  if (campaigns.length === 0) {
    return (
      <EmptyState
        title="No matching campaigns"
        description="We couldn't find any campaigns matching your current filters."
        icon={
          <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        }
        action={
          <Button variant="secondary" onClick={onClearFilters}>
            Clear Filters
          </Button>
        }
      />
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {campaigns.map((campaign) => (
        <CampaignCard
          key={campaign.id}
          campaign={campaign}
          actions={
            <>
              <Button
                variant="icon"
                size="icon"
                onClick={() => onEditClick(campaign)}
                aria-label={`Edit ${campaign.name}`}
                title="Edit"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </Button>
              <DeleteCampaignButton campaignId={campaign.id} campaignName={campaign.name} />
            </>
          }
        />
      ))}
    </div>
  );
}
