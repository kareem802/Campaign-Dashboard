import { Input, Select, Button } from '@/shared/ui';
import { CAMPAIGN_STATUSES } from '@/shared/config';
import { useAddCampaign } from '../model/useAddCampaign';
import { CampaignStatus } from '@/entities/campaign';

interface AddCampaignFormProps {
  onSuccess?: () => void;
  onCancel: () => void;
}

export function AddCampaignForm({ onSuccess, onCancel }: AddCampaignFormProps) {
  const { formData, errors, isSubmitting, handleChange, submit } = useAddCampaign(onSuccess);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
      className="flex flex-col gap-4"
    >
      <Input
        label="Campaign Name"
        id="name"
        placeholder="e.g., Summer Promo 2024"
        value={formData.name}
        onChange={(e) => handleChange('name', e.target.value)}
        error={errors.name}
        disabled={isSubmitting}
        autoFocus
      />

      <Select
        label="Status"
        id="status"
        value={formData.status}
        onChange={(e) => handleChange('status', e.target.value as CampaignStatus)}
        error={errors.status}
        options={CAMPAIGN_STATUSES.map((status) => ({ value: status, label: status }))}
        disabled={isSubmitting}
      />

      <Input
        label="Leads Count"
        id="leadsCount"
        type="number"
        min="0"
        value={formData.leadsCount === undefined ? '' : formData.leadsCount}
        onChange={(e) => handleChange('leadsCount', e.target.value ? Number(e.target.value) : '')}
        error={errors.leadsCount}
        disabled={isSubmitting}
      />

      <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 mt-4 pt-4 border-t border-slate-100">
        <Button type="button" variant="secondary" onClick={onCancel} disabled={isSubmitting} className="w-full sm:w-auto">
          Cancel
        </Button>
        <Button type="submit" variant="primary" isLoading={isSubmitting} className="w-full sm:w-auto">
          Create Campaign
        </Button>
      </div>
    </form>
  );
}
