import { simulateApiCall } from '@/shared/api';
import { Campaign, CampaignFormData } from '../model/types';
import { mockCampaigns } from '../model/mock-data';
import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'campaign_dashboard_data';

function getStoredCampaigns(): Campaign[] {
  if (typeof window === 'undefined') return mockCampaigns;

  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      console.error('Failed to parse campaigns from localStorage');
    }
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(mockCampaigns));
  return mockCampaigns;
}

function saveCampaigns(campaigns: Campaign[]) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(campaigns));
  }
}

/**
 * Service to interact with campaigns.
 * Wraps mock data with simulated network delays and local storage persistence.
 */
export const campaignApi = {
  fetchCampaigns: async (): Promise<Campaign[]> => {
    return simulateApiCall(getStoredCampaigns(), 800);
  },

  createCampaign: async (data: CampaignFormData): Promise<Campaign> => {
    const newCampaign: Campaign = {
      ...data,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
    };

    await simulateApiCall(null, 500);

    const campaigns = getStoredCampaigns();
    saveCampaigns([newCampaign, ...campaigns]);

    return newCampaign;
  },

  updateCampaign: async (id: string, data: CampaignFormData): Promise<Campaign> => {
    // Simulate delay 
    await simulateApiCall(null, 500);

    const campaigns = getStoredCampaigns();
    const existing = campaigns.find(c => c.id === id);

    if (!existing) {
      throw new Error(`Campaign with id ${id} not found.`);
    }

    const updatedCampaign: Campaign = {
      ...existing,
      ...data,
      id,
    };

    saveCampaigns(campaigns.map(c => c.id === id ? updatedCampaign : c));
    return updatedCampaign;
  },

  deleteCampaign: async (id: string): Promise<string> => {
    // Simulate delay 
    await simulateApiCall(null, 500);

    const campaigns = getStoredCampaigns();
    saveCampaigns(campaigns.filter(c => c.id !== id));
    return id;
  },
};
