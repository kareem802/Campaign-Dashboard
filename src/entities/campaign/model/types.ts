import { CampaignStatus } from '@/shared/config/constants';

export type { CampaignStatus };

export interface Campaign {
  id: string;
  name: string;
  status: CampaignStatus;
  leadsCount: number;
  createdAt: string;
}

export type CampaignFormData = Omit<Campaign, 'id' | 'createdAt'>;
