import { Campaign } from './types';
import { v4 as uuidv4 } from 'uuid';

export const mockCampaigns: Campaign[] = [
  {
    id: uuidv4(),
    name: 'Special Offers for Loyal Customers',
    status: 'Active',
    leadsCount: 5720,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
  },
  {
    id: uuidv4(),
    name: 'Customer Feedback Request',
    status: 'Paused',
    leadsCount: 4820,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
  },
  {
    id: uuidv4(),
    name: 'Summer Black Friday Promo',
    status: 'Completed',
    leadsCount: 15430,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
  },
  {
    id: uuidv4(),
    name: 'Welcome Series - New Subscribers',
    status: 'Active',
    leadsCount: 1250,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
  },
  {
    id: uuidv4(),
    name: 'Abandoned Cart Recovery',
    status: 'Active',
    leadsCount: 840,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
  },
  {
    id: uuidv4(),
    name: 'Q3 Product Update Newsletter',
    status: 'Completed',
    leadsCount: 8900,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 45).toISOString(),
  },
  {
    id: uuidv4(),
    name: 'VIP Early Access - Winter Collection',
    status: 'Paused',
    leadsCount: 2100,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
  },
  {
    id: uuidv4(),
    name: 'Webinar Invitation: Marketing Trends',
    status: 'Active',
    leadsCount: 3450,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
  },
];
