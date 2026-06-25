import { Modal } from '@/shared/ui';
import { AddCampaignForm } from '@/features/add-campaign';
import { EditCampaignForm } from '@/features/edit-campaign';
import { Campaign } from '@/entities/campaign';

interface CampaignFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'add' | 'edit';
  campaignToEdit?: Campaign | null;
}

export function CampaignFormModal({ isOpen, onClose, mode, campaignToEdit }: CampaignFormModalProps) {
  const title = mode === 'add' ? 'Add New Campaign' : 'Edit Campaign';

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      {mode === 'add' ? (
        <AddCampaignForm onSuccess={onClose} onCancel={onClose} />
      ) : campaignToEdit ? (
        <EditCampaignForm campaign={campaignToEdit} onSuccess={onClose} onCancel={onClose} />
      ) : null}
    </Modal>
  );
}
