import { useState } from 'react';
import { Button, ConfirmDialog } from '@/shared/ui';
import { useDeleteCampaign } from '../model/useDeleteCampaign';

interface DeleteCampaignButtonProps {
  campaignId: string;
  campaignName: string;
}

export function DeleteCampaignButton({ campaignId, campaignName }: DeleteCampaignButtonProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { deleteCampaign, isDeletingId } = useDeleteCampaign();
  
  const isDeleting = isDeletingId === campaignId;

  const handleConfirm = () => {
    deleteCampaign(campaignId, () => setIsDialogOpen(false));
  };

  return (
    <>
      <Button
        variant="icon"
        size="icon"
        onClick={() => setIsDialogOpen(true)}
        disabled={isDeleting}
        aria-label={`Delete ${campaignName}`}
        title="Delete"
        className="text-red-400 hover:text-red-600 hover:bg-red-50"
      >
        {isDeleting ? (
          <span className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
        ) : (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        )}
      </Button>

      <ConfirmDialog
        isOpen={isDialogOpen}
        title="Delete Campaign"
        message={`Are you sure you want to delete "${campaignName}"? This action cannot be undone.`}
        confirmLabel="Delete"
        onConfirm={handleConfirm}
        onCancel={() => setIsDialogOpen(false)}
        isConfirming={isDeleting}
      />
    </>
  );
}
