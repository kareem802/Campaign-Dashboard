import { Badge } from '@/shared/ui';
import { CampaignStatus } from '../model/types';

interface CampaignStatusBadgeProps {
  status: CampaignStatus;
  className?: string;
}

export function CampaignStatusBadge({ status, className }: CampaignStatusBadgeProps) {
  return <Badge status={status} className={className} />;
}
