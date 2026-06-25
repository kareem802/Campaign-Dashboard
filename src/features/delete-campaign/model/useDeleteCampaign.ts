import { useState } from 'react';
import { useCampaignStore, campaignApi } from '@/entities/campaign';
import { useToast } from '@/shared/ui';

export function useDeleteCampaign() {
  const { dispatch } = useCampaignStore();
  const { toast } = useToast();

  const [isDeletingId, setIsDeletingId] = useState<string | null>(null);

  const deleteCampaign = async (id: string, onSuccess?: () => void) => {
    setIsDeletingId(id);
    try {
      await campaignApi.deleteCampaign(id);
      dispatch({ type: 'DELETE_CAMPAIGN', payload: id });
      toast('Campaign deleted successfully.', 'info');
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Failed to delete campaign:', error);
      toast('Failed to delete campaign. Please try again.', 'error');
    } finally {
      setIsDeletingId(null);
    }
  };

  return {
    isDeletingId,
    deleteCampaign,
  };
}
