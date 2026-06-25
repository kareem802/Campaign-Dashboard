import { ReactNode } from 'react';
import { CampaignProvider } from '@/entities/campaign';
import { ToastProvider } from '@/shared/ui';

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ToastProvider>
      <CampaignProvider>
        {children}
      </CampaignProvider>
    </ToastProvider>
  );
}
