import { CampaignFormData, CampaignStatus } from '@/entities/campaign';
import { CAMPAIGN_STATUSES } from '@/shared/config';

export interface ValidationErrors {
  name?: string;
  status?: string;
  leadsCount?: string;
}

export function validateCampaignForm(data: Partial<CampaignFormData>): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!data.name || data.name.trim().length < 3) {
    errors.name = 'Campaign name must be at least 3 characters.';
  }

  if (!data.status || !CAMPAIGN_STATUSES.includes(data.status as CampaignStatus)) {
    errors.status = 'Please select a valid campaign status.';
  }

  if (data.leadsCount === undefined || data.leadsCount === null) {
    errors.leadsCount = 'Leads count is required.';
  } else if (isNaN(Number(data.leadsCount)) || Number(data.leadsCount) < 0 || !Number.isInteger(Number(data.leadsCount))) {
    errors.leadsCount = 'Leads count must be a valid positive integer.';
  }

  return errors;
}
