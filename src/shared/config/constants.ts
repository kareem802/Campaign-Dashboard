export const CAMPAIGN_STATUSES = ['Active', 'Paused', 'Completed'] as const;

export type CampaignStatus = typeof CAMPAIGN_STATUSES[number];

export const STATUS_ALL = 'All' as const;

export type FilterStatus = typeof STATUS_ALL | CampaignStatus;
