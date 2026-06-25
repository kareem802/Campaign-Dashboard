import { Input, Select, Button, Tooltip } from '@/shared/ui';
import { CAMPAIGN_STATUSES } from '@/shared/config';
import { useEditCampaign } from '../model/useEditCampaign';
import { Campaign, CampaignStatus } from '@/entities/campaign';

interface EditCampaignFormProps {
  campaign: Campaign;
  onSuccess?: () => void;
  onCancel: () => void;
}

export function EditCampaignForm({ campaign, onSuccess, onCancel }: EditCampaignFormProps) {
  const { formData, errors, isSubmitting, handleChange, submit } = useEditCampaign(campaign, onSuccess);

  const hasChanged =
    formData.name !== campaign.name ||
    formData.status !== campaign.status ||
    formData.leadsCount !== campaign.leadsCount;

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
        <Tooltip
          content="Please change the Campaign data before editing a campaign"
          disabled={hasChanged || isSubmitting}
          delayMs={300}
          className="w-full sm:w-auto"
        >
          <div className="w-full sm:w-auto">
            <Button
              type="submit"
              variant="primary"
              isLoading={isSubmitting}
              disabled={isSubmitting || !hasChanged}
              className={(!hasChanged && !isSubmitting) ? "w-full sm:w-auto pointer-events-none" : "w-full sm:w-auto"}
            >
              Save Changes
            </Button>
          </div>
        </Tooltip>
      </div>
    </form>
  );
}
